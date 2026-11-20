import { Redis } from '@upstash/redis';

const KEYS = {
  state: 'ugly:state',
  contestants: 'ugly:contestants',
  votes: 'ugly:votes',
};

function jsonParse(value, fallback) {
  if (typeof value !== 'string') return value || fallback;
  try { return JSON.parse(value); } catch { return fallback; }
}

function normalizeHash(hash) {
  if (!hash) return [];
  if (Array.isArray(hash)) {
    const entries = [];
    for (let i = 0; i < hash.length; i += 2) entries.push([hash[i], hash[i + 1]]);
    return entries;
  }
  return Object.entries(hash);
}

class MemoryStore {
  constructor() {
    this.state = { phase: 'signup', link: '' };
    this.contestants = new Map();
    this.votes = new Map();
  }

  async snapshot() {
    return {
      state: { ...this.state },
      contestants: [...this.contestants.entries()].map(([id, value]) => ({ id, ...value })),
      votes: [...this.votes.entries()].map(([author, data]) => ({ id: author, author, data })),
    };
  }

  async join(actor, id, data) {
    if (this.state.phase !== 'signup') throw new Error('signup_closed');
    for (const value of this.contestants.values()) {
      if (value.author === actor && !value.data.test) throw new Error('already_joined');
    }
    this.contestants.set(id, { author: actor, data });
  }

  async vote(actor, targetId) {
    if (this.state.phase !== 'voting') throw new Error('voting_closed');
    const target = this.contestants.get(targetId);
    if (!target) throw new Error('contestant_missing');
    if (target.author === actor) throw new Error('self_vote');
    this.votes.set(actor, { contestantId: targetId });
  }

  async leave(actor) {
    if (this.state.phase !== 'signup') throw new Error('leave_closed');
    for (const [id, value] of this.contestants.entries()) {
      if (value.author === actor && !value.data.test) {
        this.contestants.delete(id);
        return;
      }
    }
    throw new Error('not_joined');
  }

  async setState(patch) {
    this.state = { ...this.state, ...patch };
  }

  async addContestant(id, actor, data) {
    this.contestants.set(id, { author: actor, data });
  }

  async removeContestant(id) {
    this.contestants.delete(id);
    for (const [author, vote] of this.votes.entries()) {
      if (String(vote.contestantId) === String(id)) this.votes.delete(author);
    }
  }
}

class RedisStore {
  constructor(redis) {
    this.redis = redis;
  }

  async snapshot() {
    const [stateValue, contestantHash, voteHash] = await Promise.all([
      this.redis.get(KEYS.state),
      this.redis.hgetall(KEYS.contestants),
      this.redis.hgetall(KEYS.votes),
    ]);
    const state = jsonParse(stateValue, { phase: 'signup', link: '' });
    const contestants = normalizeHash(contestantHash).map(([id, raw]) => {
      const value = jsonParse(raw, {});
      return { id, author: value.author, data: value.data || {} };
    });
    const votes = normalizeHash(voteHash).map(([author, raw]) => {
      const data = jsonParse(raw, {});
      return { id: author, author, data };
    });
    return { state, contestants, votes };
  }

  async join(actor, id, data) {
    const script = `
      local state = cjson.decode(redis.call('GET', KEYS[1]) or '{"phase":"signup","link":""}')
      if state.phase ~= 'signup' then return redis.error_reply('signup_closed') end
      local values = redis.call('HVALS', KEYS[2])
      for _, raw in ipairs(values) do
        local value = cjson.decode(raw)
        if value.author == ARGV[1] and not value.data.test then
          return redis.error_reply('already_joined')
        end
      end
      local value = cjson.encode({author=ARGV[1], data={name=ARGV[3], motto=ARGV[4]}})
      redis.call('HSET', KEYS[2], ARGV[2], value)
      return 1
    `;
    await this.redis.eval(script, [KEYS.state, KEYS.contestants], [actor, id, data.name, data.motto || '']);
  }

  async vote(actor, targetId) {
    const script = `
      local state = cjson.decode(redis.call('GET', KEYS[1]) or '{"phase":"signup","link":""}')
      if state.phase ~= 'voting' then return redis.error_reply('voting_closed') end
      local raw = redis.call('HGET', KEYS[2], ARGV[1])
      if not raw then return redis.error_reply('contestant_missing') end
      local target = cjson.decode(raw)
      if target.author == ARGV[2] then return redis.error_reply('self_vote') end
      redis.call('HSET', KEYS[3], ARGV[2], cjson.encode({contestantId=ARGV[1]}))
      return 1
    `;
    await this.redis.eval(script, [KEYS.state, KEYS.contestants, KEYS.votes], [targetId, actor]);
  }

  async leave(actor) {
    const script = `
      local state = cjson.decode(redis.call('GET', KEYS[1]) or '{"phase":"signup","link":""}')
      if state.phase ~= 'signup' then return redis.error_reply('leave_closed') end
      local entries = redis.call('HGETALL', KEYS[2])
      for i = 1, #entries, 2 do
        local value = cjson.decode(entries[i+1])
        if value.author == ARGV[1] and not value.data.test then
          redis.call('HDEL', KEYS[2], entries[i])
          return 1
        end
      end
      return redis.error_reply('not_joined')
    `;
    await this.redis.eval(script, [KEYS.state, KEYS.contestants], [actor]);
  }

  async setState(patch) {
    const current = jsonParse(await this.redis.get(KEYS.state), { phase: 'signup', link: '' });
    await this.redis.set(KEYS.state, JSON.stringify({ ...current, ...patch }));
  }

  async addContestant(id, actor, data) {
    await this.redis.hset(KEYS.contestants, { [id]: JSON.stringify({ author: actor, data }) });
  }

  async removeContestant(id) {
    const script = `
      redis.call('HDEL', KEYS[1], ARGV[1])
      local entries = redis.call('HGETALL', KEYS[2])
      for i = 1, #entries, 2 do
        local vote = cjson.decode(entries[i+1])
        if tostring(vote.contestantId) == tostring(ARGV[1]) then
          redis.call('HDEL', KEYS[2], entries[i])
        end
      end
      return 1
    `;
    await this.redis.eval(script, [KEYS.contestants, KEYS.votes], [id]);
  }
}

export function createStore() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) return new RedisStore(new Redis({ url, token }));
  return new MemoryStore();
}
