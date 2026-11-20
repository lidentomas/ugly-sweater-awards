// Ugly Christmas Sweater Awards 2026 – klientlogik
const I18N = {
  sv: {
    ticker: '★彡 VÄLKOMMEN TILL AUCTIONETS JULFEST 2026 彡★ \u00a0\u00a0 🎄 RÖSTA PÅ ÅRETS FULASTE TRÖJA 🎄 \u00a0\u00a0 ✨ GOD JUL & GOTT NYTT ÅR ✨ \u00a0\u00a0 🦌 RUDOLF ÄR ÄNTLIGEN MED PÅ BILD 🦌 \u00a0\u00a0 🎅 TOMTEN SER ALLT 🎅',
    title: 'Ugly Christmas Sweater Awards 2026 – Auctionets julfest',
    subtitle: '~*~ Auctionets officiella tävling i fulaste jultröja ~*~',
    scanVote: 'SKANNA & RÖSTA!!!',
    loginHint: 'Skanna QR-koden och rösta från din mobil',
    adminTitle: '🎅 Spelledarpanelen',
    pinLabel: 'Spelledarkod',
    login: 'Logga in',
    construction: '🚧 Denna sida är alltid under konstruktion 🚧',
    voteCounter: 'Besöksräknare:',
    netscape: 'Bäst i Netscape Navigator 4.0 vid 800×600. Gjord med ❤️ och glögg.',
    navVote: '🗳️ Rösta', navScreen: '🖥️ Storskärm', navAdmin: '🎅 Spelledare',
    loading: 'Laddar tomtenissarna…',
    phase: { signup: '✍️ ANMÄLAN ÄR ÖPPEN!!! ✍️', voting: '🗳️ RÖSTNINGEN ÄR ÖPPEN!!! 🗳️', closed: '🔒 Röstningen är stängd 🔒', reveal: '🏆 VINNAREN ÄR KORAD!!! 🏆' },
    phaseName: { signup: 'Anmälan öppen', voting: 'Röstning öppen', closed: 'Röstningen stängd', reveal: 'Vinnaren avslöjad' },
    joinTitle: 'Har du på dig en ful jultröja?',
    joinIntro: 'Anmäl dig till tävlingen! Anmälan stänger innan röstningen börjar, så vänta inte.',
    yourName: 'För- och efternamn', motto: 'Tröjans slogan', optional: '(frivilligt)',
    mottoPlaceholder: 't.ex. ”Rudolf hade en dålig dag”',
    joinBtn: 'Jag tävlar! 🎄', joining: 'Anmäler dig… 🎅',
    joined: 'Du är anmäld! Lycka till! 🎉',
    joinedTitle: 'Du är med i tävlingen!!! 🎉',
    joinedText: 'Röstningen öppnar snart. Du kan inte rösta på dig själv, men du kan charma dina kollegor så att de röstar på dig.',
    leave: 'Hoppa av tävlingen', leaveArmed: 'Klicka igen för att hoppa av', left: 'Du har hoppat av.',
    voteTitle: 'Vilken tröja är fulast?',
    voteText: 'Tryck på tröjan du röstar på. Du har en röst och kan ändra dig tills röstningen stänger.',
    closedTitle: 'Tomtenissarna räknar rösterna… 🧮', closedText: 'Håll i tomteluvan. Vinnaren avslöjas snart på storskärmen!',
    lookScreen: 'Titta på storskärmen! 👀', showResults: 'Visa resultatet', hideResults: 'Dölj resultatet', results: 'Resultat',
    noneYetSignup: 'Ingen har anmält sig än. Bli först!', noContestants: 'Inga tävlande.',
    signedUpCount: 'Anmälda hittills:', contestants: (n) => `De tävlande (${n})`,
    thisIsYou: 'Det här är du! 😎', thisIsYouVote: 'Det här är du 😉', yourVote: 'DIN RÖST ✔',
    voteFor: (n) => `Rösta på ${n}`, youSelf: (n) => `${n} (du själv)`,
    voting: 'Röstar… 🗳️', voted: (n) => `Din röst på ${n} är registrerad! 🎉`,
    votesN: (n) => `${n} ${n === 1 ? 'röst' : 'röster'}`,
    noLink: 'Spelledaren har inte lagt in sidans länk än.',
    revealTeaser: 'Vem bär årets fulaste jultröja? 🤔',
    startReveal: '🥁 Starta avslöjandet', votesIn: 'Röster inkomna:',
    closedScreen: 'Röstningen är stängd! Snart avslöjas vinnaren…',
    waiting: 'Väntar på de första modiga…',
    noVotes: 'Inga röster… tomten är besviken 😢', third: '🥉 Tredje plats', second: '🥈 Andra plats',
    drumroll: '🥁 Och årets fulaste tröja tillhör… 🥁', sharedWin: '🏆 DELAD VINST!!! 🏆', winner: '🏆 VINNARE!!! 🏆',
    close: 'Stäng', again: 'Spela igen',
    phaseBtns: {
      signup: ['1. Öppna anmälan', 'Klicka igen: öppna anmälan'],
      voting: ['2. Stäng anmälan och öppna röstningen', 'Klicka igen: starta röstningen'],
      closed: ['3. Stäng röstningen', 'Klicka igen: stäng röstningen'],
      reveal: ['4. Avslöja vinnaren', 'Klicka igen: avslöja!'],
    },
    phaseChanged: (p) => `Fasen är ändrad: ${p}`,
    currentPhase: 'Nuvarande fas: ', twoClicks: 'Varje knapp kräver två klick. Rösterna syns bara här tills du avslöjar vinnaren.',
    linkTitle: 'Sidans länk (till QR-koden)', linkHint: 'Klistra in den publicerade sidans adress.', saveLink: 'Spara länk',
    linkSaved: 'Länken är sparad. QR-koden visas på storskärmen.',
    stats: (c, v) => `Tävlande: ${c}. Röster: ${v}.`, noSignups: 'Inga anmälda än.',
    colName: 'Namn', colMotto: 'Slogan', colVotes: 'Röster', tableLabel: 'Tävlande och röster',
    remove: 'Ta bort', removeArmed: 'Säker?', removed: (n) => `${n} är borttagen.`,
    addTest: '🤖 Lägg till testdeltagare', addTestDone: 'En testdeltagare är tillagd. Ta bort den innan festen!',
    openScreen: '🖥️ Öppna storskärmen', logout: 'Logga ut', loggedIn: 'Inloggad som spelledare 🎅',
    fetchFailed: (m) => `Kunde inte hämta läget: ${m}`,
    errors: {
      bad_pin: 'Fel spelledarkod.', signup_closed: 'Anmälan är stängd.', already_joined: 'Du är redan anmäld.',
      name_missing: 'Skriv ditt namn först.', leave_closed: 'Anmälan är stängd, du kan inte hoppa av nu.',
      not_joined: 'Du är inte anmäld.', voting_closed: 'Röstningen är inte öppen.',
      contestant_missing: 'Den tävlande finns inte längre.', self_vote: 'Snyggt försök, men du kan inte rösta på dig själv.',
      bad_phase: 'Okänd fas.', bad_link: 'Länken ska börja med https://',
      missing_configuration: 'Servern är inte färdigkonfigurerad. Lägg in ADMIN_PIN och IDENTITY_COOKIE_SECRET i Vercel och koppla Upstash Redis.',
      no_data: 'Röstningen är inte igång än: delad data är inte påslagen för sidan. Be en Pages-administratör slå på den.',
    },
  },
  en: {
    ticker: '★彡 WELCOME TO THE AUCTIONET CHRISTMAS PARTY 2026 彡★ \u00a0\u00a0 🎄 VOTE FOR THIS YEAR’S UGLIEST SWEATER 🎄 \u00a0\u00a0 ✨ MERRY CHRISTMAS & HAPPY NEW YEAR ✨ \u00a0\u00a0 🦌 RUDOLPH FINALLY MADE IT INTO THE PICTURE 🦌 \u00a0\u00a0 🎅 SANTA SEES EVERYTHING 🎅',
    title: 'Ugly Christmas Sweater Awards 2026 – Auctionet Christmas party',
    subtitle: '~*~ Auctionet’s official ugliest Christmas sweater contest ~*~',
    scanVote: 'SCAN & VOTE!!!',
    loginHint: 'Scan the QR code and vote from your mobile',
    adminTitle: '🎅 Game master panel',
    pinLabel: 'Game master code',
    login: 'Log in',
    construction: '🚧 This page is permanently under construction 🚧',
    voteCounter: 'Visitor counter:',
    netscape: 'Best viewed in Netscape Navigator 4.0 at 800×600. Made with ❤️ and mulled wine.',
    navVote: '🗳️ Vote', navScreen: '🖥️ Big screen', navAdmin: '🎅 Game master',
    loading: 'Waking up the elves…',
    phase: { signup: '✍️ SIGN-UP IS OPEN!!! ✍️', voting: '🗳️ VOTING IS OPEN!!! 🗳️', closed: '🔒 Voting is closed 🔒', reveal: '🏆 WE HAVE A WINNER!!! 🏆' },
    phaseName: { signup: 'Sign-up open', voting: 'Voting open', closed: 'Voting closed', reveal: 'Winner revealed' },
    joinTitle: 'Wearing an ugly Christmas sweater?',
    joinIntro: 'Enter the contest! Sign-up closes before voting starts, so don’t wait.',
    yourName: 'First and last name', motto: 'Sweater slogan', optional: '(optional)',
    mottoPlaceholder: 'e.g. “Rudolph had a bad day”',
    joinBtn: 'I’m in! 🎄', joining: 'Signing you up… 🎅',
    joined: 'You’re in! Good luck! 🎉',
    joinedTitle: 'You’re in the contest!!! 🎉',
    joinedText: 'Voting opens soon. You can’t vote for yourself, but you can charm your colleagues into voting for you.',
    leave: 'Withdraw from the contest', leaveArmed: 'Click again to withdraw', left: 'You have withdrawn.',
    voteTitle: 'Which sweater is the ugliest?',
    voteText: 'Tap the sweater you want to vote for. You have one vote and can change it until voting closes.',
    closedTitle: 'The elves are counting the votes… 🧮', closedText: 'Hold on to your Santa hat. The winner will be revealed on the big screen soon!',
    lookScreen: 'Look at the big screen! 👀', showResults: 'Show results', hideResults: 'Hide results', results: 'Results',
    noneYetSignup: 'Nobody has signed up yet. Be the first!', noContestants: 'No contestants.',
    signedUpCount: 'Signed up so far:', contestants: (n) => `The contestants (${n})`,
    thisIsYou: 'This is you! 😎', thisIsYouVote: 'This is you 😉', yourVote: 'YOUR VOTE ✔',
    voteFor: (n) => `Vote for ${n}`, youSelf: (n) => `${n} (you)`,
    voting: 'Voting… 🗳️', voted: (n) => `Your vote for ${n} has been counted! 🎉`,
    votesN: (n) => `${n} ${n === 1 ? 'vote' : 'votes'}`,
    noLink: 'The game master hasn’t added the page link yet.',
    revealTeaser: 'Who is wearing this year’s ugliest Christmas sweater? 🤔',
    startReveal: '🥁 Start the reveal', votesIn: 'Votes cast:',
    closedScreen: 'Voting is closed! The winner will be revealed soon…',
    waiting: 'Waiting for the first brave souls…',
    noVotes: 'No votes… Santa is disappointed 😢', third: '🥉 Third place', second: '🥈 Second place',
    drumroll: '🥁 And this year’s ugliest sweater belongs to… 🥁', sharedWin: '🏆 IT’S A TIE!!! 🏆', winner: '🏆 WINNER!!! 🏆',
    close: 'Close', again: 'Play again',
    phaseBtns: {
      signup: ['1. Open sign-up', 'Click again: open sign-up'],
      voting: ['2. Close sign-up and open voting', 'Click again: start voting'],
      closed: ['3. Close voting', 'Click again: close voting'],
      reveal: ['4. Reveal the winner', 'Click again: reveal!'],
    },
    phaseChanged: (p) => `Phase changed: ${p}`,
    currentPhase: 'Current phase: ', twoClicks: 'Every button needs two clicks. Votes are only visible here until you reveal the winner.',
    linkTitle: 'Page link (for the QR code)', linkHint: 'Paste the address of the published page.', saveLink: 'Save link',
    linkSaved: 'Link saved. The QR code now shows on the big screen.',
    stats: (c, v) => `Contestants: ${c}. Votes: ${v}.`, noSignups: 'Nobody has signed up yet.',
    colName: 'Name', colMotto: 'Slogan', colVotes: 'Votes', tableLabel: 'Contestants and votes',
    remove: 'Remove', removeArmed: 'Sure?', removed: (n) => `${n} has been removed.`,
    addTest: '🤖 Add test contestant', addTestDone: 'A test contestant was added. Remove it before the party!',
    openScreen: '🖥️ Open the big screen', logout: 'Log out', loggedIn: 'Logged in as game master 🎅',
    fetchFailed: (m) => `Couldn’t load the current state: ${m}`,
    errors: {
      bad_pin: 'Wrong game master code.', signup_closed: 'Sign-up is closed.', already_joined: 'You’re already signed up.',
      name_missing: 'Enter your name first.', leave_closed: 'Sign-up is closed, you can’t withdraw now.',
      not_joined: 'You’re not signed up.', voting_closed: 'Voting isn’t open.',
      contestant_missing: 'That contestant no longer exists.', self_vote: 'Nice try, but you can’t vote for yourself.',
      bad_phase: 'Unknown phase.', bad_link: 'The link must start with https://',
      missing_configuration: 'The server is not configured yet. Add ADMIN_PIN and IDENTITY_COOKIE_SECRET in Vercel and connect Upstash Redis.',
      no_data: 'Voting isn’t running yet: shared data is not switched on for this page. Ask a Pages administrator to switch it on.',
    },
  },
};

