export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Writing is scaffolded (content collection, index page, RSS feed) but has
 * no posts yet. Flip this on once the first post is published so it isn't
 * an empty nav item in the meantime.
 */
export const writingEnabled = false;
