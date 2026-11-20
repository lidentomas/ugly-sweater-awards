import { describe, expect, it } from 'vitest';
import { runAction } from '../lib/game.js';

function rows(overrides = {}) {
  return {
    state: { phase: 'signup', link: '' },
    contestants: [],
    votes: [],
    ...overrides,
  };
}

describe('Ugly Sweater Awards game logic', () => {
  it('does not allow a contestant to vote for themselves', () => {
    const data = rows({
      state: { phase: 'voting', link: '' },
      contestants: [{ id: 'a', author: 'person-a', data: { name: 'Ada' } }],
    });
    expect(() => runAction('vote', { contestantId: 'a' }, 'person-a', data, ['vote-a']))
      .toThrow('self_vote');
  });

  it('allows a person to change their vote', () => {
    const data = rows({
      state: { phase: 'voting', link: '' },
      contestants: [
        { id: 'a', author: 'person-a', data: { name: 'Ada' } },
        { id: 'b', author: 'person-b', data: { name: 'Bertil' } },
      ],
      votes: [{ id: 'old', author: 'person-c', data: { contestantId: 'a' } }],
    });
    const result = runAction('vote', { contestantId: 'b' }, 'person-c', data, ['new']);
    expect(result.writes[0].op).toBe('update');
    expect(result.writes[0].data.contestantId).toBe('b');
  });

  it('does not allow a person to join twice', () => {
    const data = rows({
      contestants: [{ id: 'a', author: 'person-a', data: { name: 'Ada' } }],
    });
    expect(() => runAction('join', { name: 'Ada igen' }, 'person-a', data, ['b']))
      .toThrow('already_joined');
  });

  it('closes sign-up and voting in the wrong phase', () => {
    expect(() => runAction('join', { name: 'Ada' }, 'person-a',
      rows({ state: { phase: 'voting', link: '' } }), ['a'])).toThrow('signup_closed');
    expect(() => runAction('vote', { contestantId: 'a' }, 'person-a',
      rows({ state: { phase: 'signup', link: '' } }), ['v'])).toThrow('voting_closed');
  });

  it('rejects a wrong game master PIN', () => {
    expect(() => runAction('setPhase', { pin: 'wrong', phase: 'voting', adminPin: 'secret' },
      'admin', rows())).toThrow('bad_pin');
  });

  it('hides contestant names during sign-up', () => {
    const data = rows({
      contestants: [{ id: 'a', author: 'person-a', data: { name: 'Ada', motto: 'Hi' } }],
    });
    const state = runAction('state', {}, 'person-b', data);
    expect(state.signupCount).toBe(1);
    expect(state.contestants).toHaveLength(0);
  });

  it('hides vote results until the big screen closes the reveal', () => {
    const data = rows({
      state: { phase: 'reveal', link: '', revealStarted: false },
      contestants: [{ id: 'a', author: 'person-a', data: { name: 'Ada' } }],
      votes: [{ id: 'v', author: 'person-b', data: { contestantId: 'a' } }],
    });
    const state = runAction('state', {}, 'person-b', data);
    expect(state.results).toBeNull();
    expect(state.revealStarted).toBe(false);
    expect(runAction('startReveal', {}, 'screen', data).revealStarted).toBe(true);
    data.state.revealStarted = true;
    expect(runAction('state', {}, 'person-b', data).results).toBeNull();
    expect(runAction('finishReveal', {}, 'screen', data).revealComplete).toBe(true);
    data.state.revealComplete = true;
    expect(runAction('state', {}, 'person-b', data).results).toHaveLength(1);
  });

  it('allows test contestants to receive votes', () => {
    const data = rows({
      state: { phase: 'voting', link: '' },
      contestants: [{ id: 'test', author: 'admin', data: { name: 'Testtomten', test: true } }],
    });
    expect(runAction('vote', { contestantId: 'test' }, 'person-a', data, ['vote-a']).ok).toBe(true);
  });
});
