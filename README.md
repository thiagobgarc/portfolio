# thiagobuenogarcia.com

My personal portfolio site — built to showcase the projects I’ve worked on, the technologies I use, and how I approach software development.

I built this with **Astro, TypeScript, and Tailwind CSS** because I wanted something fast, simple, and easy to maintain. I also wanted to keep the architecture clean and avoid adding libraries or tools that the site doesn't actually need.

## Tech Stack

* **Astro** — fast, static-first, and minimal JavaScript
* **TypeScript** — strict typing throughout the project
* **Tailwind CSS v4** — styling and design tokens
* **Zod** — validating project content
* **Vitest** — testing the parts of the site that actually need it

No React, database, CMS, or GraphQL on the portfolio itself. I wanted to keep the site as simple as possible and only add things when they solve an actual problem.

## Getting Started

Clone the repo and install the dependencies:

```bash
npm install
npm run dev
```

The site will be available at `localhost:4321`.

### Commands

| Command             | What it does                   |
| ------------------- | ------------------------------ |
| `npm run dev`       | Starts the development server  |
| `npm run build`     | Creates a production build     |
| `npm run preview`   | Previews the production build  |
| `npm run typecheck` | Runs Astro's type checker      |
| `npm run lint`      | Runs ESLint                    |
| `npm run format`    | Formats the code with Prettier |
| `npm run test`      | Runs the test suite            |

## Project Structure

I wanted the project structure to stay simple and easy to understand.

```text
src/
├── components/       # UI, layout, and page sections
├── layouts/          # Shared page layouts
├── pages/             # Site routes
├── content/           # Project case studies and writing
├── data/              # Profile, skills, experience, and navigation
├── features/          # GitHub and contact functionality
├── lib/               # Shared utilities
└── styles/            # Global styles and design tokens
```

## A Little About the Architecture

One of the things I care about when building projects is **how the code is structured**, not just whether it works.

For this site, I wanted to keep things lightweight and scalable without over-engineering it.

Astro handles the majority of the site, so pages ship with little to no JavaScript by default. Interactive features only get client-side code when they actually need it.

The GitHub project section is also pulled from the GitHub API at build time, so I can keep my project list up to date without maintaining another database or CMS.

I wrote more about the decisions behind the architecture in [`docs/architecture.md`](docs/architecture.md).

## GitHub Projects

The projects section automatically pulls my public GitHub repositories at build time.

It filters out things like:

* Forks
* Archived repositories
* Empty projects
* Projects that already have a full case study

This lets me keep the portfolio focused while still showing the other things I'm working on.

## Performance

The site is built with performance in mind.

Current Lighthouse scores:

| Category       | Desktop | Mobile |
| -------------- | ------: | -----: |
| Performance    |     100 |    100 |
| Accessibility  |     100 |    100 |
| Best Practices |     100 |    100 |
| SEO            |     100 |    100 |

I’m not trying to chase a score just for the sake of it. The goal is simply to build a site that loads quickly, works well, and is accessible.

Accessibility groundwork in place: skip link, semantic landmarks, visible focus states,
keyboard-operable nav/filters, `prefers-reduced-motion` support, and contrast checked against the
site's (dark-only) palette — confirmed by the accessibility score above, not just asserted.

## Why Astro?

I like Astro because it lets me keep the site mostly static while still giving me the option to use React or client-side JavaScript when I actually need it.

For a portfolio, I don't need a huge frontend stack. I’d rather keep the codebase small, readable, and easy to change.

## License

This project is for my personal portfolio. Feel free to look through the code and use it as inspiration.
