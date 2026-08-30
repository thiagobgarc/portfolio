# Architecture

## Why Astro over Next.js

This site is almost entirely static content: a hero, project write-ups, a skills list, a repo
grid refreshed at build time. None of that needs a client-side router, server components, or a
JS runtime in the browser to render. Astro ships zero JavaScript by default and only hydrates the
handful of interactive islands that actually need it (mobile nav, repo filter, copy-to-clipboard)
— all as small vanilla `<script>` tags, not framework runtime. Next.js is the
right tool when an app has real client-side interactivity and routing state; a portfolio does not,
and reaching for it here would mean shipping a bundler and hydration story this site has no use
for. Choosing the simpler tool that fits the actual requirement is the same judgment call this
site's own copy argues for.

## Project structure

```text
src/
├── components/
│   ├── ui/         Small, reusable, presentation-only (Button, Card, Tag, ...)
│   ├── layout/      Header, Footer, nav — one per page, not reused within a page
│   └── sections/    Homepage/page sections composed from ui/ components + data
├── layouts/         BaseLayout (every page), ProjectLayout (case studies)
├── pages/           File-based routes
├── content/         Authored Markdown (projects, writing) + content.config.ts schema
├── data/            Static typed profile/skills/experience/nav data
├── features/
│   ├── github/      Build-time GitHub fetch, transform, curation, fallback
│   └── contact/     Contact form validation (isolated so a form service can be wired in later)
├── lib/             Cross-cutting helpers: seo.ts, utils.ts
└── styles/          global.css — Tailwind v4 entry point + design tokens
```

A folder exists because it holds something reused, something with real logic, or something that
would otherwise be duplicated across pages — not for architectural symmetry. Most of this site is
static markup and does not need a `feature/` boundary; only the GitHub integration has enough
moving parts (fetch, transform, curation, caching, fallback) to earn one.

## The three content sources

1. **Authored content** (`src/content/projects/`, `src/content/writing/`) — Markdown with a Zod
   schema (`src/content.config.ts`), loaded via Astro's Content Layer `glob()` loader. This is
   Thiago's own prose about his work: the five case studies plus (eventually) writing posts.
2. **Static profile data** (`src/data/`) — skills, education, current activity, social links,
   navigation. Plain typed TypeScript modules. Changing a skill or a link means editing one file,
   not hunting through components for duplicated text.
3. **Live GitHub data** (`src/features/github/`) — fetched from the GitHub REST API at build time
   only, never from the browser. See below.

These three are deliberately not merged. Authored content changes rarely and by hand; GitHub data
changes on its own and is refreshed by rebuilding; static data changes only when a fact about
Thiago changes.

## GitHub integration

`src/features/github/client.ts` fetches
`GET https://api.github.com/users/thiagobgarc/repos?per_page=100&sort=updated` during the Astro
build (`import.meta.env.SSR` context — pages call `getCuratedRepos()`/`getPinnedRepos()` in their
frontmatter, which only ever runs server-side/at build time).

- **Auth**: reads `GITHUB_TOKEN` from `process.env` if present (raises the rate limit); the build
  works fine without one since this is a small number of requests.
- **Dev cache**: while running `astro dev`, responses are cached to `.cache/github-repos.json`
  (gitignored) for one hour, so iterating on the UI doesn't burn rate limit. Disabled under Vitest.
- **Fallback**: on any fetch failure or non-2xx response, the client logs a warning and falls back
  to the committed snapshot at `src/features/github/fallback.json`. The build never fails because
  GitHub is unreachable or rate-limited — verified by `tests/github.client.test.ts`, which stubs a
  rejected `fetch` and asserts the fallback path returns real data.
- **Curation** (`filter.ts`): excludes forks, archived repos, the five pinned case-study repos
  (shown separately as Tier 1), this site's own repo, and repos with no detected `language` (the
  signal GitHub only sets once a repo has real source in it). Caps the result at 12, sorted by most
  recently pushed.

  One deliberate deviation from the original brief: it does **not** require a non-empty
  `description`. Checked against the live API, almost none of this account's real repos have one —
  filtering on it would empty the grid rather than curate it. `language` presence turned out to be
  the signal that actually distinguishes a real project from an abandoned scaffold on this account.
- **Freshness**: the site is static, so the grid is exactly as fresh as the last build. Set up a
  weekly scheduled rebuild (a GitHub Action `schedule` trigger against the deploy hook, or a cron
  on the host) so it doesn't silently go stale — not yet configured; add it once a deploy target is
  chosen.

## Feature boundaries

`src/features/github/` and `src/features/contact/` are the only two features. GitHub earns it —
fetching, transforming, curating, caching, and falling back are real logic worth isolating and
testing. Contact earns it because form-specific validation shouldn't leak into a page component,
even though the actual submission handler (Formspree, Web3Forms, or a serverless function) isn't
wired up yet — `src/features/contact/validation.ts` is ready for whichever is chosen.

## Styling and theming

Tailwind v4, configured entirely in CSS (`src/styles/global.css`) via `@theme` — no
`tailwind.config.js`. Semantic color tokens (`--canvas`, `--ink`, `--accent`, etc.) are plain CSS
custom properties on `:root`, mapped into Tailwind's theme so ordinary utilities (`bg-canvas`,
`text-ink`, `bg-accent`) resolve without a `dark:` variant on every element. The site is dark-only —
there is no light theme and no toggle.

**Fonts**: the system font stack (`ui-sans-serif, system-ui, ...` / `ui-monospace, ...`), not a
self-hosted webfont. This ships zero font bytes, has zero FOIT/FOUT risk, and matches the reader's
OS. Given the site's own performance argument — ship as little as possible — that beats a subsetted
webfont that would cost real bytes for a marginal typographic gain. Revisit this only if a specific
brand typeface becomes a real requirement.

## SEO

`BaseLayout.astro` sets a per-page title/description, canonical URL, Open Graph + Twitter card
tags, and accepts an optional `jsonLd` prop (used on the homepage for `Person` structured data with
`sameAs` links to GitHub/LinkedIn). `@astrojs/sitemap` generates `sitemap-index.xml` from the
build's page list; `public/robots.txt` points at it.

OG images (the default one and one per project case study) are generated by
`scripts/generate-og-images.mjs`, which runs as an `npm run build` prestep (the `prebuild` script
in `package.json`) and rasterizes an SVG template to PNG via `sharp`. PNG rather than SVG on
purpose: several social crawlers (Twitter/X in particular) don't render SVG `og:image` tags. The
generated files are committed under `public/images/og*` so they exist even if someone runs
`astro dev` without ever running the generator — regenerate them with `npm run generate:og` after
editing a case study's `title`/`summary`/`status`. A project can override the default path by
setting `ogImage` in its frontmatter.

## Image strategy

No project screenshots exist yet (see the "Needed from Thiago" list in the README). Once supplied,
route them through Astro's `<Image />` for automatic format/size optimization rather than a plain
`<img>`.

## Deployment

Not yet chosen. Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages) since this
is a fully static `astro build` output with no server runtime required. Whichever is chosen,
configure the weekly rebuild mentioned above so the GitHub-sourced grid stays current.

## Rules for introducing client-side JavaScript

Client JS is justified only for: mobile nav, repo language filter, and copy-to-clipboard for email
— the three remaining cases from the original brief (the site no longer has a theme toggle). Each
is a small `<script is:inline>` in the component that needs it, not a shared bundle or a framework
island. Before adding a new case, ask whether it can be CSS-only first.
