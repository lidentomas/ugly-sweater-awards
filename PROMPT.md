# Uppdrag: Flytta "Ugly Sweater Awards 2026" från Auctionet Pages till Vercel

Du hjälper mig, Tomas, att flytta en färdig röstningssida för vår julfest från Auctionets interna plattform Pages till en egen sida på Vercel. Koden ska ligga i ett GitHub-repo.

**Viktigt om mig:** Jag kan inte skriva eller läsa kod själv. Gör allt arbete i koden åt mig och kör kommandona själv där du kan. När jag behöver göra något själv, till exempel klicka i Vercel, GitHub eller Google Cloud, ska du ge mig steg-för-steg-instruktioner på enkel svenska. Svara mig på svenska. Fråga hellre en gång för mycket än att gissa när ett val påverkar hur sidan fungerar för användarna.

## 1. Utgångsläget

Mappen `pages-original/` innehåller den fungerande Pages-versionen:

| Fil | Innehåll |
|---|---|
| `index.html` | Sidans HTML. Laddar två bibliotek från Pages-specifika sökvägar (`/lib/...`). |
| `styles.css` | All styling. Medvetet ful 2005-stil (Geocities). Ska behållas exakt som den är. |
| `app.js` | All klientlogik, inklusive språkstöd (svenska/engelska) och de tre vyerna. |
| `server.js` | All serverlogik i Pages-format: ett objekt `APP` med "actions". |

Läs alla fyra filerna noggrant innan du börjar. Design, texter och beteende ska bli **identiska** med originalet. Det enda som ska ändras är det som är Pages-specifikt.

## 2. Vad sidan gör

En omröstning om fulaste jultröja på Auctionets julfest. Gästerna skannar en QR-kod med mobilen och hamnar på sidan.

**Tre vyer**, som man växlar mellan med knappar längst ner på sidan (inte via adressfältet):
1. **Rösta** (standardvyn, för mobilen).
2. **Storskärm** (för projektorn): en stor QR-kod, en räknare och ett animerat avslöjande av vinnaren med konfetti.
3. **Spelledare**: en adminpanel som skyddas av en kod.

**Fyra faser**, som bara spelledaren kan byta mellan. Varje byte kräver två klick.
1. `signup`, anmälan öppen. Man anmäler sig med namn och en slogan om man vill. Varken deltagarna eller storskärmen får se *vilka* som har anmält sig, bara *hur många*. Servern får inte skicka ut namnen under den här fasen, inte heller i API-svaret. Den enda som ska se namnen är spelledaren. Man kan hoppa av under den här fasen.
2. `voting`, anmälan stängd och röstning öppen. Nu syns alla tävlande. Varje person har **en** röst och kan ändra den tills röstningen stänger. **Ingen får rösta på sig själv.** Det ska kontrolleras på servern, inte bara i gränssnittet.
3. `closed`, röstningen stängd. Storskärmen visar "snart avslöjas vinnaren".
4. `reveal`, vinnaren avslöjas. Storskärmen visar **ingen** resultatlista förrän showen har spelats upp: först tredje plats, sedan andra plats, trumvirvel, vinnaren och konfetti. Lika antal röster ger delad placering. Showen startar automatiskt om storskärmen är öppen när fasen byts. På mobilen står "Titta på storskärmen!" och en knapp för att visa resultatet. Röstfördelningen får aldrig skickas ut innan den här fasen, utom till spelledaren.

**Övrigt som ska fungera precis som i originalet:**
- Språkväljare för svenska och engelska. Valet sparas i `localStorage`. Om inget val är sparat väljs språk utifrån webbläsarens språk.
- Spelledaren ser hela ställningen hela tiden och kan:
  - ta bort tävlande (deras röster tas bort samtidigt),
  - lägga till "testdeltagare" som inte räknas som någons egen anmälan,
  - spara sidans publika länk, som storskärmen gör om till en QR-kod.
- Klienten hämtar läget var fjärde sekund och uppdaterar sig själv.
- Felkoder från servern (`bad_pin`, `signup_closed`, `self_vote` med flera) översätts i klienten. Behåll de koderna.
- Ingen bilduppladdning. Den togs bort med flit.

## 3. Pages-specifika saker som måste ersättas

