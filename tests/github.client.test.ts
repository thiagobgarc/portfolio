import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchRepos } from '../src/features/github/client';

describe('fetchRepos', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('falls back to the committed snapshot when the network is unreachable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('network unreachable'))),
    );

    const { repos, usedFallback } = await fetchRepos();

    expect(usedFallback).toBe(true);
    expect(repos.length).toBeGreaterThan(0);
    expect(repos.some((r) => r.name === 'portuguese-learning')).toBe(true);
  });

  it('falls back to the committed snapshot when GitHub rate-limits the request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response(null, { status: 403 }))),
    );

    const { usedFallback } = await fetchRepos();

    expect(usedFallback).toBe(true);
  });

  it('uses the live response when the request succeeds', async () => {
    const liveRepo = {
      name: 'live-repo',
      full_name: 'thiagobgarc/live-repo',
      html_url: 'https://github.com/thiagobgarc/live-repo',
      description: null,
      fork: false,
      language: 'TypeScript',
      topics: [],
      stargazers_count: 0,
      homepage: null,
      pushed_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      archived: false,
    };
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response(JSON.stringify([liveRepo]), { status: 200 }))),
    );

    const { repos, usedFallback } = await fetchRepos();

    expect(usedFallback).toBe(false);
    expect(repos).toEqual([liveRepo]);
  });
});
