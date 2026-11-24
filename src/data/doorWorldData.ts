export interface NavLinkItem {
  label: string;
  href: string;
  sectionId: string;
  numeral: string;
}

export interface CollectionCategory {
  id: string;
  numeral: string;
  title: string;
  woodSpec: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface WoodFinishOption {
  id: string;
  name: 'Teak' | 'Walnut' | 'Oak' | 'Wenge' | 'Ash';
  swatchHex: string;
  gradeNote: string;
  filterCss: string;
  tintOverlay: string;
}

export interface DoorStyleOption {
  id: string;
  name: 'Panel' | 'Flush' | 'Carved' | 'Fluted';
  tagline: string;
  image: string;
  imageAlt: string;
}

export interface DoorSizeOption {
  id: 'standard' | 'custom';
  name: 'Standard' | 'Custom';
  dimensions: string;
}

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

export interface BenefitItem {
  number: string;
  title: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  projectType: string;
  rating: number;
  comment: string;
}

export const THEME_CONFIG = {
  colors: {
    ink: '#0E0C0A',
    espresso: '#1C1511',
    teak: '#B8733B',
    gold: '#E6C98B',
    ivory: '#FBF8F3',
    sand: '#F1E8DA',
    emeraldDeep: '#0F3B33',
    emeraldLight: '#1B5C4F',
    muted: '#8A7F73',
  },
} as const;

export const BUSINESS_INFO = {
  name: 'Door World',
  category: 'Wholesaler of all kinds of wooden doors and accessories',
  contactPerson: 'Tanishq Goyal',
  phoneDisplay: '076961 23296',
  phoneIntl: '+91 76961 23296',
  phoneHref: 'tel:+917696123296',
  whatsappNumber: '917696123296',
  whatsappBaseUrl: 'https://wa.me/917696123296',
  address:
    'Kharar - Landran Rd, near Ambika Devi Mandir, adjoining LIC Building, New Hari Enclave, Kharar, Punjab 140301',
  shortLocation: 'Kharar - Landran Rd, New Hari Enclave, Kharar',
  landmark: 'Near Ambika Devi Mandir, adjoining LIC Building',
  hours: 'Open daily · Closes 7 PM',
  googleRating: 4.6,
  reviewCount: 55,
  // PLACEHOLDER MAP EMBED: Replace with your exact Google Maps Business Place Embed URL when ready.
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Ambika%20Devi%20Mandir%20Kharar%20Landran%20Rd%20New%20Hari%20Enclave%20Kharar%20Punjab%20140301&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Door+World+Kharar+Landran+Rd+near+Ambika+Devi+Mandir+New+Hari+Enclave+Kharar+Punjab+140301',
} as const;

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '#home', sectionId: 'home', numeral: '01' },
  { label: 'Collections', href: '#collections', sectionId: 'collections', numeral: '02' },
  { label: 'Studio', href: '#configurator', sectionId: 'configurator', numeral: '03' },
  { label: 'Craft', href: '#story', sectionId: 'story', numeral: '04' },
  { label: 'Gallery', href: '#gallery', sectionId: 'gallery', numeral: '05' },
  { label: 'Contact', href: '#contact', sectionId: 'contact', numeral: '06' },
];

export const MARQUEE_ITEMS = [
  'SOLID WOOD',
  'DESIGNER DOORS',
  'DOOR FRAMES',
  'ACCESSORIES',
  'WHOLESALE RATES',
] as const;

export const ANNOUNCEMENT_MESSAGES = [
  'Open today · Closes 7 PM',
  'Wholesale rates for builders & contractors',
  'Call 076961 23296',
] as const;

// SPOTLIGHT WOOD-GRAIN IMAGE: Replace with a macro photo of real shop timber planks.
export const SPOTLIGHT_WOOD_IMAGE = {
  src: '/src/assets/images/macro_teak_wood_grain_1795429393983.jpg',
  alt: 'Macro view of seasoned golden Burma teak and dark walnut timber grain planks',
} as const;

// ARCH-DOOR WHOLESALE BANNER WINDOWS: Replace with real interior door installation photos.
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
    title: 'Pivot Teak Entry',
    src: '/src/assets/images/gallery_tall_pivot_door_1795423050505.jpg',
    alt: 'Tall floor-to-ceiling teak pivot door in sunlit modern foyer',
    heightClass: 'h-[280px] sm:h-[340px] lg:h-[360px]',
  },
] as const;

