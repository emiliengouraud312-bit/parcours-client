import Grain from '@/components/ui/Grain';
import SiteFooter from '@/components/chrome/SiteFooter';
import '@/app/experience.css';
import '@/app/pages.css';

/** Coquille des pages secondaires. Pas de GSAP, pas de Lenis, pas de média. */
export default function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <div className="page__body">
        <a className="page__back" href="/">
          <span aria-hidden="true">←</span> Retour
        </a>
        <h1 className="page__title">{title}</h1>
        <p className="page__intro">{intro}</p>
        {children}
      </div>
      <SiteFooter />
      <Grain />
    </div>
  );
}
