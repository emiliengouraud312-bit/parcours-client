/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Les dérivés AVIF/WebP et les vidéos sont pré-générés et commités dans public/media.
  // Aucune optimisation d'image à la volée => aucun quota Vercel consommé.
  images: { unoptimized: true },
};
export default nextConfig;
