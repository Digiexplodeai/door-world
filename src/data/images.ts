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
    ogImage: '/images/doors/web/double-entrance/47-radial-grid-double-door.webp',
  },

  // Hero Section
  hero: {
    background: '/images/doors/web/cnc-carved/17-radial-carved-wood-door.webp',
    poster: '/images/doors/web/cnc-carved/17-radial-carved-wood-door.webp',
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

  // Door World Division - Key Featured Doors from /public/images/doors/web/
  doors: {
    heroRadial17: '/images/doors/web/cnc-carved/17-radial-carved-wood-door.webp',
    doubleGrid47: '/images/doors/web/double-entrance/47-radial-grid-double-door.webp',
    bronzeGrid13: '/images/doors/web/modern-designer/13-bronze-grid-door.webp',
    woodGrid14: '/images/doors/web/modern-designer/14-wood-grid-entrance-door.webp',
    ornateCarved06: '/images/doors/web/cnc-carved/06-ornate-carved-wood-door.webp',
    classicPanel05: '/images/doors/web/classic-panel/05-white-classic-panel-door.webp',
    verticalFluted09: '/images/doors/web/fluted-textured/09-vertical-fluted-wood-door.webp',
    interiorsCorridor22: '/images/doors/web/wall-panelling/22-wood-panelled-corridor.webp',
    interiorsPattern53: '/images/doors/web/wall-panelling/53-dark-patterned-wall-panelling.webp',
  },
} as const;

export type SiteImageKey = typeof SITE_IMAGES;
