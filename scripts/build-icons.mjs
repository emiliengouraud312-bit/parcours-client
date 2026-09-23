/**
 * Fabrique le mot-symbole « EM » et les icônes qui en découlent.
 *
 * Les lettres ne sont pas retypographiées : elles sont découpées dans le
 * logo d'origine et recollées sans l'esperluette. Le dessin, la graisse et
 * les proportions restent donc exactement ceux du logo.
 */
import sharp from 'sharp';

const SRC = 'assets/source/logo-em-vintage.png';
const INK = '#2b2b2b';

/** Positions relevées dans le logo d'origine (1563 x 1563). */
const BAND = { top: 624, height: 232 };
const E = { left: 497, width: 132 };
const M = { left: 822, width: 256 };
/** Approche entre les deux lettres, calée sur celle du logo d'origine. */
const GAP = 16;

const glyph = (g) =>
  sharp(SRC).extract({ left: g.left, top: BAND.top, width: g.width, height: BAND.height }).toBuffer();

const [e, m] = await Promise.all([glyph(E), glyph(M)]);
const W = E.width + GAP + M.width;
const H = BAND.height;

/** Le mot-symbole seul, sur fond transparent. */
const mark = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: e, left: 0, top: 0 },
    { input: m, left: E.width + GAP, top: 0 },
  ])
  .png()
  .toBuffer();

await sharp(mark).toFile('assets/source/mot-symbole-em.png');

/** Pose le mot-symbole, centré, sur un aplat anthracite. */
async function plate(w, h, ratio, out) {
  const targetW = Math.round(w * ratio);
  const scaled = await sharp(mark).resize({ width: targetW }).toBuffer();
  await sharp({ create: { width: w, height: h, channels: 3, background: INK } })
    .composite([{ input: scaled, gravity: 'centre' }])
    .png()
    .toFile(out);
}

// Le logo de référence, au format carré du fichier d'origine.
await plate(1563, 1563, W / 1563, 'assets/source/logo-em.png');
// Icône d'onglet et icône d'application.
await plate(512, 512, 0.7, 'app/icon.png');
await plate(180, 180, 0.7, 'app/apple-icon.png');
// Image de partage.
await plate(1200, 630, 0.42, 'app/opengraph-image.png');

console.log(`mot-symbole ${W}x${H} — icônes et image de partage générées`);
