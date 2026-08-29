import { REPO_DESCRIPTION_OVERRIDES, REPO_LANGUAGE_OVERRIDES } from './filter';
import type { GitHubApiRepo, Repo } from './types';

export function toRepo(raw: GitHubApiRepo): Repo {
  return {
    name: raw.name,
    slug: raw.name.toLowerCase(),
    url: raw.html_url,
    description: raw.description ?? REPO_DESCRIPTION_OVERRIDES[raw.name] ?? null,
    language: REPO_LANGUAGE_OVERRIDES[raw.name] ?? raw.language,
    topics: raw.topics,
    stars: raw.stargazers_count,
    homepage: raw.homepage,
    updatedAt: new Date(raw.pushed_at),
  };
}

export function toRepos(raw: GitHubApiRepo[]): Repo[] {
  return raw.map(toRepo);
}
