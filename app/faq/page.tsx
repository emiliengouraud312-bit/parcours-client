import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';
import { LOCAL } from '@/content/site';

export const metadata: Metadata = {
  title: 'FAQ — E&M Vintage',
  description: 'Lavage, authenticité, défauts, expédition, vente sur place : les questions qui reviennent.',
};

const QA = [
  {
    q: 'Les vêtements sont-ils lavés avant la vente ?',
    a: "Oui. Tout passe en machine avant d'être défroissé et photographié. Rien n'est mis en ligne sans être passé par là.",
  },
  {
    q: 'Vos articles sont-ils authentiques ?',
    a: "Oui, 100 %, sans exception. Chaque pièce est vérifiée avant sa mise en vente. Ce qui ne nous convainc pas ne part pas.",
  },
  {
    q: "D'où viennent les pièces ?",
    a: 'De ballots de seconde main achetés au poids, ouverts et triés à la main, une par une.',
  },
  {
    q: 'Et les défauts ?',
    a: "Quand une pièce a un défaut — un accroc, une tache, un col marqué — il est photographié et signalé dans l'annonce. Une pièce trop abîmée ne part pas en vente.",
  },
  {
    q: 'Peut-on venir acheter sur place ?',
    a: `Oui. Notre local est à ${LOCAL.city}, en ${LOCAL.area}. Demandez-nous et on organise une vente directe : vous fouillez dans les portants sans passer par une annonce.`,
  },
  {
    q: 'Pourquoi deux comptes Vinted ?',
    a: "Pour séparer les tailles. XS à L sur mathisguerin, XL et plus sur vintage-imparfait. C'est le seul critère : même tri, même lavage, mêmes photos des deux côtés.",
  },
  {
    q: 'Comment se passe une commande ?',
    a: "Tout se fait sur Vinted : l'achat, le paiement et le suivi. Les colis partent sous 48 h, déposés en point relais.",
  },
  {
    q: 'Y a-t-il des pièces femme ?',
    a: "Quelques-unes, sur vintage-imparfait. C'est une petite partie de l'activité : l'essentiel est en homme.",
  },
];

export default function Page() {
  return (
    <PageShell title="FAQ" intro="Les questions qui reviennent le plus souvent.">
      <section className="page__section">
        <ul className="qa">
          {QA.map(({ q, a }) => (
            <li key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
