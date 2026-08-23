export type SocialLink = {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email';
};

export const profile = {
  name: 'Thiago Bueno Garcia',
  role: 'Software Engineer',
  tagline: 'I built the same Portuguese-learning app three times — desktop, mobile, and a GraphQL backend — picking a different architecture each time instead of reusing what worked last time.',
  positioning:
    'General Assembly Software Engineering Immersive graduate building full-stack and mobile products with a deliberate focus on architecture.',
  location: null as string | null,
  email: 'thiagobuenogarcia1@gmail.com' as string | null,
  resumeUrl: '/resume/thiago-bueno-garcia-resume.pdf',
  currentlyBuilding: "building a website for my father's company",
  interests: ['soccer', 'volleyball', 'ukulele'],
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
