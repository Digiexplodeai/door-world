/**
 * KUMAR KITCHEN KING — CENTRAL BUSINESS DATA & SITE CONFIGURATION
 * "The Complete Interior Solution" · Doors by "Door World"
 *
 * This file is the SINGLE SOURCE OF TRUTH for the entire website.
 * All phone numbers, addresses, services, catalogue items, brands, and
 * styling specifications are centralized here for easy client maintenance.
 */

export interface NavLinkItem {
  label: string;
  href: string;
  sectionId: string;
  numeral: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  category: 'kitchens' | 'doors' | 'wardrobes' | 'interiors' | 'decor';
}

export interface KitchenStyleCategory {
  id: string;
  name: string;
  description: string;
  codes: string[];
}

export interface KitchenProductItem {
  code: string;
  name: string;
  style: string;
  finish: string;
  colorName: string;
  colorHex: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export interface DoorProductItem {
  id: string;
  name: string;
  category: 'Solid Wood Panel' | 'Carved Designer' | 'Laminated Decorative' | 'Timber Frames' | 'Architectural Hardware';
  description: string;
  woodOptions: string[];
  dimensions: string;
  pricingNote: string;
  image: string;
  imageAlt: string;
}

export interface PartnerBrand {
  name: string;
  category: 'Adhesives & Chemicals' | 'Laminates & Surfaces' | 'Edgeband & Polymers' | 'Hardware & Fittings' | 'Plywood & Boards' | 'Appliances & Stone';
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface WhyChoosePoint {
  num: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Kitchens' | 'Doors' | 'Wardrobes' | 'Interiors';
  tag: string;
  image: string;
  imageAlt: string;
  aspect: 'tall' | 'wide' | 'square';
}

// ============================================================================
// 1. BUSINESS DETAILS & LOCATIONS (SINGLE SOURCE OF TRUTH)
// ============================================================================
export const SITE_DATA = {
  business: {
    legalName: 'Kumar Kitchen King',
    tagline: 'The Complete Interior Solution',
    doorsBrand: 'Door World',
    doorsTagline: 'THE COMPLETE DOORS SOLUTIONS',
    badgeText: 'by Kumar Kitchen King',
    experienceClaim: 'A Decade of Manufacturing Excellence',
    // TODO: Client to confirm whether to display "15 Years" badge from catalogue or "A decade of experience". Currently using 10+ Years.
    positioning: 'Manufacturer of customised modular kitchens (acrylic & laminate), solid architectural doors, and turnkey luxury interiors. ISI certified, 100% factory-built with zero on-site carpentry work.',

    // Showroom & Master Gallery (Mohali)
    showroom: {
      title: 'Showroom & Master Gallery',
      addressLine1: 'Plot No. 657, Sector 82, JLPL Industrial Area',
      city: 'Sahibzada Ajit Singh Nagar (Mohali)',
      state: 'Punjab',
      pincode: '140306',
      // TODO: Client to confirm PIN code 140306 (Google Maps) vs 140308 (Catalogue)
      fullAddress: 'Plot No. 657, Sector 82, JLPL Industrial Area, Sahibzada Ajit Singh Nagar (Mohali), Punjab 140306',
      directionsUrl: 'https://www.google.com/maps?q=Plot+No.+657,+Kumar+Kitchen+King,+Sector+82,+JLPL+Industrial+Area,+Sahibzada+Ajit+Singh+Nagar,+Punjab+140306',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Plot+No.+657,+Kumar+Kitchen+King,+Sector+82,+JLPL+Industrial+Area,+Sahibzada+Ajit+Singh+Nagar,+Punjab+140306&t=&z=15&ie=UTF8&iwloc=&output=embed',
      // TODO: Client to confirm exact showroom hours
      hours: 'Open Monday – Saturday',
    },

    // Factory & Manufacturing Unit (Yamuna Nagar)
    factory: {
      title: 'Factory & Manufacturing Facility',
      address: 'Opp. Thermal Power Plant, Pansra, Yamuna Nagar, Haryana - 135001',
      city: 'Yamuna Nagar',
      state: 'Haryana',
      pincode: '135001',
      badge: 'Factory-Built Quality · No Carpentry at Site',
      description: 'Equipped with precision European CNC machinery, automated edgebanders, and dust-free PU lacquer spray booths for large and custom builder orders.',
    },

    // Contact Numbers
    contact: {
      primaryPhone: '9812005418',
      primaryPhoneDisplay: '98120 05418',
      // TODO: Client to confirm 9812005418 as primary WhatsApp/Calling number
      landline: '0172-2912765',
      landlineDisplay: '0172-2912765',
      otherPhones: [
        { label: 'Sales & Consultations', number: '9315915000', display: '93159 15000' },
        { label: 'Project Desk', number: '9056002657', display: '90560 02657' },
      ],
      allPhones: ['0172-2912765', '9812005418', '9315915000', '9056002657'],
      email: 'info@kumarkitchenking.com',
      website: 'www.kumarkitchenking.com',
      websiteUrl: 'https://www.kumarkitchenking.com',
      // TODO: Client to supply official GST number
    },
  },

  // Color Palette Derived from the Logo & Architecture
  theme: {
    colors: {
      charcoalBase: '#0E0C0A', // Base luxury dark
      charcoalElevated: '#171412', // Card / surface dark
      charcoalBorder: '#2A241F', // Hairline borders
      copperAccent: '#B8793A', // Primary copper/bronze logo accent
      copperLight: '#D49557', // Hover copper
      walnutSecondary: '#3E2B1E', // Walnut secondary surface
      ivoryLight: '#F7F3EC', // Warm ivory light sections
      ivoryCard: '#FFFFFF', // Clean card surface on light
      ivoryBorder: '#E6DEC9', // Border on light sections
      kumarGreen: '#0F3B33', // Very restrained touch of green for brand mark / subtle ambient accents
      kumarGreenLight: '#1B5C4F',
      mutedText: '#8E8275', // Secondary copy text
    },
  },
} as const;

// Helper to build WhatsApp links with prefilled text
export function buildWhatsAppUrl(message: string): string {
  const phone = SITE_DATA.business.contact.primaryPhone;
  return `https://wa.me/91${phone}?text=${encodeURIComponent(message.trim())}`;
}

// Navigation Links
export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '#home', sectionId: 'home', numeral: '01' },
  { label: 'Kitchens', href: '#kitchens', sectionId: 'kitchens', numeral: '02' },
  { label: 'Doors', href: '#doors', sectionId: 'doors', numeral: '03' },
  { label: 'Services', href: '#services', sectionId: 'services', numeral: '04' },
  { label: 'Process', href: '#process', sectionId: 'process', numeral: '05' },
  { label: 'Gallery', href: '#gallery', sectionId: 'gallery', numeral: '06' },
  { label: 'Showroom', href: '#showroom', sectionId: 'showroom', numeral: '07' },
  { label: 'About', href: '#about', sectionId: 'about', numeral: '08' },
  { label: 'Contact', href: '#contact', sectionId: 'contact', numeral: '09' },
];

