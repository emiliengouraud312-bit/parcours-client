import type { Metadata } from 'next';
import PageShell from '@/components/chrome/PageShell';
import PageBody from '@/components/content/PageBody';
import { FAQ } from '@/content/pages';

export const metadata: Metadata = {
  title: 'FAQ — E&M Vintage',
  description: 'Lavage, authenticité, défauts, expédition, vente sur place : les questions qui reviennent.',
};

export default function Page() {
  return (
    <PageShell title={FAQ.title} intro={FAQ.intro}>
      <PageBody page={FAQ} />
    </PageShell>
  );
}
