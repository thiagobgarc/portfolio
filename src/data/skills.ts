export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Dart'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Flutter', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'FastAPI', 'Django', 'GraphQL'],
  },
  {
    category: 'Data & Infra',
    items: ['SQLite', 'Firebase', 'Docker', 'Git / GitLab'],
  },
  {
    category: 'Tooling',
    items: ['Bash', 'Linux', 'VS Code'],
  },
];
