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
  'WoW-BiS',
  'Movie_app',
] as const;

const PINNED_SET = new Set<string>(PINNED_REPO_NAMES);

/**
 * Most repos on this account have no GitHub description. Rather than show
 * "No description provided." in the grid, these are short, honest summaries
 * written from each repo's actual README/source, keyed by repo name. Used
 * only when the GitHub API description is null.
 */
export const REPO_DESCRIPTION_OVERRIDES: Record<string, string> = {
  portuguese_cli: 'Terminal app for learning Brazilian Portuguese with flashcards, quizzes, and daily vocabulary drills.',
  Verse_ME_Terminal: 'A terminal app for looking up Bible verses by reference, mood, or category — built to stay off the browser while coding.',
  practice_GO_API: 'A personal playground for practicing API development in Go.',
  bookbot: "Python script that reports a text file's word count and character frequency.",
  'java-game': 'A coffee shop simulation game in Java — sell drinks to hit a sales target.',
  'java-menu': 'A Java CLI for browsing a coffee menu and displaying prices.',
  java_first_project: 'A Java CLI that picks a favorite language from a list and replies with a message.',
  'htmx-GO-coffee': 'A coffee-shop ordering demo built with Go and HTMX.',
  new_portfolio: 'An earlier portfolio site built with Next.js, TypeScript, and Tailwind CSS.',
  a_Knights_voyage: 'A small game built in Lua to learn the language.',
  QR_Code: 'Python script that generates a QR code image from user-provided text.',
  'Frontend-Practice-Abstract-level1': 'A React + Vite starter used to practice frontend fundamentals.',
  'orders-api': 'A Go REST API for managing orders, with handler/model/repository layers.',
  DiscordAI: 'A Discord bot written in Python.',
  portuguese_language_app: 'A Flutter app for learning Portuguese vocabulary through image-based flashcards.',
  Shop: 'A full-stack e-commerce app with auth, product CRUD, and a purchase/like flow.',
  BullsEye: 'An iOS number-guessing game built in Swift, with score and round tracking.',
  'portfolio-backend': 'Backend API supporting an earlier portfolio site.',
  'YadaFp-backend': 'A Django backend deployed on Heroku.',
};

/**
 * GitHub's language detector reports the language with the most bytes in the
 * repo, which misidentifies Flutter apps as their native Android/iOS
 * scaffolding language. Corrected here from each repo's actual pubspec.yaml
 * (confirmed Flutter/Dart), not guessed.
 */
export const REPO_LANGUAGE_OVERRIDES: Record<string, string> = {
  portuguese_language_app: 'Dart',
};

/** This site's own repository, excluded so it doesn't list itself. */
const SELF_REPO_NAME = 'portfolio';

/**
 * Earlier portfolio-site repos, excluded so the grid doesn't show old
 * iterations of this same site alongside the live one.
 */
const EXCLUDED_REPO_NAMES = new Set<string>(['new_portfolio', 'portfolio-backend']);

/**
 * Guaranteed a grid slot regardless of recency, so the grid always shows at
 * least one Flutter/Dart project even though the other Dart repos are
 * pinned case studies excluded from this tier.
 */
const ENSURE_INCLUDED_REPO_NAMES = new Set<string>(['portuguese_language_app']);

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
  const eligible = repos
    .filter((repo) => !repo.fork)
    .filter((repo) => !repo.archived)
    .filter((repo) => repo.language !== null)
    .filter((repo) => !PINNED_SET.has(repo.name))
    .filter((repo) => repo.name.toLowerCase() !== SELF_REPO_NAME)
    .filter((repo) => !EXCLUDED_REPO_NAMES.has(repo.name))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

  const ensured = eligible.filter((repo) => ENSURE_INCLUDED_REPO_NAMES.has(repo.name));
  const rest = eligible.filter((repo) => !ENSURE_INCLUDED_REPO_NAMES.has(repo.name));

  return [...ensured, ...rest.slice(0, MAX_GRID_REPOS - ensured.length)].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );
}
