import { profile, socialLinks } from '@/data/profile';

export const SITE_NAME = `${profile.name} — ${profile.role}`;
export const SITE_DESCRIPTION = profile.tagline;

export function pageTitle(title?: string): string {
  return title ? `${title} | ${profile.name}` : SITE_NAME;
}

/** Person structured data (JSON-LD) for the homepage. */
export function personJsonLd(siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    sameAs: socialLinks.map((link) => link.url),
  };
}
