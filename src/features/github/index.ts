import { fetchRepos } from './client';
import { curateRepos, PINNED_REPO_NAMES } from './filter';
import { toRepos } from './transform';
import type { RepoSource } from './types';

export type { Repo, RepoSource } from './types';
export { PINNED_REPO_NAMES } from './filter';

/** The curated Tier 2 grid: live GitHub data, pinned repos and forks excluded. */
export async function getCuratedRepos(): Promise<RepoSource> {
  const { repos, usedFallback } = await fetchRepos();
  return { repos: toRepos(curateRepos(repos)), usedFallback };
}

/** All repos matching PINNED_REPO_NAMES, in that order, for the case-study pages. */
export async function getPinnedRepos(): Promise<RepoSource> {
  const { repos, usedFallback } = await fetchRepos();
  const byName = new Map(repos.map((repo) => [repo.name, repo]));
  const pinned = PINNED_REPO_NAMES.map((name) => byName.get(name)).filter((r) => r !== undefined);
  return { repos: toRepos(pinned), usedFallback };
}