// Announcement bar messages
export const ANNOUNCEMENT_MESSAGES = [
  'Visit Our Showroom & Master Gallery: Plot 657, Sector 82, JLPL Mohali',
  'Factory Built Quality · No Carpentry Work at Site · ISI Certified',
  'Manufacturer of Customised Modular Kitchens & Complete Door Solutions',
  'Call Now: 98120 05418 · Landline: 0172-2912765',
] as const;

// Trust badges supported by client data
export const TRUST_CHIPS = [
  { label: 'Factory Built', note: 'Manufactured with CNC precision' },
  { label: 'No Carpentry at Site', note: 'Clean, dust-free installation' },
  { label: 'ISI Certified', note: 'Guaranteed core material grade' },
  { label: 'Custom Designs', note: 'Tailored to your architectural layout' },
  { label: 'A Decade of Trust', note: 'Established manufacturing excellence' },
] as const;

// ============================================================================
// 2. NINE CORE SERVICES (FROM SHOWROOM SIGNBOARD)
// ============================================================================
export const SHOWROOM_SERVICES: ServiceItem[] = [
  {
    id: 'modular-kitchens',
    title: 'Modular Kitchens',
    subtitle: 'Classic European & Contemporary Layouts',
    description: 'Factory-manufactured acrylic, PU lacquer, and textured laminate kitchens engineered with Blum/Hettich hardware and zero on-site mess.',
    image: '/images/catalogue/kitchen-01.webp',
    imageAlt: 'European designer modular kitchen with slatted glass cabinets and integrated island',
    category: 'kitchens',
  },
  {
    id: 'doors',
    title: 'Doors (Door World)',
    subtitle: 'Solid Wood, Carved & Designer Doors',
    description: 'The Complete Doors Solutions: Burma Teak, natural Walnut, carved entrance designs, decorative laminate doors, and seasoned timber chaukhats.',
    image: '/images/doors/concentric-molded-security-door-11.webp',
    imageAlt: 'Door World architectural wooden entrance door with concentric molded profiles and casing',
    category: 'doors',
  },
  {
    id: 'wardrobes',
    title: 'Wardrobes',
    subtitle: 'Walk-In & Built-In Storage Systems',
    description: 'Bespoke floor-to-ceiling wardrobes featuring tinted glass sliding shutters, internal pull-outs, jewellery trays, and concealed vertical LED illumination.',
    image: '/images/catalogue/wardrobe_contemporary.jpg',
    imageAlt: 'Luxury modular wardrobe with tinted glass doors and integrated lighting',
    category: 'wardrobes',
  },
  {
    id: 'interiors',
    title: 'Interiors',
    subtitle: 'Complete Turnkey Architectural Solutions',
    description: 'Comprehensive residential and commercial interior woodwork designed, precision CNC-cut at our factory, and seamlessly assembled under one roof.',
    image: '/images/catalogue/interior_living_panel.jpg',
    imageAlt: 'Architectural living room wall paneling and customized furniture integration',
    category: 'interiors',
  },
  {
    id: 'vanities-consoles',
    title: 'Vanities & Consoles',
    subtitle: 'Moisture-Resistant Luxury Craftsmanship',
    description: 'Custom wall-hung bathroom vanities, fluted consoles, and entryway credenzas crafted from marine-grade plywood and seamless quartz tops.',
    image: '/images/catalogue/vanity_fluted_console.jpg',
    imageAlt: 'Wall-hung bathroom vanity with fluted timber detailing and quartz basin',
    category: 'decor',
  },
  {
    id: 'wallpapers-blinds',
    title: 'Wallpapers & Blinds',
    subtitle: 'Curated Designer Textures & Automation',
    description: 'Imported architectural textured wallpapers, motorized roller blinds, blackout fabrics, and acoustic wall coverings for modern homes.',
    image: '/images/catalogue/wallpaper_acoustic_blinds.jpg',
    imageAlt: 'Textured designer wallpaper with motorized architectural window blinds',
    category: 'decor',
  },
  {
    id: 'curtain-temples',
    title: 'Curtain Temples',
    subtitle: 'Handcrafted Sacred Mandir Sanctuaries',
    description: 'Custom wooden pooja rooms and spiritual home temples featuring intricate CNC jali screens, warm brass backlighting, and sanctum drawers.',
    image: '/images/catalogue/pooja_mandir_temple.jpg',
    imageAlt: 'Custom handcrafted wooden home temple with laser cut jali work',
    category: 'decor',
  },
  {
    id: 'designer-mirrors',
    title: 'Designer Mirrors',
    subtitle: 'Illuminated Ambient & Fluted Profiles',
    description: 'Backlit halo LED mirrors, asymmetric pebble silhouettes, and copper-framed statement pieces tailored for powder rooms and master bedrooms.',
    image: '/images/catalogue/designer_mirror_backlit.jpg',
    imageAlt: 'Contemporary organic LED backlit mirror over vanity console',
    category: 'decor',
  },
  {
    id: 'designer-chairs',
    title: 'Designer Chairs',
    subtitle: 'Ergonomic Dining & Accent Seating',
    description: 'Custom-upholstered dining chairs, lounge accent chairs, and bar counter stools handcrafted in solid hardwoods and premium bouclé/leatherette.',
    image: '/images/catalogue/designer_chairs_dining.jpg',
    imageAlt: 'Solid timber upholstered luxury dining and accent chairs',
    category: 'decor',
  },
];

