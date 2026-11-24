import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Phone } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

export const NotFoundPage: FC = () => {
  const { contact } = SITE_DATA.business;

  return (
    <>
      <SeoHead
        title="Page Not Found (404)"
        description="The page you are looking for does not exist or has been moved."
        path="/404"
      />

      <section className="min-h-[70vh] flex items-center justify-center py-32 px-5 bg-[#0E0C0A] text-[#FBF8F3]">
        <div className="max-w-xl text-center space-y-6">
          <span className="text-sm font-mono uppercase tracking-[0.24em] text-[#B8793A] font-bold block">
            404 Error · Page Not Found
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#FBF8F3]">
            This Door Leads Nowhere
          </h1>
          <p className="text-sm sm:text-base text-[#8E8275] leading-relaxed max-w-md mx-auto">
            The page you requested could not be located. It may have been moved, renamed, or is temporarily unavailable.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold rounded-[4px] inline-flex items-center gap-2 shadow-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3.5 bg-[#171412] hover:bg-[#221D19] border border-[#2A241F] text-[#FBF8F3] text-xs uppercase tracking-[0.18em] font-medium rounded-[4px] inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#B8793A]" />
              <span>Contact Showroom</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
