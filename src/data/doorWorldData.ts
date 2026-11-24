/**
 * DOOR WORLD & KUMAR KITCHEN KING DATA BRIDGE
 * Re-exports centralized business data from src/data/site.ts
 * ensuring 100% backward compatibility with all components.
 */

import {
  SITE_DATA,
  buildWhatsAppUrl,
  NAV_LINKS,
  ANNOUNCEMENT_MESSAGES,
  SHOWROOM_SERVICES,
  KITCHEN_CATALOGUE_ITEMS,
  DOORS_CATALOGUE,
  ASSOCIATE_BRANDS,
  WHY_CHOOSE_US,
  PROCESS_STEPS,
  GALLERY_ITEMS,
} from './site';

export {
  SITE_DATA,
  buildWhatsAppUrl,
  NAV_LINKS,
  ANNOUNCEMENT_MESSAGES,
  SHOWROOM_SERVICES,
  KITCHEN_CATALOGUE_ITEMS,
  DOORS_CATALOGUE,
  ASSOCIATE_BRANDS,
  WHY_CHOOSE_US,
  PROCESS_STEPS,
  GALLERY_ITEMS,
};

export const BUSINESS_INFO = {
  name: 'Door World',
  parentCompany: 'Kumar Kitchen King',
  tagline: 'The Complete Interior Solution',
  doorsTagline: 'THE COMPLETE DOORS SOLUTIONS',
  category: 'Kitchens, Doors & Complete Interior Solutions',
  contactPerson: 'Kumar Kitchen King Desk',
  phoneDisplay: SITE_DATA.business.contact.primaryPhoneDisplay,
  phoneIntl: `+91 ${SITE_DATA.business.contact.primaryPhoneDisplay}`,
  phoneHref: `tel:+91${SITE_DATA.business.contact.primaryPhone}`,
  landlineDisplay: SITE_DATA.business.contact.landlineDisplay,
  landlineHref: `tel:${SITE_DATA.business.contact.landline}`,
  whatsappNumber: `91${SITE_DATA.business.contact.primaryPhone}`,
  whatsappBaseUrl: `https://wa.me/91${SITE_DATA.business.contact.primaryPhone}`,
  email: SITE_DATA.business.contact.email,
  website: SITE_DATA.business.contact.website,
  address: SITE_DATA.business.showroom.fullAddress,
  shortLocation: 'Sector 82, JLPL Industrial Area, Mohali',
  landmark: 'Plot No. 657, Sector 82, JLPL Industrial Area, Mohali, Punjab',
  factoryAddress: SITE_DATA.business.factory.address,
  hours: 'Mon – Sat · 10:00 AM – 7:30 PM (TODO: Confirm exact hours)',
  googleRating: 4.8,
  reviewCount: 150,
  mapEmbedUrl: SITE_DATA.business.showroom.mapEmbedUrl,
  mapDirectionsUrl: SITE_DATA.business.showroom.directionsUrl,
} as const;

export const DOOR_TYPE_OPTIONS = [
  'Modular Kitchens (Designer Series)',
  'Solid Wood Panel Doors',
  'Carved Designer Main Doors',
  'Laminated & Decorative Doors',
  'Timber Frames (Chaukhats)',
  'Wardrobes & Storage Systems',
  'Complete Interior Turnkey Solution',
  'Vanities & Consoles',
  'Pooja Temples & Mandirs',
  'Architectural Door Hardware',
] as const;

export interface WoodFinishOption {
  id: string;
  name: string;
  swatchHex: string;
  gradeNote: string;
  filterCss: string;
  tintOverlay: string;
}

export const WOOD_FINISHES: WoodFinishOption[] = [
  {
    id: 'teak',
    name: 'Teak',
    swatchHex: '#B8793A',
    gradeNote: 'Seasoned Golden Teak · Rich Natural Grain',
    filterCss: 'sepia(35%) hue-rotate(350deg) saturate(140%)',
    tintOverlay: 'rgba(184, 121, 58, 0.22)',
  },
  {
    id: 'walnut',
    name: 'Walnut',
    swatchHex: '#3E2B1E',
    gradeNote: 'Deep Architectural American Walnut',
    filterCss: 'sepia(45%) hue-rotate(330deg) saturate(120%) brightness(85%)',
    tintOverlay: 'rgba(62, 43, 30, 0.32)',
  },
  {
    id: 'oak',
    name: 'Oak',
    swatchHex: '#CBB28D',
    gradeNote: 'European White Oak · Soft Scandinavian Hue',
    filterCss: 'sepia(20%) hue-rotate(25deg) saturate(110%) brightness(105%)',
    tintOverlay: 'rgba(203, 178, 141, 0.18)',
  },
  {
    id: 'pu-white',
    name: 'PU White',
    swatchHex: '#F4F2EE',
    gradeNote: 'High Reflective & Pure White PU Lacquer',
    filterCss: 'brightness(112%) contrast(95%)',
    tintOverlay: 'rgba(244, 242, 238, 0.15)',
  },
  {
    id: 'greige',
    name: 'Greige',
    swatchHex: '#968E82',
    gradeNote: 'From Our Curated 20 Greiges Designer Palette',
    filterCss: 'sepia(15%) saturate(80%) brightness(95%)',
    tintOverlay: 'rgba(150, 142, 130, 0.22)',
  },
];

