import type { GitHubApiRepo, Repo } from './types';

export function toRepo(raw: GitHubApiRepo): Repo {
  return {
    name: raw.name,
    slug: raw.name.toLowerCase(),
    url: raw.html_url,
    description: raw.description,
    language: raw.language,
    topics: raw.topics,
    stars: raw.stargazers_count,
    homepage: raw.homepage,
    updatedAt: new Date(raw.pushed_at),
  };
}

export function toRepos(raw: GitHubApiRepo[]): Repo[] {
  return raw.map(toRepo);
}