// ============================================================================
// 3. MODULAR KITCHENS CATALOGUE (FROM KITCHEN_CATALOGUE.PDF)
// ============================================================================
export const KITCHEN_SERIES_INFO = {
  seriesName: 'Designer Series',
  finishType: 'PU Lacquer / PU-Pigment Paint & High-Gloss Acrylic',
  construction: 'Rectangular Wooden Classic European-Style Cabinets, 100% Factory Built',
  paletteHighlight: '20 Greiges Palette — Balanced between grey clarity and warm beige tranquility',
};

export const KITCHEN_STYLE_CATEGORIES: KitchenStyleCategory[] = [
  {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Clean architectural lines, handleless touch-to-open cabinets, slatted glass fronts, and minimalist quartz surfaces.',
    codes: ['KKK-101', 'KKK-102', 'KKK-103', 'KKK-108', 'KKK-114'],
  },
  {
    id: 'craftsman',
    name: 'Craftsman',
    description: 'Balanced Shaker profiles, refined wooden moldings, integrated plate racks, and authentic proportioning.',
    codes: ['KKK-121', 'KKK-124', 'KKK-128', 'KKK-132'],
  },
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Classic raised panels, ornamental fluted pilasters, rich cornice crowns, and deep heritage craftsmanship.',
    codes: ['KKK-135', 'KKK-138', 'KKK-140'],
  },
  {
    id: 'tudor',
    name: 'Tudor',
    description: 'Subtle arched upper rails, rich dark tones, hand-rubbed patinas, and English countryside warmth.',
    codes: ['KKK-142', 'KKK-145', 'KKK-148'],
  },
  {
    id: 'french',
    name: 'French',
    description: 'Graceful stepped beads, soft provincial curve accents, antique brass handles, and romantic detailing.',
    codes: ['KKK-150', 'KKK-153', 'KKK-155'],
  },
  {
    id: 'rustic',
    name: 'Rustic',
    description: 'Textured timber grains, natural knot aesthetics, open cross-shelving, and industrial metal brackets.',
    codes: ['KKK-156', 'KKK-157', 'KKK-158'],
  },
  {
    id: 'popular-doors',
    name: 'Popular Cabinet Doors',
    description: 'The most requested cabinet door panel styles from KKK-157 to KKK-176 in custom sizing.',
    codes: ['KKK-157', 'KKK-159', 'KKK-162', 'KKK-168', 'KKK-174', 'KKK-176'],
  },
];

