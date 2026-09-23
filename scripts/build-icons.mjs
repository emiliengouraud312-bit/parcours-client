import sharp from 'sharp';
const SRC = 'assets/source/logo-em-vintage.png';

// Favicon / icône d'app : le logo recadré serré sur le mot-symbole.
await sharp(SRC).resize(512, 512, { fit: 'cover' }).png().toFile('app/icon.png');
await sharp(SRC).resize(180, 180, { fit: 'cover' }).png().toFile('app/apple-icon.png');

// Image de partage : le logo centré sur l'anthracite exact du logo.
const mark = await sharp(SRC).extract({ left: 390, top: 560, width: 780, height: 440 }).resize(620).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#2b2b2b' } })
  .composite([{ input: mark, gravity: 'centre' }])
  .png()
  .toFile('app/opengraph-image.png');
console.log('icônes + OG générées');
