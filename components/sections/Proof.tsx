import { REVIEWS, STATS } from '@/content/site';

/**
 * Preuve sociale, volontairement compacte : elle ne doit pas retarder le
 * choix de taille. Chiffres fournis par E&M, avis transcrits mot pour mot
 * depuis Vinted.
 */
export default function Proof() {
  return (
    <section className="proof" data-reveal-section aria-labelledby="proof-title">
      <h2 className="u-visually-hidden" id="proof-title">
        Ce qu&apos;en disent les clients
      </h2>

      <ul className="proof__stats">
        {STATS.map((s) => (
          <li key={s.label}>
            <span className="proof__value u-display">{s.value}</span>
            <span className="proof__label u-eyebrow">{s.label}</span>
          </li>
        ))}
      </ul>

      <ul className="reviews">
        {REVIEWS.map((r) => (
          <li className="review" key={r.author}>
            <span className="review__stars" aria-label="5 étoiles sur 5">
              ★★★★★
            </span>
            <p className="review__text">{r.text}</p>
            <p className="review__meta">
              <span className="review__author">{r.author}</span>
              <span className="review__when">{r.when}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