export const KITCHEN_CORE_SWATCHES = [
  {
    code: 'KKK-101',
    name: 'High Reflective White',
    hex: '#F9FAFB',
    type: 'PU Gloss / Satin',
    note: 'Maximizes light bounce in compact and open-concept floorplans',
  },
  {
    code: 'KKK-102',
    name: 'Pure White',
    hex: '#F4F2EE',
    type: 'Classic Velvet Matte',
    note: 'Timeless European aesthetic with ultra-smooth tactile touch',
  },
  {
    code: 'KKK-103',
    name: 'Magnetic Grey',
    hex: '#4A4E53',
    type: 'Architectural Charcoal',
    note: 'Modern statement finish paired with copper accents and quartz',
  },
  {
    code: 'KKK-GREIGE-04',
    name: 'Cashmere Greige',
    hex: '#D7CEBE',
    type: 'Warm Natural Tone',
    note: 'From our curated 20 Greiges series for serene living spaces',
  },
  {
    code: 'KKK-GREIGE-12',
    name: 'Slate Greige',
    hex: '#968E82',
    type: 'Mid-Tone Architectural',
    note: 'Blends stone warmth with contemporary grey clarity',
  },
];

export const KITCHEN_CATALOGUE_ITEMS: KitchenProductItem[] = [
  {
    code: 'KKK-101',
    name: 'High Reflective White Island Suite',
    style: 'Contemporary',
    finish: 'PU-Pigment Gloss Lacquer',
    colorName: 'High Reflective White',
    colorHex: '#F9FAFB',
    description: 'Full European island composition featuring motorized slatted glass wall units, seamless quartz worktop, and integrated dining console.',
    features: ['Slatted glass wall units', 'Concealed LED strip profiles', 'Slimmer plinths for 12% extra storage', 'Touch-to-open Blum Aventos lifts'],
    image: '/images/catalogue/kitchen-01.webp',
    imageAlt: 'Kumar Kitchen King KKK-101 European modular kitchen in High Reflective White with integrated island',
  },
  {
    code: 'KKK-102',
    name: 'Pure White European Classic',
    style: 'Contemporary / French',
    finish: 'PU Velvet Matte Lacquer',
    colorName: 'Pure White',
    colorHex: '#F4F2EE',
    description: 'Refined rectilinear cabinetry with recessed J-pull profiles and tall pantry highboards with full-extension internal wire baskets.',
    features: ['Tall pantry highboard with internal pull-outs', 'Anti-fingerprint PU coat', 'Quartz backsplashes', 'Soft-close tandem drawers'],
    image: '/images/catalogue/kitchen-02.webp',
    imageAlt: 'Kumar Kitchen King KKK-102 Pure White classic European kitchen cabinets',
  },
  {
    code: 'KKK-103',
    name: 'Magnetic Grey Architectural Suite',
    style: 'Contemporary',
    finish: 'Deep Matte PU Lacquer',
    colorName: 'Magnetic Grey',
    colorHex: '#4A4E53',
    description: 'Dramatic dual-tone configuration combining Magnetic Grey base units with natural oak floating wall shelves and warm linear LED lighting.',
    features: ['Integrated dining extension table', 'Warm 3000K concealed LEDs', 'German Hafele cutlery organizers', 'Zero on-site carpentry assembly'],
    image: '/images/catalogue/kitchen-03.webp',
    imageAlt: 'Kumar Kitchen King KKK-103 Magnetic Grey modern modular kitchen with island table',
  },
  {
    code: 'KKK-124',
    name: 'Craftsman Heritage Shaker',
    style: 'Craftsman',
    finish: 'Silk Matte PU Paint',
    colorName: 'Warm Cashmere Greige',
    colorHex: '#D7CEBE',
    description: 'Subtle proportioned Shaker panels with solid timber door rails, bespoke brass cup handles, and fluted glass display cabinets.',
    features: ['Solid core moisture-resistant frame', 'Brushed warm brass hardware', 'Corner carousel pull-out solutions', 'Factory spray finish'],
    image: '/images/catalogue/kitchen-04.webp',
    imageAlt: 'Kumar Kitchen King KKK-124 Craftsman Shaker kitchen in Cashmere Greige',
  },
  {
    code: 'KKK-142',
    name: 'Tudor Manor Arched Kitchen',
    style: 'Tudor',
    finish: 'Patina Glazed Timber PU',
    colorName: 'Smoked Oak & Greige',
    colorHex: '#7C6E5C',
    description: 'English country-inspired modular arrangement with soft arched rails, plate racks, and natural stone worktops.',
    features: ['Solid oak accent rails', 'Integrated spice pull-outs', 'Appliance garage with bi-fold doors', 'Hettich Sensys hinges'],
    image: '/images/catalogue/kitchen-05.webp',
    imageAlt: 'Kumar Kitchen King KKK-142 Tudor arched cabinet door style',
  },
  {
    code: 'KKK-150',
    name: 'French Provincial Classic',
    style: 'French',
    finish: 'Dual-Layer Stepped Bead Lacquer',
    colorName: 'Antique Pure White',
    colorHex: '#F2EFEB',
    description: 'Delicate stepped molding around door perimeters, crown moldings, and open wine rack displays.',
    features: ['Stepped architectural beading', 'Soft-close full extension slides', 'Corian/Quartz sink integration', 'Custom under-counter pull-outs'],
    image: '/images/catalogue/kitchen-06.webp',
    imageAlt: 'Kumar Kitchen King KKK-150 French provincial kitchen cabinets with crown moldings',
  },
  {
    code: 'KKK-168',
    name: 'Popular Cabinet Doors Series (KKK-157 to KKK-176)',
    style: 'Popular Cabinet Doors',
    finish: 'Custom Spec (Acrylic / PU / Laminate)',
    colorName: 'Custom Colour Range',
    colorHex: '#B8793A',
    description: 'Extensive catalogue collection spanning codes KKK-157 through KKK-176. Precision custom-sized for replacement or new installations.',
    features: ['20 distinct profile cuts', 'Available in all 20 Greiges colors', 'Matching drawer fronts and dummy panels', 'Standard 18mm & 22mm thickness'],
    image: '/images/catalogue/kitchen-07.webp',
    imageAlt: 'Kumar Kitchen King popular cabinet door profile collection KKK-157 to KKK-176',
  },
];

