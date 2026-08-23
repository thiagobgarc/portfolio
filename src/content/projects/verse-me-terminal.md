---
title: 'Verse Me Terminal'
summary: 'An offline terminal app for finding Bible verses by reference, mood, or category — built to stay off the internet while coding.'
status: 'complete'
role: 'Solo'
stack:
  - 'Python'
repoUrl: 'https://github.com/thiagobgarc/Verse_ME_Terminal'
order: 4
---

## The problem

A daily habit — reading a verse for focus before coding — kept turning into an excuse to open a
browser tab and lose ten minutes to the internet. `Verse_ME_Terminal` is the terminal version of an
earlier web app, `Verse Me`, built specifically to remove that browser tab from the loop.

## Stack, precisely

Plain Python, no framework, no external API calls at runtime — verse lookup, search, and the
randomizer all run against local data.

## Architecture and the decisions behind it

The whole point of this one is the absence of architecture most projects would reach for: no
network layer, no database, no web framework. A terminal script that does one thing — look up or
suggest a Bible verse by reference, mood, or category — doesn't need any of that, and adding it
would be pure overhead. It's the smallest project on this site by design.

## What was hard, and what was learned

The mood- and category-based lookup (motivated, depressed, angry / love, patience, obedience) is
the one piece of actual design work: mapping a human state to a set of relevant verses without it
turning into a hardcoded flat list that's a pain to extend.

## Status

Complete and versioned — v1.2.0 is the current release.
