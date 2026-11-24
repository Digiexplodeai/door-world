import { FC } from 'react';
import { ASSOCIATE_BRANDS } from '../data/site';

export const PartnerBrandsStrip: FC = () => {
  return (
    <section
      id="brands"
      aria-labelledby="brands-heading"
      className="py-14 bg-[#171412] text-[#FBF8F3] border-y border-[#2A241F] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B8793A] mb-1">
            Associate Brands &amp; Material Partners
          </p>
          <h2 id="brands-heading" className="text-lg sm:text-xl font-bold text-[#FBF8F3]">
            Engineered with India &amp; Europe's Leading Hardware &amp; Surfaces
          </h2>
        </div>
        <span className="text-xs text-[#8E8275] font-mono shrink-0">
          20 Associate Brands from Kitchen Catalogue
        </span>
      </div>

      {/* Responsive Brand Grid / Marquee */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2.5 sm:gap-3">
          {ASSOCIATE_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="py-3 px-2 rounded-[4px] bg-[#0E0C0A] border border-[#2A241F] hover:border-[#B8793A]/60 flex flex-col items-center justify-center text-center transition-colors group"
            >
              <span className="text-xs sm:text-sm font-bold text-[#F7F3EC] group-hover:text-[#B8793A] transition-colors whitespace-nowrap truncate w-full px-1">
                {brand.name}
              </span>
              <span className="text-[8px] font-mono uppercase tracking-wider text-[#8E8275] truncate w-full px-1 mt-0.5">
                {brand.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
