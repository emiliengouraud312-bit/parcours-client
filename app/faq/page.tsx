import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';

export const metadata: Metadata = {
  title: 'FAQ — E&M Vintage',
  description: 'Lavage, tailles, défauts, expédition : les questions qui reviennent.',
};

const QA = [
  {
    q: 'Les vêtements sont-ils lavés avant la vente ?',
    a: "Oui. Tout passe en machine avant d'être repassé et photographié. Rien n'est mis en ligne sans être passé par là.",
  },
  {
    q: "D'où viennent les pièces ?",
    a: 'De ballots de seconde main achetés au poids — des balles compressées de 25 kg, ouvertes et triées à la main, une par une.',
  },
  {
    q: 'Comment savoir si la taille me va ?',
    a: "Chaque annonce indique les mesures à plat : largeur d'épaules, poitrine, longueur. Les tailles d'époque ne correspondent pas aux tailles actuelles — fiez-vous aux mesures, pas à l'étiquette.",
  },
  {
    q: 'Et les défauts ?',
    a: "Quand une pièce a un défaut — un accroc, une tache, un col marqué — il est photographié et mentionné dans l'annonce. Une pièce trop abîmée ne part pas en vente.",
  },
  {
    q: 'Pourquoi deux comptes Vinted ?',
    a: "Pour séparer les tailles. XS à L sur mathisguerin, XL et plus sur vintage-imparfait. C'est le seul critère : même tri, même lavage, mêmes photos des deux côtés.",
  },
  {
    q: 'Comment se passe une commande ?',
    a: "Tout se fait sur Vinted : l'achat, le paiement et le suivi. Les colis partent sous 24 à 48 h ouvrées, déposés en point relais ou en locker.",
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
