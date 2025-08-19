# AGENTS.md — NullaData (no servizi a pagamento)

## Dev stack

- Next.js 14 (App Router, TS) full-stack con API routes
- DB Postgres + Prisma
- Queue Redis + BullMQ
- Ricerca locale Meilisearch
- Email via SMTP (MailHog in dev)
- PDF via Puppeteer o PDFKit

## Docker (dev)

docker compose up -d

- Postgres:5432 | user: postgres / pass: postgres
- Redis:6379
- Meili:7700 | MEILI_MASTER_KEY=dev_key

## .env.example

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nulladata
REDIS_URL=redis://localhost:6379
MEILI_HOST=http://localhost:7700
MEILI_API_KEY=dev_key

SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=

NEXTAUTH_SECRET=changeme
NEXTAUTH_URL=http://localhost:3000
APP_BASE_URL=http://localhost:3000

## Comandi

pnpm i
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev

## Regole implementative

- NESSUN servizio esterno a pagamento.
- Rispettare robots.txt e ToS dei siti scansionati.
- Rate-limit e backoff sulle scansioni.
- Test unit per normalizzazione discovery e PDF generator.
- Richieste DSAR: verifica consensi e stato KYC prima dell'invio; tracciare ogni azione in `AuditLog`.
- Ogni task → PR dedicata con README aggiornato e CI verde.
