import type { GitHubApiRepo } from './types';

/**
 * The five repos with authored case studies in src/content/projects/. They
 * get Tier 1 treatment on the projects page and are excluded from the Tier 2
 * grid so they aren't shown twice.
 */
export const PINNED_REPO_NAMES = [
  'portuguese-learning',
  'falar-portuguese-mobile',
  'falar-portuguese-mobile-backend',
  'Verse_ME_Terminal',
  'Movie_app',
] as const;

const PINNED_SET = new Set<string>(PINNED_REPO_NAMES);

/** This site's own repository, excluded so it doesn't list itself. */
const SELF_REPO_NAME = 'portfolio';

const MAX_GRID_REPOS = 12;

/**
 * Curation rules for the Tier 2 grid, applied to the raw API shape before
 * transform. Deliberately does not require a non-empty `description`: on
 * this account almost no repo has one (verified against the live API),
 * so that rule from the original brief would empty the grid. Presence of a
 * detected `language` is used instead as the "not an abandoned scaffold"
 * signal, since GitHub only reports a language once a repo has real source
 * files in it.
 */
export function curateRepos(repos: GitHubApiRepo[]): GitHubApiRepo[] {
  return repos
    .filter((repo) => !repo.fork)
    .filter((repo) => !repo.archived)
    .filter((repo) => repo.language !== null)
    .filter((repo) => !PINNED_SET.has(repo.name))
    .filter((repo) => repo.name.toLowerCase() !== SELF_REPO_NAME)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, MAX_GRID_REPOS);
}
