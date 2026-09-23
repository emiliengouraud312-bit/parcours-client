import { CHAPTERS } from '@/components/chapters/chapters.data';

/**
 * Six segments plutôt qu'une barre continue : on voit qu'il y a six étapes
 * et où on en est. Purement indicatif, jamais cliquable.
 */
export default function ProgressRail() {
  return (
    <div className="rail" data-rail aria-hidden="true">
      <span className="rail__n" data-rail-n>
        01
      </span>
      <span className="rail__track">
        {CHAPTERS.map((c, i) => (
          <span key={c.id} className="rail__seg" data-rail-seg={i} />
        ))}
      </span>
      <span className="rail__total">{String(CHAPTERS.length).padStart(2, '0')}</span>
    </div>
  );
}
