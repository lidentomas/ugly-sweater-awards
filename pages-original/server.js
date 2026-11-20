// Ugly Sweater Awards – serverlogik. Läses aldrig av besökare.
const PIN = 'rudolf-8351';
const PHASES = ['signup', 'voting', 'closed', 'reveal'];

const readAll = () => ({
  state: { collection: 'state', limit: 5 },
  contestants: { collection: 'contestants', limit: 1000 },
  votes: { collection: 'votes', limit: 5000 },
});

const settingsOf = (rows) => (rows.state && rows.state[0] ? rows.state[0].data || {} : {});
const phaseOf = (rows) => settingsOf(rows).phase || 'signup';
const same = (a, b) => String(a) === String(b);
// Testdeltagare räknas aldrig som någons egen anmälan
const ownedBy = (c, actor) => c.author === actor && !(c.data && c.data.test);

function publicContestant(c, actor) {
  return {
    id: c.id,
    name: c.data.name,
    motto: c.data.motto || '',
    mine: ownedBy(c, actor),
  };
}

function tally(rows, actor) {
  const counts = {};
  for (const v of rows.votes) {
    const k = String(v.data.contestantId);
    counts[k] = (counts[k] || 0) + 1;
  }
  return rows.contestants
    .map((c) => ({ ...publicContestant(c, actor), votes: counts[String(c.id)] || 0 }))
    .sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name, 'sv'));
}

function validVoteCount(rows) {
  const ids = new Set(rows.contestants.map((c) => String(c.id)));
  return rows.votes.filter((v) => ids.has(String(v.data.contestantId))).length;
}

function requirePin(args) {
  if (String(args.pin || '') !== PIN) throw new Error('bad_pin');
}

function stateWrite(rows, ids, patch) {
  const current = rows.state && rows.state[0];
  if (current) {
    return { op: 'update', collection: 'state', id: current.id, data: { ...(current.data || {}), ...patch } };
  }
  return { op: 'create', collection: 'state', id: ids[0], data: { phase: 'signup', link: '', ...patch } };
}

const APP = {
  checkPin: (args) => ({ ok: String(args.pin || '') === PIN }),

  state: {
    inputs: () => readAll(),
    run: (args, actor, rows) => {
      const phase = phaseOf(rows);
      const myVote = rows.votes.find((v) => v.author === actor);
      // Under anmälan visas inte vilka som är anmälda, bara hur många
      const visible = phase === 'signup' ? rows.contestants.filter((c) => ownedBy(c, actor)) : rows.contestants;
      const contestants = visible
        .map((c) => publicContestant(c, actor))
        .sort((a, b) => a.name.localeCompare(b.name, 'sv'));
      return {
        result: {
          phase,
          link: settingsOf(rows).link || '',
          contestants,
          signupCount: rows.contestants.length,
          joined: rows.contestants.some((c) => ownedBy(c, actor)),
          myVoteFor: myVote ? myVote.data.contestantId : null,
          voteCount: validVoteCount(rows),
          results: phase === 'reveal' ? tally(rows, actor) : null,
        },
        writes: [],
      };
    },
  },

  join: {
    inputs: () => readAll(),
    run: (args, actor, rows, ids) => {
      if (phaseOf(rows) !== 'signup') throw new Error('signup_closed');
      if (rows.contestants.some((c) => ownedBy(c, actor))) throw new Error('already_joined');
      const name = String(args.name || '').trim().slice(0, 40);
      if (!name) throw new Error('name_missing');
      const motto = String(args.motto || '').trim().slice(0, 80);
      return { result: { id: ids[0] }, writes: [{ op: 'create', collection: 'contestants', id: ids[0], data: { name, motto } }] };
    },
  },

  leave: {
    inputs: () => readAll(),
    run: (args, actor, rows) => {
      if (phaseOf(rows) !== 'signup') throw new Error('leave_closed');
      const mine = rows.contestants.find((c) => ownedBy(c, actor));
      if (!mine) throw new Error('not_joined');
      return { result: { ok: true }, writes: [{ op: 'remove', collection: 'contestants', id: mine.id }] };
    },
  },

  vote: {
    inputs: () => readAll(),
    run: (args, actor, rows, ids) => {
      if (phaseOf(rows) !== 'voting') throw new Error('voting_closed');
      const target = rows.contestants.find((c) => same(c.id, args.contestantId));
      if (!target) throw new Error('contestant_missing');
      if (ownedBy(target, actor)) throw new Error('self_vote');
      const existing = rows.votes.find((v) => v.author === actor);
      const write = existing
        ? { op: 'update', collection: 'votes', id: existing.id, data: { contestantId: target.id } }
        : { op: 'create', collection: 'votes', id: ids[0], data: { contestantId: target.id } };
      return { result: { ok: true, contestantId: target.id }, writes: [write] };
    },
  },

  adminState: {
    inputs: () => readAll(),
    run: (args, actor, rows) => {
      requirePin(args);
      return {
        result: {
          phase: phaseOf(rows),
          link: settingsOf(rows).link || '',
          results: tally(rows, actor),
          voteCount: validVoteCount(rows),
        },
        writes: [],
      };
    },
  },

  setPhase: {
    inputs: () => readAll(),
    run: (args, actor, rows, ids) => {
      requirePin(args);
      if (!PHASES.includes(args.phase)) throw new Error('bad_phase');
      return { result: { phase: args.phase }, writes: [stateWrite(rows, ids, { phase: args.phase })] };
    },
  },

  setLink: {
    inputs: () => readAll(),
    run: (args, actor, rows, ids) => {
      requirePin(args);
      const link = String(args.link || '').trim();
      if (link && !/^https:\/\//.test(link)) throw new Error('bad_link');
      return { result: { link }, writes: [stateWrite(rows, ids, { link })] };
    },
  },

  addTestContestant: {
    inputs: () => readAll(),
    run: (args, actor, rows, ids) => {
      requirePin(args);
      const n = rows.contestants.filter((c) => c.data && c.data.test).length + 1;
      const data = { name: `Testtomten ${n} 🤖`, motto: 'Jag finns inte på riktigt', test: true };
      return { result: { id: ids[0] }, writes: [{ op: 'create', collection: 'contestants', id: ids[0], data }] };
    },
  },

  removeContestant: {
    inputs: () => readAll(),
    run: (args, actor, rows) => {
      requirePin(args);
      const target = rows.contestants.find((c) => same(c.id, args.contestantId));
      if (!target) throw new Error('contestant_missing');
      const writes = [{ op: 'remove', collection: 'contestants', id: target.id }];
      for (const v of rows.votes) {
        if (same(v.data.contestantId, target.id)) writes.push({ op: 'remove', collection: 'votes', id: v.id });
      }
      return { result: { ok: true }, writes };
    },
  },
};
