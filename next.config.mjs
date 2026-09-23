// PREVIEW_EXPORT=1 produit un export statique. scripts/make-preview.mjs le
// rend ensuite relatif pour qu'il tourne dans un sous-dossier (aperçu). Le
// build de production, lui, n'est pas touché.
const preview = process.env.PREVIEW_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(preview ? { output: 'export', trailingSlash: false } : {}),
  reactStrictMode: true,
  // Les dérivés AVIF/WebP et les vidéos sont pré-générés et commités dans public/media.
  // Aucune optimisation d'image à la volée => aucun quota Vercel consommé.
  images: { unoptimized: true },
};
export default nextConfig;
