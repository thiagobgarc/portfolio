// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { writingEnabled } from './src/data/navigation';

// https://astro.build/config
export default defineConfig({
  site: 'https://thiagobuenogarcia.com',
  integrations: [
    sitemap({
      // /writing has no posts yet (see writingEnabled in src/data/navigation.ts) —
      // don't let an empty page get indexed until the first post ships.
      filter: (page) => writingEnabled || !page.includes('/writing'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
