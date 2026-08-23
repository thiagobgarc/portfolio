/** The subset of the GitHub REST API repo shape this site actually reads. */
export type GitHubApiRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  homepage: string | null;
  pushed_at: string;
  updated_at: string;
  archived: boolean;
};

/** Domain shape components consume. Decoupled from GitHub's API shape. */
export type Repo = {
  name: string;
  slug: string;
  url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  homepage: string | null;
  updatedAt: Date;
};

export type RepoSource = {
  repos: Repo[];
  usedFallback: boolean;
};
