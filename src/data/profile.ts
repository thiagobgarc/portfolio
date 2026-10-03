export type SocialLink = {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email';
};

export const profile = {
  name: 'Thiago Bueno Garcia',
  role: 'Software Engineer',
  /** Hero headline: who Thiago is, in one line. Keep it to ~2 lines at display size. */
  headline: 'Software engineer who loves building projects from idea to launch.',
  /** Hero supporting line: the latest shipped project, leading into the diagram below it. */
  currentFocus:
    'My latest is Mythos, a World of Warcraft gear planner that compares a character’s live gear against Best-in-Slot lists. It is live at mythosbis.com. Here is how it fits together.',
  /** Meta/OG description. */
  tagline:
    'Software engineer who loves building projects from idea to launch. Built and shipped Mythos, a World of Warcraft gear planner live at mythosbis.com.',
  positioning:
    'General Assembly Software Engineering Immersive graduate who builds full-stack projects from the first commit to a live site.',
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
