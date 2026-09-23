/**
 * Génère les dérivés servis par le site à partir de assets/.
 * Tourne à la main (npm run media), pas au build Vercel : les résultats sont
 * commités dans public/media, donc le build de prod ne fait que les servir.
 */
import { existsSync, mkdirSync, readdirSync, statSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public/media');
const WIDTHS = [640, 960, 1280];

/* ---------------------------------------------------------------- images */

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
      await resized.clone().avif({ quality: 50, effort: 6 }).toFile(path.join(OUT, `img/${id}-${w}.avif`));
      await resized.clone().webp({ quality: 72 }).toFile(path.join(OUT, `img/${id}-${w}.webp`));
    }
    console.log(`img   ${id}`);
  }
}

/* ---------------------------------------------------------------- vidéos */

/**
 * `start` : on coupe le tout début, où Veo met souvent une image figée.
 * `want`  : durée visée, ramenée à ce que le rush contient réellement.
 * `loop`  : 'xfade' fond la fin sur le début (garde le sens du geste) ;
 *           'pingpong' rejoue à l'envers (bon pour un va-et-vient, et
 *           seule option tenable sur un rush très court).
 */
const CLIPS = {
  // Les deux premières secondes sont un plan figé : la main n'entre qu'à 2 s.
  '01': { id: 'ch01-reception', start: 1.9, want: 5.2, loop: 'xfade' },
  // Un visage traverse le cadre entre 2 s et 3,5 s. La consigne était « mains
  // seules » : on garde la fenêtre d'après, où la porte se ferme et le tambour
  // tourne — c'est aussi le meilleur plan des huit secondes.
  '02': { id: 'ch02-lavage', start: 4.3, want: 3.6, loop: 'xfade' },
  // La vapeur est du bruit pur : c'est le clip le plus cher à encoder.
  // Il prend un réglage plus serré et une boucle plus courte.
  '03': { id: 'ch03-repassage', start: 0.5, want: 4.4, loop: 'xfade', vp9: 46, h264: 34 },
  // Même chose qu'en 01 : les mains n'entrent dans le cadre qu'à 2 s.
  '04': { id: 'ch04-prise-de-vue', start: 1.9, want: 5.2, loop: 'xfade' },
  '05': { id: 'ch05-mise-en-ligne', start: 0.08, want: 5.2, loop: 'pingpong' },
  '06': { id: 'ch06-expedition', start: 0.12, want: 5.2, loop: 'xfade' },
};

/* Ces clips sont de l'ambiance de fond, sous un voile et un grain : 640 px
   de large suffisent largement, et divisent le poids par deux. */
const VW = 640;
const VH = 1138;
const VP9 = 42;
const H264 = 32;

const ff = (args) => execFileSync(ffmpegPath, ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'pipe' });

