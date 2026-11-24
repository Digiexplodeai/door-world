import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  UserCheck,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  BUSINESS_INFO,
  DOOR_TYPE_OPTIONS,
} from '../data/doorWorldData';
import { SITE_DATA } from '../data/site';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { submitEnquiry } from '../services/enquiryService';
import { LinkRollText, MagneticButton } from './MagneticButton';

interface ContactSectionProps {
  preselectedDoorType: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  doorType?: string;
  message?: string;
}

export function ContactSection({ preselectedDoorType }: ContactSectionProps) {
  const { prefersReducedMotion } = useMotionCapabilities();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [doorType, setDoorType] = useState<string>(DOOR_TYPE_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    doorType: string;
    message: string;
    referenceId: string;
    savedToDatabase: boolean;
  } | null>(null);

  useEffect(() => {
    if (!preselectedDoorType) return;
    const matched = DOOR_TYPE_OPTIONS.find(
      (opt) =>
        opt.toLowerCase() === preselectedDoorType.toLowerCase() ||
        opt.toLowerCase().includes(preselectedDoorType.toLowerCase()) ||
        preselectedDoorType.toLowerCase().includes(opt.toLowerCase().replace(' (chaukhat)', ''))
    );
    if (matched) {
      setDoorType(matched);
    } else {
      setMessage((prev) =>
        prev
          ? prev
          : `Interested in: ${preselectedDoorType}. Please share sizes and wholesale pricing.`
      );
    }
  }, [preselectedDoorType]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (minimum 2 characters).';
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!doorType) {
      nextErrors.doorType = 'Please select a door category.';
    }
    if (message.trim().length < 8) {
      nextErrors.message =
        'Please share a short note on quantity, approximate size, or requirement.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    const submissionName = name.trim();
    const submissionPhone = phone.trim();
    const submissionMessage = message.trim();

    try {
      const result = await submitEnquiry({
        name: submissionName,
        phone: submissionPhone,
        doorType,
        message: submissionMessage,
        source: 'contact_section',
      });

      setSubmittedData({
        name: submissionName,
        phone: submissionPhone,
        doorType,
        message: submissionMessage,
        referenceId: result.referenceId,
        savedToDatabase: result.savedToDatabase,
      });

      setName('');
      setPhone('');
      setMessage('');
    } catch (err: unknown) {
      console.warn('[Door World] Submission error caught:', err);
      setSubmitError('Unable to save to database. You can still message us directly on WhatsApp below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 lg:py-40 bg-[#F1E8DA] text-[#0E0C0A] border-t border-[#B8733B]/20"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-10 items-end mb-8 lg:mb-20">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-semibold text-stroke-teak opacity-65 block"
            >
              05
            </span>
          </div>

          <div className="lg:col-span-10">
            <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2.5 lg:mb-3">
              Visit Our Master Gallery · Sector 82, JLPL Mohali
            </p>
            <h2
              id="contact-heading"
              className="type-h2 font-bold text-[#0E0C0A]"
            >
              Get in Touch &amp; Request a Quote
            </h2>
          </div>
        </div>

        <div className="h-px w-full bg-[#B8733B]/25 mb-8 lg:mb-14" aria-hidden="true" />

        {/* 12-Col Asymmetric Split (Unboxed Architectural Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left 6 Cols: Showroom Info + Floating Label Form */}
          <div className="lg:col-span-6 space-y-8 lg:space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 pb-8 lg:pb-10 border-b border-[#B8793A]/25">
              <div className="sm:col-span-2 flex items-start gap-4">
                <MapPin
                  className="w-5 h-5 text-[#B8793A] shrink-0 mt-0.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <div>
                  <p className="type-eyebrow text-[#B8793A] font-bold uppercase tracking-wider mb-1">
                    Mohali Showroom &amp; Master Gallery
                  </p>
                  <p className="type-body font-medium text-[#0E0C0A]">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-xs text-[#8E8275] mt-1">
                    Factory: {BUSINESS_INFO.factoryAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone
                  className="w-4 h-4 text-[#B8793A] shrink-0 mt-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <p className="type-eyebrow text-[#B8793A] font-bold uppercase tracking-wider mb-1">
                    Direct Phone &amp; WhatsApp
                  </p>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="text-base font-bold text-[#0E0C0A] hover:text-[#B8793A] transition-colors tabular-nums block"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <a
                    href={BUSINESS_INFO.landlineHref}
                    className="text-xs text-[#8E8275] hover:text-[#0E0C0A] transition-colors tabular-nums block mt-0.5"
                  >
                    Landline: {BUSINESS_INFO.landlineDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock
                  className="w-4 h-4 text-[#B8793A] shrink-0 mt-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <p className="type-eyebrow text-[#B8793A] font-bold uppercase tracking-wider mb-1">
                    Hours &amp; Location
                  </p>
                  <p className="text-sm font-semibold text-[#0E0C0A]">
                    {BUSINESS_INFO.hours}
                  </p>
                  <p className="text-xs text-[#8E8275] mt-0.5">
                    Email: {BUSINESS_INFO.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div>
              <h3 className="type-h3 font-bold text-[#0E0C0A] mb-2">
                Request Project / Showroom Estimate
              </h3>
              <p className="type-body text-[#8E8275] mb-8">
                Share your room layout, door counts, modular kitchen requirements, or bespoke interior specs for a fixed factory estimate.
              </p>

              {submittedData ? (
                <motion.div
                  role="status"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="border border-[#B8733B]/45 bg-[#FBF8F3] p-6 sm:p-8 rounded-[4px]"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-full bg-[#0F3B33] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-[#E6C98B]" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] uppercase font-mono tracking-widest bg-[#0F3B33] text-[#E6C98B] px-2.5 py-0.5 rounded-[3px] font-semibold">
                          Ref: {submittedData.referenceId}
                        </span>
                        {submittedData.savedToDatabase && (
                          <span className="text-[10px] uppercase tracking-wider text-[#1B5C4F] font-semibold bg-[#1B5C4F]/10 px-2 py-0.5 rounded-[3px]">
                            Saved in Showroom CRM
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-2xl font-semibold text-[#0E0C0A]">
                        Enquiry Received for {submittedData.name}
                      </h4>
                      <p className="text-sm text-[#8A7F73] mt-1.5 leading-relaxed">
                        Regarding <span className="text-[#0E0C0A] font-medium">{submittedData.doorType}</span>. {submittedData.savedToDatabase ? 'Your enquiry is securely recorded in our showroom system. Send directly to ' : 'Send directly to '}{BUSINESS_INFO.contactPerson} on WhatsApp for immediate priority pricing.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={buildWhatsAppUrl(
                        `Hello ${BUSINESS_INFO.contactPerson}, my name is ${submittedData.name} (${submittedData.phone}). Ref: ${submittedData.referenceId}. I am enquiring about ${submittedData.doorType}: ${submittedData.message}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0F3B33] hover:bg-[#1B5C4F] text-[#FBF8F3] text-xs uppercase tracking-[0.2em] font-semibold px-5 py-3.5 rounded-[4px] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#E6C98B]" aria-hidden="true" />
                      <span>Chat on WhatsApp (Ref: {submittedData.referenceId})</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B8733B] hover:text-[#0E0C0A] cursor-pointer"
                    >
                      New Enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        id="enquiry-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        placeholder=" "
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className="peer w-full pt-5 pb-2.5 bg-transparent border-b border-[#0E0C0A]/25 text-sm text-[#0E0C0A] focus:outline-none"
                      />
                      <label
                        htmlFor="enquiry-name"
                        className="pointer-events-none absolute left-0 top-3.5 text-sm text-[#8A7F73] transition-all duration-200 peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-[#B8733B] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.22em] peer-[:not(:placeholder-shown)]:text-[#0E0C0A]"
                      >
                        Your Name
                      </label>
                      <motion.span
                        aria-hidden="true"
                        initial={false}
                        animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="origin-left absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B8733B]"
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-red-700 mt-1.5 font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        id="enquiry-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        placeholder=" "
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className="peer w-full pt-5 pb-2.5 bg-transparent border-b border-[#0E0C0A]/25 text-sm text-[#0E0C0A] tabular-nums focus:outline-none"
                      />
                      <label
                        htmlFor="enquiry-phone"
                        className="pointer-events-none absolute left-0 top-3.5 text-sm text-[#8A7F73] transition-all duration-200 peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-[#B8733B] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.22em] peer-[:not(:placeholder-shown)]:text-[#0E0C0A]"
                      >
                        Phone / WhatsApp
                      </label>
                      <motion.span
                        aria-hidden="true"
                        initial={false}
                        animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="origin-left absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B8733B]"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="text-xs text-red-700 mt-1.5 font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="enquiry-door-type"
                      className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B8733B] mb-1"
                    >
                      Door Type / Category
                    </label>
                    <select
                      id="enquiry-door-type"
                      name="doorType"
                      value={doorType}
                      onFocus={() => setFocusedField('doorType')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setDoorType(e.target.value)}
                      className="w-full py-2.5 bg-transparent border-b border-[#0E0C0A]/25 text-sm text-[#0E0C0A] focus:outline-none"
                    >
                      {DOOR_TYPE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{ scaleX: focusedField === 'doorType' ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="origin-left absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B8733B]"
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={3}
                      value={message}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                      }}
                      placeholder=" "
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className="peer w-full pt-6 pb-2 bg-transparent border-b border-[#0E0C0A]/25 text-sm text-[#0E0C0A] focus:outline-none resize-y"
                    />
                    <label
                      htmlFor="enquiry-message"
                      className="pointer-events-none absolute left-0 top-3.5 text-sm text-[#8A7F73] transition-all duration-200 peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-[#B8733B] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.22em] peer-[:not(:placeholder-shown)]:text-[#0E0C0A]"
                    >
                      Quantity, Sizes &amp; Requirement
                    </label>
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="origin-left absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B8733B]"
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-red-700 mt-1.5 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-[4px] text-xs text-red-700">
                      {submitError}
                    </div>
                  )}

                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      wrapperClassName="w-full sm:w-auto inline-block"
                      className={`w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 bg-[#B8733B] hover:bg-[#0E0C0A] text-[#FBF8F3] text-xs uppercase tracking-[0.22em] font-semibold px-7 py-4 rounded-[4px] transition-colors duration-200 ${
                        isSubmitting ? 'opacity-70 cursor-wait' : 'cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 text-[#E6C98B] animate-spin" aria-hidden="true" />
                          <span>Saving Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#E6C98B]" aria-hidden="true" />
                          <LinkRollText text="Send Enquiry" />
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right 6 Cols: Clean Framed Google Map */}
          <div className="lg:col-span-6 space-y-5">
            <div className="relative h-[320px] sm:h-[420px] lg:h-[520px] rounded-[4px] overflow-hidden border border-[#B8733B]/30 bg-[#E6C98B]/15">
              <iframe
                title="Kumar Kitchen King and Door World Showroom Map - Plot 657, Sector 82, JLPL Mohali"
                src={SITE_DATA.business.showroom.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <p className="font-bold text-xl text-[#0E0C0A]">
                  Kumar Kitchen King &amp; Door World
                </p>
                <p className="text-xs text-[#8E8275]">
                  Plot No. 657, Sector 82, JLPL Industrial Area, Mohali, Punjab 140306
                </p>
              </div>

              <MagneticButton
                href={SITE_DATA.business.showroom.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                wrapperClassName="w-full sm:w-auto inline-block"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-[#0E0C0A] hover:bg-[#B8793A] text-[#FBF8F3] text-xs uppercase tracking-[0.2em] font-semibold px-5 py-3.5 rounded-[4px] transition-colors whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5 text-[#B8793A]" aria-hidden="true" />
                <LinkRollText text="Get Directions" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
