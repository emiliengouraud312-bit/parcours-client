'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { isTouch, prefersReducedMotion } from '@/lib/motion';

/**
 * Lenis sur pointeur fin uniquement.
 * Sur mobile on ne touche pas au scroll : l'inertie native est meilleure que
 * n'importe quel lissage JS, et ScrollTrigger fonctionne avec les deux.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || isTouch()) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
