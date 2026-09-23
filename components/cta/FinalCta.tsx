'use client';

import { useEffect, useRef } from 'react';
import { VINTED, WOMEN_URL } from '@/lib/vinted';
import VintedLink from './VintedLink';

/**
 * Le CTA n'utilise ni GSAP ni Lenis : c'est la seule raison d'être du site,
 * il ne doit dépendre d'aucune librairie. L'état par défaut est « visible » ;
 * le masquage n'existe que si le JS a pu poser `data-js` sur <html>. Si quoi
 * que ce soit échoue en amont, les deux boutons restent affichés.
 */
export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.documentElement.dataset.js = 'on';

    const reveal = () => el.setAttribute('data-reveal', 'on');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return reveal();

    // Le même observateur révèle le CTA et efface le rail de progression :
    // arrivé au choix de taille, plus rien ne doit passer devant les boutons.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) reveal();
          document.documentElement.toggleAttribute('data-at-end', e.isIntersecting);
        }),
      { rootMargin: '0px 0px -22% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.documentElement.removeAttribute('data-at-end');
    };
  }, []);

  return (
    <section className="final" id="final" ref={ref} aria-labelledby="final-title">
      <div className="final__inner">
        <h2 className="final__title" id="final-title">
          Choisissez votre taille
        </h2>

        {/* Les deux boutons homme entrent au même instant, avec le même délai :
            aucun des deux ne doit jamais passer devant l'autre. */}
        <div className="final__choice">
          {[VINTED.menSmall, VINTED.menLarge].map((acc) => (
            <VintedLink key={acc.handle} className="size-btn" href={acc.url}>
              <span className="size-btn__size u-display">{acc.sizes}</span>
              <span className="size-btn__handle u-eyebrow">{acc.handle}</span>
            </VintedLink>
          ))}
        </div>

        <p className="final__women">
          <VintedLink href={WOMEN_URL}>
            quelques pièces femme disponibles <span aria-hidden="true">→</span>
          </VintedLink>
        </p>
      </div>
    </section>
  );
}
