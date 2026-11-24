import { useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'motion/react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { BUSINESS_INFO, CUSTOMER_REVIEWS } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

/**
 * NOTE: Testimonials in CUSTOMER_REVIEWS (src/data/doorWorldData.ts) are sample
 * placeholders representing Mohali & Tricity customer feedback.
 */
export function EditorialReviews() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const review = CUSTOMER_REVIEWS[index];

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
  };

  const handleSwipeEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -45 || info.velocity.x < -280) {
      handleNext();
    } else if (info.offset.x > 45 || info.velocity.x > 280) {
      handlePrev();
    }
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-16 lg:py-44 bg-[#FBF8F3] text-[#0E0C0A]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Editorial Column */}
          <div className="lg:col-span-4 space-y-4 lg:space-y-6">
            <p className="type-eyebrow text-[#B8733B] font-semibold">
              Client Voices
            </p>
            <h2
              id="reviews-heading"
              className="type-h2 font-semibold text-[#0E0C0A]"
            >
              Rated {BUSINESS_INFO.googleRating} ★ on Google
            </h2>
            <p className="type-body text-[#8A7F73] tabular-nums">
              Based on {BUSINESS_INFO.reviewCount} reviews from homeowners, architects, and builders across Mohali &amp; Chandigarh.
            </p>

            {/* Controls (44px min touch target) */}
            <div className="pt-2 lg:pt-4 flex items-center gap-3 lg:gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous customer review"
                className="w-11 h-11 lg:w-12 lg:h-12 rounded-[4px] border border-[#0E0C0A]/25 hover:bg-[#0E0C0A] hover:text-[#FBF8F3] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next customer review"
                className="w-11 h-11 lg:w-12 lg:h-12 rounded-[4px] border border-[#0E0C0A]/25 hover:bg-[#0E0C0A] hover:text-[#FBF8F3] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="type-eyebrow text-[#8A7F73] tabular-nums ml-2">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(CUSTOMER_REVIEWS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right Single Big Italic Quote (Swipeable on Touch) */}
          <div className="lg:col-span-8 border-t border-[#B8733B]/35 pt-6 lg:pt-10 lg:min-h-[260px] touch-pan-y">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={review.id}
                drag={prefersReducedMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={handleSwipeEnd}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, x: direction * 24 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReducedMotion ? undefined : { opacity: 0, x: direction * -24 }
                }
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div
                  className="flex items-center gap-1.5 mb-4 lg:mb-6"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-[#B8733B] fill-[#E6C98B]'
                          : 'text-[#8A7F73]/30'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="font-display text-[1.15rem] sm:text-[1.35rem] md:text-[var(--text-statement)] leading-[1.4] md:leading-[1.3] tracking-[-0.015em] italic text-[#0E0C0A] max-w-[38ch] mb-6 lg:mb-8">
                  &ldquo;{review.comment}&rdquo;
                </p>

                <footer className="flex flex-wrap items-center gap-3 type-eyebrow">
                  <span className="font-semibold text-[#0E0C0A]">{review.author}</span>
                  <span className="text-[#B8733B]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[#8A7F73]">
                    {review.location} — {review.projectType}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