// Kitchen architectural features
export const KITCHEN_FEATURE_HIGHLIGHTS = [
  {
    title: 'Slatted Glass Wall Units',
    description: 'Modern fluted and slatted glass cabinet fronts illuminated from within by concealed LED channels, creating an airy luxury glow.',
  },
  {
    title: 'Quartz Stone + Lacquer Harmony',
    description: 'Seamless integration between durable non-porous quartz worktops, PU lacquer fronts, and warm architectural wood consoles.',
  },
  {
    title: 'Integrated Dining Island Table',
    description: 'Multifunctional kitchen islands paired with a cantilevered natural-wood dining table and breakfast bar for family living.',
  },
  {
    title: 'Highboards with Internal Pull-Outs',
    description: 'Full-height tall units equipped with individual soft-closing inner drawers for ergonomic, waist-level pantry organization.',
  },
  {
    title: 'Slimmer Plinth Storage Bonus',
    description: 'Engineered plinths lowered from 150mm to 80mm, increasing usable under-counter storage volume by up to 12%.',
  },
  {
    title: 'Curated "20 Greiges" Palette',
    description: 'A dedicated spectrum of 20 greige pigments bridging cool grey clarity with warm beige comfort, avoiding sterile kitchen looks.',
  },
];

// ============================================================================
// 4. DOORS CATALOGUE (DOOR WORLD DIVISION)
// ============================================================================
export const DOORS_CATALOGUE: DoorProductItem[] = [
  {
    id: 'grand-villa-entrance',
    name: 'Grand Villa Entrance Double Doors',
    category: 'Grand Entrance',
    description: 'Symmetrical floor-to-ceiling natural Burma Teak double pivot doors with matching timber soffit ceiling, warm ambient illumination, and integrated sidelight glass panels.',
    woodOptions: ['Burma Teak', 'American Walnut', 'Kiln-Seasoned Hardwood'],
    dimensions: 'Custom heights up to 10ft (Double Pivot)',
    // TODO: Client to confirm real door product prices
    pricingNote: 'Request custom quotation based on architectural site measurement.',
    image: '/images/doors/luxury-villa-entrance-01.webp',
    imageAlt: 'Symmetrical modern luxury villa entrance with solid teak double pivot doors, warm ambient lanterns, and stone pathway',
  },
  {
    id: 'solid-wood-panel',
    name: 'Solid Wood Panel Doors',
    category: 'Solid Wood Panel',
    description: 'Seasoned Burma Teak, natural Walnut, and White Oak panel doors constructed with traditional mortise-and-tenon joints for lifelong dimensional stability.',
    woodOptions: ['Burma Teak', 'American Walnut', 'White Oak', 'Champagne Ash'],
    dimensions: 'Custom heights up to 9ft (Single & Double Leaf)',
    // TODO: Client to confirm real door product prices
    pricingNote: 'Request custom quotation based on architectural site measurement.',
    image: '/images/doors/coffered-panel-double-door-03.webp',
    imageAlt: 'Classic double solid wood doors with coffered raised square panels set inside a carved timber frame',
  },
  {
    id: 'carved-designer-doors',
    name: 'Carved Designer Doors',
    category: 'Carved Designer',
    description: 'Precision CNC 3D carved motifs, traditional Indian heritage carvings, geometric fluted textures, and bespoke architectural entrance statements.',
    woodOptions: ['Selected Seasoned Teak', 'High-Density Engineered Hardwood'],
    dimensions: 'Standard 8ft x 4ft & Bespoke Villa Sizes',
    // TODO: Client to confirm real door product prices
    pricingNote: 'Request custom quotation based on architectural site measurement.',
    image: '/images/doors/carved-lattice-teak-door-02.webp',
    imageAlt: 'Handcrafted teak double entrance door featuring intricate geometric lattice panels, central relief carvings, and timber surround',
  },
  {
    id: 'laminated-decorative-doors',
    name: 'Laminated & Decorative Doors',
    category: 'Laminated Decorative',
    description: 'Heavy-duty flush doors pressed with high-pressure designer laminates from Stylam, Merino, and Greenlam. Scratch, moisture, and termite resistant.',
    woodOptions: ['Solid Tubular Core', 'Kiln-Dried Hardwood Pine Frame'],
    dimensions: '7ft x 3ft, 7ft x 3.25ft, 8ft x 3.5ft',
    // TODO: Client to confirm real door product prices
    pricingNote: 'Request custom quotation based on architectural site measurement.',
    image: '/images/doors/chevron-textured-interior-door-07.webp',
    imageAlt: 'Contemporary walnut veneer flush door with precision chevron routered texture and vertical frame',
  },
  {
    id: 'timber-frames-chaukhat',
    name: 'Timber Frames (Chaukhats)',
    category: 'Timber Frames',
    description: 'Kiln-seasoned hardwood door frames precision planed and rebated for air-tight gasket seals and heavy solid wood door hanging.',
    woodOptions: ['Malaysian Sal Wood', 'Teak Wood', 'Red Miranti', 'Marandi'],
    dimensions: 'Section sizes: 4"x2.5", 5"x2.5", 6"x2.5"',
    // TODO: Client to confirm real chaukhat running-foot rates
    pricingNote: 'Request custom quotation based on running-foot specification.',
    image: '/images/doors/sunburst-radial-pivot-door-08.webp',
    imageAlt: 'Architectural sunburst radial teak pivot door with brass crescent handle in natural stone and timber frame casing',
  },
  {
    id: 'architectural-hardware',
    name: 'Architectural Door Hardware',
    category: 'Architectural Hardware',
    description: 'Heavy solid brass pull handles, stainless steel ball-bearing hinges, digital smart locks, and magnetic door stoppers from Hafele, Blum, and Dorset.',
    woodOptions: ['Solid Brass (Antique, Satin Gold, Rose Gold)', 'SS-304 Matte Black'],
    dimensions: 'Various specifications for standard & pivot installations',
    // TODO: Client to confirm hardware catalog pricing
    pricingNote: 'Request specification & price list for locks and handles.',
    image: '/images/doors/hardware-placeholder.webp',
    imageAlt: 'Architectural brass handles and locks for luxury wooden entrance doors',
  },
];

