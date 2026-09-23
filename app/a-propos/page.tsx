import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';
import PageBody from '@/components/content/PageBody';
import { ABOUT } from '@/content/pages';

export const metadata: Metadata = {
  title: 'À propos — EM',
  description: 'Quatre ans, un local de 100 m² en Vendée, 40 000 articles remis en circulation.',
};

export default function Page() {
  return (
    <PageShell title={ABOUT.title} intro={ABOUT.intro}>
      <PageBody page={ABOUT} />
    </PageShell>
  );
}