1. **`window.pages.call(action, args)`**, klientens anrop till servern. Ersätt med `fetch` mot ditt nya API. Behåll gärna en liten `api(action, args)`-funktion så att resten av `app.js` kan vara orörd.
2. **`window.pages.currentUser()`** gav inloggad användare (`id`, `name`, `locale`). Den används för att förifylla namnet och för att avgöra vem som är vem. Ersätt enligt punkt 4 nedan.
3. **Serverns `actor`.** I Pages gav plattformen varje anrop en säker identitet, och varje sparad rad fick automatiskt fältet `author`. All logik för "en röst per person", "inte rösta på sig själv" och "redan anmäld" bygger på det. Du måste återskapa en **säker** identitet på servern. Litar man på ett id som klienten skickar kan vem som helst fuska.
4. **Data.** Pages hade inbyggd delad lagring med samlingarna `state`, `contestants` och `votes`. Ersätt med en databas som fungerar med Vercel. Mitt förslag är Upstash Redis via Vercel Marketplace. Se till att röster och anmälningar inte kan bli dubbla om två anrop kommer samtidigt.
5. **Spelledarkoden** är hårdkodad i `server.js`. Flytta den till en miljövariabel, `ADMIN_PIN`. Den får aldrig hamna i klientkoden eller i Git. Välj en ny kod, eftersom den gamla har legat i Pages.
6. **Biblioteken** laddas från Pages-sökvägar:
   - `/lib/canvas-confetti@1.9.4/confetti.browser.js`
   - `/lib/qrcode-generator@2.0.4/qrcode.js`

   Byt till exakt samma versioner från ett CDN (till exempel jsDelivr), eller installera dem via pakethanteraren. Koden använder dem som globalerna `confetti` och `qrcode`.

## 4. Inloggning: fråga mig innan du bygger

I Pages var alla inloggade med sitt Auctionet-konto. På Vercel finns ingen sådan inloggning. Presentera alternativen nedan med för- och nackdelar på enkel svenska och låt mig välja innan du skriver koden:

- **A. Google-inloggning som bara släpper in @auctionet.com-adresser.** Ger säker identitet och en röst per person, och namnet kan förifyllas. Kräver att vi skapar en OAuth-klient i Google Cloud. Guida mig i så fall steg för steg.
- **B. Ingen inloggning.** Varje mobil får ett slumpat, signerat id i en httpOnly-cookie. Det är enkelt och snabbt för gästerna, men den som verkligen vill fuska kan rösta flera gånger med flera webbläsare. För en julfest kan det vara acceptabelt.

Har du ett bättre alternativ får du gärna föreslå det.

## 5. Teknik och arbetssätt

- Välj en enkel lösning. Vanliga statiska filer plus serverfunktioner i `/api` räcker gott. Ett stort ramverk behövs inte. Motivera ditt val kort.
- Lägg serverns spellogik i rena funktioner som går att testa utan databas, ungefär som `run()` i `server.js` är byggt i dag.
- Bygg in god kodhygien från första commit:
  - Git-repo med `.gitignore`. `.env*` ska ignoreras.
  - pnpm som pakethanterare.
  - Tester med Vitest för spellogiken. Täck minst: man kan inte rösta på sig själv, man kan byta röst, man kan inte anmäla sig två gånger, anmälan och röstning är stängda i fel fas, fel spelledarkod nekas, namn döljs under anmälan, resultat döljs före avslöjandet, och testdeltagare går att rösta på.
  - En pre-commit-hook (Husky) som kör linter, `pnpm audit` och testerna.
- Skriv en kort `README.md` på svenska: vad sidan är, hur man kör den lokalt och vilka miljövariabler som behövs.

## 6. Publicering

När allt fungerar lokalt, guida mig steg för steg genom att:
1. skapa ett GitHub-repo och pusha koden,
2. importera repot i Vercel,
3. koppla på databasen och lägga in miljövariablerna (`ADMIN_PIN` och de som inloggningen kräver),
4. testa den publicerade sidan,
5. lägga in sidans adress i spelledarpanelen så att QR-koden visas på storskärmen.

## 7. Klart när

- [ ] Sidan ser exakt ut som originalet, på både mobil och storskärm.
- [ ] Alla fyra faser fungerar, och storskärmen uppdateras av sig själv.
- [ ] Det går inte att rösta på sig själv, inte ens genom att anropa API:et direkt.
- [ ] Namn och röstresultat läcker inte ut i API-svaren innan de ska synas.
- [ ] Spelledarkoden finns bara i en miljövariabel.
- [ ] Testerna är gröna och pre-commit-hooken körs.
- [ ] Sidan ligger publicerad på Vercel.

Börja med att läsa filerna. Sammanfatta sedan kort för mig hur du tänker lägga upp det, och ställ frågan om inloggning.