// ============================================================================
// 5. ASSOCIATE PARTNER BRANDS (ALL 20 REAL BRANDS FROM CATALOGUE)
// ============================================================================
export const ASSOCIATE_BRANDS: PartnerBrand[] = [
  { name: 'Pidilite', category: 'Adhesives & Chemicals' },
  { name: 'Stylam', category: 'Laminates & Surfaces' },
  { name: 'Rehau', category: 'Edgeband & Polymers' },
  { name: 'Sircca', category: 'Adhesives & Chemicals' },
  { name: 'Red Forest', category: 'Plywood & Boards' },
  { name: 'Doors World', category: 'Hardware & Fittings' },
  { name: 'Greenlam Laminates', category: 'Laminates & Surfaces' },
  { name: 'Tesa', category: 'Plywood & Boards' },
  { name: 'Virgo', category: 'Laminates & Surfaces' },
  { name: 'Euro Pratik', category: 'Laminates & Surfaces' },
  { name: 'Jowat', category: 'Adhesives & Chemicals' },
  { name: 'Greenply', category: 'Plywood & Boards' },
  { name: 'Merino', category: 'Laminates & Surfaces' },
  { name: 'Hafele', category: 'Hardware & Fittings' },
  { name: 'Hettich', category: 'Hardware & Fittings' },
  { name: 'Blum', category: 'Hardware & Fittings' },
  { name: 'Eboco', category: 'Hardware & Fittings' },
  { name: 'Kalinga Stone', category: 'Appliances & Stone' },
  { name: 'Faber', category: 'Appliances & Stone' },
  { name: 'Kaff', category: 'Appliances & Stone' },
];

