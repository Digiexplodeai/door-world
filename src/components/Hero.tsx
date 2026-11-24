import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowRight, Compass, DoorOpen, Phone } from 'lucide-react';
import { SITE_DATA } from '../data/site';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { LinkRollText, MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick: () => void;
  onQuoteClick?: () => void;
}

export function Hero({ onExploreClick, onQuoteClick }: HeroProps) {
  const { prefersReducedMotion, isTouchDevice } = useMotionCapabilities();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Direct DOM refs for 60fps zero-react-render updates during scroll
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase5Ref = useRef<HTMLDivElement>(null);
  const hudStageNumRef = useRef<HTMLSpanElement>(null);
  const hudStageNameRef = useRef<HTMLSpanElement>(null);
  const hudStageDescRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const hudPercentRef = useRef<HTMLSpanElement>(null);

  // Video duration reference (exact source duration: ~8.043s)
  const durationRef = useRef<number>(8.043);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Authoritative progress tracking
  const currentProgress = useRef(0);
  const isSeeking = useRef(false);
  const pendingTime = useRef(-1);
  const seekStartTime = useRef(0);

  const handleQuoteClick = useCallback(() => {
    if (onQuoteClick) {
      onQuoteClick();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [onQuoteClick]);

  const handleSkipToInterior = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const targetScroll = scrollTop + rect.top + sectionRef.current.offsetHeight * 0.96;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, []);

  // Main video initialization, lifecycle & scroll synchronization
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let isMounted = true;
    let animationFrameId: number;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    // Direct DOM updater for HUD and typography opacities
    let lastRenderedPercent = -1;
    let lastPhaseIdx = -1;

    const updateDomOverlay = (p: number) => {
      // 1. Text Overlay Opacity Fades (quick fade to keep doors clean)
      // Phase 1 (Initial headline) fades out by 18% scroll
      const p1Opacity = Math.max(0, Math.min(1, (0.18 - p) / 0.08));
      // Phase 5 (Final CTA reveal) fades in starting at 76% scroll
      const p5Opacity = Math.max(0, Math.min(1, (p - 0.76) / 0.10));

      if (phase1Ref.current) {
        phase1Ref.current.style.opacity = p1Opacity.toFixed(3);
        phase1Ref.current.style.pointerEvents = p1Opacity > 0.05 ? 'auto' : 'none';
      }

      if (phase5Ref.current) {
        phase5Ref.current.style.opacity = p5Opacity.toFixed(3);
        phase5Ref.current.style.pointerEvents = p5Opacity > 0.05 ? 'auto' : 'none';
      }

      // 2. HUD Scrubber & Percent
      const percentVal = Math.round(p * 100);
      if (percentVal !== lastRenderedPercent) {
        lastRenderedPercent = percentVal;
        if (hudPercentRef.current) {
          hudPercentRef.current.textContent = `${percentVal}%`;
        }
        if (hudBarRef.current) {
          hudBarRef.current.style.width = `${percentVal}%`;
        }
      }

      // 3. Stage Readout
      let currentPhaseIdx = 1;
      let name = 'GRAND ENTRANCE';
      let desc = 'Closed Solid Wooden Gates · Front Facade';

      if (p >= 0.75) {
        currentPhaseIdx = 4;
        name = 'COURTYARD UNVEILED';
        desc = 'Gates Fully Open · Architectural Sanctuary';
      } else if (p >= 0.48) {
        currentPhaseIdx = 3;
        name = 'SWINGING INWARD';
        desc = 'Dual Wooden Gates Gliding Slowly Open';
      } else if (p >= 0.18) {
        currentPhaseIdx = 2;
        name = 'GATES UNLATCHING';
        desc = 'Smooth Inward Pivot Movement Begins';
      }

      if (currentPhaseIdx !== lastPhaseIdx) {
        lastPhaseIdx = currentPhaseIdx;
        if (hudStageNumRef.current) {
          hudStageNumRef.current.textContent = `0${currentPhaseIdx}`;
        }
        if (hudStageNameRef.current) {
          hudStageNameRef.current.textContent = name;
        }
        if (hudStageDescRef.current) {
          hudStageDescRef.current.textContent = desc;
        }
      }
    };

    // Calculate current scroll progress in case of page reload with restored scroll
    const computeCurrentScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollDist = section.offsetHeight - window.innerHeight;
      if (scrollDist <= 0) return 0;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / scrollDist));
    };

    const initialProgress = computeCurrentScrollProgress();
    currentProgress.current = initialProgress;
    updateDomOverlay(initialProgress);

    // Queue-based deterministic seek manager (prevents decoder queue flood)
    const requestSeek = (targetTime: number) => {
      if (!isMounted || !video || video.readyState < 1) return;

      if (isSeeking.current) {
        pendingTime.current = targetTime;
        return;
      }

      if (Math.abs(video.currentTime - targetTime) <= 0.025) return;

      isSeeking.current = true;
      pendingTime.current = -1;
      seekStartTime.current = performance.now();

      try {
        if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
          (video as any).fastSeek(targetTime);
        } else {
          video.currentTime = targetTime;
        }
      } catch {
        isSeeking.current = false;
      }
    };

    const handleSeeked = () => {
      isSeeking.current = false;
      seekStartTime.current = 0;
      if (!isMounted || !video || video.readyState < 1) return;

      if (pendingTime.current >= 0) {
        const nextTime = pendingTime.current;
        pendingTime.current = -1;
        requestSeek(nextTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (!isMounted) return;
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
      setIsVideoReady(true);
      const targetTime = currentProgress.current * (durationRef.current - 0.03);
      requestSeek(Math.max(0, targetTime));
    };

    const handleCanPlay = () => {
      if (!isMounted) return;
      setIsVideoReady(true);
      const targetTime = currentProgress.current * (durationRef.current - 0.03);
      requestSeek(Math.max(0, targetTime));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('seeked', handleSeeked);

    video.muted = true;
    video.playsInline = true;
    video.pause();

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.load();
    }

    if (!prefersReducedMotion) {
      // Authoritative 1:1 ScrollTrigger binding (zero artificial lag)
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          currentProgress.current = p;
          updateDomOverlay(p);

          if (video.readyState >= 1) {
            const dur = Math.max(0.1, durationRef.current - 0.03);
            const targetTime = Math.min(dur, Math.max(0, p * dur));
            requestSeek(targetTime);
          }
        },
      });

      // Synchronize exact ScrollTrigger progress if already restored
      if (scrollTriggerInstance.progress !== undefined) {
        const restoredP = scrollTriggerInstance.progress;
        currentProgress.current = restoredP;
        updateDomOverlay(restoredP);
      }

      // RAF Watchdog: releases seeking lock if mobile WebKit hangs on seek
      const checkWatchdog = () => {
        if (!isMounted) return;
        animationFrameId = requestAnimationFrame(checkWatchdog);

        if (isSeeking.current && performance.now() - seekStartTime.current > 85) {
          isSeeking.current = false;
          if (pendingTime.current >= 0) {
            const nextTime = pendingTime.current;
            pendingTime.current = -1;
            requestSeek(nextTime);
          }
        }
      };

      checkWatchdog();
    }

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('seeked', handleSeeked);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [prefersReducedMotion, isTouchDevice]);

  // Reduced motion mode: Static high-resolution hero with immediate CTAs
  if (prefersReducedMotion) {
    const { contact } = SITE_DATA.business;
    return (
      <section
        id="home"
        aria-label="Kumar Kitchen King and Door World Entrance"
        className="relative w-full min-h-[100svh] bg-[#0E0C0A] text-[#FBF8F3] flex flex-col justify-between"
      >
        <picture className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src="/images/doors/luxury-villa-entrance-01.webp"
            alt="Door World and Kumar Kitchen King Architectural Gates"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#0E0C0A]/70"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pt-32 pb-16 flex flex-col justify-between flex-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-md border border-[#B8793A]/40 text-[#B8793A] type-eyebrow font-bold uppercase tracking-[0.2em] w-fit">
            <span>The Complete Interior Solution · Mohali &amp; Yamuna Nagar</span>
          </div>

          <div className="max-w-3xl py-8">
            <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-black text-[#FBF8F3] leading-[1.04] mb-4">
              <span>The Complete</span>
              <span className="block text-[#B8793A] italic font-serif">Interior Solution.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#F7F3EC] font-sans font-medium mb-4">
              Kitchens, Doors &amp; Bespoke Interiors
            </p>
            <p className="text-sm sm:text-base text-[#E8DFC8] leading-relaxed max-w-xl mb-6">
              Factory-manufactured European modular kitchens, solid architectural wooden doors, and turnkey interiors. 100% factory built with zero on-site carpentry work.
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-[3px] bg-[#171412] border border-[#B8793A]/40 text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC]">Factory Built</span>
              <span className="px-3 py-1 rounded-[3px] bg-[#171412] border border-[#B8793A]/40 text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC]">No Carpentry at Site</span>
              <span className="px-3 py-1 rounded-[3px] bg-[#171412] border border-[#B8793A]/40 text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC]">ISI Certified</span>
              <span className="px-3 py-1 rounded-[3px] bg-[#171412] border border-[#B8793A]/40 text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC]">Custom Designs</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={handleQuoteClick}
                className="min-h-[52px] inline-flex items-center justify-center gap-3 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 rounded-[4px] shadow-lg transition-all"
              >
                <LinkRollText text="Get Free Quote" />
                <ArrowRight className="w-4 h-4 text-[#0E0C0A]" aria-hidden="true" />
              </MagneticButton>

              <a
                href={`tel:+91${contact.primaryPhone}`}
                className="min-h-[52px] inline-flex items-center justify-center gap-3 border border-[#B8793A]/50 hover:border-[#B8793A] bg-[#171412] text-[#FBF8F3] text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 rounded-[4px] transition-all"
              >
                <Phone className="w-4 h-4 text-[#B8793A]" />
                <span>Call Now: {contact.primaryPhoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Door World Architectural Gate Opening Walkthrough"
      className="relative w-full h-[270vh] bg-[#0E0C0A] text-[#FBF8F3]"
    >
      {/* Pinned Sticky Viewport Video Container */}
      <div className="sticky top-0 left-0 w-full h-[100svh] min-h-[100svh] overflow-hidden select-none bg-[#0E0C0A]">
        {/* Poster shown ONLY before video is ready (Real luxury entrance door photo) */}
        {!isVideoReady && (
          <picture className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
            <img
              src="/images/doors/luxury-villa-entrance-01.webp"
              alt="Door World Symmetrical Luxury Villa Entrance"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        )}

        {/* The Exact User Video Footage with Responsive Device Selection */}
        <video
          ref={videoRef}
          aria-hidden="true"
          tabIndex={-1}
          playsInline
          muted
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          poster="/images/doors/luxury-villa-entrance-01.webp"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-[2]"
        >
          {/* Desktop full wide authentic video (1280x720) */}
          <source
            src="/videos/Wooden_gates_desktop.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          {/* Mobile centered gate video (640x720, 8:9 aspect ratio - preserves full double doors) */}
          <source
            src="/videos/Wooden_gates_mobile.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          {/* Fallback to original */}
          <source
            src="/videos/Wooden_gates_opening_inward_slowly_6b49ef82.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark gradient overlay for pristine text readability (55-70% black, stronger behind text) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#0E0C0A]/60 bg-gradient-to-r from-[#0E0C0A]/85 via-[#0E0C0A]/65 to-[#0E0C0A]/40 z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0E0C0A]/95 via-[#0E0C0A]/45 to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0E0C0A]/95 via-[#0E0C0A]/50 to-transparent z-10"
        />

        {/* =========================================================================
            STAGE 1 OVERLAY (0% - 18%): CLOSED GATES (POSITIONED HIGH, NO OVERLAPS)
            ========================================================================= */}
        <div
          ref={phase1Ref}
          style={{ opacity: 1, pointerEvents: 'auto' }}
          className="absolute inset-0 z-20 flex flex-col justify-between max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 will-change-[opacity]"
        >
          {/* Top Eyebrow Bar with Quick Skip Button (Clean layout, no bottom overlap) */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-md border border-[#B8793A]/40 text-[#B8793A] type-eyebrow font-bold uppercase tracking-[0.18em] shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8793A] animate-pulse" aria-hidden="true" />
              <span className="hidden sm:inline">Kumar Kitchen King · Sector 82, JLPL Mohali &amp; Yamuna Nagar</span>
              <span className="sm:hidden">Kumar Kitchen King · Mohali</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleSkipToInterior}
                className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#F7F3EC] hover:text-[#B8793A] bg-[#0E0C0A]/80 hover:bg-[#0E0C0A] backdrop-blur-md px-3.5 py-1.5 rounded-[4px] border border-[#B8793A]/30 hover:border-[#B8793A] transition-colors cursor-pointer whitespace-nowrap font-medium"
              >
                Skip Walkthrough →
              </button>
            </div>
          </div>

          {/* Main Editorial Headline - The Complete Interior Solution */}
          <div className="max-w-xl lg:max-w-2xl py-2 my-2 sm:my-auto">
            <h1 className="font-sans text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] font-black text-[#FBF8F3] leading-[1.04] tracking-tight mb-2.5 drop-shadow-[0_4px_28px_rgba(14,12,10,0.95)]">
              <span className="block">The Complete</span>
              <span className="block text-[#B8793A] italic font-serif">Interior Solution.</span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-[#F7F3EC] font-sans font-medium mb-3 drop-shadow-[0_2px_12px_rgba(14,12,10,0.9)]">
              Kitchens, Doors &amp; Turnkey Interiors
            </p>

            <p className="text-xs sm:text-sm md:text-base text-[#E8DFC8] font-sans font-medium leading-relaxed max-w-lg mb-4 drop-shadow-[0_2px_10px_rgba(14,12,10,0.95)]">
              Factory-manufactured European modular kitchens, solid architectural wooden doors, and turnkey interior joinery. 100% factory built with zero on-site carpentry work.
            </p>

            {/* Trust Chips */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-5">
              <span className="px-2.5 py-1 rounded-[3px] bg-[#0E0C0A]/85 border border-[#B8793A]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC]">Factory Built</span>
              <span className="px-2.5 py-1 rounded-[3px] bg-[#0E0C0A]/85 border border-[#B8793A]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC]">No Carpentry at Site</span>
              <span className="px-2.5 py-1 rounded-[3px] bg-[#0E0C0A]/85 border border-[#B8793A]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC]">ISI Certified</span>
              <span className="px-2.5 py-1 rounded-[3px] bg-[#0E0C0A]/85 border border-[#B8793A]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC]">Custom Designs</span>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                onClick={handleQuoteClick}
                className="min-h-[46px] sm:min-h-[50px] inline-flex items-center justify-center gap-2.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold px-7 py-3.5 rounded-[4px] shadow-lg transition-all cursor-pointer"
              >
                <LinkRollText text="Get Free Quote" />
                <ArrowRight className="w-4 h-4 text-[#0E0C0A]" aria-hidden="true" />
              </MagneticButton>

              <a
                href={`tel:+91${SITE_DATA.business.contact.primaryPhone}`}
                className="min-h-[46px] sm:min-h-[50px] inline-flex items-center justify-center gap-2.5 border border-[#B8793A]/50 hover:border-[#B8793A] bg-[#171412]/80 hover:bg-[#171412] text-[#FBF8F3] text-xs uppercase tracking-[0.18em] font-bold px-6 py-3.5 rounded-[4px] transition-all"
              >
                <Phone className="w-4 h-4 text-[#B8793A]" />
                <span>Call: {SITE_DATA.business.contact.primaryPhoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Spacer to guarantee no collision with HUD */}
          <div className="h-4" />
        </div>

        {/* =========================================================================
            STAGE 4 OVERLAY (76% - 100%): GATES FULLY OPEN / REVEAL
            ========================================================================= */}
        <div
          ref={phase5Ref}
          style={{ opacity: 0, pointerEvents: 'none' }}
          className="absolute inset-0 z-20 flex flex-col justify-between max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 will-change-[opacity]"
        >
          {/* Top Eyebrow */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-md border border-[#B8793A]/40 text-[#B8793A] type-eyebrow font-bold uppercase tracking-[0.2em] shadow-lg">
              <DoorOpen className="w-4 h-4 text-[#B8793A]" />
              <span>Door World · A Division of Kumar Kitchen King</span>
            </div>

            <p className="type-eyebrow text-[#8E8275] tracking-widest uppercase hidden sm:block bg-[#0E0C0A]/60 backdrop-blur-sm px-3 py-1 rounded-[3px] border border-[#2A241F]">
              Stage 04 / Sanctuary Unveiled
            </p>
          </div>

          {/* Main Reveal Headline & CTAs */}
          <div className="max-w-xl lg:max-w-2xl py-2 my-auto">
            <h2 className="font-sans text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#FBF8F3] leading-[1.05] tracking-tight mb-3 sm:mb-4 drop-shadow-[0_4px_28px_rgba(14,12,10,0.95)]">
              Crafted Precision. <br />
              <span className="text-[#B8793A] italic font-serif">Engineered to Endure.</span>
            </h2>

            <p className="text-xs sm:text-base md:text-lg text-[#F7F3EC]/90 font-sans leading-relaxed max-w-lg mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(14,12,10,0.9)]">
              Experience our classic European Designer Series kitchens and custom solid timber entrance doors manufactured at our Yamuna Nagar plant.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <MagneticButton
                onClick={onExploreClick}
                wrapperClassName="w-full sm:w-auto inline-block"
                className="w-full sm:w-auto min-h-[46px] sm:min-h-[52px] inline-flex items-center justify-center gap-3 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-[4px] shadow-lg shadow-[#B8793A]/30 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <LinkRollText text="Explore Kitchens &amp; Doors" />
                <ArrowDownRight className="w-4 h-4 text-[#0E0C0A]" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                onClick={handleQuoteClick}
                wrapperClassName="w-full sm:w-auto inline-block"
                className="w-full sm:w-auto min-h-[46px] sm:min-h-[52px] inline-flex items-center justify-center gap-3 border border-[#B8793A]/50 hover:border-[#B8793A] bg-[#171412]/80 hover:bg-[#171412] backdrop-blur-md text-[#FBF8F3] hover:text-[#B8793A] text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-[4px] transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <LinkRollText text="Get a Quote" />
                <ArrowRight className="w-4 h-4 text-[#B8793A]" aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>

          {/* Bottom Architectural Specs Strip */}
          <div className="w-full pt-3 sm:pt-6 border-t border-[#B8793A]/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-10">
              <div>
                <p className="type-eyebrow text-[#B8793A] font-bold text-[10px] sm:text-xs">Yamuna Nagar Plant</p>
                <p className="text-[10px] sm:text-xs text-[#D4C9B8]">100% Factory Built</p>
              </div>
              <div className="w-px h-5 bg-[#2A241F]" />
              <div>
                <p className="type-eyebrow text-[#B8793A] font-bold text-[10px] sm:text-xs">Sector 82, JLPL Mohali</p>
                <p className="text-[10px] sm:text-xs text-[#D4C9B8]">Showroom &amp; Master Gallery</p>
              </div>
            </div>

            <p className="text-[10px] sm:text-xs text-[#B8793A] uppercase tracking-[0.16em] font-semibold drop-shadow-[0_1px_4px_rgba(14,12,10,0.8)]">
              Scroll for Kitchens &amp; Doors ↓
            </p>
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC WALKTHROUGH HUD: STATUS PILL & SCRUB PROGRESS (SINGLE LAYER)
            ========================================================================= */}
        <div className="pointer-events-none absolute bottom-3 sm:bottom-4 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-30 flex items-center justify-between">
          {/* Live Walkthrough Compass / Stage Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:py-2 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-md border border-[#E6C98B]/35 text-[#FBF8F3] shadow-xl">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6C98B] animate-spin" style={{ animationDuration: '14s' }} />
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#E6C98B] font-semibold">
                STAGE <span ref={hudStageNumRef}>01</span> / <span ref={hudStageNameRef}>GRAND ENTRANCE</span>
              </span>
              <span ref={hudStageDescRef} className="text-[11px] sm:text-xs text-[#F1E8DA]/85 font-medium">
                Closed Solid Wooden Gates · Front Facade
              </span>
            </div>
          </div>

          {/* Minimal Live Scroll Scrubber Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 bg-[#0E0C0A]/85 backdrop-blur-md border border-[#E6C98B]/30 px-3 py-1.5 sm:py-2 rounded-[4px] shadow-xl">
            <span ref={hudPercentRef} className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#E6C98B] font-mono tabular-nums font-semibold">
              0%
            </span>
            <div className="w-16 sm:w-28 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                ref={hudBarRef}
                className="h-full bg-[#E6C98B] transition-none"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
