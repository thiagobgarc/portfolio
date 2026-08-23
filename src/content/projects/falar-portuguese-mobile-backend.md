---
title: 'Falar Backend'
summary: 'The GraphQL service the mobile client will run against once deployed — a modular monolith with domain/application/infrastructure separation per module.'
status: 'early-stage'
role: 'Solo, ongoing'
stack:
  - 'Node.js'
  - 'TypeScript'
  - 'Apollo Server'
  - 'GraphQL'
  - 'PostgreSQL'
  - 'Kysely'
  - 'JWT'
repoUrl: 'https://github.com/thiagobgarc/falar-portuguese-mobile-backend'
order: 3
system: 'falar'
---

## The problem

`falar-portuguese-mobile` was built against a GraphQL contract that didn't have a real
implementation yet. This service is that implementation: an Apollo Server GraphQL API backed by
PostgreSQL, standing behind the exact `signIn` / `signUp` / `me` / `dashboardProgress` /
`vocabularyList` contract the mobile client already expects.

## Stack, precisely

Apollo Server on Node.js/TypeScript, Kysely as a typed SQL query builder over PostgreSQL (not a
full ORM — the schema stays in plain, reviewable SQL migrations), `bcryptjs` for password hashing,
and `jsonwebtoken` for session tokens.

## Architecture and the decisions behind it

Each domain concept — `user`, `vocabulary`, `grammar`, `progress`, `quests`, `reading`,
`sentence-structure`, `learning` — is its own module. The `user` module, the one built out so far,
splits further into `domain` (entities, repository interfaces), `application` (use cases like
`sign-in` and `sign-up`), `infrastructure` (the Kysely-backed repository, the bcrypt hasher, the
JWT token service), and `graphql` (resolvers and type defs). A use case depends on repository and
service *interfaces*; the concrete Postgres/bcrypt/JWT implementations are wired in at the edge.

That is a deliberately lighter version of the pattern used in `portuguese-learning`. There is no
event sourcing here and no CQRS — this service persists current state directly, because a
GraphQL API for a mobile client doesn't need a full history log the way the learning domain does.
Same author, same instinct toward separated layers, calibrated differently because the problem is
different. Kysely over a full ORM for the same reason: the query surface here is small enough that
a query builder is enough, and a full ORM would be paying for abstraction the module doesn't need.

## What was hard, and what was learned

Building a backend to match a contract the client already committed to, rather than designing the
contract backend-first, inverts the usual order. It forces the schema to serve what the UI actually
needs to render instead of what's convenient to query — the harder discipline, done here on
purpose.

## Status

Early stage — two commits in. The `user` module (sign-up, sign-in, current-user) is implemented
end to end through GraphQL; the remaining modules (`vocabulary`, `grammar`, `progress`, `quests`,
`reading`, `sentence-structure`, `learning`) exist as placeholders the mobile client isn't yet
wired to.
