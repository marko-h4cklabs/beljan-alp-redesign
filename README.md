# Vrtna oaza Beljan — website rebuild

Rebuild of [beljan-alp.com](https://www.beljan-alp.com/) as a fast, fully server-rendered
Next.js site, replacing the original client-side-only SPA. Background and decisions
behind this rebuild live in `_inventory/SITE_MAP.md` (content/media inventory of the old
site) and the approved Phase 1 plan.

## Stack

Next.js 16 (App Router) + TypeScript, Tailwind CSS v4, `motion` for animation, deployed
on Vercel. See the Phase 1 plan for the full rationale.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at http://localhost:3000.

## Build / production

```bash
npm run build
npm run start
```

`npm run build` should show every route as `○ (Static)` — that's the main signal this
site is actually crawlable server-rendered HTML, not a client-only shell like the old
site was.

## Lint / format

```bash
npm run lint
npm run format
```

## Deploy

Deployed on Vercel, connected to this repo's `main` branch — pushing to `main` deploys
automatically.

## Editing copy

All page copy lives in `/content/*.ts`, one file per route (plus `business.ts` for
shared facts like phone/address/OIB used in the footer and structured data).
**Never hardcode copy inside a component** — edit the matching content file instead.
Component files should only contain layout/markup, never literal Croatian text.

## Swapping media

Every image/video is listed in `MEDIA_GUIDE.md` at the repo root, mapped to the exact
page/section it belongs to, with its target format and current status (placeholder vs.
final). To replace a photo or video with a better one: **replace the file at the same
path under `/public`, keep the exact same filename**, commit, push. Vercel redeploys
automatically and `next/image` re-optimizes the new file — no code changes needed.

## Next.js 16 gotchas

This project was started on Next.js 16, which changed a few things relative to what's
commonly assumed about Next.js (including in most LLM training data). Worth knowing
before touching routing, images, or caching code:

- **Turbopack is the default** bundler for both `next dev` and `next build` now (no
  `--turbopack` flag needed). A custom Webpack config makes `next build` fail unless
  you explicitly pass `--webpack`.
- **`params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are async-only**
  — the Next.js 15 temporary synchronous compatibility shim is gone. Also applies to
  the props passed into `opengraph-image`/`twitter-image`/`icon`/`apple-icon`
  generator functions and to `sitemap`'s `id` param when using `generateSitemaps`.
- **`next lint` is removed.** Lint directly with the ESLint CLI (`npm run lint`, which
  just runs `eslint .`). `next build` no longer runs linting as a side effect.
- **ESLint flat config only** — `eslint-config-next`'s main export is already a flat
  config array; don't wrap it in `FlatCompat` (that actually breaks with ESLint 9 — see
  `eslint.config.mjs` here for the minimal working setup).
- **Next no longer overrides `scroll-behavior: smooth` during route navigations.**
  Previously Next force-set `scroll-behavior: auto` during a client-side route change
  (to avoid a slow animated "jump to top") and restored your value after. Now it
  doesn't touch it at all. We rely on this intentionally for the cross-route anchor-nav
  behavior (see `components/layout/ScrollToAnchor.tsx` and `NavLink.tsx`) — if this
  ever needs the old "snap during navigation" behavior back, add
  `data-scroll-behavior="smooth"` to the `<html>` element instead of relying on Next to
  manage it.
- **`next.config.ts`'s Turbopack options moved out of `experimental`** — use a
  top-level `turbopack: {...}` key (see `next.config.ts`), not
  `experimental.turbopack`.
- **`images.qualities` defaults to `[75]` only now** (previously any quality was
  allowed). If a component ever passes a custom `quality` prop to `next/image`, add
  that value to `images.qualities` in `next.config.ts` or it'll silently be coerced to
  the nearest allowed value.
- Full details: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`
  (bundled with whatever Next.js version is actually installed — more reliable than
  training data for anything routing/caching/image-related).
