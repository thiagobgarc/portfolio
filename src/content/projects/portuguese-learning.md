---
title: 'Portuguese Learning'
summary: 'A desktop Brazilian Portuguese learning app with an event-sourced domain, built to be the reference architecture for a three-platform system.'
status: 'in-progress'
role: 'Solo, ongoing'
stack:
  - 'Electron'
  - 'React'
  - 'TypeScript'
  - 'GraphQL'
  - 'PostgreSQL'
  - 'pnpm workspaces'
  - 'Docker'
repoUrl: 'https://github.com/thiagobgarc/portuguese-learning'
order: 1
system: 'falar'
---

## The problem

Most language-learning apps model progress as a mutable row: "user is on lesson 12." That throws
away the history of how a learner actually got there — every review, every mistake, every streak
break — which is exactly the data that would let the app adapt. `portuguese-learning` is a desktop
app for learning Brazilian Portuguese where the learning domain itself is event-sourced: nothing is
overwritten, everything that happened is appended, and current state is a projection of that log.

## Stack, precisely

An Electron shell hosts a React frontend, talking to a GraphQL API inside the same process. The
domain layer persists events to PostgreSQL, run locally via Docker Compose. The whole thing is a
pnpm workspace so the domain, GraphQL schema, and UI live as separate packages with an enforced
dependency direction rather than one flat `src/`.

## Architecture and the decisions behind it

The core decision is event sourcing for the learning domain specifically — not for the whole app.
Settings, UI state, and anything without a meaningful history stay as plain mutable state. Event
sourcing earns its cost only where the history has value: spaced-repetition scheduling and mastery
tracking both need to reconstruct "what did this learner see, and when" to work correctly, and a
CRUD table can't answer that after the fact.

The pnpm monorepo exists to keep the event-sourced domain package free of any dependency on
Electron or React. It only knows about events, projections, and the GraphQL schema it exposes. The
desktop shell is a client of that domain, not the place where the domain logic lives — which is
what let the same domain become the target for a second, independent client (see `falar-
portuguese-mobile`) without duplicating the rules for how a review session is scored or how
mastery is computed.

## What was hard, and what was learned

Getting the projection layer right — replaying events into the read models the UI actually queries
— took more iteration than the event log itself. Writing an event is the easy 20%; deciding what
the read side needs to make the domain useful is the rest of it. That distinction is the main thing
this project is teaching, on purpose.

## Status

Actively in progress. The desktop shell, GraphQL layer, and event-sourced domain foundation exist;
this is the reference implementation the mobile client and backend service are built against.
