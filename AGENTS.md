# AGENTS.md

Astro Starlight docs site for runrunapi (all content in Spanish). Static output; no CI, no tests, no linter — `astro check` is the only verification step.

## Commands (Bun)

- `bun install`
- `bun run dev` / `bun run build` — both first run `scripts/fetch-spec.ts`, then Astro. Use these instead of bare `astro dev`/`astro build`, otherwise the API reference is served a stale spec.
- `bun run check-types` — runs `astro check`
- `bun run scripts/fetch-spec.ts` — refresh only the OpenAPI snapshot

## Env

`.env` is required (copy `.env.example`): `PORT`, `APPWEB_URL`, `APPAPI_URL`. `src/constants.ts` is the single reader and deliberately has no fallbacks — a missing var fails its consumer. `dotenv/config` covers Astro; Bun auto-loads `.env` in scripts.

## Generated file

`public/openapi.json` is downloaded from `${APPAPI_URL}/openapi/json` at the start of every dev/build and is gitignored. If the API is unreachable it warns and reuses the existing snapshot; the build only fails when neither is available. `fetch-spec.ts` also injects `x-scalar-links`. Never edit the JSON — change `scripts/fetch-spec.ts` instead.

## Content & navigation

- Pages live in `src/content/docs/**` (`.md`/`.mdx`), written in Spanish — keep new content and code comments in Spanish.
- The sidebar in `astro.config.mjs` is hand-maintained: a new page without a matching entry is unreachable from nav.
- `src/pages/reference.astro` renders Scalar at `/reference` from the same-origin `/openapi.json` (avoids CORS).
- The `lucode-starlight` plugin provides the top nav, footer, and `ExtendDocsSchema` frontmatter extensions used in content (e.g. `hero`, `ContainerSection`).

## Quirks

- Image service is `passthroughImageService` (no native sharp). Only the SVG hero exists today; install sharp before adding raster images.
- `src/styles/global.css` bridges Scalar's CSS variables to Starlight tokens — Scalar ignores `data-theme`, so theme tweaks for the reference page go there.
- tsconfig extends `astro/tsconfigs/strict`.
