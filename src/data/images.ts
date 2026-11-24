/**
 * Centralized Image Constants for Kumar Kitchen King & Door World
 * All paths are absolute public URLs matching exact filenames in /public.
 * Vercel is case-sensitive.
 */

export const SITE_IMAGES = {
  // Brand Assets
  brand: {
    logoHeader: '/images/logo/door-world-logo-header.svg',
    logoFooter: '/images/logo/door-world-logo-footer.svg',
    favicon: '/favicon.svg',
    ogImage: '/og-image.svg',
  },

  // Hero Section
  hero: {
    background: '/images/doors/luxury-villa-entrance-01.webp',
    poster: '/images/doors/luxury-villa-entrance-01.webp',
  },

  // Showroom & Factory
  showroom: {
    storefront: '/images/showroom.jpg',
  },

  // Modular Kitchen Catalogue (KKK Series) - 7 Real Kitchen Image Slots
  kitchens: {
    kkk101: '/images/catalogue/kitchen-01.webp',
    kkk102: '/images/catalogue/kitchen-02.webp',
    kkk103: '/images/catalogue/kitchen-03.webp',
    kkk124: '/images/catalogue/kitchen-04.webp',
    kkk142: '/images/catalogue/kitchen-05.webp',
    kkk150: '/images/catalogue/kitchen-06.webp',
    kkk168: '/images/catalogue/kitchen-07.webp',
  },

  // Door World Division - 12 Real Door Photographs
  doors: {
    // Hero & Featured Grand Entrance
    luxuryVillaEntrance01: '/images/doors/luxury-villa-entrance-01.webp',
    // Carved Designer Doors
    carvedLatticeTeak02: '/images/doors/carved-lattice-teak-door-02.webp',
    // Solid Wood Panel Doors
    cofferedPanelDouble03: '/images/doors/coffered-panel-double-door-03.webp',
    // Gallery / Carved Medallion
    circularMedallion04: '/images/doors/circular-medallion-carved-door-04.webp',
    // Gallery / Organic Wave Sculpted
    artisticWave05: '/images/doors/artistic-wave-carved-door-05.webp',
    // Gallery / Chevron Fluted Walnut
    chevronFlutedWalnut06: '/images/doors/chevron-fluted-walnut-door-06.webp',
    // Laminated & Decorative Doors
    chevronTextured07: '/images/doors/chevron-textured-interior-door-07.webp',
    // Timber Frames / Architectural Pivot
    sunburstRadialPivot08: '/images/doors/sunburst-radial-pivot-door-08.webp',
    // Gallery / Bleached Ash Fluted
    flutedAcoustic09: '/images/doors/fluted-acoustic-interior-door-09.webp',
    // Gallery / Acanthus Sliding Barn Door
    carvedFloralBarn10: '/images/doors/carved-floral-sliding-barn-door-10.webp',
    // Services Doors Card / Security Architrave
    concentricMolded11: '/images/doors/concentric-molded-security-door-11.webp',
    // Gallery / Classic Three-Panel Espresso
    classicThreePanel12: '/images/doors/classic-three-panel-espresso-door-12.webp',
  },
} as const;

export type SiteImageKey = typeof SITE_IMAGES;
