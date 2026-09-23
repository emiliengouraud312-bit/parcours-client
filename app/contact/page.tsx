import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';
import { VINTED } from '@/lib/vinted';

export const metadata: Metadata = {
  title: 'Contact — E&M Vintage',
  description: 'Nous écrire, via la messagerie Vinted de l’un ou l’autre compte.',
};

export default function Page() {
  return (
    <PageShell
      title="Contact"
      intro="Le plus simple reste la messagerie Vinted : les réponses y sont les plus rapides."
    >
      <section className="page__section">
        <h2 className="page__h2">Une question sur une pièce</h2>
        <p>
          Écrivez directement depuis l&apos;annonce concernée, ou depuis le profil du compte. Pour
          une demande de mesures supplémentaires ou la photo d&apos;un détail, c&apos;est la voie la
          plus directe.
        </p>
      </section>

      <div className="page__cta">
        {[VINTED.menSmall, VINTED.menLarge].map((acc) => (
          <a key={acc.handle} className="size-btn" href={acc.url} target="_blank" rel="noopener noreferrer">
            <span className="size-btn__size">{acc.sizes}</span>
            <span className="size-btn__handle">{acc.handle}</span>
          </a>
        ))}
      </div>

      <section className="page__section">
        <h2 className="page__h2">Commande en cours</h2>
        <p>
          Le suivi, le paiement et les retours passent par Vinted. Pour un colis déjà parti, le suivi
          est disponible dans votre commande, et on répond en message sous 24 h.
        </p>
      </section>
    </PageShell>
  );
}