// HERO PHOTOGRAPHY: Curated architectural hero perspectives and editorial copy.
export const HERO_CONTENT = {
  kicker: 'Kharar, Punjab · Bespoke Wooden Doors & Architectural Hardware',
  line1: 'Crafted Doors.',
  line2: 'Built to Last.',
  subheading:
    'Discover beautifully crafted doors, premium finishes, and architectural solutions designed for exceptional spaces.',
  primaryCta: 'Explore Collection',
  secondaryCta: 'Get a Quote',
  doorImage: '/src/assets/images/hero_luxury_wooden_door_1795423050027.jpg',
  doorImageAlt:
    'Grand bespoke solid teak and dark walnut wooden double door in a luxury architectural foyer',
  showroomBackdrop: '/src/assets/images/hero_sunlit_teak_showroom_1795423538188.jpg',
  showroomBackdropAlt:
    'Sunlit luxury architectural showroom featuring natural golden teak doors on travertine stone',
} as const;

// DOOR-PANEL COLLECTIONS: Replace image paths below with real shop photographs.
export const COLLECTION_CATEGORIES: CollectionCategory[] = [
  {
    id: 'solid-wood-panel',
    numeral: '01',
    title: 'Solid Wood Panel Doors',
    woodSpec: 'Seasoned Teak & Sagwan',
    description:
      'Raised and bevelled multi-panel doors milled from kiln-seasoned hardwood for enduring structural integrity.',
    image: '/src/assets/images/door_solid_wood_panel_1795423050360.jpg',
    imageAlt: 'Classic 6-panel solid teak wooden interior door with brass mortise lever',
  },
  {
    id: 'designer-carved',
    numeral: '02',
    title: 'Designer Carved Doors',
    woodSpec: 'CNC & Hand-Carved Relief',
    description:
      'Sculptural fluted geometry, heritage motifs, and subtle brass inlay crafted for statement entrances and pooja rooms.',
    image: '/src/assets/images/door_designer_carved_1795423050335.jpg',
    imageAlt: 'Sculptural carved dark walnut designer wooden door with geometric relief',
  },
  {
    id: 'laminated-doors',
    numeral: '03',
    title: 'Laminated Doors',
    woodSpec: 'Flush Core · Metallic Inlay',
    description:
      'Contemporary flush doors finished in matte wood-grain laminates and brushed metallic strips for calm modern interiors.',
    image: '/src/assets/images/door_laminated_decorative_1795423051322.jpg',
    imageAlt: 'Modern laminated flush door with Burma teak grain and horizontal brass strips',
  },
  {
    id: 'main-entrance',
    numeral: '04',
    title: 'Main Entrance Doors',
    woodSpec: 'Double & Single Leaf · Heavy Duty',
    description:
      'Commanding entrance assemblies built for security and architectural presence, complete with heavy mouldings and brass pulls.',
    image: '/src/assets/images/door_main_entrance_1795423050613.jpg',
    imageAlt: 'Grand double-leaf solid hardwood main entrance door with heritage mouldings',
  },
  {
    id: 'door-frames',
    numeral: '05',
    title: 'Door Frames',
    woodSpec: 'Teak, Sal & Kapur Chaukhat',
    description:
      'Precision-planed wooden chaukhats and architraves milled to exact wall depths for clean installation.',
    image: '/src/assets/images/door_frames_chaukhat_1795423050222.jpg',
    imageAlt: 'Seasoned teak and hardwood wooden door frames arranged inside showroom',
  },
  {
    id: 'door-accessories',
    numeral: '06',
    title: 'Door Accessories',
    woodSpec: 'Solid Brass & Matte Hardware',
    description:
      'Mortise locks, heavy bearing hinges, tower bolts, aldrops, and door closers stocked wholesale under one roof.',
    image: '/src/assets/images/door_brass_accessories_1795423049562.jpg',
    imageAlt: 'Antique brushed brass mortise door handles, hinges, tower bolt, and lock cylinder',
  },
];

// CONFIGURATOR OPTIONS
export const WOOD_FINISHES: WoodFinishOption[] = [
  {
    id: 'teak',
    name: 'Teak',
    swatchHex: '#B8733B',
    gradeNote: 'Golden Burma-tone grain · Rich natural oils',
    filterCss: 'sepia(0.18) saturate(1.18) brightness(1.02) contrast(1.04)',
    tintOverlay: 'rgba(184, 115, 59, 0.14)',
  },
  {
    id: 'walnut',
    name: 'Walnut',
    swatchHex: '#4E3122',
    gradeNote: 'Deep chocolate heartwood · Matte satin polish',
    filterCss: 'sepia(0.24) brightness(0.84) contrast(1.12) saturate(0.95)',
    tintOverlay: 'rgba(28, 21, 17, 0.24)',
  },
  {
    id: 'oak',
    name: 'Oak',
    swatchHex: '#C9A87C',
    gradeNote: 'Warm honey neutral · Scandinavian openness',
    filterCss: 'sepia(0.12) brightness(1.1) saturate(0.88) contrast(1.0)',
    tintOverlay: 'rgba(230, 201, 139, 0.16)',
  },
  {
    id: 'wenge',
    name: 'Wenge',
    swatchHex: '#231A16',
    gradeNote: 'Architectural espresso charcoal · Bold contrast',
    filterCss: 'grayscale(0.28) brightness(0.74) contrast(1.2)',
    tintOverlay: 'rgba(14, 12, 10, 0.34)',
  },
  {
    id: 'ash',
    name: 'Ash',
    swatchHex: '#D8CDBF',
    gradeNote: 'Pale bleached timber · Crisp minimalist tone',
    filterCss: 'saturate(0.55) brightness(1.14) contrast(0.98)',
    tintOverlay: 'rgba(241, 232, 218, 0.22)',
  },
];

