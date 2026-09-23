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
 */
export default function ScrollChoreography() {
  useEffect(() => {
    const root = document.documentElement;
    const setTone = (bg: string, fg: string) => {
      root.style.setProperty('--bg-now', bg);
      root.style.setProperty('--fg-now', fg);
    };

    // Parcours alternatif : pas de dégradé, pas de pin, tout est déjà en place.
    if (prefersReducedMotion()) {
      root.dataset.static = 'true';
      setTone(HERO_TONE, HERO_FG);
      return;
    }

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
          start: 'bottom 80%',
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

        /* ---- Média : parallaxe et respiration, scrubbées --------------- */
        const media = section.querySelector('[data-media] .media__el, [data-media] .media__bare');
        if (media) {
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
            .from(section.querySelector('[data-anim="line"]'), { opacity: 0, y: 16, duration: 0.6, ease: EASE.out }, '-=0.5');
        }

        /* ---- Sortie : fondu vers le ton du chapitre --------------------
           Le sticky se décroche et remonte ; on vide son média avant que
           la jointure avec le chapitre suivant ne devienne visible. */
        const stickyMedia = section.querySelector('[data-media]');
        if (stickyMedia) {
          gsap.to([stickyMedia, caption].filter(Boolean) as Element[], {
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'bottom 96%', end: 'bottom 52%', scrub: true },
          });
        }

        /* ---- Vidéo : on ne charge et ne joue que dans le viewport ------ */
        const video = section.querySelector<HTMLVideoElement>('[data-media-video]');
        if (video) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => {
              if (self.isActive) void video.play().catch(() => {});
              else video.pause();
            },
          });
        }
      });

      /* ---- Rail de progression --------------------------------------- */
      const fill = document.querySelector<HTMLElement>('[data-rail-fill]');
      const num = document.querySelector<HTMLElement>('[data-rail-n]');
      const first = sections[0];
      const last = sections[sections.length - 1];

      if (fill && num && first && last) {
        ScrollTrigger.create({
          trigger: first,
          start: 'top center',
          endTrigger: last,
          end: 'bottom center',
          scrub: true,
          onUpdate: (self) => {
            fill.style.transform = `scaleY(${self.progress})`;
            const i = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * CHAPTERS.length));
            const label = CHAPTERS[i].n;
            if (num.textContent !== label) num.textContent = label;
          },
        });
      }

      /* Le CTA final s'anime seul (IntersectionObserver + CSS) : il ne doit
         dépendre ni de GSAP ni de Lenis. Voir components/cta/FinalCta.tsx. */
    });

    // Les polices changent les hauteurs de texte : on recalcule une fois posées.
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return null;
}
