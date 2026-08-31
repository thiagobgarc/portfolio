export type SocialLink = {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email';
};

export const profile = {
  name: 'Thiago Bueno Garcia',
  role: 'Software Engineer',
  tagline: 'I built the same Portuguese-learning app three times — desktop, mobile, and a GraphQL backend — picking a different architecture each time on purpose.',
  positioning:
    'General Assembly Software Engineering Immersive graduate building full-stack and mobile projects with a strong focus on architecture.',
  location: null as string | null,
  email: 'thiagobgsoftware@gmail.com' as string | null,
  /**
   * FormSubmit.co activation hash for the contact form, so the real email
   * address never has to appear in the page source. Get it by submitting
   * your email once at https://formsubmit.co, confirming the activation
   * email it sends, then copying the hash from the confirmation link
   * (https://formsubmit.co/<hash>) into this field. Until it's set, the
   * contact form falls back to using the raw email address as the
   * formsubmit.co endpoint.
   */
  contactFormHash: null as string | null,
  resumeUrl: '/resume/thiago-bueno-garcia-resume.pdf',
  currentlyBuilding: "building a website for my father's company",
  interests: ['soccer', 'volleyball', 'ukulele', 'World of Warcraft'],
  bioQuote: 'One thing remains the same, the architecture to build scalable clean code.',
} as const;

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/thiagobgarc', icon: 'github' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/thiago-bueno-garcia-34604a25a/',
    icon: 'linkedin',
  },
];
