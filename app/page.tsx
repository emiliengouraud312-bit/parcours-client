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
import FinalCta from '@/components/cta/FinalCta';
import './experience.css';

export default function Page() {
  return (
    <>
      <Masthead />
      <Menu />
      <ProgressRail />

      <main id="top">
        <Hero />
        {CHAPTERS.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} />
        ))}
        <FinalCta />
      </main>

      <SiteFooter />
      <Grain />
      <SmoothScroll />
      <ScrollChoreography />
    </>
  );
}
