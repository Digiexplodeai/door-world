import { FC } from 'react';
import { DoorWorldLogo } from './DoorWorldLogo';
import { LinkRollText } from './MagneticButton';
import { NAV_LINKS, SHOWROOM_SERVICES, SITE_DATA } from '../data/site';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export const Footer: FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const { business } = SITE_DATA;

  return (
    <footer
      id="site-footer"
      className="bg-[#0E0C0A] text-[#F7F3EC] pt-16 lg:pt-24 pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-10 border-t border-[#2A241F]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Top Grid: Brand Column + Services + Navigation + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#2A241F]">
          {/* Col 1 (5 cols): Brand & Positioning */}
          <div className="lg:col-span-5 space-y-4">
            <DoorWorldLogo variant="footer" theme="dark" showSubtitle={true} />

            <p className="text-sm text-[#8E8275] leading-relaxed max-w-md pt-2">
              Kumar Kitchen King — &ldquo;The Complete Interior Solution&rdquo;. Manufacturer of custom acrylic &amp; PU modular kitchens, solid architectural wooden doors, and turnkey residential interiors. 100% factory built with zero on-site carpentry work.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[#B8793A]">
              <span className="px-2.5 py-1 rounded-[3px] bg-[#171412] border border-[#2A241F]">
                ISI Certified Core
              </span>
              <span className="px-2.5 py-1 rounded-[3px] bg-[#171412] border border-[#2A241F]">
                Yamuna Nagar Plant
              </span>
              <span className="px-2.5 py-1 rounded-[3px] bg-[#171412] border border-[#2A241F]">
                Sector 82 Mohali Gallery
              </span>
            </div>
          </div>

          {/* Col 2 (2 cols): Quick Index */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#B8793A] font-bold">
              Navigation
            </p>
            <ul className="space-y-2 text-xs uppercase tracking-[0.16em]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.href);
                    }}
                    className="text-[#8E8275] hover:text-[#B8793A] transition-colors inline-flex items-center min-h-[36px]"
                  >
                    <LinkRollText text={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 (2 cols): Core Services */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#B8793A] font-bold">
              Our Services
            </p>
            <ul className="space-y-2 text-xs text-[#8E8275]">
              {SHOWROOM_SERVICES.slice(0, 6).map((svc) => (
                <li key={svc.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('#services')}
                    className="hover:text-[#F7F3EC] transition-colors text-left cursor-pointer min-h-[32px] inline-flex items-center"
                  >
                    {svc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 (3 cols): Showroom & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#B8793A] font-bold">
              Showroom &amp; Plant
            </p>

            <div>
              <p className="text-xs font-bold text-[#F7F3EC]">Mohali Master Gallery</p>
              <a
                href={business.showroom.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8E8275] hover:text-[#B8793A] transition-colors block mt-0.5 leading-relaxed"
              >
                {business.showroom.fullAddress}
              </a>
            </div>

            <div>
              <p className="text-xs font-bold text-[#F7F3EC]">Factory &amp; Manufacturing</p>
              <p className="text-xs text-[#8E8275] mt-0.5 leading-relaxed">
                {business.factory.address}
              </p>
            </div>

            <div className="pt-1">
              <p className="text-xs text-[#B8793A] font-bold">Direct Desk</p>
              <a
                href={`tel:+91${business.contact.primaryPhone}`}
                className="text-sm font-bold text-[#F7F3EC] hover:text-[#B8793A] transition-colors block"
              >
                {business.contact.primaryPhoneDisplay}
              </a>
              <a
                href={`tel:${business.contact.landline}`}
                className="text-xs text-[#8E8275] hover:text-[#F7F3EC] transition-colors block mt-0.5"
              >
                Landline: {business.contact.landlineDisplay}
              </a>
              <p className="text-xs text-[#8E8275] mt-0.5">{business.contact.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8275] text-center sm:text-left">
          <p>
            &copy; {currentYear} {business.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-wider text-[#B8793A]/80">
            The Complete Interior Solution · Doors World
          </p>
        </div>
      </div>
    </footer>
  );
};
