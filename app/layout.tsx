import type { Metadata, Viewport } from 'next';
import { Archivo, DM_Sans, Instrument_Serif, League_Spartan } from 'next/font/google';
import './globals.css';

/* Archivo couvre le mot-symbole (wght 800) et les capitales espacées de
   « VINTAGE » (wght 300) — exactement la construction du logo. Elle ne sert
   qu'aux titres. */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

/* DM Sans porte tout le texte courant, les étiquettes et l'interface. */
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm',
  display: 'swap',
});

/* Une ligne par chapitre, en italique : le contraste éditorial du site. */
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
});

/* Réservée à l'accroche du choix de taille, tout en bas de page : elle n'a
   rien à faire dans le chemin critique du premier écran, d'où preload: false. */
const spartan = League_Spartan({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-spartan',
  display: 'swap',
  preload: false,
});

/**
 * L'adresse du site en production. Vercel fournit le domaine du projet au
 * build, donc l'aperçu de partage (WhatsApp, SMS, réseaux) pointe au bon
 * endroit quel que soit le nom choisi. `NEXT_PUBLIC_SITE_URL` permet de
 * forcer un domaine personnalisé le jour où il y en a un.
 */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://em-vintage.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'E&M Vintage — Vêtements de marque, seconde main',
  description:
    'Ralph Lauren, Tommy Hilfiger, Lacoste, Patagonia, The North Face. Des pièces triées, lavées, repassées et photographiées une par une, en Vendée.',
  openGraph: {
    title: 'E&M Vintage — Vêtements de marque, seconde main',
    description: 'Triées, lavées, repassées, photographiées une par une. En Vendée.',
    locale: 'fr_FR',
    type: 'website',
    url: SITE,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
  // Jamais de maximumScale/userScalable: no — ça casse le zoom sur mobile.
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${dmSans.variable} ${instrument.variable} ${spartan.variable}`}
    >
      <body>
        <a className="u-skip" href="#final">
          Aller directement aux comptes Vinted
        </a>
        {children}
      </body>
    </html>
  );
}
