import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fallbackRepos from './fallback.json';
import type { GitHubApiRepo } from './types';

const GITHUB_USERNAME = 'thiagobgarc';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = join(__dirname, '../../../.cache/github-repos.json');
const CACHE_TTL_MS = 60 * 60 * 1000;

// Imported as a JSON module (not read from disk at runtime) so its content is
// inlined into the build output. A path built from import.meta.url would
// break here: Astro's prerender step bundles this module into
// dist/.prerender/chunks/, and fallback.json is never copied alongside it.
function readFallback(): GitHubApiRepo[] {
  return fallbackRepos as GitHubApiRepo[];
}

type Cache = { fetchedAt: number; repos: GitHubApiRepo[] };

function readDevCache(): GitHubApiRepo[] | null {
  if (!existsSync(CACHE_PATH)) return null;
  try {
    const cache = JSON.parse(readFileSync(CACHE_PATH, 'utf-8')) as Cache;
    if (Date.now() - cache.fetchedAt > CACHE_TTL_MS) return null;
    return cache.repos;
  } catch {
    return null;
  }
}

function writeDevCache(repos: GitHubApiRepo[]): void {
  try {
    mkdirSync(dirname(CACHE_PATH), { recursive: true });
    const cache: Cache = { fetchedAt: Date.now(), repos };
    writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  } catch {
    // Dev-only convenience cache; a write failure should never break the build.
  }
}

/**
 * Fetches this account's repos at build time. Never called from the
 * browser. Falls back to the committed snapshot (fallback.json) if the
 * network is unavailable or GitHub rate-limits the request, so a build
 * never fails because of a third-party API.
 */
export async function fetchRepos(): Promise<{ repos: GitHubApiRepo[]; usedFallback: boolean }> {
  const useDevCache = import.meta.env.DEV && !process.env.VITEST;

  if (useDevCache) {
    const cached = readDevCache();
    if (cached) return { repos: cached, usedFallback: false };
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    const response = await fetch(API_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = (await response.json()) as GitHubApiRepo[];

    if (useDevCache) writeDevCache(repos);

    return { repos, usedFallback: false };
  } catch (error) {
    console.warn(
      `[github] Falling back to committed snapshot (src/features/github/fallback.json): ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return { repos: readFallback(), usedFallback: true };
  }
}
