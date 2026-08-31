export type RelatedProject = {
  title: string;
  href: string;
  external?: boolean;
};

export type SkillItem = {
  name: string;
  /** Real projects that use this skill. Omitted where none are honestly verified. */
  projects?: RelatedProject[];
};

export type SkillCategory = {
  category: string;
  items: SkillItem[];
};

const portugueseLearning: RelatedProject = { title: 'Portuguese Learning', href: '/projects/portuguese-learning' };
const falarMobile: RelatedProject = { title: 'Falar (Mobile)', href: '/projects/falar-portuguese-mobile' };
const falarBackend: RelatedProject = { title: 'Falar Backend', href: '/projects/falar-portuguese-mobile-backend' };
const movieApp: RelatedProject = { title: 'Movie App', href: '/projects/movie-app' };
const mythos: RelatedProject = { title: 'Mythos — WoW Gear Planner', href: '/projects/mythos-wow-bis' };

const bookbot: RelatedProject = {
  title: 'bookbot',
  href: 'https://github.com/thiagobgarc/bookbot',
  external: true,
};
const qrCode: RelatedProject = { title: 'QR_Code', href: 'https://github.com/thiagobgarc/QR_Code', external: true };
const verseMeTerminalRepo: RelatedProject = {
  title: 'Verse_ME_Terminal',
  href: 'https://github.com/thiagobgarc/Verse_ME_Terminal',
  external: true,
};
const shop: RelatedProject = { title: 'Shop', href: 'https://github.com/thiagobgarc/Shop', external: true };
const roomieFinderzBackend: RelatedProject = {
  title: 'RoomieFinderz-backend',
  href: 'https://github.com/thiagobgarc/RoomieFinderz-backend',
  external: true,
};
const frontendPracticeAbstract: RelatedProject = {
  title: 'Frontend-Practice-Abstract-level1',
  href: 'https://github.com/thiagobgarc/Frontend-Practice-Abstract-level1',
  external: true,
};
const newPortfolio: RelatedProject = {
  title: 'new_portfolio',
  href: 'https://github.com/thiagobgarc/new_portfolio',
  external: true,
};
const portugueseLanguageApp: RelatedProject = {
  title: 'portuguese_language_app',
  href: 'https://github.com/thiagobgarc/portuguese_language_app',
  external: true,
};
const yadaFpBackend: RelatedProject = {
  title: 'YadaFp-backend',
  href: 'https://github.com/thiagobgarc/YadaFp-backend',
  external: true,
};
const portfolioBackend: RelatedProject = {
  title: 'portfolio-backend',
  href: 'https://github.com/thiagobgarc/portfolio-backend',
  external: true,
};

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: [
      { name: 'TypeScript', projects: [portugueseLearning, falarBackend, movieApp, mythos] },
      { name: 'JavaScript', projects: [shop, roomieFinderzBackend, frontendPracticeAbstract] },
      { name: 'Python', projects: [verseMeTerminalRepo, bookbot, qrCode] },
      { name: 'Dart', projects: [falarMobile, portugueseLanguageApp] },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', projects: [portugueseLearning, frontendPracticeAbstract, mythos] },
      { name: 'Next.js', projects: [newPortfolio] },
      { name: 'Flutter', projects: [falarMobile, portugueseLanguageApp] },
      { name: 'Tailwind CSS', projects: [movieApp, newPortfolio] },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', projects: [falarBackend, shop, roomieFinderzBackend] },
      { name: 'Django', projects: [yadaFpBackend, portfolioBackend] },
      { name: 'GraphQL', projects: [portugueseLearning, falarMobile, falarBackend] },
    ],
  },
  {
    category: 'Data & Infra',
    items: [
      { name: 'SQLite', projects: [yadaFpBackend] },
      { name: 'Docker', projects: [portugueseLearning] },
      { name: 'Git / GitLab', projects: [portugueseLearning, movieApp] },
    ],
  },
  {
    category: 'Tooling',
    items: [{ name: 'Bash' }, { name: 'Linux' }, { name: 'VS Code' }],
  },
];
