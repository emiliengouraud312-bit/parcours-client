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
        <LocalVisit />
        <FinalCta />
      </main>

      <SiteFooter />
      <Grain />
      <SmoothScroll />
      <ScrollChoreography />
    </>
  );
}
