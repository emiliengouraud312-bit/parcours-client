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

/** `ratio` = hauteur / largeur. Par défaut 16/9 en portrait (plein écran). */
const STILLS = [
  { id: 'local-atelier', src: 'assets/source/atelier.jpg', ratio: 3 / 4 },
  { id: 'ch01-reception', src: 'assets/source/grange-ballots.jpg' },
  { id: 'ch03-repassage', src: 'assets/source/polo-raye.jpg' },
  { id: 'ch04-prise-de-vue', src: 'assets/source/atelier.jpg', crop: { left: 1120, top: 0, width: 880, height: 1500 } },
  { id: 'ch05-mise-en-ligne', src: 'assets/source/atelier.jpg', crop: { left: 700, top: 240, width: 844, height: 1260 } },
  { id: 'ch06-expedition', src: 'assets/source/colis-expedition.jpg' },
];

async function stills() {
  mkdirSync(path.join(OUT, 'img'), { recursive: true });
  for (const { id, src, crop, ratio } of STILLS) {
    for (const w of WIDTHS) {
      const base = sharp(path.join(ROOT, src)).rotate();
      const piped = crop ? base.extract(crop) : base;
      const resized = piped.resize({ width: w, height: Math.round(w * (ratio ?? 16 / 9)), fit: 'cover', position: 'attention' });
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
  // L'étiquette intérieure du col porte une marque inventée par le modèle.
  // Les articles vendus sont authentiques : on ne laisse pas une étiquette
  // fantaisiste laisser croire le contraire. Elle est donc floutée.
  '03': {
    id: 'ch03-repassage', start: 0.5, want: 4.4, loop: 'xfade', h264: 31,
    // Coordonnées en fractions de l'image, pour rester justes quelle que
    // soit la résolution d'encodage.
    blur: { cx: 0.328, cy: 0.272, rx: 0.211, ry: 0.075, feather: 0.041 },
  },
  // Même chose qu'en 01 : les mains n'entrent dans le cadre qu'à 2 s.
  '04': { id: 'ch04-prise-de-vue', start: 1.9, want: 5.2, loop: 'xfade' },
  '05': { id: 'ch05-mise-en-ligne', start: 0.08, want: 5.2, loop: 'pingpong' },
  '06': { id: 'ch06-expedition', start: 0.12, want: 5.2, loop: 'xfade' },
};

/* 1080 px de large : sur un téléphone récent, le plein écran fait ~1170 px
   physiques, donc en dessous l'image est agrandie et paraît floue.
   Un seul format, H.264 : il est lu partout, décodé en matériel partout, et
   se révélait déjà plus léger que le VP9 sur cinq clips sur six. Le WebM
   n'apportait rien et Safari iOS l'acceptait parfois pour échouer ensuite. */
const VW = 1080;
const VH = 1920;
const H264 = 29;

const ff = (args) => execFileSync(ffmpegPath, ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'pipe' });

/**
 * Masque d'alpha : une ellipse blanche très adoucie sur fond noir. Utilisé
 * comme canal alpha d'une copie floutée du plan, il fond le flou dans l'image
 * au lieu d'y poser un rectangle de censure.
 */
async function blurMask({ cx, cy, rx, ry, feather }, file) {
  const px = (f, base) => Math.round(f * base);
  const svg = `<svg width="${VW}" height="${VH}"><rect width="${VW}" height="${VH}" fill="black"/>` +
    `<ellipse cx="${px(cx, VW)}" cy="${px(cy, VH)}" rx="${px(rx, VW)}" ry="${px(ry, VH)}" fill="white"/></svg>`;
  await sharp(Buffer.from(svg)).blur(px(feather, VW)).greyscale().png().toFile(file);
}

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
    let filter = clip.loop === 'pingpong' ? pingpongLoop() : xfadeLoop(d, x);
    /** Rayon du flou, en pixels, déduit de la résolution d'encodage. */
    let blurSigma = 0;
    const cut = ['-ss', String(start), '-t', String(d), '-i', src];
    const outLen = clip.loop === 'pingpong' ? d * 2 : d - x;

    if (clip.blur) {
      const mask = path.join(OUT, `video/.mask-${clip.id}.png`);
      await blurMask(clip.blur, mask);
      blurSigma = Math.round(clip.blur.feather * VW);
      cut.push('-loop', '1', '-i', mask);
      filter +=
        `;[v]split=2[base][pre];[pre]gblur=sigma=${blurSigma}[bl];` +
        `[1:v]format=gray,scale=${VW}:${VH}[m];[bl][m]alphamerge[bla];` +
        `[base][bla]overlay=0:0:shortest=1[vout]`;
    }
    const outLabel = clip.blur ? '[vout]' : '[v]';

    ff([...cut, '-filter_complex', filter, '-map', outLabel, '-an',
      '-c:v', 'libx264', '-crf', String(clip.h264 ?? H264), '-preset', 'slow',
      // Profil Main niveau 4.0 : lu par tous les iPhone en circulation.
      '-profile:v', 'main', '-level', '4.0',
      '-pix_fmt', 'yuv420p', '-g', '48', '-fps_mode', 'cfr',
      '-movflags', '+faststart',
      path.join(OUT, `video/${clip.id}.mp4`)]);

    // Poster = la toute première image du clip final, pour qu'aucune
    // bascule ne soit visible quand la lecture démarre.
    const frame = path.join(OUT, `video/${clip.id}.poster.png`);
    if (clip.blur) {
      // L'affiche est la première image du clip : elle doit porter le même
      // flou, sinon l'étiquette réapparaît le temps que la vidéo démarre.
      const mask = path.join(OUT, `video/.mask-${clip.id}.png`);
      ff(['-ss', String(start), '-i', src, '-loop', '1', '-i', mask, '-filter_complex',
        `[0:v]${SCALE},split=2[base][pre];[pre]gblur=sigma=${blurSigma}[bl];` +
        `[1:v]format=gray,scale=${VW}:${VH}[m];[bl][m]alphamerge[bla];[base][bla]overlay=0:0[p]`,
        '-map', '[p]', '-frames:v', '1', frame]);
    } else {
      ff(['-ss', String(start), '-i', src, '-vf', SCALE, '-frames:v', '1', frame]);
    }
    await sharp(frame).avif({ quality: 48, effort: 6 }).toFile(path.join(OUT, `img/${clip.id}-poster.avif`));
    await sharp(frame).webp({ quality: 70 }).toFile(path.join(OUT, `img/${clip.id}-poster.webp`));
    rmSync(frame, { force: true });
    if (clip.blur) rmSync(path.join(OUT, `video/.mask-${clip.id}.png`), { force: true });

    const kb = (p) => Math.round(statSync(p).size / 1024);
    console.log(
      `clip  ${clip.id.padEnd(18)} rush ${total.toFixed(2)}s -> ${outLen.toFixed(2)}s ${clip.loop}` +
        `   mp4 ${kb(path.join(OUT, `video/${clip.id}.mp4`))}ko`,
    );
  }
}

// `npm run media -- video` ne refait que les vidéos ; `-- img` que les images.
// Un troisième argument limite aux chapitres cités : `-- video 01,02,04`.
const only = process.argv[2];
const pick = process.argv[3]?.split(',').map((s) => s.trim());
if (only !== 'video') await stills();
if (only !== 'img') await clips(pick);
