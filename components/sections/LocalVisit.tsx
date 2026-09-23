import { LOCAL } from '@/content/site';

/**
 * Le site est partagé à des proches, souvent du coin : pouvoir venir sur
 * place est l'argument le plus concret de la page.
 */
export default function LocalVisit() {
  return (
    <section className="visit" data-reveal-section aria-labelledby="visit-title">
      <div className="visit__inner">
        <span className="visit__place u-eyebrow">
          {LOCAL.city} · {LOCAL.area}
        </span>

        <h2 className="visit__title u-display" id="visit-title">
          Venez choisir sur place
        </h2>

        <p className="visit__text">
          Notre local de {LOCAL.surface} est à {LOCAL.city}. On peut vous y recevoir pour fouiller
          directement dans les portants, sans passer par une annonce. Il suffit de nous le demander,
          on organise.
        </p>
      </div>
    </section>
  );
}
