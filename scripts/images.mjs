// Generates the image files the page ships (dev-only, not part of the build). Run it by
// hand after adding or replacing a photo or decoration, then commit the outputs:
//   node scripts/images.mjs
//
// 1. Photos (src/assets/korea/photo-*.webp, src/assets/korea/pointcamp/pc-*.webp) are the
//    sources and are never imported: only their width variants are bundled, written to
//    src/assets/korea/responsive/<name>-<width>w.webp and read by src/lib/responsive.ts.
//    Widths larger than the source are clamped to the source width (never upscaled).
// 2. Decorations (paper tile, lime spray, stickers, stamps) are re-encoded as WebP from
//    the design originals in _reference/korea-design/assets into src/assets/korea/.
//
// Re-running is idempotent.
import { mkdirSync, readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = "src/assets/korea/responsive";

/** Photos: width variants (max rendered width ×2 for retina is at most ~1150 px). */
const PHOTO_JOBS = [
  { from: "src/assets/korea", match: /^photo-[a-z-]+\.webp$/ },
  { from: "src/assets/korea/pointcamp", match: /^pc-[a-z-]+\.webp$/ },
];
const WIDTHS = [480, 800, 1200];
const PHOTO_QUALITY = 72;
/** Each delivered file stays under this; busy photos step their quality down to fit. */
const MAX_BYTES = 150 * 1024;
const MIN_QUALITY = 56;
/** Photos the page does not use (kept as sources only). */
const UNUSED = new Set(["photo-busan-sky-capsule"]);

/** Decorations: one WebP each, at the design size unless `width` is given. */
const DECOR_FROM = "_reference/korea-design/assets";
const DECOR_TO = "src/assets/korea";
const DECOR_JOBS = [
  // Paper texture tile (background of every section; the hero LCP element).
  { file: "paper-tile.jpg", quality: 82 },
  // Lime spray: a soft blur stretched to its box (at most 360×250), so 600 px wide is enough.
  { file: "spray-lime.png", width: 600, quality: 75 },
  { file: "stamp-10-days.png", quality: 85 },
  { file: "stamp-unesco.png", quality: 85 },
  { file: "plane-holo.png", quality: 85 },
  { file: "sticker-heart-red.png", quality: 85 },
  { file: "sticker-sakura.png", quality: 85 },
  { file: "sticker-smiley.png", quality: 85 },
  { file: "sticker-star-holo.png", quality: 85 },
];

const kib = (bytes) => `${(bytes / 1024).toFixed(0)} KiB`;
let total = 0;

mkdirSync(path.join(root, OUT), { recursive: true });
for (const job of PHOTO_JOBS) {
  const fromDir = path.join(root, job.from);
  for (const file of readdirSync(fromDir)
    .filter((f) => job.match.test(f))
    .sort()) {
    const src = path.join(fromDir, file);
    const base = file.replace(/\.webp$/, "");
    if (UNUSED.has(base)) continue;
    const meta = await sharp(src).metadata();
    const widths = [...new Set(WIDTHS.map((w) => Math.min(w, meta.width)))];
    for (const target of widths) {
      // Step the quality down to fit MAX_BYTES; below MIN_QUALITY, narrow the file instead.
      let width = target;
      let quality = PHOTO_QUALITY;
      let out;
      for (;;) {
        out = path.join(root, OUT, `${base}-${width}w.webp`);
        await sharp(src).resize({ width }).webp({ quality, effort: 6 }).toFile(out);
        if (statSync(out).size <= MAX_BYTES) break;
        unlinkSync(out);
        if (quality - 4 >= MIN_QUALITY) quality -= 4;
        else [width, quality] = [width - 100, PHOTO_QUALITY - 8];
      }
      total += statSync(out).size;
      const { height } = await sharp(out).metadata();
      console.log(
        `${path.relative(root, out)}  ${width}×${height}  q${quality}  ${kib(statSync(out).size)}`,
      );
    }
  }
}

for (const job of DECOR_JOBS) {
  const src = path.join(root, DECOR_FROM, job.file);
  const out = path.join(root, DECOR_TO, job.file.replace(/\.(png|jpe?g)$/, ".webp"));
  let pipeline = sharp(src);
  if (job.width) pipeline = pipeline.resize({ width: job.width });
  await pipeline.webp({ quality: job.quality, alphaQuality: 100, effort: 6 }).toFile(out);
  total += statSync(out).size;
  const { width, height } = await sharp(out).metadata();
  console.log(`${path.relative(root, out)}  ${width}×${height}  ${kib(statSync(out).size)}`);
}
console.log(`total ${kib(total)}`);
