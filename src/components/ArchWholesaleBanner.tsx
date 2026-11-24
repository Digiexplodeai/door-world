import { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import {
  ARCH_BANNER_WINDOWS,
  buildWhatsAppUrl,
  BUSINESS_INFO,
} from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { LinkRollText, MagneticButton } from './MagneticButton';
import { SafeImage } from './SafeImage';

export function ArchWholesaleBanner() {
  const { prefersReducedMotion, isDesktopPointer } = useMotionCapabilities();
  const [hoveredArch, setHoveredArch] = useState<string | null>(null);

  const whatsappHref = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.contactPerson}, I am enquiring about bulk / contractor wholesale door rates at Door World, Kharar.`
  );

  return (
    <section
      id="wholesale-banner"
      aria-labelledby="arch-wholesale-heading"
      className="py-16 lg:py-36 bg-[#0F3B33] text-[#FBF8F3] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(27,92,79,0.75),transparent_58%)] pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Copy & Two Buttons */}
          <div className="lg:col-span-5 space-y-5 lg:space-y-6">
            <p className="type-eyebrow text-[#E6C98B] font-semibold">
              Bulk &amp; Contractor Orders
            </p>
            <h2
              id="arch-wholesale-heading"
              className="type-h2 font-semibold text-[#FBF8F3]"
            >
              Building a project?{' '}
              <span className="italic font-normal text-[#E6C98B]">
                Get wholesale rates.
              </span>
            </h2>
            <p className="type-body text-[#F1E8DA]/85">
              Direct mill-to-site rates on bulk flush doors, solid teak chaukhats, carved main doors, and matching brass hardware sets across Kharar, Landran, and Mohali.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <MagneticButton
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                wrapperClassName="w-full sm:w-auto inline-block"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-[#E6C98B] hover:bg-[#FBF8F3] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3.5 lg:py-4 rounded-[4px] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#0F3B33]" aria-hidden="true" />
                <LinkRollText text="WhatsApp Quote" />
              </MagneticButton>

              <MagneticButton
                href={BUSINESS_INFO.phoneHref}
                wrapperClassName="w-full sm:w-auto inline-block"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 border border-[#E6C98B]/55 hover:border-[#E6C98B] text-[#FBF8F3] text-xs uppercase tracking-[0.2em] font-medium px-6 py-3.5 lg:py-4 rounded-[4px] transition-colors whitespace-nowrap tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#E6C98B]" aria-hidden="true" />
                <LinkRollText text={`Call ${BUSINESS_INFO.phoneDisplay}`} />
              </MagneticButton>
            </div>
          </div>

          {/* Right: 3 Staggered Arch Door Windows + Rotating Circular Badge */}
          <div className="lg:col-span-7 relative pt-6 lg:pt-0">
            {/* Rotating Circular SVG Badge overlapping arches corner */}
            <div
              aria-hidden="true"
              className="absolute -top-4 sm:-top-6 right-1 sm:right-6 z-30 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none"
            >
              <svg
                viewBox="0 0 120 120"
                className={`w-full h-full ${
                  prefersReducedMotion ? '' : 'animate-badge-spin'
                }`}
              >
                <defs>
                  <path
                    id="arch-badge-circle"
                    d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                  />
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="#0E0C0A"
                  fillOpacity="0.88"
                  stroke="#E6C98B"
                  strokeWidth="0.75"
                  strokeOpacity="0.55"
                />
                <text
                  fill="#E6C98B"
                  fontSize="9.2"
                  fontWeight="600"
                  letterSpacing="2.35"
                >
                  <textPath href="#arch-badge-circle" startOffset="0%">
                    WHOLESALE • RETAIL • KHARAR •
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-5 items-end">
              {ARCH_BANNER_WINDOWS.map((win) => {
                const isOpen = hoveredArch === win.id;
                return (
                  <button
                    key={win.id}
                    type="button"
                    onMouseEnter={isDesktopPointer ? () => setHoveredArch(win.id) : undefined}
                    onMouseLeave={isDesktopPointer ? () => setHoveredArch(null) : undefined}
                    onClick={() =>
                      setHoveredArch((prev) => (prev === win.id ? null : win.id))
                    }
                    aria-pressed={isOpen}
                    aria-label={`${win.title} — ${isOpen ? 'Close' : 'Open'} arch door preview`}
                    style={{
                      borderRadius: '999px 999px 0 0',
                      perspective: '1100px',
                    }}
                    className={`relative ${win.heightClass} overflow-hidden border border-[#E6C98B]/40 bg-[#1C1511] cursor-pointer group text-left`}
                  >
                    {/* Bright Interior Door Image Revealed Behind */}
                    <SafeImage
                      src={win.src}
                      alt={win.alt}
                      loading="lazy"
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      className="absolute inset-0 w-full h-full object-cover editorial-photo lg:transition-transform lg:duration-700 lg:group-hover:scale-105"
                    />
                    <div aria-hidden="true" className="hidden lg:block absolute inset-0 film-grain-overlay" />

                    {/* Wooden Door Overlay that Swings Open on Hover/Tap */}
                    <div
                      style={{
                        transformOrigin: 'left center',
                        transform: prefersReducedMotion
                          ? undefined
                          : isOpen
                            ? 'rotateY(-84deg)'
                            : 'rotateY(0deg)',
                        opacity: prefersReducedMotion && isOpen ? 0.1 : 1,
                        transition:
                          'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                      }}
                      className="absolute inset-0 wood-leaf-texture border-r border-[#E6C98B]/45 flex items-center justify-end pr-3 sm:pr-4"
                    >
                      <div className="w-[2px] h-12 bg-[#E6C98B]/80" />
                    </div>

                    <div className="absolute bottom-2.5 inset-x-2 sm:inset-x-3 z-20 pointer-events-none">
                      <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#FBF8F3] bg-[#0E0C0A]/85 px-1.5 py-1 rounded-[2px] text-center truncate">
                        {win.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="lg:hidden mt-3 text-[11px] uppercase tracking-[0.2em] text-[#E6C98B]/80 text-center">
              Tap an arch door to peek inside
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