// ============================================================================
// 6. WHY CHOOSE KUMAR KITCHEN KING (BASED ONLY ON REAL DATA)
// ============================================================================
export const WHY_CHOOSE_US: WhyChoosePoint[] = [
  {
    num: '01',
    title: 'A Decade of Manufacturing Experience',
    description: 'Proven track record in custom-engineered modular kitchens and bespoke doors, combining seasoned artisan know-how with industrial scale.',
  },
  {
    num: '02',
    title: '100% Factory Built · Zero Site Carpentry',
    description: 'Every cabinet, shutter, and frame is precision-cut, edge-banded, and finished in our Yamuna Nagar plant, eliminating dust, noise, and on-site carpentry delays.',
  },
  {
    num: '03',
    title: 'ISI Certified Materials & Termite Shield',
    description: 'We use rigorously certified boiling water-resistant (BWR) and marine-grade plywood and high-density timber, ensuring long-term structural integrity.',
  },
  {
    num: '04',
    title: 'World-Class Hardware & Chemical Partnerships',
    description: 'Direct association with German hardware titans Blum, Hafele, Hettich, and surface leaders Greenlam, Stylam, and Rehau.',
  },
  {
    num: '05',
    title: 'Competitive Direct-from-Manufacturer Pricing',
    description: 'No middleman commissions or third-party dealer markups. You get genuine mill-to-site wholesale and retail rates.',
  },
  {
    num: '06',
    title: 'Timely Delivery & Capability for Large Orders',
    description: 'Our industrial manufacturing infrastructure comfortably caters to individual residential luxury villas as well as high-volume multi-unit builder contracts.',
  },
];

// ============================================================================
// 7. STEP-BY-STEP PROCESS
// ============================================================================
export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Showroom Consultation',
    description: 'Visit our Mohali Master Gallery or connect over phone/WhatsApp to discuss your layout, requirements, and budget.',
  },
  {
    step: '02',
    title: 'Design & Site Measurement',
    description: 'Our technical team conducts millimeter-precise laser site measurements and prepares custom 3D kitchen or door CAD configurations.',
  },
  {
    step: '03',
    title: 'Transparent Quotation',
    description: 'Receive an honest, transparent estimate detailing core board grades, hardware selections, finishes, and delivery timelines.',
  },
  {
    step: '04',
    title: 'Factory Manufacturing',
    description: 'Automated CNC routing, edge-banding, and dust-free PU lacquer painting at our Pansra, Yamuna Nagar production facility.',
  },
  {
    step: '05',
    title: 'Delivery & Professional Fitting',
    description: 'Carefully packaged modular modules delivered to your site and assembled swiftly by trained factory technicians without mess.',
  },
];

