# CLAUDE.md

Portfolio site for Thiago Bueno Garcia — Astro, TypeScript strict, Tailwind v4. The goal of this
site is to get Thiago hired as a software engineer; every change should serve that. Full rationale
lives in `docs/architecture.md` — read it before restructuring anything.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, `astro dev logs`.

## Commands (definition of done)

Before considering any change complete:

```bash
npm run typecheck   # astro check
npm run lint        # eslint .
npm run test        # vitest run
npm run build       # astro build — must succeed with no network access
```

`npm run build` must succeed even if `api.github.com` is unreachable — the GitHub feature falls
back to a committed snapshot (`src/features/github/fallback.json`). If a change breaks that, it's a
regression, not an edge case.

## Architecture rules (see docs/architecture.md for why)

- Astro components by default. React/client hydration only when interactivity genuinely needs it —
  there is currently none; all interactivity (theme toggle, mobile nav, repo filter,
  copy-to-clipboard) is vanilla `<script is:inline>`. Don't add a UI framework to do what CSS or
  ten lines of vanilla JS already does.
- Content lives in three places and they don't mix: authored Markdown (`src/content/`), static
  typed data (`src/data/`), live GitHub data (`src/features/github/`, fetched at build time only —
  never from the browser).
- `src/features/` holds only things with real logic (fetch/transform/curate/cache, or form
  validation). Don't create a feature folder for static content.
- TypeScript strict (`astro/tsconfigs/strictest`). No `any` without a comment explaining why.
- Do not add: a database, GraphQL, a CMS, event sourcing, CQRS, microservices, backend services, or
  a state-management library. This site is static content plus one build-time API fetch.

## How to add a new project case study

1. Add a Markdown file to `src/content/projects/`, matching the `projects` schema in
   `src/content.config.ts` (`title`, `summary`, `status`, `role`, `stack`, `repoUrl`, `order`, and
   optionally `liveUrl`/`system`/`ogImage`).
2. `status` must be honest: `'complete' | 'in-progress' | 'early-stage' | 'archived'`. Never
   overstate a repo's actual state — check its real commit history first.
3. It's picked up automatically by `/projects` and gets a detail page at `/projects/<filename>`. If
   it belongs to a multi-repo system (like `falar`), set `system` to group it and update
   `src/pages/projects/falar-system.astro` (or the equivalent overview page) to include it.
4. Don't hand-add it to the Tier 2 GitHub grid — that's live data, curated automatically in
   `src/features/github/filter.ts`. Add it to `PINNED_REPO_NAMES` there instead, so it's excluded
   from the grid (it now has its own case study) and included by `getPinnedRepos()`.

## What should not be changed without a real reason

- The three-content-source separation (section above / `docs/architecture.md`).
- The GitHub fallback behavior — a build must never fail because `api.github.com` is down.
- The honesty rules: no fabricated employment, credentials, metrics, or project status.
- The system font stack — see `docs/architecture.md` for why this isn't a self-hosted webfont.

## Known gaps (see README for the current list)

`profile.email` is `null` until Thiago supplies a real address (`src/data/profile.ts`) — the
contact page renders a placeholder instead of a broken `mailto:` link until then. Don't invent one.
