import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['complete', 'in-progress', 'early-stage', 'archived']),
    role: z.string(),
    stack: z.array(z.string()),
    repoUrl: z.string().url(),
    liveUrl: z.string().url().optional(),
    order: z.number(),
    system: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { projects, writing };
