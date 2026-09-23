import type { Chapter } from './chapters.data';

const W = [640, 960, 1280];

/**
 * Trois états, dans cet ordre de préférence : vidéo (WebM + MP4 iOS),
 * photo (AVIF + WebP), ou panneau de matière. Un chapitre sans média
 * ne casse rien — il prend un traitement typographique assumé.
 */
export default function ChapterMedia({ chapter }: { chapter: Chapter }) {
  const { id, hasVideo, hasStill, title } = chapter;
  const src = (ext: string, w: number) => `/media/img/${id}-${w}.${ext}`;

  return (
    <figure className="media" data-media>
      {hasVideo ? (
        <video
          className="media__el"
          data-media-video
          poster={`/media/img/${id}-poster.webp`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={title}
        >
          <source src={`/media/video/${id}.webm`} type="video/webm" />
          <source src={`/media/video/${id}.mp4`} type="video/mp4" />
        </video>
      ) : hasStill ? (
        <picture>
          <source type="image/avif" sizes="100vw" srcSet={W.map((w) => `${src('avif', w)} ${w}w`).join(', ')} />
          <source type="image/webp" sizes="100vw" srcSet={W.map((w) => `${src('webp', w)} ${w}w`).join(', ')} />
          <img className="media__el" src={src('webp', 960)} alt={title} loading="lazy" decoding="async" width={960} height={1707} />
        </picture>
      ) : (
        <div className="media__bare" aria-hidden="true">
          <span className="media__bare-n">{chapter.n}</span>
        </div>
      )}

      <span className="media__scrim" aria-hidden="true" />
    </figure>
  );
}
