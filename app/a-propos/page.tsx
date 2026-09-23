import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';

export const metadata: Metadata = {
  title: 'À propos — E&M Vintage',
  description: 'Qui trie, lave et expédie les pièces vendues sur les deux comptes Vinted.',
};

export default function Page() {
  return (
    <PageShell title="À propos" intro="E&M Vintage, c'est deux personnes, un local et une grange.">
      <section className="page__section">
        <h2 className="page__h2">L&apos;activité</h2>
        <p>
          On achète des vêtements de seconde main au ballot — des balles compressées de 25 kg,
          fermées, dont on ne connaît le contenu qu&apos;une fois ouvertes. Tout est trié à la main.
          Ce qui ne passe pas le tri ne part pas en vente.
        </p>
        <p>
          L&apos;essentiel de ce qu&apos;on remet en vente est de la pièce homme : polos, mailles,
          chemises, vestes. Quelques pièces femme passent au tri et se retrouvent sur le second
          compte.
        </p>
      </section>

      <section className="page__section">
        <h2 className="page__h2">Le local</h2>
        <p>
          Une pièce unique, murs blancs, sol carrelé : c&apos;est là que se fait le tri, le
          repassage, la prise de vue et l&apos;emballage. Un portant, des étagères, un fond blanc, un
          mannequin et une lumière continue — rien de plus.
        </p>
        <p>
          Le stockage et les machines à laver sont dans une pièce à part, dans la grange d&apos;à
          côté. Les ballots y restent sur palette jusqu&apos;à l&apos;ouverture.
        </p>
      </section>

      <section className="page__section">
        <h2 className="page__h2">Deux comptes</h2>
        <p>
          Les tailles XS à L sont sur <strong>mathisguerin</strong>. Les tailles XL et au-delà sont
          sur <strong>vintage-imparfait</strong>, avec les quelques pièces femme. Deux comptes plutôt
          qu&apos;un, simplement pour que chacun trouve sa taille sans faire défiler des centaines
          d&apos;annonces qui ne lui vont pas.
        </p>
      </section>
    </PageShell>
  );
}
