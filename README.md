# NullaData Monorepo

Monorepo pnpm con una singola app Next.js 14 e packages condivisi.

## Struttura

- `apps/web` – app Next.js (App Router, TypeScript, Tailwind, shadcn/ui)
- `packages/ui` – componenti React condivisi
- `packages/config` – helper di configurazione/env e util di normalizzazione

## Requisiti

- Node.js 18+
- pnpm
- Docker (per servizi locali)

## Docker

Eseguire i servizi di sviluppo:

```bash
docker compose up -d
```

Servizi esposti:

- Postgres:5432 (user `postgres`, pass `postgres`)
- Redis:6379
- Meilisearch:7700 (`MEILI_MASTER_KEY=dev_key`)
- MailHog UI:8025

## Setup

```bash
pnpm i
pnpm prisma generate
pnpm prisma migrate dev
pnpm dev
```

## Script

- `pnpm dev` – avvia `apps/web`
- `pnpm build` – build produzione dell'app web
- `pnpm test` – unit test con Vitest

## Testing

Le unit test coprono la funzione di normalizzazione e il generatore PDF (PDFKit).

## PDF

Il generatore di PDF utilizza [PDFKit](https://pdfkit.org/).

## CI

GitHub Actions esegue `pnpm lint`, `pnpm typecheck` e `pnpm test` su ogni PR.

## Licenza

MIT
