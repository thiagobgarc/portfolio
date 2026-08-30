// Generates favicon.ico, apple-touch-icon, and web app manifest icons from
// the gem mark at build time (same approach as generate-og-images.mjs —
// sharp rasterizing an inline SVG, no external assets).
import { mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ICONS_DIR = join(ROOT, 'public/icons');

const CANVAS = '#0c1015';

// Same three-facet gem as public/favicon.svg: a low-poly diamond split into
// a shadowed left facet, a bright center facet, and a mid-tone right facet.
const FACETS = [
  { points: '44,22 12,48 64,118', fill: '#0d5c53' },
  { points: '44,22 84,22 64,118', fill: '#a7f3e0' },
  { points: '84,22 116,48 64,118', fill: '#2dd4bf' },
];

function renderIconSvg(size, { background = true } = {}) {
  // Mark is drawn in a 128x128 box; scale + center it with headroom so it
  // isn't flush against the icon edge (mirrors standard app-icon padding).
  const scale = (size / 128) * 0.62;
  const offset = (size - 128 * scale) / 2;
  const facets = FACETS.map((f) => `<polygon points="${f.points}" fill="${f.fill}"/>`).join('');
  const bg = background ? `<rect width="${size}" height="${size}" fill="${CANVAS}"/>` : '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  ${bg}
  <g transform="translate(${offset} ${offset}) scale(${scale})">
    ${facets}
  </g>
</svg>`;
}

async function pngBuffer(size, opts) {
  return sharp(Buffer.from(renderIconSvg(size, opts))).png().toBuffer();
}

async function rasterize(size, outPath) {
  await writeFile(outPath, await pngBuffer(size));
}

// Hand-rolled ICO container (no extra dependency): the format allows each
// directory entry's image data to just be a PNG blob, which every modern
// consumer of .ico files supports.
async function writeFaviconIco(outPath) {
  const sizes = [16, 32, 48];
  // Transparent, like favicon.svg — some browsers fall back to the .ico
  // instead of the SVG, and it shouldn't show a boxed-in background when
  // they do. The opaque canvas is only correct for the app/home-screen
  // icons below, which are expected to be a filled square.
  const pngs = await Promise.all(sizes.map((size) => pngBuffer(size, { background: false })));

  const HEADER_SIZE = 6;
  const DIR_ENTRY_SIZE = 16;
  let offset = HEADER_SIZE + DIR_ENTRY_SIZE * sizes.length;

  const header = Buffer.alloc(HEADER_SIZE);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4); // image count

  const dirEntries = sizes.map((size, i) => {
    const png = pngs[i];
    const entry = Buffer.alloc(DIR_ENTRY_SIZE);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256px)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // offset from file start
    offset += png.length;
    return entry;
  });

  await writeFile(outPath, Buffer.concat([header, ...dirEntries, ...pngs]));
}

async function main() {
  mkdirSync(ICONS_DIR, { recursive: true });

  await writeFaviconIco(join(ROOT, 'public/favicon.ico'));
  console.log('[icons] wrote public/favicon.ico');

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