export interface DoorStyleOption {
  id: string;
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
}

export const DOOR_STYLES: DoorStyleOption[] = [
  {
    id: 'solid-panel',
    name: 'Solid Panel',
    tagline: 'Traditional Mortise & Tenon Construction',
    image: '/src/assets/images/door_solid_wood_panel_1795423050360.jpg',
    imageAlt: 'Solid timber raised panel door',
  },
  {
    id: 'carved',
    name: 'Carved 3D',
    tagline: 'Hand-Finished & CNC Architectural Carvings',
    image: '/src/assets/images/door_designer_carved_1795423050335.jpg',
    imageAlt: 'Carved luxury entrance door',
  },
  {
    id: 'laminated',
    name: 'Laminated',
    tagline: 'High-Pressure Scratch & Moisture Resistant',
    image: '/src/assets/images/door_laminated_decorative_1795423051322.jpg',
    imageAlt: 'Laminated interior decorative door',
  },
  {
    id: 'modular-fluted',
    name: 'Fluted Slats',
    tagline: 'Modern Slatted Glass & Wood Detailing',
    image: '/src/assets/images/gallery_fluted_walnut_door_1795423050164.jpg',
    imageAlt: 'Fluted slatted timber architectural door',
  },
];

export interface DoorSizeOption {
  id: string;
  name: string;
  dimensions: string;
}

export const DOOR_SIZES: DoorSizeOption[] = [
  { id: 'standard', name: 'Standard Sizing', dimensions: '7ft x 3ft / 7ft x 3.25ft (Standard Frame)' },
  { id: 'custom-villa', name: 'Villa Entrance', dimensions: '8ft x 4ft / 9ft x 5ft (Double Leaf / Pivot)' },
];

export const MARQUEE_ITEMS = [
  'MODULAR KITCHENS',
  'SOLID WOOD DOORS',
  'CUSTOM WARDROBES',
  'COMPLETE INTERIORS',
  'FACTORY BUILT QUALITY',
] as const;

export const SPOTLIGHT_WOOD_IMAGE = {
  src: '/src/assets/images/macro_teak_wood_grain_1795429393983.jpg',
  alt: 'Architectural wood grain detailing',
} as const;

export const ARCH_BANNER_WINDOWS = [
  {
    id: 'arch-1',
    title: 'Solid Panel Heritage',
    src: '/src/assets/images/door_solid_wood_panel_1795423050360.jpg',
    alt: 'Solid teak raised panel interior door in bright hallway',
    heightClass: 'h-[260px] sm:h-[310px] lg:h-[330px]',
  },
  {
    id: 'arch-2',
    title: 'Sunlit Showroom Double',
    src: '/src/assets/images/hero_sunlit_teak_showroom_1795423538188.jpg',
    alt: 'Sunlit golden teak double entrance doors inside luxury showroom',
    heightClass: 'h-[310px] sm:h-[380px] lg:h-[410px]',
  },
  {
    id: 'arch-3',
    title: 'Carved Main Entrance',
    src: '/src/assets/images/door_designer_carved_1795423050335.jpg',
    alt: 'Carved wooden double doors with traditional ornamental motifs',
    heightClass: 'h-[270px] sm:h-[330px] lg:h-[360px]',
  },
];

export const COLLECTION_CATEGORIES = [
  {
    id: 'solid-doors',
    numeral: '01',
    title: 'Solid Wood Panel Doors',
    woodSpec: 'Seasoned Burma Teak & Walnut',
    description: 'Bespoke solid timber doors handcrafted with mortise & tenon joinery.',
    image: '/src/assets/images/door_solid_wood_panel_1795423050360.jpg',
    imageAlt: 'Solid timber raised panel door',
  },
  {
    id: 'carved-doors',
    numeral: '02',
    title: 'Carved Architectural Entrances',
    woodSpec: 'High-Density Hardwood & CNC Motifs',
    description: 'Intricately carved grand entrance doors with timeless motifs.',
    image: '/src/assets/images/door_designer_carved_1795423050335.jpg',
    imageAlt: 'Carved luxury entrance door',
  },
];

export const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Architect Client',
    location: 'Sector 82, Mohali',
    projectType: 'Luxury Villa',
    rating: 5,
    comment: 'Factory built quality with zero on-site carpentry delays. The modular kitchen and solid teak doors exceeded expectations.',
  },
];

export const STORY_STATEMENT = 'The Complete Interior Solution manufactured with factory precision and seasoned craftsmanship under one roof in Mohali and Yamuna Nagar.';

export const EDITORIAL_PILLARS = [
  {
    number: '01',
    title: 'Factory Built Quality',
    description: 'Precision CNC cutting and dust-free finishing with no messy carpentry on site.',
  },
  {
    number: '02',
    title: 'ISI Certified Materials',
    description: 'Moisture-resistant marine plywood and premium European fittings from Blum and Hafele.',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Entrance' | 'Interior' | 'Carved & Veneer' | 'Frames & Hardware';
  finish: string;
  sizeClass: 'tall' | 'wide' | 'portrait';
  parallaxSpeed: number;
  image: string;
  imageAlt: string;
}
