---
title: 'Falar (Mobile)'
summary: 'A Flutter client for the same Portuguese-learning product, running today on in-memory fake repositories pending the live backend.'
status: 'early-stage'
role: 'Solo, ongoing'
stack:
  - 'Flutter'
  - 'Dart'
  - 'Riverpod'
  - 'GraphQL'
repoUrl: 'https://github.com/thiagobgarc/falar-portuguese-mobile'
order: 2
system: 'falar'
---

## The problem

`portuguese-learning` proved the domain on desktop. The mobile client asks a different question:
can the same domain rules — the same review scoring, the same mastery model — serve a second,
completely different presentation layer without being reimplemented for it.

## Stack, precisely

Flutter and Dart, with Riverpod for dependency injection instead of a global state container. The
app is organized in explicit layers — `core`, `domain`, `application`, `data`, `presentation` — the
same separation used on desktop, translated to Flutter's idioms rather than copied wholesale.

## Architecture and the decisions behind it

The interesting piece is the `data` layer, which ships two interchangeable implementations of the
same repository interfaces: an in-memory fake seeded with sample data, and a real GraphQL client
that talks to `falar-portuguese-mobile-backend`. Which one runs is a single build-time flag
(`--dart-define=USE_MOCK`), not a runtime branch scattered through the app. The domain and
presentation layers never know which one they're talking to.

That is the actual point of the exercise: proving the domain/application boundary is real by
building against a fake first and swapping the implementation later without touching a single
screen. If that swap requires editing presentation code, the boundary was fake.

## What was hard, and what was learned

Committing to the fake-repository pattern before the backend existed meant designing the GraphQL
contract (queries, mutations, response shapes) speculatively, then building the backend to match
it. That ordering is deliberate but risky — get the interface wrong on the client side and the
backend inherits the mistake. It held up because the interface was lifted directly from the
domain model already validated on desktop.

## Status

Early stage — two commits in. The architecture and screen structure are in place; the app runs
today entirely on the fake in-memory repositories while `falar-portuguese-mobile-backend` catches
up. Honest framing on purpose: this is scaffolding with a real plan behind it, not a finished
product.
