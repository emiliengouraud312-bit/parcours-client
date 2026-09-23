import { BRANDS } from '@/content/site';

/**
 * Hero. Sans JS et sans image : le mot-symbole est du texte, l'intro est en
 * CSS pur. L'élément LCP s'affiche avant même que GSAP soit téléchargé.
 */
export default function Hero() {
  return (
    <section className="hero" data-hero>
      <div className="hero__inner">
        <h1 className="mark" data-hero-mark>
          <span className="mark__em">E&amp;M</span>
          <span className="mark__vintage">Vintage</span>
        </h1>

        <span className="hero__rule" aria-hidden="true" />

        <p className="hero__baseline u-serif">Des vêtements de marque, de seconde main.</p>

        <ul className="hero__brands">
          {BRANDS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="hero__hint" data-hero-hint aria-hidden="true">
        <span className="hero__hint-label u-eyebrow">Faites défiler</span>
        <span className="hero__hint-line" />
      </div>
    </section>
  );
}
