import { STATS } from '@/content/site';

/** Preuve sociale. Chiffres fournis par E&M — aucun n'est déduit ni estimé. */
export default function Proof() {
  return (
    <section className="proof" data-reveal-section aria-labelledby="proof-title">
      <div className="proof__inner">
        <h2 className="proof__kicker u-serif" id="proof-title">
          Quatre ans, et ce sont les clients qui en parlent le mieux.
        </h2>

        <ul className="proof__stats">
          {STATS.map((s) => (
            <li key={s.label}>
              <span className="proof__value u-display">{s.value}</span>
              <span className="proof__label u-eyebrow">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
