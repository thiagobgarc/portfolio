---
title: 'Mythos — WoW Gear Planner'
summary: 'Look up a World of Warcraft character, pull their live gear from the Blizzard API, and compare it slot-by-slot against a seeded Best-in-Slot list for their class and spec.'
status: 'complete'
role: 'Solo'
stack:
  - 'Astro'
  - 'React'
  - 'TypeScript'
  - 'PostgreSQL'
  - 'Drizzle ORM'
  - 'Redis'
repoUrl: 'https://github.com/thiagobgarc/WoW-BiS'
liveUrl: 'https://mythosbis.com'
order: 0
---

## The Problem

Figuring out what to upgrade next in World of Warcraft can mean jumping between an armory page, a
BiS list, and different loot tables just to compare your gear.

I wanted to make that easier.

With Mythos, you enter a character's name, realm, and region. The app pulls their equipped gear
from the Blizzard API, compares it against a BiS list for their class and spec, and shows what they
should upgrade and where those upgrades come from.

## Stack

- **Astro + TypeScript** — static-first with strict typing
- **React** — used for the interactive parts of the app
- **PostgreSQL + Drizzle** — BiS gear data
- **Redis / Upstash** — caching Blizzard API requests
- **Zod** — validating API responses
- **Vitest** — unit testing
- **Playwright** — end-to-end testing
- **Vercel** — hosting, with every push to `main` deploying to production

I kept React limited to the parts that actually need it, like the search form, paper doll, and
upgrade board. Everything else stays static or server-rendered.

## Architecture

One of the main things I focused on was keeping Blizzard API calls on the server. The API
credentials never reach the browser, and every response is validated with Zod before the
application uses it.

The gear comparison logic is also kept separate from the UI. `compareGear.ts` is a pure function
that takes the player's gear and the BiS list and figures out what needs to be upgraded.

One interesting problem was handling rings and trinkets. Since players can equip two of each,
simply comparing slot 1 with BiS rank 1 doesn't always work. The comparison engine treats them as a
pair and finds the best possible assignment instead.

I also wanted the project to work without needing a bunch of services running locally. If Blizzard
credentials or Redis aren't configured, the app falls back to realistic mock data and local seed
data.

That means I can still run and test the entire application without setting up the full
infrastructure.

## What I Learned

One of the biggest things I focused on was keeping season-specific information in one place.

Things like the current raid, Mythic+ dungeons, tier bonuses, and item levels live in
`seasonConfig.ts`. When a new season comes around, I can update the configuration and seed data
instead of hunting through the entire codebase for hardcoded values.

That ended up being especially useful when Midnight Season 2 came out. Updating the season
information was a contained change instead of requiring changes throughout the application.

## Status

**Complete. Live at [mythosbis.com](https://mythosbis.com).**

You can look up any character, see a paper doll of their current gear, and get an upgrade board
with every slot that still needs work. There are also BiS gear pages and talent builds for every
class and spec.

The site is hosted on Vercel. Work happens on a `development` branch and gets merged into `main`
when it is ready. Every push to `main` goes straight to production.

Also, the repo is now a monorepo. The web app and a React Native app share the same domain logic
from one `core` package, so the comparison engine only lives in one place.
