import Grain from '@/components/ui/Grain';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ScrollChoreography from '@/components/ScrollChoreography';
import Masthead from '@/components/chrome/Masthead';
import Menu from '@/components/chrome/Menu';
import ProgressRail from '@/components/chrome/ProgressRail';
import SiteFooter from '@/components/chrome/SiteFooter';
import Hero from '@/components/hero/Hero';
import ChapterSection from '@/components/chapters/ChapterSection';
import { CHAPTERS } from '@/components/chapters/chapters.data';
import Proof from '@/components/sections/Proof';
import LocalVisit from '@/components/sections/LocalVisit';
import FinalCta from '@/components/cta/FinalCta';
import './experience.css';
// Le menu affiche le contenu des pages secondaires sur place : il lui faut
// leurs styles, même si aucune route n'est chargée.
import './pages.css';

export default function Page() {
  return (
    <>
      <Masthead />
      <Menu />
      <ProgressRail />

      <main id="top">
        <Hero />
        {CHAPTERS.map((chapter, i) => (
          <ChapterSection key={chapter.id} chapter={chapter} next={CHAPTERS[i + 1]} />
        ))}
        <Proof />
        <FinalCta />
        <LocalVisit />
      </main>

      <SiteFooter />
      <Grain />
      <SmoothScroll />
      <ScrollChoreography />
    </>
  );
}
