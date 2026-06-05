# Reputo

Reputo is a landing page and MVP dashboard for collecting more Google reviews.

## Environment variables

Create `.env.local` and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=demo@yourdomain.com
DEMO_REQUEST_TO_EMAIL=eelispuro@gmail.com
```

`RESEND_FROM_EMAIL` must be a sender address verified in Resend. Demo requests are sent to `DEMO_REQUEST_TO_EMAIL`, which defaults to `eelispuro@gmail.com`.

## Development

```bash
npm install
npm run dev
```

## Supabase schema

The MVP SQL migration lives at [supabase/migrations/20260605_reputo_mvp.sql](/Users/eeputti/developer/reputo-landing-page/supabase/migrations/20260605_reputo_mvp.sql).

Apply it with the Supabase SQL editor or with the CLI:

```bash
supabase db push
```