function durationOf(file) {
  const out = execFileSync(ffmpegPath, ['-hide_banner', '-i', file], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const m = out.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : 0;
}
// ffmpeg sort en code 1 quand on ne lui donne pas de sortie : le texte est sur stderr.
function probe(file) {
  try { return durationOf(file); }
  catch (e) { const m = String(e.stderr).match(/Duration: (\d+):(\d+):([\d.]+)/); return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : 0; }
}

const SCALE = `scale=${VW}:${VH}:force_original_aspect_ratio=increase,crop=${VW}:${VH},fps=24`;

/** Boucle sans raccord : la fin est fondue sur le début, le geste garde son sens. */
function xfadeLoop(d, x) {
  return (
    `[0:v]${SCALE},split=3[s1][s2][s3];` +
    // `fps` après chaque trim : xfade exige une cadence constante, que
    // trim+setpts perd en route.
    `[s1]trim=start=0:end=${x},setpts=PTS-STARTPTS,fps=24[head];` +
    `[s2]trim=start=${(d - x).toFixed(3)}:end=${d.toFixed(3)},setpts=PTS-STARTPTS,fps=24[tail];` +
    `[s3]trim=start=${x}:end=${(d - x).toFixed(3)},setpts=PTS-STARTPTS,fps=24[rest];` +
    `[tail][head]xfade=transition=fade:duration=${x}:offset=0[opening];` +
    `[opening][rest]concat=n=2:v=1[v]`
  );
}

/** Aller-retour : intrinsèquement bouclable, et naturel sur un va-et-vient. */
function pingpongLoop() {
  return `[0:v]${SCALE},split=2[f][r];[r]reverse[rv];[f][rv]concat=n=2:v=1[v]`;
}

async function clips(pick) {
  const RAW = path.join(ROOT, 'assets/video-raw');
  if (!existsSync(RAW)) return console.log('assets/video-raw absent — rien à transcoder');
  const files = readdirSync(RAW).filter((f) => /\.(mp4|mov|webm)$/i.test(f)).sort();
  if (!files.length) return console.log('assets/video-raw vide — rien à transcoder');

  mkdirSync(path.join(OUT, 'video'), { recursive: true });
  mkdirSync(path.join(OUT, 'img'), { recursive: true });

  for (const file of files) {
    const key = (file.match(/(\d{2})/) || [])[1];
    const clip = CLIPS[key];
    if (!clip) { console.log(`skip  ${file} (aucun chapitre reconnu)`); continue; }
    if (pick && !pick.includes(key)) continue;

    const src = path.join(RAW, file);
    const total = probe(src);
    // Le rush commande : on ne demande jamais plus que ce qu'il contient.
    const start = Math.min(clip.start, Math.max(0, total - 0.6));
    const d = Math.min(clip.want, total - start - 0.02);
    if (d <= 0.4) { console.log(`skip  ${file} (trop court : ${total}s)`); continue; }

    const x = clip.loop === 'xfade' ? Math.min(0.7, d / 4) : 0;
    const filter = clip.loop === 'pingpong' ? pingpongLoop() : xfadeLoop(d, x);
    const cut = ['-ss', String(start), '-t', String(d), '-i', src];
    const outLen = clip.loop === 'pingpong' ? d * 2 : d - x;

    ff([...cut, '-filter_complex', filter, '-map', '[v]', '-an',
      '-c:v', 'libvpx-vp9', '-crf', String(clip.vp9 ?? VP9), '-b:v', '0', '-row-mt', '1',
      '-deadline', 'good', '-cpu-used', '2',
      '-auto-alt-ref', '1', '-lag-in-frames', '25', '-tile-columns', '1',
      path.join(OUT, `video/${clip.id}.webm`)]);

    ff([...cut, '-filter_complex', filter, '-map', '[v]', '-an',
      '-c:v', 'libx264', '-crf', String(clip.h264 ?? H264), '-preset', 'slow', '-profile:v', 'main',
      '-movflags', '+faststart', '-pix_fmt', 'yuv420p',
      path.join(OUT, `video/${clip.id}.mp4`)]);

    // Poster = la toute première image du clip final, pour qu'aucune
    // bascule ne soit visible quand la lecture démarre.
    const frame = path.join(OUT, `video/${clip.id}.poster.png`);
    ff(['-ss', String(start), '-i', src, '-vf', SCALE, '-frames:v', '1', frame]);
    await sharp(frame).avif({ quality: 48, effort: 6 }).toFile(path.join(OUT, `img/${clip.id}-poster.avif`));
    await sharp(frame).webp({ quality: 70 }).toFile(path.join(OUT, `img/${clip.id}-poster.webp`));
    rmSync(frame, { force: true });

    const kb = (p) => Math.round(statSync(p).size / 1024);
    console.log(
      `clip  ${clip.id.padEnd(18)} rush ${total.toFixed(2)}s -> ${outLen.toFixed(2)}s ${clip.loop}` +
        `   webm ${kb(path.join(OUT, `video/${clip.id}.webm`))}ko  mp4 ${kb(path.join(OUT, `video/${clip.id}.mp4`))}ko`,
    );
  }
}

// `npm run media -- video` ne refait que les vidéos ; `-- img` que les images.
// Un troisième argument limite aux chapitres cités : `-- video 01,02,04`.
const only = process.argv[2];
const pick = process.argv[3]?.split(',').map((s) => s.trim());
if (only !== 'video') await stills();
if (only !== 'img') await clips(pick);
