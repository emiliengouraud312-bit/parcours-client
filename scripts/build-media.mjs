/**
 * Génère les dérivés servis par le site à partir de assets/.
 * Tourne à la main (npm run media), pas au build Vercel : les résultats
 * sont commités dans public/media, donc le build de prod ne fait que servir.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public/media');
const WIDTHS = [640, 960, 1280];

/** Cadrages portrait 9:16 extraits des photos sources. */
const STILLS = [
  { id: 'ch01-reception', src: 'assets/source/grange-ballots.jpg' },
  { id: 'ch03-repassage', src: 'assets/source/polo-raye.jpg' },
  { id: 'ch04-prise-de-vue', src: 'assets/source/atelier.jpg', crop: { left: 1120, top: 0, width: 880, height: 1500 } },
  { id: 'ch05-mise-en-ligne', src: 'assets/source/atelier.jpg', crop: { left: 700, top: 240, width: 844, height: 1260 } },
  { id: 'ch06-expedition', src: 'assets/source/colis-expedition.jpg' },
];

async function stills() {
  mkdirSync(path.join(OUT, 'img'), { recursive: true });
  for (const { id, src, crop } of STILLS) {
    for (const w of WIDTHS) {
      const base = sharp(path.join(ROOT, src)).rotate();
      const piped = crop ? base.extract(crop) : base;
      const resized = piped.resize({ width: w, height: Math.round((w * 16) / 9), fit: 'cover', position: 'attention' });
      await resized.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT, `img/${id}-${w}.avif`));
      await resized.clone().webp({ quality: 74 }).toFile(path.join(OUT, `img/${id}-${w}.webp`));
    }
    console.log(`img  ${id}`);
  }
}

/**
 * Transcode les rushes de assets/video-raw/ : boucle courte, WebM VP9 +
 * MP4 H.264 pour iOS, poster AVIF sur la première image.
 * Nommage attendu : 01-*.mp4, 02-*.mp4, ... (le numéro fait la liaison).
 */
const CLIPS = {
  '01': { id: 'ch01-reception', start: 0.6, dur: 4.5 },
  '02': { id: 'ch02-lavage', start: 0.6, dur: 4.5 },
  '03': { id: 'ch03-repassage', start: 0.6, dur: 4.5 },
  '04': { id: 'ch04-prise-de-vue', start: 0.6, dur: 4.5 },
  '05': { id: 'ch05-mise-en-ligne', start: 0.4, dur: 4.0 },
  '06': { id: 'ch06-expedition', start: 0.4, dur: 4.0 },
};

function ffmpegBin() {
  try { return execFileSync('node', ['-p', "require('ffmpeg-static')"], { encoding: 'utf8' }).trim(); }
  catch { return 'ffmpeg'; }
}

async function clips() {
  const RAW = path.join(ROOT, 'assets/video-raw');
  if (!existsSync(RAW)) return console.log('video-raw absent — rien à transcoder');
  const files = readdirSync(RAW).filter((f) => /\.(mp4|mov|webm)$/i.test(f));
  if (!files.length) return console.log('video-raw vide — rien à transcoder');

  mkdirSync(path.join(OUT, 'video'), { recursive: true });
  mkdirSync(path.join(OUT, 'img'), { recursive: true });
  const ff = ffmpegBin();
  // 720x1280 : suffisant en plein écran mobile, et divise le poids par ~4 vs 1080p.
  const scale = 'scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,fps=24';

  for (const file of files) {
    const key = (file.match(/(\d{2})/) || [])[1];
    const clip = CLIPS[key];
    if (!clip) { console.log(`skip ${file} (pas de chapitre reconnu)`); continue; }
    const src = path.join(RAW, file);
    const t = ['-ss', String(clip.start), '-t', String(clip.dur)];

    execFileSync(ff, ['-y', ...t, '-i', src, '-vf', scale, '-an',
      '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2',
      path.join(OUT, `video/${clip.id}.webm`)], { stdio: 'pipe' });

    execFileSync(ff, ['-y', ...t, '-i', src, '-vf', scale, '-an',
      '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-profile:v', 'main',
      '-movflags', '+faststart', '-pix_fmt', 'yuv420p',
      path.join(OUT, `video/${clip.id}.mp4`)], { stdio: 'pipe' });

    const frame = path.join(OUT, `video/${clip.id}.poster.png`);
    execFileSync(ff, ['-y', '-ss', String(clip.start), '-i', src, '-vf', scale, '-frames:v', '1', frame], { stdio: 'pipe' });
    await sharp(frame).avif({ quality: 50, effort: 6 }).toFile(path.join(OUT, `img/${clip.id}-poster.avif`));
    await sharp(frame).webp({ quality: 70 }).toFile(path.join(OUT, `img/${clip.id}-poster.webp`));
    execFileSync('rm', ['-f', frame]);

    const kb = (p) => Math.round(statSync(p).size / 1024);
    console.log(`clip ${clip.id}  webm ${kb(path.join(OUT, `video/${clip.id}.webm`))}ko  mp4 ${kb(path.join(OUT, `video/${clip.id}.mp4`))}ko`);
  }
}

await stills();
await clips();
