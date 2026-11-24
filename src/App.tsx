import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AboutSection } from './components/AboutSection';
import { AnnouncementBar } from './components/AnnouncementBar';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { DoorsSection } from './components/DoorsSection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Hero } from './components/Hero';
import { IntroPreloader } from './components/IntroPreloader';
import { ModularKitchensShowcase } from './components/ModularKitchensShowcase';
import { Navbar } from './components/Navbar';
import { PartnerBrandsStrip } from './components/PartnerBrandsStrip';
import { ProcessSection } from './components/ProcessSection';
import { ScrollProgress } from './components/ScrollProgress';
import { ServicesGrid } from './components/ServicesGrid';
import { ShowroomFactorySection } from './components/ShowroomFactorySection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { useMotionCapabilities } from './hooks/useMotionCapabilities';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const { prefersReducedMotion, isTouchDevice } = useMotionCapabilities();
  const [selectedInterest, setSelectedInterest] = useState<string>('');
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
      setSelectedInterest(itemLabel);
      scrollToTarget('#contact');
    },
    [scrollToTarget]
  );

  return (
    <div className="min-h-[100svh] lg:min-h-screen flex flex-col bg-[#0E0C0A] text-[#0E0C0A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:bg-[#B8793A] focus:text-[#0E0C0A] focus:font-bold focus:px-4 focus:py-2 focus:rounded-[4px]"
      >
        Skip to main content
      </a>

      <IntroPreloader />
      <ScrollProgress />
      <CustomCursor />

      <AnnouncementBar
        visible={showAnnouncement}
        onDismiss={() => setShowAnnouncement(false)}
      />
      <Navbar
        onNavigate={scrollToTarget}
        hasAnnouncement={showAnnouncement}
      />

      {/* Main Content */}
      <main id="main-content" className="relative z-10 flex-1 bg-[#0E0C0A]">
        {/* 1 & 2. Hero Section: The Complete Interior Solution */}
        <Hero
          onExploreClick={() => scrollToTarget('#kitchens')}
          onQuoteClick={() => scrollToTarget('#contact')}
        />

        {/* 8. Partner Brands Strip */}
        <PartnerBrandsStrip />

        {/* 4. Modular Kitchens Showcase (Main Feature) */}
        <ModularKitchensShowcase onEnquireKitchen={handleEnquireNavigation} />

        {/* 5. Doors Section (Second Major Section) */}
        <DoorsSection onEnquireDoor={handleEnquireNavigation} />

        {/* 3. Services Grid (9 Core Services from Showroom Signboard) */}
        <ServicesGrid onEnquireService={handleEnquireNavigation} />

        {/* 6. Why Choose Us (4-6 Points based only on real data) */}
        <WhyChooseUs />

        {/* 7. Process (5 Steps: Consultation to Delivery & Fitting) */}
        <ProcessSection />

        {/* 9. Gallery Section (Filterable Masonry Grid with Lightbox) */}
        <GallerySection />

        {/* 10. Visit Our Showroom & Factory Section */}
        <ShowroomFactorySection />

        {/* 11. About Section (Story-led copy) */}
        <AboutSection />

        {/* 12. Contact & Quote Section */}
        <ContactSection preselectedDoorType={selectedInterest} />

        <div id="footer-visibility-sentinel" className="h-px w-full pointer-events-none" />
      </main>

      {/* 13. Footer */}
      <Footer onNavigate={scrollToTarget} />

      {/* Floating Actions on Mobile */}
      <FloatingActions />
    </div>
  );
}

export default App;
