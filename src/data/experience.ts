export type EducationEntry = {
  institution: string;
  program: string;
  period: string;
  summary: string;
};

export type ActivityEntry = {
  label: string;
};

/**
 * Employment history is intentionally absent: none has been confirmed, and
 * this site does not fabricate it (see Claude Code Prompt, section 8/22).
 * Add entries here only once Thiago supplies real title/dates/employer.
 */
export const education: EducationEntry[] = [
  {
    institution: 'General Assembly',
    program: 'Software Engineering Immersive',
    period: 'Graduate',
    summary:
      'Full-time immersive covering full-stack web development: JavaScript/TypeScript, React, Node.js, Python, and relational data modeling, capped by three shipped group and solo projects.',
  },
];

export const currentActivity: ActivityEntry[] = [
  { label: "Building a website for my father's company" },
  { label: 'Building a language app for people to learn Brazilian Portuguese' },
  { label: 'Expanding technical knowledge and networking' },
];
