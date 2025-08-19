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

## Setup

```bash
pnpm i
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

## Script

- `pnpm dev` – avvia `apps/web`
- `pnpm build` – build produzione dell'app web
- `pnpm test` – unit test con Vitest

## Testing

Le unit test coprono la funzione di normalizzazione, il generatore PDF e i componenti UI di base.

## DSAR

Il generatore di richieste privacy è completamente locale e produce PDF tramite `pdfkit`.
Le template Markdown si trovano in `templates/` e sono renderizzate con Handlebars.

Per inviare le richieste via email occorre configurare un server SMTP (in sviluppo è previsto [MailHog](https://github.com/mailhog/MailHog)).

```bash
SMTP_HOST=localhost
SMTP_PORT=1025
```

Le API principali sono:

- `POST /api/requests/:caseId/create` – crea bozza e registra audit log
- `POST /api/requests/:id/render` – genera PDF della richiesta
- `POST /api/requests/:id/send` – accoda l'invio tramite BullMQ

## Motore di discovery

La scansione delle tracce digitali utilizza `got` e `cheerio` con rispetto di `robots.txt` e rate-limit.

- Query generate da `ClientProfile` e pattern configurabili (`apps/web/lib/discovery.ts`).
- I risultati sono normalizzati e deduplicati prima di essere salvati in `ScanFinding` con severità basata sul dominio.
- Il job periodico viene schedulato tramite BullMQ: `enqueueDailyScans` in `apps/web/jobs/discovery.ts` aggiunge un job ogni 24h per i casi in stato `monitoring`.

Per avviare manualmente una scansione:

```bash
pnpm tsx apps/web/jobs/discovery.ts
```

## Personalizzare la landing

- I testi e le sezioni della pagina marketing si trovano in `apps/web/app/(marketing)/page.tsx`.
- La palette del tema scuro è definita in `packages/config/theme.css`.
- I font sono configurati in `apps/web/app/layout.tsx` tramite `next/font`.
- Le animazioni rispettano `prefers-reduced-motion`; per disattivarle forzare questa preferenza o adattare l'helper in `apps/web/lib/a11y.ts`.

## PDF

Il generatore di PDF utilizza [PDFKit](https://pdfkit.org/).

## CI

GitHub Actions esegue `pnpm lint`, `pnpm typecheck` e `pnpm test` su ogni PR.

## Licenza

MIT
