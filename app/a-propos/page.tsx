import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';
import { BRANDS, LOCAL } from '@/content/site';

export const metadata: Metadata = {
  title: 'À propos — E&M Vintage',
  description:
    'Quatre ans, un local de 100 m² en Vendée, 40 000 articles remis en circulation. Ralph Lauren, Tommy Hilfiger, Lacoste, Patagonia, The North Face.',
};

export default function Page() {
  return (
    <PageShell
      title="À propos"
      intro="Tout a commencé dans nos chambres."
    >
      <section className="page__section">
        <p>
          Il y a 4 ans, on vendait quelques pièces à l&apos;unité, photographiées sur un coin de lit.
          Aujourd&apos;hui, c&apos;est un local de {LOCAL.surface} en {LOCAL.area}, des cartons qui
          arrivent chaque semaine et une petite équipe qui nous accompagne au quotidien. Le principe,
          lui, n&apos;a pas changé : trouver de belles pièces et les remettre en circulation.
        </p>
      </section>

      <section className="page__section">
        <h2 className="page__h2">Notre local, notre terrain de jeu</h2>
        <p>
          C&apos;est ici que tout se passe. Les ballots sont ouverts, les pièces triées une par une,
          lavées, repassées, photographiées, puis emballées avant de partir chez vous. Rien n&apos;est
          sous-traité : chaque article passe entre nos mains avant d&apos;arriver dans les vôtres.
        </p>
      </section>

      <section className="page__section">
        <h2 className="page__h2">Des marques qu&apos;on connaît par cœur</h2>
        <p>
          {BRANDS.join(', ')}… On sélectionne des marques qui durent, et on vérifie chaque pièce avant
          sa mise en vente. <strong>Nos articles sont 100 % authentiques. Pas d&apos;exception.</strong>
        </p>
      </section>

      <section className="page__section">
        <h2 className="page__h2">40 000 articles. 20 000 clients.</h2>
        <p>
          En 4 ans, nous avons reconditionné et vendu plus de 40 000 articles à plus de 20 000 clients.
          Avec une note de 4,9/5, ce sont eux qui en parlent le mieux. Chaque avis compte, et c&apos;est
          ce qui nous pousse à soigner chaque envoi comme le premier.
        </p>
      </section>

      <section className="page__section">
        <h2 className="page__h2">La seconde main, simplement</h2>
        <p>
          Des vêtements de qualité, déjà portés, à un prix juste. Pour nous, c&apos;est surtout du bon
          sens.
        </p>
      </section>
    </PageShell>
  );
}
