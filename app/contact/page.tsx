import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';
import PageBody from '@/components/content/PageBody';
import { CONTACT } from '@/content/pages';

export const metadata: Metadata = {
  title: 'Contact — EM',
  description: 'Nous écrire sur Vinted, ou venir sur place à Saint-Georges-de-Montaigu.',
};

export default function Page() {
  return (
    <PageShell title={CONTACT.title} intro={CONTACT.intro}>
      <PageBody page={CONTACT} />
    </PageShell>
  );
}
