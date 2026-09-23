'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { EASE, SCRUB, prefersReducedMotion } from '@/lib/motion';
import { CHAPTERS } from '@/components/chapters/chapters.data';

const HERO_TONE = '#1a1a1a';
const HERO_FG = '#f1efe7';

/**
 * Toute la chorégraphie est ici plutôt qu'éparpillée dans les composants :
 * l'arc de luminosité traverse les sections, il a besoin de les voir ensemble.
 *
 * Le CTA final est délibérément absent : il s'anime seul, sans GSAP.
 */
export default function ScrollChoreography() {
  useEffect(() => {
    const root = document.documentElement;
    const setTone = (bg: string, fg: string) => {
      root.style.setProperty('--bg-now', bg);
      root.style.setProperty('--fg-now', fg);
    };

    const reveals = document.querySelectorAll<HTMLElement>('[data-reveal-section]');
    const showAll = () => reveals.forEach((el) => el.setAttribute('data-reveal', 'on'));

    // Parcours alternatif : pas de dégradé, pas de sticky, aucune lecture.
    // Les affiches des clips restent affichées comme des photos.
    if (prefersReducedMotion()) {
      root.dataset.static = 'true';
      setTone(HERO_TONE, HERO_FG);
      showAll();
      return;
    }

    // Le masquage des sections de texte n'existe qu'à partir d'ici : si ce
    // code ne tourne pas, elles restent visibles plutôt que de disparaître.
    root.dataset.animReady = 'on';
    const sectionIo = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute('data-reveal', 'on');
          sectionIo.unobserve(e.target);
        }),
      { rootMargin: '0px 0px -18% 0px' },
    );
    reveals.forEach((el) => sectionIo.observe(el));


    const ctx = gsap.context(() => {
      /* ---- Hero : sortie, et relais vers le masthead ------------------ */
      const hero = document.querySelector('[data-hero]');
      const mark = document.querySelector('[data-hero-mark]');

      if (hero && mark) {
        gsap
          .timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: SCRUB } })
          .to(mark, { scale: 0.45, yPercent: -22, opacity: 0, ease: 'none' }, 0)
          .to('[data-hero] .hero__rule, [data-hero] .hero__baseline', { opacity: 0, ease: 'none' }, 0)
          .to('[data-hero-hint]', { opacity: 0, ease: 'none' }, 0);

        ScrollTrigger.create({
          trigger: hero,
          start: 'bottom 90%',
          onEnter: () => root.setAttribute('data-chrome', 'on'),
          onLeaveBack: () => root.removeAttribute('data-chrome'),
        });
      }

      /* ---- L'arc de luminosité ---------------------------------------
         Chaque chapitre interpole depuis le ton du précédent. Le site
         s'éclaircit jusqu'au studio (04) puis redescend vers l'anthracite. */
      const sections = gsap.utils.toArray<HTMLElement>('[data-chapter]');

      sections.forEach((section, i) => {
        const prev = i === 0 ? { tone: HERO_TONE, fg: HERO_FG } : CHAPTERS[i - 1];
        const next = CHAPTERS[i];
        const lerpBg = gsap.utils.interpolate(prev.tone, next.tone);
        const lerpFg = gsap.utils.interpolate(prev.fg, next.fg);

        ScrollTrigger.create({
          trigger: section,
          start: 'top 78%',
          end: 'top 22%',
          scrub: true,
          onUpdate: (self) => setTone(lerpBg(self.progress), lerpFg(self.progress)),
        });

        /* ---- Entrée : le chapitre arrive en aplat, puis se révèle -------
           Le voile est à la couleur du chapitre, donc au moment où la
           jointure avec le chapitre précédent est visible, il n'y a qu'un
           aplat à l'écran. Deux images ne se touchent jamais. */
        const veil = section.querySelector('[data-media-veil]');
        if (veil) {
          gsap.fromTo(
            veil,
            { opacity: 1 },
            {
              opacity: 0,
              ease: 'none',
              scrollTrigger: { trigger: section, start: 'top 88%', end: 'top 16%', scrub: true },
            },
          );
        }

        /* ---- Média : parallaxe et respiration, scrubbées ---------------
           L'affiche et la vidéo bougent ensemble, sinon le fondu de l'une
           vers l'autre laisserait voir un décalage. */
        const media = gsap.utils.toArray<Element>(
          section.querySelectorAll('[data-media] .media__el, [data-media] .media__bare'),
        );
        if (media.length) {
          gsap.fromTo(
            media,
            { scale: 1.09, yPercent: -3.5 },
            {
              scale: 1,
              yPercent: 3.5,
              ease: 'none',
              scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: SCRUB },
            },
          );
        }

        /* ---- Texte : entrée rythmée, pas scrubbée ---------------------
           Sur mobile la vitesse de scroll varie trop : une entrée au temps
           reste lisible là où une entrée scrubbée saute. */
        const caption = section.querySelector('.chapter__caption');
        if (caption) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: 'top 58%',
                end: 'bottom 42%',
                toggleActions: 'play reverse play reverse',
              },
            })
            .from(section.querySelector('[data-anim="n"]'), { opacity: 0, y: 14, duration: 0.5, ease: EASE.out })
            .from(
              section.querySelector('[data-anim="title"]'),
              { yPercent: 108, duration: 0.85, ease: EASE.out },
              '-=0.34',
            )
            .from(section.querySelector('[data-anim="line"]'), { opacity: 0, y: 16, duration: 0.6, ease: EASE.out }, '-=0.5')
            .from(section.querySelector('[data-anim="next"]'), { opacity: 0, duration: 0.5, ease: 'power1.out' }, '-=0.25');
        }

        /* ---- Sortie ----------------------------------------------------
           C'est le bloc entier qui s'efface, fond compris — pas seulement son
           média. Sinon le fond du chapitre sortant laisse un liseré de sa
           couleur en haut du suivant, très visible quand on passe du crème
           à l'anthracite. Ce qui apparaît dessous est le fond de page, déjà
           interpolé vers le ton du chapitre qui arrive : invisible. */
        const sticky = section.querySelector('.chapter__sticky');
        if (sticky) {
          gsap.to(sticky, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'bottom 96%', end: 'bottom 50%', scrub: true },
          });
        }

      });

      /* ---- Rail de progression ---------------------------------------
         Un segment par chapitre : la barre dit combien d'étapes il reste,
         pas seulement où on en est. */
      const segs = document.querySelectorAll<HTMLElement>('[data-rail-seg]');
      const num = document.querySelector<HTMLElement>('[data-rail-n]');
      const first = sections[0];
      const last = sections[sections.length - 1];

      if (first && last) {
        // Le rail n'apparaît que sur la plage des chapitres.
        ScrollTrigger.create({
          trigger: first,
          start: 'top 80%',
          endTrigger: last,
          end: 'bottom 40%',
          onToggle: (self) => root.toggleAttribute('data-chapters', self.isActive),
        });
      }

      if (segs.length && num && first && last) {
        let shown = -1;
        ScrollTrigger.create({
          trigger: first,
          start: 'top center',
          endTrigger: last,
          end: 'bottom center',
          scrub: true,
          onUpdate: (self) => {
            const i = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * CHAPTERS.length));
            if (i === shown) return;
            shown = i;
            segs.forEach((seg, k) => seg.toggleAttribute('data-on', k <= i));
            num.textContent = CHAPTERS[i].n;
          },
        });
      }
    });


    // Les polices changent les hauteurs de texte : on recalcule une fois posées.
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      sectionIo.disconnect();
      delete root.dataset.animReady;
      root.removeAttribute('data-chapters');
      ctx.revert();
    };
  }, []);

  return null;
}
