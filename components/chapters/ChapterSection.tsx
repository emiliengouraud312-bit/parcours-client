import type { Chapter } from './chapters.data';
import ChapterMedia from './ChapterMedia';

export default function ChapterSection({ chapter, next }: { chapter: Chapter; next?: Chapter }) {
  return (
    <section
      className="chapter"
      id={chapter.id}
      data-chapter
      data-tone={chapter.tone}
      data-fg={chapter.fg}
      style={{ '--tone': chapter.tone, '--fg': chapter.fg } as React.CSSProperties}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className="chapter__sticky">
        <ChapterMedia chapter={chapter} />

        <div className="chapter__caption">
          <span className="chapter__n u-eyebrow" data-anim="n">
            {chapter.n}
          </span>

          <h2 className="chapter__title u-display" id={`${chapter.id}-title`}>
            <span className="chapter__mask">
              <span className="chapter__title-in" data-anim="title">
                {chapter.title}
              </span>
            </span>
          </h2>

          <p className="chapter__line u-serif" data-anim="line">
            {chapter.line}
          </p>

          {/* Annonce l'étape suivante : c'est ce qui relie les six plans
              entre eux au lieu de les laisser côte à côte. */}
          {next && (
            <p className="chapter__next u-eyebrow" data-anim="next">
              <span className="chapter__next-word">Puis</span>
              <span className="chapter__next-label">{next.title}</span>
              <i className="chapter__next-arrow" aria-hidden="true" />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