const me = { id: null, name: null, locale: navigator.language || null };
const storedLang = localStorage.getItem('ugly-lang');
let LANG = storedLang === 'en' || storedLang === 'sv' ? storedLang : (String(me.locale || '').toLowerCase().startsWith('en') ? 'en' : 'sv');
const L = () => I18N[LANG];
const ERR_CODES = Object.keys(I18N.sv.errors);
function errCode(err) {
  const msg = (err && err.message) || String(err);
  return ERR_CODES.find((c) => msg.includes(c)) || null;
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const S = {
  route: 'main', data: null, admin: null,
  pin: localStorage.getItem('ugly-pin') || '',
  keys: {}, showResults: false, revealRun: 0, qrLink: null, revealShown: false,
};

const $ = (id) => document.getElementById(id);
const statusEl = $('status');

/* ---------- Hjälpfunktioner ---------- */
function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c === null || c === undefined || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

let statusIsLoading = false;
function setStatus(msg, isError = false) {
  statusIsLoading = false;
  statusEl.textContent = msg || '';
  statusEl.classList.toggle('is-error', !!isError);
  statusEl.setAttribute('role', isError ? 'alert' : 'status');
}

function friendlyError(err) {
  const msg = (err && err.message) || String(err);
  if (/412/.test(msg) || /shared data/i.test(msg)) return L().errors.no_data;
  const code = errCode(err);
  return code ? L().errors[code] : msg;
}

async function api(action, args = {}) {
  const response = await fetch(`/api?action=${encodeURIComponent(action)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(args),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}
const pad = (n) => String(n).padStart(6, '0');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const same = (a, b) => a !== null && a !== undefined && String(a) === String(b);

function changed(key, value) {
  const json = JSON.stringify([LANG, value]);
  if (S.keys[key] === json) return false;
  S.keys[key] = json;
  return true;
}

function twoStep(label, armedLabel, action, extraClass = '') {
  const btn = h('button', { type: 'button', class: `btn ${extraClass}`, dataset: { armed: 'false' }, text: label });
  let timer;
  btn.addEventListener('click', async () => {
    if (btn.dataset.armed === 'true') {
      clearTimeout(timer);
      btn.dataset.armed = 'false';
      btn.textContent = label;
      btn.disabled = true;
      try { await action(); } finally { btn.disabled = false; }
      return;
    }
    btn.dataset.armed = 'true';
    btn.textContent = armedLabel;
    timer = setTimeout(() => { btn.dataset.armed = 'false'; btn.textContent = label; }, 4000);
  });
  return btn;
}

const rankOf = (results, item) => 1 + results.filter((r) => r.votes > item.votes).length;

const SWEATERS = ['🧶', '🎄', '🦌', '⛄', '🎅', '🔔', '⭐', '🎁'];
function sweaterBadge(c) {
  const i = [...String(c.id)].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % SWEATERS.length;
  return h('span', { class: 'badge', 'aria-hidden': 'true' }, SWEATERS[i]);
}

function staticCard(c) {
  return h('li', {}, h('div', { class: 'card' },
    sweaterBadge(c),
    h('span', { class: 'name', text: c.name }),
    c.motto ? h('span', { class: 'motto', text: `”${c.motto}”` }) : null,
    c.mine ? h('span', { class: 'tag', text: L().thisIsYou }) : null,
    c.voted ? h('span', { class: 'tag', text: L().yourVote }) : null,
  ));
}

function resultsList(results) {
  if (!results || results.length === 0) return h('p', { text: L().noContestants });
  const medal = (p) => (p === 1 ? '🥇' : p === 2 ? '🥈' : p === 3 ? '🥉' : `${p}.`);
  return h('ol', { class: 'results' }, results.map((r) => h('li', {},
    h('span', { class: 'place', text: medal(rankOf(results, r)) }),
    h('span', { class: 'who', text: r.name + (r.motto ? ` – ”${r.motto}”` : '') }),
    h('span', { class: 'votes', text: L().votesN(r.votes) }),
  )));
}

/* ---------- Språk ---------- */
function applyStaticTexts() {
  document.documentElement.lang = LANG;
  document.title = L().title;
  $('ticker').textContent = L().ticker;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = L()[el.dataset.i18n]; });
  document.querySelectorAll('.lang-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  if (statusIsLoading) statusEl.textContent = L().loading;
}

function setLang(lang) {
  if (lang === LANG) return;
  LANG = lang;
  localStorage.setItem('ugly-lang', lang);
  applyStaticTexts();
  S.keys = {};
  render();
}
document.querySelectorAll('.lang-btn').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

/* ---------- Mobilvyn ---------- */
function renderMain() {
  const d = S.data;
  if (!d) return;
  $('phase-banner').textContent = L().phase[d.phase] || '';
  $('phase-banner').classList.toggle('blink', d.phase === 'voting' || d.phase === 'signup');
  if (changed('main-action', { phase: d.phase, joined: d.joined, revealComplete: d.revealComplete, s: S.showResults })) renderMainAction();
  if (changed('main-list', { phase: d.phase, c: d.contestants, n: d.signupCount, v: d.myVoteFor, r: d.results, revealComplete: d.revealComplete, s: S.showResults })) renderMainList();
}

function renderMainAction() {
  const d = S.data;
  const t = L();
  const box = $('main-action');

  // Behåll det som redan skrivits i anmälningsformuläret vid språkbyte
  const prev = { name: $('join-name')?.value, motto: $('join-motto')?.value };
  box.replaceChildren();

  if (d.phase === 'signup' && !d.joined) {
    const nameInput = h('input', { type: 'text', id: 'join-name', name: 'name', maxlength: 40, required: true, autocomplete: 'name' });
    nameInput.value = prev.name ?? (me.name || '');
    const mottoInput = h('input', { type: 'text', id: 'join-motto', name: 'motto', maxlength: 80, placeholder: t.mottoPlaceholder });
    mottoInput.value = prev.motto ?? '';
    const submit = h('button', { type: 'submit', class: 'btn btn-big', text: t.joinBtn });
    const form = h('form', { class: 'form' },
      h('label', { for: 'join-name' }, t.yourName, nameInput),
      h('label', { for: 'join-motto' }, `${t.motto} `, h('span', { class: 'hint', text: t.optional }), mottoInput),
      submit,
    );
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const motto = mottoInput.value.trim();
      if (!name) { setStatus(L().errors.name_missing, true); return; }
      submit.disabled = true;
      setStatus(L().joining);
      try {
        await api('join', { name, motto });
        setStatus(L().joined);
        await refresh();
      } catch (err) {
        setStatus(friendlyError(err), true);
      } finally {
        submit.disabled = false;
      }
    });
    box.append(h('div', { class: 'box box-yellow' }, h('h2', { text: t.joinTitle }), h('p', { text: t.joinIntro }), form));
  } else if (d.phase === 'signup' && d.joined) {
    box.append(h('div', { class: 'box box-lime' },
      h('h2', { class: 'rainbow', text: t.joinedTitle }),
      h('p', { text: t.joinedText }),
      twoStep(t.leave, t.leaveArmed, async () => {
        try { await api('leave'); setStatus(L().left); await refresh(); }
        catch (err) { setStatus(friendlyError(err), true); }
      }, 'btn-ghost'),
    ));
  } else if (d.phase === 'voting') {
    box.append(h('div', { class: 'box box-yellow' }, h('h2', { text: t.voteTitle }), h('p', { text: t.voteText })));
  } else if (d.phase === 'closed') {
    box.append(h('div', { class: 'box box-white' }, h('h2', { text: t.closedTitle }), h('p', { text: t.closedText })));
  } else if (d.phase === 'reveal') {
    const children = [h('h2', { class: 'blink', text: t.lookScreen })];
    if (d.revealComplete) {
      const toggle = h('button', { type: 'button', class: 'btn', text: S.showResults ? t.hideResults : t.showResults });
      toggle.addEventListener('click', () => { S.showResults = !S.showResults; renderMain(); });
      children.push(toggle);
    }
    box.append(h('div', { class: 'box box-lime' }, ...children));
  }
}

function renderMainList() {
  const d = S.data;
  const t = L();
  const box = $('main-list');
  box.replaceChildren();

  if (d.phase === 'reveal') {
    if (d.revealComplete && S.showResults) {
      box.append(h('div', { class: 'box box-white' }, h('h2', { text: t.results }), resultsList(d.results)));
    }
    return;
  }
  if (d.phase === 'signup') {
    box.append(h('div', { class: 'box box-white' }, d.signupCount
      ? h('p', { class: 'big-counter' }, `${t.signedUpCount} `, h('span', { class: 'hit-counter', text: pad(d.signupCount) }))
      : h('p', { text: t.noneYetSignup })));
    return;
  }
  const list = d.contestants;
  if (list.length === 0) {
    box.append(h('div', { class: 'box box-white' }, h('p', { text: t.noContestants })));
    return;
  }
  if (d.phase === 'voting') {
    const ul = h('ul', { class: 'cards' });
    for (const c of list) {
      const selected = same(d.myVoteFor, c.id);
      const btn = h('button', {
        type: 'button', class: 'card', 'aria-pressed': selected ? 'true' : 'false', disabled: c.mine,
        'aria-label': c.mine ? t.youSelf(c.name) : t.voteFor(c.name),
      },
        sweaterBadge(c),
        h('span', { class: 'name', text: c.name }),
        c.motto ? h('span', { class: 'motto', text: `”${c.motto}”` }) : null,
        c.mine ? h('span', { class: 'tag', text: t.thisIsYouVote }) : null,
        selected ? h('span', { class: 'tag blink', text: t.yourVote }) : null,
      );
      btn.addEventListener('click', async () => {
        if (c.mine || selected) return;
        const before = d.myVoteFor;
        d.myVoteFor = c.id;
        renderMain();
        setStatus(L().voting);
        try {
          await api('vote', { contestantId: c.id });
          setStatus(L().voted(c.name));
          await refresh();
        } catch (err) {
          d.myVoteFor = before;
          S.keys['main-list'] = null;
          renderMain();
          setStatus(friendlyError(err), true);
        }
      });
      ul.append(h('li', {}, btn));
    }
    box.append(ul);
    return;
  }
  box.append(h('div', { class: 'box box-white' }, h('h2', { text: t.contestants(list.length) }), h('ul', { class: 'cards' }, list.map((c) => staticCard({
    ...c,
    voted: d.phase === 'closed' && same(d.myVoteFor, c.id),
  })))));
}

/* ---------- Storskärmen ---------- */
function renderQr(link) {
  const key = `${LANG}|${link}`;
  if (S.qrLink === key) return;
  S.qrLink = key;
  const el = $('qr');
  el.replaceChildren();
  if (!link) { el.append(h('p', { class: 'small', text: L().noLink })); return; }
  if (typeof window.qrcode !== 'function') { el.append(h('p', { text: link })); return; }
  const qr = window.qrcode(0, 'M');
  qr.addData(link);
  qr.make();
  el.innerHTML = qr.createSvgTag({ cellSize: 8, margin: 2, scalable: true });
}

function renderScreen() {
  const d = S.data;
  if (!d) return;
  const t = L();
  renderQr(d.link);
  $('screen-banner').textContent = t.phase[d.phase] || '';
  $('screen-banner').classList.toggle('blink', d.phase !== 'closed');
  if (d.phase !== 'reveal') S.revealShown = false;
  if (!changed('screen-body', { phase: d.phase, c: d.contestants, n: d.voteCount, s: d.signupCount, r: d.results, shown: S.revealShown })) return;
  const body = $('screen-body');
  body.replaceChildren();

  if (d.phase === 'reveal') {
    const start = h('button', { type: 'button', class: 'btn btn-big', text: S.revealShown ? t.again : t.startReveal });
    start.addEventListener('click', async () => {
      try {
        const reveal = await api('startReveal');
        S.data.revealStarted = reveal.revealStarted;
        S.data.results = reveal.results;
        S.keys['screen-body'] = null;
        renderScreen();
        await playReveal(reveal.results);
      } catch (err) {
        setStatus(friendlyError(err), true);
      }
    });
    if (!S.revealShown) {
      // Inga resultat syns förrän showen har spelats upp
      body.append(h('div', { class: 'box box-yellow' }, h('h2', { class: 'blink', text: t.revealTeaser }), start));
      return;
    }
    body.append(h('div', { class: 'box box-yellow' }, start), h('div', { class: 'box box-white' }, h('h2', { text: t.results }), resultsList(d.results)));
    return;
  }
  if (d.phase === 'signup') {
    body.append(h('div', { class: 'box box-white' },
      h('p', { class: 'big-counter' }, `${t.signedUpCount} `, h('span', { class: 'hit-counter', text: pad(d.signupCount) })),
      d.signupCount ? null : h('p', { text: t.waiting }),
    ));
    return;
  }
  body.append(h('p', { class: 'big-counter' }, `${t.votesIn} `, h('span', { class: 'hit-counter', text: pad(d.voteCount) })));
  if (d.phase === 'closed') {
    body.append(h('div', { class: 'box box-white' }, h('h2', { class: 'blink', text: t.closedScreen })));
  }
  const list = d.contestants;
  body.append(h('div', { class: 'box box-white' },
    h('h2', { text: t.contestants(list.length) }),
    list.length ? h('ul', { class: 'cards' }, list.map((c) => staticCard({ ...c, mine: false }))) : h('p', { text: t.noContestants }),
  ));
}

/* ---------- Avslöjandet ---------- */
async function playReveal(results) {
  const run = ++S.revealRun;
  const alive = () => run === S.revealRun;
  const t = L();
  const stage = $('reveal-stage');
  const groups = [];
  for (const r of (results || []).filter((x) => x.votes > 0)) {
    const g = groups.find((x) => x.votes === r.votes);
    if (g) g.people.push(r); else groups.push({ votes: r.votes, people: [r] });
  }
  const controls = () => {
    const close = h('button', { type: 'button', class: 'btn', text: t.close });
    close.addEventListener('click', async () => {
      close.disabled = true;
      try {
        const completed = await api('finishReveal');
        if (!alive()) return;
        S.data.revealComplete = completed.revealComplete;
        S.data.results = completed.results;
        S.data.visitorCounter = completed.visitorCounter;
        S.revealRun++;
        stage.hidden = true;
        S.keys['screen-body'] = null;
        renderScreen();
      } catch (err) {
        close.disabled = false;
        if (alive()) setStatus(friendlyError(err), true);
      }
    });
    const again = h('button', { type: 'button', class: 'btn btn-ghost', text: t.again });
    again.addEventListener('click', () => playReveal(results));
    return h('div', { class: 'controls' }, again, close);
  };
  const show = (...nodes) => stage.replaceChildren(...nodes, controls());
  const people = (g, big) => h('div', { class: 'names' }, g.people.map((p) => h('div', { class: 'pop' },
    h('div', { class: big ? 'winner-name rainbow' : 'kicker', text: p.name }),
    p.motto ? h('div', { text: `”${p.motto}”` }) : null,
  )));

  stage.hidden = false;
  if (groups.length === 0) { S.revealShown = true; show(h('div', { class: 'kicker', text: t.noVotes })); return; }

  show(h('div', { class: 'kicker pop', text: '🎄 Ugly Christmas Sweater Awards 2026 🎄' }));
  await sleep(2500); if (!alive()) return;
  for (const [idx, label] of [[2, t.third], [1, t.second]]) {
    if (!groups[idx]) continue;
    show(h('div', {}, h('div', { class: 'kicker pop', text: label }), people(groups[idx], false), h('div', { class: 'winner-votes', text: t.votesN(groups[idx].votes) })));
    await sleep(5000); if (!alive()) return;
  }
  show(h('div', { class: 'kicker drumroll', text: t.drumroll }));
  await sleep(4000); if (!alive()) return;

  const winners = groups[0];
  S.revealShown = true;
  show(h('div', {},
    h('div', { class: 'kicker pop', text: winners.people.length > 1 ? t.sharedWin : t.winner }),
    people(winners, true),
    h('div', { class: 'winner-votes blink', text: t.votesN(winners.votes) }),
  ));
  if (typeof window.confetti === 'function' && !reducedMotion) {
    const colors = ['#e10600', '#00a62e', '#ffff00', '#ffffff', '#ff00ff'];
    for (let i = 0; i < 8 && alive(); i++) {
      window.confetti({ particleCount: 140, spread: 110, startVelocity: 55, origin: { x: Math.random(), y: 0.4 + Math.random() * 0.3 }, colors, zIndex: 60 });
      await sleep(700);
    }
  }
}

/* ---------- Spelledaren ---------- */
const PHASE_ORDER = ['signup', 'voting', 'closed', 'reveal'];

function renderAdmin() {
  const loggedIn = !!S.admin;
  $('admin-login').hidden = loggedIn;
  $('admin-panel').hidden = !loggedIn;
  if (!loggedIn) return;
  const a = S.admin;
  const t = L();
  if (document.activeElement && document.activeElement.id === 'admin-link') return;
  if (!changed('admin', a)) return;

  const panel = $('admin-panel');
  panel.replaceChildren();

  const phases = h('div', { class: 'admin-phases' }, PHASE_ORDER.map((p) => {
    const [label, armed] = t.phaseBtns[p];
    const btn = twoStep(label, armed, async () => {
      try { await api('setPhase', { pin: S.pin, phase: p }); setStatus(L().phaseChanged(L().phaseName[p])); await refresh(); }
      catch (err) { setStatus(friendlyError(err), true); }
    });
    if (a.phase === p) btn.setAttribute('aria-current', 'true');
    return btn;
  }));

  const linkInput = h('input', { type: 'url', id: 'admin-link', placeholder: 'https://…', value: a.link || '' });
  const linkForm = h('form', { class: 'row' }, linkInput, h('button', { type: 'submit', class: 'btn', text: t.saveLink }));
  linkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { await api('setLink', { pin: S.pin, link: linkInput.value }); setStatus(L().linkSaved); linkInput.blur(); await refresh(); }
    catch (err) { setStatus(friendlyError(err), true); }
  });

  const table = h('table', { class: 'admin-table', 'aria-label': t.tableLabel },
    h('thead', {}, h('tr', {}, h('th', { scope: 'col', text: t.colName }), h('th', { scope: 'col', text: t.colMotto }), h('th', { scope: 'col', text: t.colVotes }), h('th', { scope: 'col', text: '' }))),
    h('tbody', {}, a.results.map((r) => h('tr', {},
      h('td', { text: r.name }), h('td', { text: r.motto }), h('td', { text: String(r.votes) }),
      h('td', {}, twoStep(t.remove, t.removeArmed, async () => {
        try { await api('removeContestant', { pin: S.pin, contestantId: r.id }); setStatus(L().removed(r.name)); await refresh(); }
        catch (err) { setStatus(friendlyError(err), true); }
      }, 'btn-ghost')),
    ))),
  );

  const addTest = h('button', { type: 'button', class: 'btn btn-ghost', text: t.addTest });
  addTest.addEventListener('click', async () => {
    try { await api('addTestContestant', { pin: S.pin }); setStatus(L().addTestDone); await refresh(); }
    catch (err) { setStatus(friendlyError(err), true); }
  });

  const logout = h('button', { type: 'button', class: 'btn btn-ghost', text: t.logout });
  logout.addEventListener('click', () => { S.pin = ''; S.admin = null; localStorage.removeItem('ugly-pin'); S.keys.admin = null; renderAdmin(); });

  panel.append(
    h('p', {}, h('strong', { text: t.currentPhase }), t.phaseName[a.phase]),
    h('p', { class: 'small', text: t.twoClicks }),
    phases,
    h('h3', { text: t.linkTitle }),
    h('p', { class: 'small', text: t.linkHint }),
    linkForm,
    h('h3', { text: t.stats(a.results.length, a.voteCount) }),
    a.results.length ? h('div', { style: 'overflow-x:auto' }, table) : h('p', { text: t.noSignups }),
    h('p', {}, addTest),
    h('p', {}, h('button', { type: 'button', class: 'btn', text: t.openScreen, onclick: () => goTo('screen') }), ' ', logout),
  );
}

$('pin-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pin = $('pin').value.trim();
  try {
    const res = await api('checkPin', { pin });
    if (!res || !res.ok) { setStatus(L().errors.bad_pin, true); return; }
    S.pin = pin;
    localStorage.setItem('ugly-pin', pin);
    $('pin').value = '';
    setStatus(L().loggedIn);
    await refresh();
  } catch (err) { setStatus(friendlyError(err), true); }
});

/* ---------- Routing & polling ---------- */
function routeFromHash() {
  const hash = (location.hash || '').replace('#', '');
  return hash === 'storskarm' ? 'screen' : hash === 'spelledare' ? 'admin' : 'main';
}

function goTo(route) {
  if (route === S.route) return;
  S.route = route;
  applyRoute();
  window.scrollTo(0, 0);
}

function applyRoute() {
  document.querySelectorAll('.nav-btn').forEach((b) => {
    if (b.dataset.route === S.route) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  $('view-main').hidden = S.route !== 'main';
  $('view-screen').hidden = S.route !== 'screen';
  $('view-admin').hidden = S.route !== 'admin';
  document.body.classList.toggle('is-screen', S.route === 'screen');
  S.keys = {};
  S.qrLink = null;
  if (S.route === 'admin' && S.pin && !S.admin) refresh();
  render();
}

function render() {
  if (S.route === 'main') renderMain();
  else if (S.route === 'screen') renderScreen();
  else renderAdmin();
}

let loading = false;
let lastFetchFailed = false;
async function refresh() {
  if (loading) return;
  loading = true;
  try {
    S.data = await api('state');
    if (S.pin && S.route === 'admin') {
      try { S.admin = await api('adminState', { pin: S.pin }); }
      catch (err) {
        if (errCode(err) === 'bad_pin') { S.pin = ''; S.admin = null; localStorage.removeItem('ugly-pin'); }
        else throw err;
      }
    }
    $('hit-counter').textContent = pad(S.data.visitorCounter || 0);
    if (statusIsLoading || lastFetchFailed) setStatus('');
    lastFetchFailed = false;
    render();
  } catch (err) {
    lastFetchFailed = true;
    setStatus(L().fetchFailed(friendlyError(err)), true);
  } finally {
    loading = false;
  }
}

/* ---------- Snö ---------- */
function letItSnow() {
  if (reducedMotion) return;
  const flakes = ['❄', '❅', '❆', '✻', '*', '⭐'];
  const snow = $('snow');
  for (let i = 0; i < 28; i++) {
    const s = h('span', { text: flakes[i % flakes.length] });
    s.style.left = `${Math.random() * 100}%`;
    s.style.fontSize = `${0.8 + Math.random() * 1.6}rem`;
    s.style.animationDuration = `${7 + Math.random() * 10}s`;
    s.style.animationDelay = `${-Math.random() * 15}s`;
    snow.append(s);
  }
}

if (reducedMotion) document.querySelectorAll('marquee').forEach((m) => m.stop && m.stop());
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !$('reveal-stage').hidden) { S.revealRun++; $('reveal-stage').hidden = true; if (S.route === 'screen') renderScreen(); }
});
document.querySelectorAll('.nav-btn').forEach((b) => b.addEventListener('click', () => goTo(b.dataset.route)));

statusIsLoading = true;
S.route = routeFromHash();
applyStaticTexts();
letItSnow();
applyRoute();
refresh();
setInterval(() => { if (!document.hidden) refresh(); }, 4000);
