import { describe, expect, it } from 'vitest';
import { toRepo } from '../src/features/github/transform';
import type { GitHubApiRepo } from '../src/features/github/types';

describe('toRepo', () => {
  it('maps the GitHub API shape to the domain shape', () => {
    const raw: GitHubApiRepo = {
      name: 'Movie_app',
      full_name: 'thiagobgarc/Movie_app',
      html_url: 'https://github.com/thiagobgarc/Movie_app',
      description: 'A movie discovery app',
      fork: false,
      language: 'TypeScript',
      topics: ['react-native'],
      stargazers_count: 3,
      homepage: null,
      pushed_at: '2023-09-11T01:24:35Z',
      updated_at: '2023-09-11T01:45:42Z',
      archived: false,
    };

    const repo = toRepo(raw);

    expect(repo).toEqual({
      name: 'Movie_app',
      slug: 'movie_app',
      url: 'https://github.com/thiagobgarc/Movie_app',
      description: 'A movie discovery app',
      language: 'TypeScript',
      topics: ['react-native'],
      stars: 3,
      homepage: null,
      updatedAt: new Date('2023-09-11T01:24:35Z'),
    });
  });
});
