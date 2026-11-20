# Ugly Sweater Awards 2026

En enkel röstningssida för Auctionets julfest. Gränssnittet och den medvetet gamla
2005-designen kommer från originalversionen i `pages-original/`.

## Kör lokalt

1. Installera pnpm och beroenden:

   ```sh
   corepack pnpm install
   ```

2. Kopiera `.env.example` till `.env.local` och fyll i:

   - `ADMIN_PIN`: den nya privata spelledarkoden.
   - `IDENTITY_COOKIE_SECRET`: en lång slumpad hemlighet.

   Lokalt kan programmet använda en intern minnesdatabas. För delad driftsdata mellan
   besökare och omstarter krävs Upstash Redis.

3. Starta Vercel lokalt:

   ```sh
   corepack pnpm dev
   ```

## Miljövariabler

- `ADMIN_PIN`: obligatorisk spelledarkod på servern.
- `IDENTITY_COOKIE_SECRET`: obligatorisk signeringsnyckel för identitetscookien.
- `UPSTASH_REDIS_REST_URL` eller `KV_REST_API_URL`: Upstash Redis-URL.
- `UPSTASH_REDIS_REST_TOKEN` eller `KV_REST_API_TOKEN`: Upstash Redis-token.

`.env*` ignoreras av Git. Lägg aldrig den riktiga `ADMIN_PIN` i källkod eller i `.env.example`.

## Tester och kvalitet

```sh
corepack pnpm test
corepack pnpm lint
```

Husky-kroken kör linter, pnpm audit och testerna före en commit.
