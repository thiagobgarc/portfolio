---
title: 'Movie App'
summary: 'A React Native movie discovery app: trending, upcoming, and top-rated browsing, search, and full cast/filmography detail pages.'
status: 'complete'
role: 'Solo'
stack:
  - 'React Native'
  - 'TypeScript'
  - 'Tailwind CSS'
  - 'Axios'
repoUrl: 'https://github.com/thiagobgarc/Movie_app'
order: 5
---

## The problem

A movie discovery app that goes past a single search box: browse what's trending, upcoming, or
top-rated, search by title, and — the part most clones skip — follow a cast member from a movie's
detail page into their own biography and filmography.

## Stack, precisely

React Native for the client, Tailwind CSS for styling, Axios against a movie metadata API for
trending/upcoming/top-rated lists, search, and cast data.

## Architecture and the decisions behind it

The navigation model is the real design decision: a movie's detail screen links to its cast, and
each cast member's screen links back into their own filmography — the same detail screen
component, rehydrated with a different person's data. Treating "movie" and "person" as two
instances of the same drill-down pattern, rather than two unrelated screens, is what keeps the
cast-to-filmography browsing from turning into duplicated screen code.

## What was hard, and what was learned

Keeping the detail screen generic enough to serve both a movie and a cast member without becoming
a conditional-heavy mess required deciding early what the two views actually share versus where
they diverge, instead of forking the component the first time a difference showed up.

## Status

Complete.
