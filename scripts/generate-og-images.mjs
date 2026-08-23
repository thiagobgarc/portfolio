// Generates OG images at build time: one default, one per project case study.
// Runs as an `npm run build` prestep (see package.json) rather than inside
// Astro itself, since it only needs frontmatter + sharp, not the renderer.
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import sharp from 'sharp';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECTS_DIR = join(ROOT, 'src/content/projects');
const OUT_DIR = join(ROOT, 'public/images/og');
const DEFAULT_OUT = join(ROOT, 'public/images/og-default.png');

const COLORS = {
  canvas: '#101319',
  accent: '#38b6a8',
  ink: '#f5f5f4',
  inkMuted: '#a3a7ae',
  mutedDim: '#6b7078',
};

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Greedy word-wrap for a monospace-adjacent sans title at a fixed char width. */
function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function renderOgSvg({ eyebrow, title, subtitle }) {
  const titleLines = wrapText(title, 24).slice(0, 2);
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 78}">${escapeXml(line)}</tspan>`)
    .join('');
  const titleTop = 260;
  const titleBottom = titleTop + (titleLines.length - 1) * 78;

  const subtitleLines = wrapText(subtitle, 68).slice(0, 2);
  const subtitleStart = titleBottom + 90;
  const subtitleTspans = subtitleLines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 40}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${COLORS.canvas}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${COLORS.accent}"/>
  <text x="80" y="150" font-family="Consolas, 'Cascadia Code', monospace" font-size="28" fill="${COLORS.accent}">${escapeXml(eyebrow)}</text>
  <text x="80" y="${titleTop}" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="${COLORS.ink}">${titleTspans}</text>
  <text x="80" y="${subtitleStart}" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="${COLORS.inkMuted}">${subtitleTspans}</text>
  <text x="80" y="560" font-family="Consolas, monospace" font-size="24" fill="${COLORS.mutedDim}">thiagobuenogarcia.com</text>
</svg>`;
}

async function rasterize(svg, outPath) {
  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  await rasterize(
    renderOgSvg({
      eyebrow: 'Software Engineer',
      title: 'Thiago Bueno Garcia',
      subtitle: 'Builds the same product across three architectures to learn what each one is actually for.',
    }),
    DEFAULT_OUT,
  );
  console.log(`[og] wrote ${DEFAULT_OUT}`);

  const files = readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const raw = readFileSync(join(PROJECTS_DIR, file), 'utf-8');
    const { data } = matter(raw);
    const id = file.replace(/\.md$/, '');
    const outPath = join(OUT_DIR, `${id}.png`);

    await rasterize(
      renderOgSvg({
        eyebrow: `Case study · ${String(data.status).replace('-', ' ')}`,
        title: data.title,
        subtitle: data.summary,
      }),
      outPath,
    );
    console.log(`[og] wrote ${outPath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
