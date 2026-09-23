import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif } from 'next/font/google';
import './globals.css';

/* Archivo couvre à elle seule le mot-symbole (wght 800) et les capitales
   espacées de « VINTAGE » (wght 300) — exactement la construction du logo. */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
});

const SITE = 'https://em-vintage.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'E&M Vintage — Du ballot au colis',
  description:
    'Ce qui se passe entre un ballot de 25 kg et le colis que vous recevez. Six étapes, puis les deux comptes Vinted.',
  openGraph: {
    title: 'E&M Vintage — Du ballot au colis',
    description: 'Six étapes, du ballot au colis.',
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
    <html lang="fr" className={`${archivo.variable} ${instrument.variable}`}>
      <body>
        <a className="u-skip" href="#final">
          Aller directement aux comptes Vinted
        </a>
        {children}
      </body>
    </html>
  );
}
