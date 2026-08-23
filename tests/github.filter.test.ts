import { describe, expect, it } from 'vitest';
import { curateRepos, PINNED_REPO_NAMES } from '../src/features/github/filter';
import type { GitHubApiRepo } from '../src/features/github/types';

function makeRepo(overrides: Partial<GitHubApiRepo>): GitHubApiRepo {
  return {
    name: 'example',
    full_name: 'thiagobgarc/example',
    html_url: 'https://github.com/thiagobgarc/example',
    description: null,
    fork: false,
    language: 'TypeScript',
    topics: [],
    stargazers_count: 0,
    homepage: null,
    pushed_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    archived: false,
    ...overrides,
  };
}

describe('curateRepos', () => {
  it('excludes forks', () => {
    const repos = [makeRepo({ name: 'a', fork: true }), makeRepo({ name: 'b', fork: false })];
    expect(curateRepos(repos).map((r) => r.name)).toEqual(['b']);
  });

  it('excludes archived repos', () => {
    const repos = [makeRepo({ name: 'a', archived: true }), makeRepo({ name: 'b' })];
    expect(curateRepos(repos).map((r) => r.name)).toEqual(['b']);
  });

  it('excludes repos with no detected language', () => {
    const repos = [makeRepo({ name: 'a', language: null }), makeRepo({ name: 'b' })];
    expect(curateRepos(repos).map((r) => r.name)).toEqual(['b']);
  });

  it('excludes every pinned repo', () => {
    const repos = PINNED_REPO_NAMES.map((name) => makeRepo({ name }));
    expect(curateRepos(repos)).toHaveLength(0);
  });

  it('excludes the portfolio site itself, case-insensitively', () => {
    const repos = [makeRepo({ name: 'Portfolio' }), makeRepo({ name: 'kept' })];
    expect(curateRepos(repos).map((r) => r.name)).toEqual(['kept']);
  });

  it('sorts by most recently pushed first', () => {
    const repos = [
      makeRepo({ name: 'old', pushed_at: '2020-01-01T00:00:00Z' }),
      makeRepo({ name: 'new', pushed_at: '2024-01-01T00:00:00Z' }),
    ];
    expect(curateRepos(repos).map((r) => r.name)).toEqual(['new', 'old']);
  });

  it('caps the result at 12 repos', () => {
    const repos = Array.from({ length: 20 }, (_, i) => makeRepo({ name: `repo-${i}` }));
    expect(curateRepos(repos)).toHaveLength(12);
  });
});
