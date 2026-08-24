# thiagobuenogarcia.com

Personal portfolio site for **Thiago Bueno Garcia**, software engineer and General Assembly
Software Engineering Immersive graduate. Built with [Astro](https://astro.build), TypeScript
(strict), and Tailwind CSS v4.

If you're reading this because you found the site through a résumé or LinkedIn: this repo is
itself part of the portfolio. The site ships almost no client-side JavaScript on purpose — see
[`docs/architecture.md`](docs/architecture.md) for why, and for the reasoning behind every other
non-obvious decision in here.

## Stack

- [Astro](https://astro.build) — static-first, ships zero JS by default
- TypeScript, strict mode (`astro/tsconfigs/strictest`)
- Tailwind CSS v4 (CSS-native config, no `tailwind.config.js`)
- Zod-validated content collections for project case studies and writing
- Vitest for the logic that actually has behavior worth testing (GitHub fetch/transform/curation,
  contact-form validation)

No React, no database, no CMS, no GraphQL on this site itself — none of them solve a problem this
site has. (One of the projects it links to, `falar-portuguese-mobile-backend`, is a GraphQL
service; that's a different codebase with different requirements.)

## Getting started

```bash
npm install
npm run dev
```

| Command             | What it does                                              |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev`         | Local dev server at `localhost:4321`                        |
| `npm run build`       | Production build to `./dist/`                                |
| `npm run preview`     | Preview the production build locally                          |
| `npm run typecheck`   | `astro check` — type-checks `.astro` files too                |
| `npm run lint`        | ESLint                                                        |
| `npm run format`      | Prettier (writes)                                            |
| `npm run test`        | Vitest                                                        |

Definition of done for any change: `typecheck`, `lint`, `test`, and `build` all pass. `build` must
succeed with no network access — see [GitHub integration](#github-integration).

## Project structure

See [`docs/architecture.md`](docs/architecture.md) for the full breakdown and the reasoning behind
it. Short version:

```text
src/
├── components/{ui,layout,sections}/   Astro components, smallest-reusable to page-section
├── layouts/                           BaseLayout (every page), ProjectLayout (case studies)
├── pages/                             Routes
├── content/                           Authored Markdown: project case studies, writing
├── data/                              Static typed profile/skills/experience/nav data
├── features/{github,contact}/         The two places with real logic
├── lib/                               seo.ts, utils.ts
└── styles/global.css                  Tailwind v4 entry point + design tokens
```

## GitHub integration

The "More on GitHub" grid on the projects page is fetched from the GitHub REST API **at build
time**, filtered to exclude forks, archived repos, empty scaffolds, and the five repos that already
have a full case study. See [`docs/architecture.md`](docs/architecture.md#github-integration) for
the exact curation rules and why the build never fails even if GitHub is unreachable.

## Content

- **Case studies**: `src/content/projects/*.md`. Adding one is documented in
  [`CLAUDE.md`](CLAUDE.md#how-to-add-a-new-project-case-study).
- **Writing**: `src/content/writing/`, scaffolded (index page, post layout, RSS feed) but empty.
  Flip `writingEnabled` in `src/data/navigation.ts` once the first post exists.

## Needed from Thiago

The following are placeholders on purpose — this site does not fabricate facts. Supply these to
finish the site:

- **Location / work authorization**, if you want either published.
- **Real favicon/brand mark** — currently the default Astro favicon
  (`public/favicon.svg`, `public/favicon.ico`).
- **Project screenshots** for the five case studies (`src/content/projects/*.md`), where each
  project has a UI worth showing.
- **Production domain** — `astro.config.mjs` (`site:`) and `public/robots.txt` currently point at
  `https://thiagobuenogarcia.com` as a placeholder.
- **Contact form service**, if you want a form in addition to the direct email link (Formspree,
  Web3Forms, or a serverless function). `src/features/contact/validation.ts` is written and tested
  and ready to wire up to whichever you pick — no form is rendered yet because a "Submit" button
  with nowhere to send data would be worse than the direct-email page that's there now.
- **Deployment target** (Vercel/Netlify/Cloudflare Pages/etc.) and a scheduled weekly rebuild so
  the GitHub-sourced grid doesn't go stale — see
  [`docs/architecture.md`](docs/architecture.md#deployment).

## Performance & accessibility

Lighthouse (desktop and mobile presets, local production build via `astro preview`):

| Category       | Desktop | Mobile |
| -------------- | :-----: | :----: |
| Performance    |   100   |  100   |
| Accessibility  |   100   |  100   |
| Best Practices |   100   |  100   |
| SEO            |   100   |  100   |

Re-run against the deployed URL once a host is chosen — localhost numbers don't account for real
network latency, but they do confirm nothing in the page itself (JS weight, unsized images, missing
metadata, contrast, unlabeled controls) is leaving points on the table.

Accessibility groundwork in place: skip link, semantic landmarks, visible focus states,
keyboard-operable nav/filters/theme-toggle, `prefers-reduced-motion` support, and both themes
checked for contrast — confirmed by the accessibility score above, not just asserted.