export const DOOR_STYLES: DoorStyleOption[] = [
  {
    id: 'panel',
    name: 'Panel',
    tagline: 'Traditional bevelled hardwood stiles and raised rails.',
    image: '/src/assets/images/door_solid_wood_panel_1795423050360.jpg',
    imageAlt: 'Solid wood raised panel architectural door',
  },
  {
    id: 'flush',
    name: 'Flush',
    tagline: 'Minimalist laminated surface with brushed brass inlays.',
    image: '/src/assets/images/door_laminated_decorative_1795423051322.jpg',
    imageAlt: 'Modern laminated flush door with metallic strips',
  },
  {
    id: 'carved',
    name: 'Carved',
    tagline: 'Deep geometric relief milled into solid seasoned timber.',
    image: '/src/assets/images/door_designer_carved_1795423050335.jpg',
    imageAlt: 'Designer carved wooden door with geometric pattern',
  },
  {
    id: 'fluted',
    name: 'Fluted',
    tagline: 'Vertical architectural reeding with concealed frame profile.',
    image: '/src/assets/images/gallery_fluted_walnut_door_1795423050164.jpg',
    imageAlt: 'Tall vertical fluted architectural wooden door',
  },
];

export const DOOR_SIZES: DoorSizeOption[] = [
  { id: 'standard', name: 'Standard', dimensions: '84" × 36" (32mm–38mm thick)' },
  { id: 'custom', name: 'Custom', dimensions: 'Made-to-Measure Height, Width & Frame' },
];

export const STORY_STATEMENT =
  'Every door we supply is chosen for strength, grain and finish—seasoned timber, precision frames, and brass hardware stocked wholesale in Kharar.';

export const EDITORIAL_PILLARS: BenefitItem[] = [
  {
    number: '01',
    title: 'Kiln-Seasoned Hardwood',
    description:
      'Selected for core density, dimensional stability, and natural resistance to seasonal warping.',
  },
  {
    number: '02',
    title: 'Direct Wholesale & Retail Pricing',
    description:
      'Volume project rates for builders alongside honest single-home pricing with zero middleman markups.',
  },
  {
    number: '03',
    title: 'Custom Sizes & Framing',
    description:
      'Non-standard doorway heights, wide double entrances, and deep wall chaukhats cut cleanly to site measurements.',
  },
  {
    number: '04',
    title: 'Complete Hardware Under One Roof',
    description:
      'Pair every shutter with matching antique brass handles, mortise locks, hinges, and tower bolts on the spot.',
  },
  {
    number: '05',
    title: 'Ready Showroom Inventory',
    description:
      'Inspect grain patterns, laminates, and carved reliefs firsthand before ordering for your home or site.',
  },
  {
    number: '06',
    title: 'Trusted Local Address in Kharar',
    description:
      'Located on Kharar - Landran Rd near Ambika Devi Mandir, adjoining the LIC Building—backed by 4.6★ customer trust.',
  },
];

