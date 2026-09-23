import type { PageContent } from '@/content/pages';
import { VINTED } from '@/lib/vinted';

/**
 * Rendu unique du contenu des pages secondaires. Servi à la fois par les
 * routes (/faq, /contact, /a-propos) et par le panneau du menu, pour qu'il
 * n'existe qu'une seule version du texte.
 */
export default function PageBody({ page }: { page: PageContent }) {
  const accounts = (
    <div className="page__cta">
      {[VINTED.menSmall, VINTED.menLarge].map((acc) => (
        <a key={acc.handle} className="size-btn" href={acc.url} target="_blank" rel="noopener noreferrer">
          <span className="size-btn__size u-display">{acc.sizes}</span>
          <span className="size-btn__handle u-eyebrow">{acc.handle}</span>
        </a>
      ))}
    </div>
  );

  return (
    <>
      {page.sections?.map((s, i) => (
        <div key={s.h ?? i}>
          <section className="page__section">
            {s.h && <h2 className="page__h2">{s.h}</h2>}
            {s.p.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </section>
          {page.accountsAfter === i && accounts}
        </div>
      ))}

      {page.qa && (
        <section className="page__section">
          <ul className="qa">
            {page.qa.map(({ q, a }) => (
              <li key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
