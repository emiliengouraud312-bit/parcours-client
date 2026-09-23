'use client';

import { useEffect, useRef, useState } from 'react';
import type { Chapter } from './chapters.data';

const W = [640, 960, 1280];

/** Économiseur de données : on garde les affiches, on ne charge aucune vidéo. */
const saveData = () =>
  typeof navigator !== 'undefined' &&
  (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Le média d'un chapitre : une affiche, et par-dessus une vidéo qui ne se
 * monte qu'à l'approche.
 *
 * La vidéo porte l'attribut `autoplay` et n'est montée qu'au bon moment,
 * plutôt que d'exister depuis le début et d'être lancée en JavaScript. Sur
 * iOS — donc aussi dans Chrome iPhone, qui utilise le moteur de Safari — la
 * lecture automatique native est le chemin le plus fiable : un `play()`
 * appelé à la main est refusé bien plus souvent. Ne monter la vidéo qu'à
 * l'approche garde le chargement paresseux malgré `autoplay`.
 *
 * L'affiche est la première image exacte du clip et reste derrière : si la
 * lecture ne démarre jamais, on voit une photo, jamais un trou.
 */
export default function ChapterMedia({ chapter }: { chapter: Chapter }) {
  const { id, hasVideo, hasStill, title } = chapter;
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const src = (ext: string, w: number) => `/media/img/${id}-${w}.${ext}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasVideo || saveData() || reduced()) return;

    // Monte la vidéo un écran à l'avance : elle a le temps de se charger,
    // et les chapitres lointains ne coûtent rien.
    const mount = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setMounted(true);
        mount.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    mount.observe(el);
    return () => mount.disconnect();
  }, [hasVideo]);

  useEffect(() => {
    const el = ref.current;
    const v = videoRef.current;
    if (!el || !v) return;

    // Hors écran, on met en pause ; de retour, on relance. Le tout premier
    // démarrage, lui, est laissé à `autoplay`.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) void v.play().catch(() => {});
          else v.pause();
        }),
      { rootMargin: '10% 0px' },
    );
    io.observe(el);

    const onHide = () => document.hidden && v.pause();
    document.addEventListener('visibilitychange', onHide);

    // Filet : un geste lève toutes les restrictions de lecture restantes
    // (mode économie d'énergie notamment).
    const kick = () => {
      if (v.paused && v.getBoundingClientRect().top < window.innerHeight) void v.play().catch(() => {});
    };
    document.addEventListener('touchend', kick, { passive: true });
    document.addEventListener('pointerup', kick, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onHide);
      document.removeEventListener('touchend', kick);
      document.removeEventListener('pointerup', kick);
    };
  }, [mounted]);

  return (
    <figure className="media" data-media aria-hidden="true" ref={ref}>
      {hasStill || hasVideo ? (
        <picture>
          <source
            type="image/avif"
            sizes="100vw"
            srcSet={
              hasVideo
                ? `/media/img/${id}-poster.avif`
                : W.map((w) => `${src('avif', w)} ${w}w`).join(', ')
            }
          />
          <img
            className="media__el media__poster"
            src={hasVideo ? `/media/img/${id}-poster.webp` : src('webp', 960)}
            alt=""
            loading="lazy"
            decoding="async"
            width={hasVideo ? 1080 : 960}
            height={hasVideo ? 1920 : 1707}
          />
        </picture>
      ) : (
        <div className="media__bare">
          <span className="media__bare-n">{chapter.n}</span>
        </div>
      )}

      {hasVideo && mounted && (
        <video
          ref={videoRef}
          className="media__el media__video"
          data-media-video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          aria-label={title}
        >
          {/* Un seul format. Le WebM ne gagnait rien en poids et Safari iOS
              l'acceptait parfois pour échouer ensuite au décodage — d'où des
              chapitres qui démarraient et d'autres non. Le H.264 est lu et
              décodé en matériel partout. */}
          <source src={`/media/video/${id}.mp4`} type="video/mp4" />
        </video>
      )}

      <span className="media__vignette" />
      <span className="media__scrim" />

      {/* Voile à la couleur du chapitre : le chapitre arrive en aplat, puis se
          révèle une fois en place. Deux images ne se touchent jamais. */}
      <span className="media__veil" data-media-veil />
    </figure>
  );
}
