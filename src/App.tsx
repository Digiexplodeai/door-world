import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AnnouncementBar } from './components/AnnouncementBar';
import { ArchWholesaleBanner } from './components/ArchWholesaleBanner';
import { BigNumbersBand } from './components/BigNumbersBand';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { DoorConfigurator } from './components/DoorConfigurator';
import { DoorOpeningCtaBanner } from './components/DoorOpeningCtaBanner';
import { DoorPanelCollections } from './components/DoorPanelCollections';
import { EditorialReviews } from './components/EditorialReviews';
import { EditorialStory } from './components/EditorialStory';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HorizontalGallery } from './components/HorizontalGallery';
import { IntroPreloader } from './components/IntroPreloader';
import { Navbar } from './components/Navbar';
import { ScrollProgress, SectionIndicator } from './components/ScrollProgress';
import { SpotlightGrainBanner } from './components/SpotlightGrainBanner';
import { StatsRibbonBanner } from './components/StatsRibbonBanner';
import { TiltedRibbonsBanner } from './components/TiltedRibbonsBanner';
import { useMotionCapabilities } from './hooks/useMotionCapabilities';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const { prefersReducedMotion, isTouchDevice } = useMotionCapabilities();
  const [selectedDoorType, setSelectedDoorType] = useState<string>('');
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) {
      lenisRef.current = null;
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [prefersReducedMotion, isTouchDevice]);

  const scrollToTarget = useCallback((selector: string) => {
    const target = document.querySelector(selector);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, { offset: -72 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleEnquireNavigation = useCallback(
    (itemLabel: string) => {
      setSelectedDoorType(itemLabel);
      scrollToTarget('#contact');
    },
    [scrollToTarget]
  );

  return (
    <div className="min-h-[100svh] lg:min-h-screen flex flex-col bg-[#0E0C0A] text-[#0E0C0A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:bg-[#B8733B] focus:text-[#FBF8F3] focus:font-semibold focus:px-4 focus:py-2 focus:rounded-[4px]"
      >
        Skip to main content
      </a>

      <IntroPreloader />
      <ScrollProgress />
      <SectionIndicator />
      <CustomCursor />

      <AnnouncementBar
        visible={showAnnouncement}
        onDismiss={() => setShowAnnouncement(false)}
      />
      <Navbar
        onNavigate={scrollToTarget}
        hasAnnouncement={showAnnouncement}
      />

      {/* Main Content sits above Curtain Footer (z-10 vs z-0) */}
      <main id="main-content" className="relative z-10 flex-1 bg-[#0E0C0A]">
        <Hero
          onExploreClick={() => scrollToTarget('#collections')}
          onQuoteClick={() => scrollToTarget('#contact')}
        />
        <TiltedRibbonsBanner />
        <DoorPanelCollections onEnquireCategory={handleEnquireNavigation} />
        <ArchWholesaleBanner />
        <StatsRibbonBanner />
        <DoorConfigurator />
        <SpotlightGrainBanner />
        <EditorialStory />
        <BigNumbersBand />
        <HorizontalGallery onEnquireDesign={handleEnquireNavigation} />
        <EditorialReviews />
        <ContactSection preselectedDoorType={selectedDoorType} />
        <DoorOpeningCtaBanner />
        <div id="footer-visibility-sentinel" className="h-px w-full pointer-events-none" />
      </main>

      <Footer onNavigate={scrollToTarget} />
      <FloatingActions />
    </div>
  );
}

export default App;
