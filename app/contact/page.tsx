import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';
import { VINTED } from '@/lib/vinted';
import { LOCAL } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact — E&M Vintage',
  description: 'Nous écrire sur Vinted, ou venir sur place à Saint-Georges-de-Montaigu.',
};

export default function Page() {
  return (
    <PageShell
      title="Contact"
      intro="Le plus simple reste la messagerie Vinted : on répond en moins de 2 h."
    >
      <section className="page__section">
        <h2 className="page__h2">Une question sur une pièce</h2>
        <p>
          Écrivez directement depuis l&apos;annonce concernée, ou depuis le profil du compte. Pour une
          demande de mesures supplémentaires ou la photo d&apos;un détail, c&apos;est la voie la plus
          directe — et la plus rapide.
        </p>
      </section>

      <div className="page__cta">
        {[VINTED.menSmall, VINTED.menLarge].map((acc) => (
          <a key={acc.handle} className="size-btn" href={acc.url} target="_blank" rel="noopener noreferrer">
            <span className="size-btn__size u-display">{acc.sizes}</span>
            <span className="size-btn__handle u-eyebrow">{acc.handle}</span>
          </a>
        ))}
      </div>

      <section className="page__section">
        <h2 className="page__h2">Venir sur place</h2>
        <p>
          Notre local est à {LOCAL.city}, en {LOCAL.area}. On peut vous y recevoir pour choisir
          directement dans les portants. Écrivez-nous sur l&apos;un des deux comptes et on cale un
          créneau.
        </p>
      </section>

      <section className="page__section">
        <h2 className="page__h2">Commande en cours</h2>
        <p>
          Le suivi, le paiement et les retours passent par Vinted. Pour un colis déjà parti, le suivi
          est disponible dans votre commande.
        </p>
      </section>
    </PageShell>
  );
}
