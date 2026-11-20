export const PHASES = ['signup', 'voting', 'closed', 'reveal'];

export function same(a, b) {
  return String(a) === String(b);
}

export function ownedBy(contestant, actor) {
  return contestant.author === actor && !(contestant.data && contestant.data.test);
}

export function publicContestant(contestant, actor) {
  return {
    id: contestant.id,
    name: contestant.data.name,
    motto: contestant.data.motto || '',
    mine: ownedBy(contestant, actor),
  };
}

export function phaseOf(rows) {
  return rows.state && rows.state.phase ? rows.state.phase : 'signup';
}

export function tally(rows) {
  const counts = {};
  for (const vote of rows.votes) {
    const id = String(vote.data.contestantId);
    counts[id] = (counts[id] || 0) + 1;
  }
  return rows.contestants
    .map((contestant) => ({ ...publicContestant(contestant, null), votes: counts[String(contestant.id)] || 0 }))
    .sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name, 'sv'));
}

export function validVoteCount(rows) {
  const ids = new Set(rows.contestants.map((contestant) => String(contestant.id)));
  return rows.votes.filter((vote) => ids.has(String(vote.data.contestantId))).length;
}

export function requirePin(args, adminPin) {
  if (String(args.pin || '') !== String(adminPin || '')) throw new Error('bad_pin');
}

export function runAction(action, args, actor, rows, ids = []) {
  const phase = phaseOf(rows);

  if (action === 'checkPin') {
    return { ok: String(args.pin || '') === String(args.adminPin || '') };
  }
  if (action === 'state') {
    const revealStarted = phase === 'reveal' && Boolean(rows.state.revealStarted);
    const myVote = rows.votes.find((vote) => vote.author === actor);
    const visible = phase === 'signup'
      ? rows.contestants.filter((contestant) => ownedBy(contestant, actor))
      : rows.contestants;
    const contestants = visible
      .map((contestant) => publicContestant(contestant, actor))
      .sort((a, b) => a.name.localeCompare(b.name, 'sv'));
    return {
      phase,
      link: rows.state.link || '',
      contestants,
      signupCount: rows.contestants.length,
      joined: rows.contestants.some((contestant) => ownedBy(contestant, actor)),
      myVoteFor: myVote ? myVote.data.contestantId : null,
      voteCount: validVoteCount(rows),
      revealStarted,
      results: revealStarted ? tally(rows) : null,
    };
  }
  if (action === 'startReveal') {
    if (phase !== 'reveal') throw new Error('bad_phase');
    return { revealStarted: true };
  }
  if (action === 'join') {
    if (phase !== 'signup') throw new Error('signup_closed');
    if (rows.contestants.some((contestant) => ownedBy(contestant, actor))) throw new Error('already_joined');
    const name = String(args.name || '').trim().slice(0, 40);
    if (!name) throw new Error('name_missing');
    const motto = String(args.motto || '').trim().slice(0, 80);
    const id = ids[0] || crypto.randomUUID();
    return { id, writes: [{ op: 'create', collection: 'contestants', id, data: { name, motto }, author: actor }] };
  }
  if (action === 'leave') {
    if (phase !== 'signup') throw new Error('leave_closed');
    const mine = rows.contestants.find((contestant) => ownedBy(contestant, actor));
    if (!mine) throw new Error('not_joined');
    return { ok: true, writes: [{ op: 'remove', collection: 'contestants', id: mine.id }] };
  }
  if (action === 'vote') {
    if (phase !== 'voting') throw new Error('voting_closed');
    const target = rows.contestants.find((contestant) => same(contestant.id, args.contestantId));
    if (!target) throw new Error('contestant_missing');
    if (ownedBy(target, actor) || target.author === actor) throw new Error('self_vote');
    const existing = rows.votes.find((vote) => vote.author === actor);
    return existing
      ? { ok: true, contestantId: target.id, writes: [{ op: 'update', collection: 'votes', id: existing.id, data: { contestantId: target.id }, author: actor }] }
      : { ok: true, contestantId: target.id, writes: [{ op: 'create', collection: 'votes', id: ids[0] || crypto.randomUUID(), data: { contestantId: target.id }, author: actor }] };
  }
  if (action === 'adminState') {
    requirePin(args, args.adminPin);
    return { phase, link: rows.state.link || '', results: tally(rows), voteCount: validVoteCount(rows) };
  }
  if (action === 'setPhase') {
    requirePin(args, args.adminPin);
    if (!PHASES.includes(args.phase)) throw new Error('bad_phase');
    return {
      phase: args.phase,
      writes: [{ op: 'setState', data: { phase: args.phase, revealStarted: false } }],
    };
  }
  if (action === 'setLink') {
    requirePin(args, args.adminPin);
    const link = String(args.link || '').trim();
    if (link && !/^https:\/\//.test(link)) throw new Error('bad_link');
    return { link, writes: [{ op: 'setState', data: { link } }] };
  }
  if (action === 'addTestContestant') {
    requirePin(args, args.adminPin);
    const count = rows.contestants.filter((contestant) => contestant.data && contestant.data.test).length + 1;
    const data = { name: `Testtomten ${count} 🤖`, motto: 'Jag finns inte på riktigt', test: true };
    const id = ids[0] || crypto.randomUUID();
    return { id, writes: [{ op: 'create', collection: 'contestants', id, data, author: 'admin' }] };
  }
  if (action === 'removeContestant') {
    requirePin(args, args.adminPin);
    const target = rows.contestants.find((contestant) => same(contestant.id, args.contestantId));
    if (!target) throw new Error('contestant_missing');
    const writes = [{ op: 'remove', collection: 'contestants', id: target.id }];
    for (const vote of rows.votes) {
      if (same(vote.data.contestantId, target.id)) writes.push({ op: 'remove', collection: 'votes', id: vote.author });
    }
    return { ok: true, writes };
  }
  throw new Error('unknown_action');
}
