// Generates apple-touch-icon and web app manifest icons from the favicon
// mark at build time (same approach as generate-og-images.mjs — sharp
// rasterizing an inline SVG, no external assets).
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ICONS_DIR = join(ROOT, 'public/icons');

const CANVAS = '#0c1015';
const GLYPH = '#ffffff';

// Same mark as public/favicon.svg, recolored to a fixed light-on-dark pair
// (home-screen/app icons don't get prefers-color-scheme, so they need one
// deliberate combination rather than the two the inline favicon switches
// between).
const MARK_PATH =
  'M50.4 78.5a75.1 75.1 0 0 0-28.5 6.9l24.2-65.7c.7-2 1.9-3.2 3.4-3.2h29c1.5 0 2.7 1.2 3.4 3.2l24.2 65.7s-11.6-7-28.5-7L67 45.5c-.4-1.7-1.6-2.8-2.9-2.8-1.3 0-2.5 1.1-2.9 2.7L50.4 78.5Zm-1.1 28.2Zm-4.2-20.2c-2 6.6-.6 15.8 4.2 20.2a17.5 17.5 0 0 1 .2-.7 5.5 5.5 0 0 1 5.7-4.5c2.8.1 4.3 1.5 4.7 4.7.2 1.1.2 2.3.2 3.5v.4c0 2.7.7 5.2 2.2 7.4a13 13 0 0 0 5.7 4.9v-.3l-.2-.3c-1.8-5.6-.5-9.5 4.4-12.8l1.5-1a73 73 0 0 0 3.2-2.2 16 16 0 0 0 6.8-11.4c.3-2 .1-4-.6-6l-.8.6-1.6 1a37 37 0 0 1-22.4 2.7c-5-.7-9.7-2-13.2-6.2Z';

function renderIconSvg(size) {
  // Mark is drawn in a 128x128 box; scale + center it with headroom so it
  // isn't flush against the icon edge (mirrors standard app-icon padding).
  const scale = (size / 128) * 0.62;
  const offset = (size - 128 * scale) / 2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${CANVAS}"/>
  <g transform="translate(${offset} ${offset}) scale(${scale})">
    <path d="${MARK_PATH}" fill="${GLYPH}"/>
  </g>
</svg>`;
}

async function rasterize(size, outPath) {
  await sharp(Buffer.from(renderIconSvg(size))).png().toFile(outPath);
}

async function main() {
  mkdirSync(ICONS_DIR, { recursive: true });

  await rasterize(180, join(ROOT, 'public/apple-touch-icon.png'));
  console.log('[icons] wrote public/apple-touch-icon.png');

  for (const size of [192, 512]) {
    const outPath = join(ICONS_DIR, `icon-${size}.png`);
    await rasterize(size, outPath);
    console.log(`[icons] wrote public/icons/icon-${size}.png`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
