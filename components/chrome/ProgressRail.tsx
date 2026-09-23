import { CHAPTERS } from '@/components/chapters/chapters.data';

/** Rail 1px + index du chapitre courant. Purement indicatif, jamais cliquable sur mobile. */
export default function ProgressRail() {
  return (
    <div className="rail" data-rail aria-hidden="true">
      <span className="rail__n" data-rail-n>
        01
      </span>
      <span className="rail__track">
        <span className="rail__fill" data-rail-fill />
      </span>
      <span className="rail__total">{String(CHAPTERS.length).padStart(2, '0')}</span>
    </div>
  );
}
