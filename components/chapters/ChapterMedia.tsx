import type { Chapter } from './chapters.data';

const W = [640, 960, 1280];

/**
 * Trois états, par ordre de préférence : vidéo (WebM + MP4 pour iOS), photo
 * (AVIF + WebP), ou panneau de matière. Le média est décoratif — le titre et
 * la ligne du chapitre disent déjà tout — d'où l'`aria-hidden`.
 *
 * L'affiche n'utilise pas l'attribut `poster` du <video> : Chrome le
 * télécharge dès le chargement de la page, même en `preload="none"`, ce qui
 * faisait arriver les six affiches d'un coup. Une <img loading="lazy">
 * derrière la vidéo n'est cherchée qu'à l'approche du chapitre.
 *
 * L'affiche est la première image exacte du clip, donc le passage à la
 * lecture est un simple fondu. Et si la lecture n'arrive jamais (mouvement
 * réduit, mode économie d'énergie iOS, données économisées), elle reste
 * affichée comme une photo.
 */
export default function ChapterMedia({ chapter }: { chapter: Chapter }) {
  const { id, hasVideo, hasStill, title } = chapter;
  const src = (ext: string, w: number) => `/media/img/${id}-${w}.${ext}`;

  return (
    <figure className="media" data-media aria-hidden="true">
      {hasVideo ? (
        <>
          <picture>
            <source type="image/avif" srcSet={`/media/img/${id}-poster.avif`} />
            <img
              className="media__el media__poster"
              src={`/media/img/${id}-poster.webp`}
              alt=""
              loading="lazy"
              decoding="async"
              width={640}
              height={1138}
            />
          </picture>

          <video
            className="media__el media__video"
            data-media-video
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            disablePictureInPicture
          >
            {/* Le codec est précisé sur le WebM pour que Safari le refuse
                franchement au lieu de l'accepter puis de caler faute de
                décodage VP9. Le MP4, lui, reste déclaré au plus large : on
                veut qu'il soit accepté partout. */}
            <source src={`/media/video/${id}.webm`} type={'video/webm; codecs="vp9"'} />
            <source src={`/media/video/${id}.mp4`} type="video/mp4" />
          </video>
        </>
      ) : hasStill ? (
        <picture>
          <source type="image/avif" sizes="100vw" srcSet={W.map((w) => `${src('avif', w)} ${w}w`).join(', ')} />
          <source type="image/webp" sizes="100vw" srcSet={W.map((w) => `${src('webp', w)} ${w}w`).join(', ')} />
          <img className="media__el" src={src('webp', 960)} alt="" loading="lazy" decoding="async" width={960} height={1707} />
        </picture>
      ) : (
        <div className="media__bare">
          <span className="media__bare-n">{chapter.n}</span>
        </div>
      )}

      <span className="media__vignette" />
      <span className="media__scrim" />

      {/* Voile à la couleur du chapitre : le chapitre arrive en aplat, puis se
          révèle une fois en place. Deux images ne se touchent jamais. */}
      <span className="media__veil" data-media-veil />
    </figure>
  );
}
