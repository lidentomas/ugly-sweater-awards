import crypto from 'node:crypto';
import { runAction } from '../lib/game.js';
import { createStore } from '../lib/store.js';

const store = createStore();

function missingConfiguration() {
  const missing = [];
  if (!process.env.ADMIN_PIN) missing.push('ADMIN_PIN');
  if (!process.env.IDENTITY_COOKIE_SECRET) missing.push('IDENTITY_COOKIE_SECRET');
  const hasRedisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const hasRedisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (process.env.VERCEL && !(hasRedisUrl && hasRedisToken)) {
    missing.push('Upstash Redis URL and token');
  }
  return missing;
}

function signValue(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function identitySecret() {
  const configured = process.env.IDENTITY_COOKIE_SECRET;
  if (configured) return configured;
  if (process.env.VERCEL) throw new Error('IDENTITY_COOKIE_SECRET missing');
  return 'local-development-only-not-for-production';
}

function readIdentity(req) {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith('ugly_actor='));
  if (!match) return null;
  const cookieValue = match.slice('ugly_actor='.length);
  const [id, signature] = cookieValue.split('.');
  if (!id || !signature) return null;
  const secret = identitySecret();
  const expected = signValue(id, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return null;
  return id;
}

function cleanError(error) {
  const message = String(error?.message || error);
  const known = [
    'bad_pin', 'signup_closed', 'already_joined', 'name_missing', 'leave_closed',
    'not_joined', 'voting_closed', 'contestant_missing', 'self_vote',
    'bad_phase', 'bad_link', 'unknown_action',
  ];
  return known.find((code) => message.includes(code)) || 'server_error';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const missing = missingConfiguration();
  if (missing.length) {
    res.status(503).json({ error: 'missing_configuration', missing });
    return;
  }

  let setCookie = null;
  try {
    let actor = readIdentity(req);
    if (!actor) {
      actor = crypto.randomUUID();
      const signature = signValue(actor, identitySecret());
      const secure = process.env.VERCEL ? '; Secure' : '';
      setCookie = `ugly_actor=${encodeURIComponent(`${actor}.${signature}`)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=31536000${secure}`;
    }

    const action = String(req.query.action || req.body?.action || '');
    const args = { ...(req.body || {}) };
    args.adminPin = process.env.ADMIN_PIN;
    const rows = await store.snapshot();
    const gameRows = {
      state: rows.state,
      contestants: rows.contestants,
      votes: rows.votes,
    };

    let result;
    if (action === 'join') {
      result = runAction(action, args, actor, gameRows, [crypto.randomUUID()]);
      await store.join(actor, result.id, { name: result.writes[0].data.name, motto: result.writes[0].data.motto });
    } else if (action === 'vote') {
      result = runAction(action, args, actor, gameRows, [crypto.randomUUID()]);
      await store.vote(actor, String(args.contestantId));
    } else if (action === 'leave') {
      runAction(action, args, actor, gameRows);
      await store.leave(actor);
      result = { ok: true };
    } else if (action === 'setPhase') {
      result = runAction(action, args, actor, gameRows);
      await store.setState({ phase: args.phase, revealStarted: false, revealComplete: false });
    } else if (action === 'setLink') {
      result = runAction(action, args, actor, gameRows);
      await store.setState({ link: result.link });
    } else if (action === 'addTestContestant') {
      result = runAction(action, args, actor, gameRows, [crypto.randomUUID()]);
      await store.addContestant(result.id, 'admin', result.writes[0].data);
    } else if (action === 'removeContestant') {
      result = runAction(action, args, actor, gameRows);
      await store.removeContestant(String(args.contestantId));
    } else if (action === 'state') {
      result = runAction(action, args, actor, gameRows);
      result.visitorCounter = await store.tickVisitorCounter(actor);
    } else if (action === 'startReveal') {
      runAction(action, args, actor, gameRows);
      await store.startReveal();
      result = runAction(action, args, actor, gameRows);
    } else if (action === 'finishReveal') {
      runAction(action, args, actor, gameRows);
      await store.finishReveal();
      const updatedRows = await store.snapshot();
      result = runAction('state', args, actor, updatedRows);
      result.visitorCounter = await store.tickVisitorCounter(actor);
    } else {
      result = runAction(action, args, actor, gameRows);
    }

    if (setCookie) res.setHeader('Set-Cookie', setCookie);
    res.status(200).json(result);
  } catch (error) {
    if (setCookie) res.setHeader('Set-Cookie', setCookie);
    const code = cleanError(error);
    if (code === 'server_error') {
      console.error('Ugly Sweater API request failed:', error);
      res.status(500).json({ error: code });
      return;
    }
    res.status(400).json({ error: code });
  }
}