// HORIZONTAL GALLERY ITEMS: Replace image paths below with real shop & installation photos.
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-pivot',
    title: 'Floor-to-Ceiling Teak Pivot Entry',
    category: 'Entrance',
    finish: 'Natural Matte Teak · Concealed Pivot',
    sizeClass: 'tall',
    parallaxSpeed: 1,
    image: '/src/assets/images/gallery_tall_pivot_door_1795423050505.jpg',
    imageAlt: 'Tall bespoke floor-to-ceiling solid teak pivot door in sunlit residence',
  },
  {
    id: 'gal-carved',
    title: 'Geometric Fluted Walnut Edition',
    category: 'Carved & Veneer',
    finish: 'Deep Walnut Stain · Satin Oil',
    sizeClass: 'portrait',
    parallaxSpeed: 1.25,
    image: '/src/assets/images/door_designer_carved_1795423050335.jpg',
    imageAlt: 'Carved walnut designer wooden door with diamond geometric relief',
  },
  {
    id: 'gal-double',
    title: 'Heritage Double-Leaf Main Door',
    category: 'Entrance',
    finish: 'Seasoned Sagwan · Antique Brass Pulls',
    sizeClass: 'wide',
    parallaxSpeed: 0.85,
    image: '/src/assets/images/door_main_entrance_1795423050613.jpg',
    imageAlt: 'Double-leaf solid wood main entrance door with heritage mouldings',
  },
  {
    id: 'gal-fluted',
    title: 'Vertical Fluted Bedroom Door',
    category: 'Interior',
    finish: 'Smoked Walnut Veneer · Slim Frame',
    sizeClass: 'tall',
    parallaxSpeed: 1.18,
    image: '/src/assets/images/gallery_fluted_walnut_door_1795423050164.jpg',
    imageAlt: 'Vertical fluted walnut wooden bedroom door with slim brass lever',
  },
  {
    id: 'gal-inlay',
    title: 'Horizontal Brass Inlay Flush Door',
    category: 'Carved & Veneer',
    finish: 'Burma Teak Laminate · Brushed Gold',
    sizeClass: 'portrait',
    parallaxSpeed: 0.92,
    image: '/src/assets/images/door_laminated_decorative_1795423051322.jpg',
    imageAlt: 'Laminated wooden flush door with horizontal brushed brass inlay strips',
  },
  {
    id: 'gal-panel',
    title: 'Six-Panel Classic Teak Door',
    category: 'Interior',
    finish: 'Clear Melamine · Solid Hardwood',
    sizeClass: 'portrait',
    parallaxSpeed: 1.1,
    image: '/src/assets/images/door_solid_wood_panel_1795423050360.jpg',
    imageAlt: 'Six-panel solid teak interior door in warm ivory hallway',
  },
  {
    id: 'gal-frames',
    title: 'Kiln-Seasoned Hardwood Chaukhats',
    category: 'Frames & Hardware',
    finish: 'Precision Mitered · Custom Depth',
    sizeClass: 'wide',
    parallaxSpeed: 0.88,
    image: '/src/assets/images/door_frames_chaukhat_1795423050222.jpg',
    imageAlt: 'Stacked seasoned hardwood door frames inside timber warehouse',
  },
  {
    id: 'gal-hardware',
    title: 'Antique Brass Mortise & Hinge Suite',
    category: 'Frames & Hardware',
    finish: 'Solid Brass · Heavy-Duty Bearing',
    sizeClass: 'portrait',
    parallaxSpeed: 1.15,
    image: '/src/assets/images/door_brass_accessories_1795423049562.jpg',
    imageAlt: 'Architectural antique brass door lever handles, hinges, tower bolts, and lock cylinder',
  },
];

// PLACEHOLDER REVIEWS: Replace with verified Google Customer Reviews from your Google Business Profile.
export const CUSTOMER_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Harpreet Singh Gill',
    location: 'Sunny Enclave, Kharar',
    projectType: 'Full Home · 11 Doors & Frames',
    rating: 5,
    comment:
      'Purchased solid panel doors, laminated bedroom shutters, and all brass hardware for our new house. Tanishq guided us patiently on timber grades, and the wholesale pricing saved us substantially.',
  },
  {
    id: 'rev-2',
    author: 'Rajesh Sharma',
    location: 'Sector 115, Mohali',
    projectType: 'Builder Project · Bulk Order',
    rating: 5,
    comment:
      'As a civil contractor, timely delivery and uniform shutter thickness matter most. Door World supplied 28 flush doors and seasoned frames right on schedule with zero warping.',
  },
  {
    id: 'rev-3',
    author: 'Neha Verma',
    location: 'New Hari Enclave, Kharar',
    projectType: 'Main Entrance Carved Door',
    rating: 5,
    comment:
      'Visited their showroom near Ambika Devi Mandir for a carved main entrance door. The grain finish and antique brass handle set completely transformed our foyer.',
  },
  {
    id: 'rev-4',
    author: 'Gurpreet Kaur Sandhu',
    location: 'Landran Road, Kharar',
    projectType: 'Renovation · Laminated Doors',
    rating: 4,
    comment:
      'Impressive variety of modern laminated and brass-inlay designs under one roof. Having hinges, locks, and door stoppers available alongside made installation effortless.',
  },
  {
    id: 'rev-5',
    author: 'Amanjot Singh',
    location: 'Gillco Valley, Kharar',
    projectType: 'Custom Teak Chaukhats & Doors',
    rating: 5,
    comment:
      'Honest advice, fair wholesale rates, and genuine timber quality. Our carpenter specifically praised how cleanly the door frames were planed and mitered.',
  },
];

export const DOOR_TYPE_OPTIONS = [
  'Solid Wood Panel Doors',
  'Designer Carved Doors',
  'Laminated Doors',
  'Main Entrance Doors',
  'Door Frames (Chaukhat)',
  'Door Accessories & Hardware',
  'Bulk / Builder Wholesale Order',
] as const;

export function buildWhatsAppUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
