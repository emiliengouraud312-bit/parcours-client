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

    // Le menu demande la mise en pause quand il s'ouvre : sinon Lenis
    // continue de capter la molette et le panneau ne défile pas.
    const onLock = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
    window.addEventListener('em:scroll-lock', onLock as EventListener);

    return () => {
      window.removeEventListener('em:scroll-lock', onLock as EventListener);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