// ============================================================================
// 8. GALLERY ITEMS (CROSS-CATEGORY SHOWCASE)
// ============================================================================
export const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: 'gal-door-1',
    title: 'Circular Medallion Solid Teak Doors',
    category: 'Doors',
    tag: 'Handcrafted Relief',
    image: '/images/doors/circular-medallion-carved-door-04.webp',
    imageAlt: 'Solid wood double entrance doors with a carved circular medallion center and antique brass pull handles',
    aspect: 'tall',
  },
  {
    id: 'gal-door-2',
    title: 'Organic Wave Sculpted Entrance Door',
    category: 'Doors',
    tag: 'Architectural Sculptural',
    image: '/images/doors/artistic-wave-carved-door-05.webp',
    imageAlt: 'Contemporary designer entrance door with organic wave groove carvings and custom sculpted wooden handle in marble surround',
    aspect: 'tall',
  },
  {
    id: 'gal-door-3',
    title: 'Chevron Fluted Walnut Entrance Door',
    category: 'Doors',
    tag: 'Textured Walnut',
    image: '/images/doors/chevron-fluted-walnut-door-06.webp',
    imageAlt: 'Modern natural walnut door with horizontal grain panels and central chevron fluted texture',
    aspect: 'tall',
  },
  {
    id: 'gal-door-4',
    title: 'Bleached Ash Fluted Interior Door',
    category: 'Doors',
    tag: 'Contemporary Fluted',
    image: '/images/doors/fluted-acoustic-interior-door-09.webp',
    imageAlt: 'Minimalist luxury interior door with bottom fluted relief, textured border, and integrated vertical jamb lighting',
    aspect: 'tall',
  },
  {
    id: 'gal-door-5',
    title: 'Carved Floral Acanthus Sliding Door',
    category: 'Doors',
    tag: 'Barn Sliding System',
    image: '/images/doors/carved-floral-sliding-barn-door-10.webp',
    imageAlt: 'Matte black wooden sliding barn door with deep traditional floral acanthus carvings on steel roller track',
    aspect: 'tall',
  },
  {
    id: 'gal-door-6',
    title: 'Classic Three-Panel Espresso Door',
    category: 'Doors',
    tag: 'Molded Profiles',
    image: '/images/doors/classic-three-panel-espresso-door-12.webp',
    imageAlt: 'Dark espresso finished three-panel interior door with clean molded profiles and silver lever handle',
    aspect: 'tall',
  },
  {
    id: 'gal-kitchen-1',
    title: 'High Reflective White Modular Island',
    category: 'Kitchens',
    tag: 'Designer Series KKK-101',
    image: '/images/catalogue/kitchen-01.webp',
    imageAlt: 'European style modular kitchen island with slatted glass cabinets and LED lighting',
    aspect: 'tall',
  },
  {
    id: 'gal-kitchen-2',
    title: 'Magnetic Grey & Natural Wood Console Suite',
    category: 'Kitchens',
    tag: 'Designer Series KKK-103',
    image: '/images/catalogue/kitchen-03.webp',
    imageAlt: 'Magnetic grey modern modular kitchen with island breakfast table',
    aspect: 'wide',
  },
  {
    id: 'gal-kitchen-3',
    title: 'Cashmere Greige Craftsman Shaker Kitchen',
    category: 'Kitchens',
    tag: 'Designer Series KKK-124',
    image: '/images/catalogue/kitchen-04.webp',
    imageAlt: 'Craftsman Shaker modular kitchen in Cashmere Greige PU finish',
    aspect: 'wide',
  },
  {
    id: 'gal-wardrobe-1',
    title: 'Walk-In Wardrobe with Tinted Glass Shutters',
    category: 'Wardrobes',
    tag: 'Custom Interior Joinery',
    image: '/images/catalogue/wardrobe_contemporary.jpg',
    imageAlt: 'Luxury walk-in wardrobe with concealed vertical LED lighting and organizers',
    aspect: 'square',
  },
  {
    id: 'gal-interior-1',
    title: 'Fluted Bathroom Vanity with Quartz Basin',
    category: 'Interiors',
    tag: 'Vanities & Consoles',
    image: '/images/catalogue/vanity_fluted_console.jpg',
    imageAlt: 'Water-resistant fluted bathroom vanity with backlit designer mirror',
    aspect: 'square',
  },
  {
    id: 'gal-interior-2',
    title: 'Handcrafted Pooja Room Temple Sanctuary',
    category: 'Interiors',
    tag: 'Curtain Temples',
    image: '/images/catalogue/pooja_mandir_temple.jpg',
    imageAlt: 'Handcrafted wooden home temple with laser cut jali screens and brass accents',
    aspect: 'tall',
  },
];

// ============================================================================
// 9. CLIENT ACTIONABLE TODO LIST
// ============================================================================
export const CLIENT_TODO_LIST = [
  {
    item: 'Showroom PIN Code',
    status: 'Pending Client Confirmation',
    details: 'Verify whether Mohali showroom PIN is 140306 (Google Maps) or 140308 (Kitchen catalogue). Defaulted to 140306.',
  },
  {
    item: 'Primary Phone & WhatsApp',
    status: 'Pending Client Confirmation',
    details: 'Verify 9812005418 as primary click-to-call and WhatsApp recipient. Landline 0172-2912765 and numbers 9315915000 / 9056002657 are also configured.',
  },
  {
    item: 'Years of Experience Badge',
    status: 'Pending Client Confirmation',
    details: 'Catalogue badge displays "15 Years" while catalogue body copy states "a decade of experience". Currently displayed as 10+ Years / A Decade of Excellence.',
  },
  {
    item: 'Storefront Night Photo',
    status: 'Pending Image File Upload',
    details: 'Upload the night storefront photo with the illuminated "Kumar Kitchen King" signboard to /public/images/showroom.jpg.',
  },
  {
    item: 'Catalogue Photos Export',
    status: 'Pending Image File Upload',
    details: 'Export photos from Kitchen_Catalogue.pdf into /public/images/catalogue/ matching the filenames listed in the image mapping table.',
  },
  {
    item: 'Real Door Product Prices & Photos',
    status: 'Pending Client Data',
    details: 'Provide exact unit prices and high-res photography for solid wood, carved, and laminated door models.',
  },
  {
    item: 'Official GST Number',
    status: 'Pending Client Data',
    details: 'Provide GSTIN to display in legal footer and quote documentation.',
  },
  {
    item: 'Exact Showroom Hours',
    status: 'Pending Client Data',
    details: 'Confirm Sunday opening status and standard closing times.',
  },
];
