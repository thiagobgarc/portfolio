export type SocialLink = {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email';
};

export const profile = {
  name: 'Thiago Bueno Garcia',
  role: 'Software Engineer',
  /** Hero headline: who Thiago is, in one line. Keep it to ~2 lines at display size. */
  headline: 'Full-stack and mobile engineer who cares how software is built.',
  /** Hero supporting line: the current project, leading into the diagram below it. */
  currentFocus:
    "Right now I'm building Mythos, a World of Warcraft gear planner that compares a character's live gear against Best-in-Slot lists. Here's how it fits together.",
  /** Meta/OG description. */
  tagline:
    'Full-stack and mobile engineer who cares how software is built. Currently building Mythos, a World of Warcraft gear planner.',
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
