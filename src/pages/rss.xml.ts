import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { profile } from '@/data/profile';
import { SITE_DESCRIPTION } from '@/lib/seo';

export async function GET(context: APIContext) {
  const posts = await getCollection('writing');

  return rss({
    title: `${profile.name} — Writing`,
    description: SITE_DESCRIPTION,
    site: context.site ?? 'https://thiagobuenogarcia.com',
    items: posts
      .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.summary,
        pubDate: post.data.publishedAt,
        link: `/writing/${post.id}/`,
      })),
  });
}
