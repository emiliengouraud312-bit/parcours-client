/** Tokens de mouvement. Aucune valeur en dur dans les composants. */
export const EASE = {
  out: 'expo.out',
  inOut: 'power2.inOut',
} as const;

export const DUR = {
  fast: 0.42,
  base: 0.9,
} as const;

/** Lissage du scrub : assez pour gommer la granularité du scroll tactile. */
export const SCRUB = 0.8;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Le smooth scroll JS est réservé au pointeur fin : sur mobile
 *  l'inertie native iOS/Android reste meilleure que tout polyfill. */
export const isTouch = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches;
