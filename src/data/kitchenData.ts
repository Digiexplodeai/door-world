/**
 * Centralized Kitchen Data Module for Kumar Kitchen King
 * Store every kitchen image path in this single file so replacing images
 * is as simple as updating paths or dropping files into /public/images/catalogue/.
 */

export interface KitchenCabinetSeries {
  code: string;
  name: string;
  style: KitchenStyle;
  finish: string;
  colorName: string;
  colorHex: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export type KitchenStyle =
  | 'Contemporary'
  | 'Craftsman'
  | 'Traditional'
  | 'Tudor'
  | 'French'
  | 'Rustic';

export interface KitchenLayoutItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  workflow: string;
  diagramPath: string;
}

export interface KitchenProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  timeline: string;
}

export interface KitchenPaletteSwatch {
  code: string;
  name: string;
  hex: string;
  type: string;
  description: string;
}

// ============================================================================
// 1. CENTRALIZED KITCHEN IMAGE PATHS
// ============================================================================
export const KITCHEN_IMAGE_PATHS = {
  // Cabinet Series Images (drop files in /public/images/catalogue/)
  kkk101: '/images/catalogue/kitchen-01.webp',
  kkk102: '/images/catalogue/kitchen-02.webp',
  kkk103: '/images/catalogue/kitchen-03.webp',
  kkk124: '/images/catalogue/kitchen-04.webp',
  kkk142: '/images/catalogue/kitchen-05.webp',
  kkk150: '/images/catalogue/kitchen-06.webp',
  kkk156: '/images/catalogue/kitchen-07.webp',
  kkk168: '/images/catalogue/kitchen-08.webp',

  // Layouts
  layoutStraight: '/images/catalogue/layout-straight.webp',
  layoutLshape: '/images/catalogue/layout-l-shape.webp',
  layoutUshape: '/images/catalogue/layout-u-shape.webp',
  layoutParallel: '/images/catalogue/layout-parallel.webp',
  layoutIsland: '/images/catalogue/layout-island.webp',
} as const;

// ============================================================================
// 2. KITCHEN STYLES
// ============================================================================
export const KITCHEN_STYLES_LIST: {
  id: KitchenStyle;
  name: string;
  badge: string;
  description: string;
  architecturalFeatures: string[];
}[] = [
  {
    id: 'Contemporary',
    name: 'Contemporary European',
    badge: 'Sleek & Minimalist',
    description:
      'Seamless flat-panel cabinetry, integrated handleless J-pull profiles, motorized touch lifts, slatted glass wall cabinets, and concealed LED strip lighting.',
    architecturalFeatures: [
      'Handleless touch-to-open Blum Aventos lifts',
      'Anti-fingerprint ultra-matte or high-gloss acrylic',
      'Slim 100mm plinths for 12% increased internal volume',
      'Integrated floating quartz breakfast consoles',
    ],
  },
  {
    id: 'Craftsman',
    name: 'Craftsman Shaker',
    badge: 'Timeless Geometry',
    description:
      'Clean recessed five-piece shaker doors, balanced structural rails, brushed warm brass cup pull hardware, and authentic proportioning for modern family homes.',
    architecturalFeatures: [
      'Moisture-resistant marine-grade solid timber rails',
      'Corner carousel pull-outs and deep pot drawers',
      'Bespoke antiqued brass or matte black pulls',
      'Factory PU lacquer coat in natural cashmere greiges',
    ],
  },
  {
    id: 'Traditional',
    name: 'Traditional Heritage',
    badge: 'Rich Architectural Detail',
    description:
      'Detailed raised-panel door profiles, decorative corbels, fluted corner columns, crown ceiling moldings, and classic warm timber aesthetics.',
    architecturalFeatures: [
      'Architectural stepped raised central panels',
      'Full-height pantry units with tiered wire baskets',
      'Decorative timber lintels and concealed hood canopies',
      'Rich multi-layer walnut, oak, and warm cream glazes',
    ],
  },
  {
    id: 'Tudor',
    name: 'Tudor Manor Classic',
    badge: 'Arched English Elegance',
    description:
      'Soft arched upper cabinet door rails, open lattice plate racks, integrated spice storage, and natural quartz countertops inspired by country estates.',
    architecturalFeatures: [
      'Hand-crafted soft arch door rail profiles',
      'Integrated pull-out spice drawers and appliance garages',
      'Bi-fold pocket door systems for countertop appliances',
      'Heavy-duty German Hettich Sensys soft-close hinges',
    ],
  },
  {
    id: 'French',
    name: 'French Provincial',
    badge: 'Refined Stepped Molding',
    description:
      'Delicate multi-stepped outer beads, antique satin white and pale dove finishes, fluted glass displays, and integrated under-counter wine storage.',
    architecturalFeatures: [
      'Double-stepped architectural bead perimeter profiling',
      'Fluted and cross-reeded translucent display glass',
      'Seamless undermount granite/quartz sink integration',
      'Custom spice columns and cutlery organizer trays',
    ],
  },
  {
    id: 'Rustic',
    name: 'Rustic Modern Timber',
    badge: 'Natural Grain Warmth',
    description:
      'Expressive open-grain timber textures, balanced horizontal knot aesthetics, black metal architectural frame brackets, and open island shelving.',
    architecturalFeatures: [
      'Deep synchronized wood-grain textured surfaces',
      'Black powder-coated steel frame open shelving',
      'Waterproof PU protective coating for heavy Indian cooking',
      'Heavy-duty tandem box drawers rated for 65 kg load',
    ],
  },
];

// ============================================================================
// 3. CURATED FINISHES & 20 GREIGES COLOUR PALETTE
// ============================================================================
export const KITCHEN_FINISH_TYPES = [
  {
    name: 'PU Lacquer & Pigment Paint',
    badge: 'Ultra-Smooth',
    description:
      'Automated multi-coat polyurethane lacquer cured in dust-free negative-pressure booths. 100% moisture-sealed, anti-yellowing, and available in satin, velvet matte, or mirror gloss.',
  },
  {
    name: 'High-Gloss & Matte Acrylic',
    badge: 'Scratch-Resistant',
    description:
      'Imported 1.5mm mirror-finish acrylic sheets hot-pressed with German Henkel adhesive onto HDHMR core. Glass-like reflection with high impact resistance.',
  },
  {
    name: 'Synchronized Textured Laminate',
    badge: 'Heavy-Duty',
    description:
      'High-pressure textured laminates with deep embossed grain and stone textures. Highly resistant to stains, heat, spices, and daily household wear.',
  },
  {
    name: 'Natural Wood Veneer with PU Coat',
    badge: 'Architectural Luxury',
    description:
      'Hand-matched natural European oak, teak, and walnut veneers finished with water-clear matte PU to highlight authentic timber movement.',
  },
];

export const KITCHEN_COLOUR_SWATCHES: KitchenPaletteSwatch[] = [
  {
    code: 'KKK-G01',
    name: 'Cashmere Greige',
    hex: '#D7CEBE',
    type: 'Velvet Matte',
    description: 'Soft warm neutral that avoids the sterile coldness of pure white.',
  },
  {
    code: 'KKK-G04',
    name: 'Slate Greige',
    hex: '#968E82',
    type: 'Architectural Satin',
    description: 'Balanced mid-tone greige offering dramatic clarity with natural wood.',
  },
  {
    code: 'KKK-W01',
    name: 'Pure High Reflective White',
    hex: '#F9FAFB',
    type: 'Mirror Gloss PU',
    description: 'Maximizes light bounce in compact and open-plan kitchen designs.',
  },
  {
    code: 'KKK-W02',
    name: 'Velvet Milk White',
    hex: '#F4F2EE',
    type: 'Matte PU',
    description: 'Timeless European off-white with smooth tactile touch.',
  },
  {
    code: 'KKK-C03',
    name: 'Magnetic Charcoal Grey',
    hex: '#3E4247',
    type: 'Deep Matte',
    description: 'Statement dark neutral that contrasts beautifully with quartz worktops.',
  },
  {
    code: 'KKK-O05',
    name: 'Smoked Oak Tone',
    hex: '#7A6B5B',
    type: 'Wood Grain Texture',
    description: 'Rich earthy warmth inspired by traditional European timber framing.',
  },
  {
    code: 'KKK-B08',
    name: 'Warm Taupe Sand',
    hex: '#C5BAA9',
    type: 'Velvet Satin',
    description: 'Earthy beige-stone balance favored by modern interior architects.',
  },
  {
    code: 'KKK-T12',
    name: 'Tuscan Cream',
    hex: '#EFEBE1',
    type: 'Classic Satin',
    description: 'Traditional warmth for French provincial and classic shaker cabinetry.',
  },
];

// ============================================================================
// 4. CABINET SERIES CARDS (KKK SERIES)
// ============================================================================
export const KITCHEN_CABINET_SERIES: KitchenCabinetSeries[] = [
  {
    code: 'KKK-101',
    name: 'High Reflective White Island Suite',
    style: 'Contemporary',
    finish: 'PU-Pigment Gloss Lacquer',
    colorName: 'High Reflective White',
    colorHex: '#F9FAFB',
    description:
      'Full European island composition featuring motorized slatted glass wall units, seamless quartz worktop, and integrated cantilevered breakfast table.',
    features: [
      'Slatted glass wall units with internal LED channels',
      'Touch-to-open Blum Aventos HL lifts',
      'Slim 100mm plinths yielding 12% extra internal storage',
      'Integrated spice pull-outs and concealed bottle carousel',
    ],
    image: KITCHEN_IMAGE_PATHS.kkk101,
    imageAlt: 'Kumar Kitchen King KKK-101 European modular kitchen in High Reflective White with island',
  },
  {
    code: 'KKK-102',
    name: 'Pure White European Classic',
    style: 'Contemporary',
    finish: 'PU Velvet Matte Lacquer',
    colorName: 'Pure White',
    colorHex: '#F4F2EE',
    description:
      'Refined rectilinear cabinetry with recessed J-pull profiles, tall pantry highboards with full-extension internal wire baskets, and soft-closing cutlery trays.',
    features: [
      'Tall pantry highboard with individual drawer pull-outs',
      'Anti-fingerprint moisture-resistant PU coat',
      'Seamless quartz backsplashes and waterfall edges',
      'Soft-close tandem drawers rated for 65 kg load',
    ],
    image: KITCHEN_IMAGE_PATHS.kkk102,
    imageAlt: 'Kumar Kitchen King KKK-102 Pure White classic European kitchen cabinets',
  },
  {
    code: 'KKK-103',
    name: 'Magnetic Grey Architectural Suite',
    style: 'Contemporary',
    finish: 'Deep Matte PU Lacquer',
    colorName: 'Magnetic Grey',
    colorHex: '#3E4247',
    description:
      'Dramatic dual-tone configuration combining Magnetic Grey base units with natural oak floating wall shelves, Hafele cutlery organizers, and warm 3000K linear lighting.',
    features: [
      'Integrated dining extension table in natural wood finish',
      'Warm 3000K concealed under-cabinet LED profiles',
      'German Hafele cutlery organizers and tandem slides',
      '100% factory-fitted with zero on-site sawdust or mess',
    ],
    image: KITCHEN_IMAGE_PATHS.kkk103,
    imageAlt: 'Kumar Kitchen King KKK-103 Magnetic Grey modern modular kitchen',
  },
  {
    code: 'KKK-124',
    name: 'Craftsman Heritage Shaker',
    style: 'Craftsman',
    finish: 'Silk Matte PU Paint',
    colorName: 'Warm Cashmere Greige',
    colorHex: '#D7CEBE',
    description:
      'Subtle proportioned Shaker panels with solid timber door rails, bespoke brass cup handles, corner carousel pull-outs, and fluted glass display cabinets.',
    features: [
      'Solid core moisture-resistant frame construction',
      'Brushed warm brass cup pulls and matching knobs',
      'Dual corner carousel pull-out storage solutions',
      'Factory multi-coat spray finish in Cashmere Greige',
    ],
    image: KITCHEN_IMAGE_PATHS.kkk124,
    imageAlt: 'Kumar Kitchen King KKK-124 Craftsman Shaker kitchen in Cashmere Greige',
  },
  {
    code: 'KKK-142',
    name: 'Tudor Manor Arched Kitchen',
    style: 'Tudor',
    finish: 'Patina Glazed Timber PU',
    colorName: 'Smoked Oak & Greige',
    colorHex: '#7A6B5B',
    description:
      'English country-inspired modular arrangement with soft arched door rails, integrated plate racks, appliance garage with bi-fold doors, and natural stone worktops.',
    features: [
      'Solid oak accent door rails and soft arched molding',
      'Integrated spice pull-outs and tiered spice columns',
      'Appliance garage with bi-fold lift-up doors',
      'German Hettich Sensys soft-close silent hinges',
    ],
    image: KITCHEN_IMAGE_PATHS.kkk142,
    imageAlt: 'Kumar Kitchen King KKK-142 Tudor arched cabinet door style',
  },
  {
    code: 'KKK-150',
    name: 'French Provincial Classic',
    style: 'French',
    finish: 'Dual-Layer Stepped Bead Lacquer',
    colorName: 'Antique Pure White',
    colorHex: '#F2EFEB',
    description:
      'Delicate stepped molding around door perimeters, crown ceiling moldings, open cross-shelving wine displays, and deep quartz sink integration.',
    features: [
      'Stepped architectural beading around door faces',
      'Soft-close full extension slides and under-counter racks',
      'Undermount quartz sink with seamless silicone perimeter',
      'Custom under-counter pull-out pantry organization',
    ],
    image: KITCHEN_IMAGE_PATHS.kkk150,
    imageAlt: 'Kumar Kitchen King KKK-150 French provincial kitchen cabinets with crown moldings',
  },
  {
    code: 'KKK-156',
    name: 'Rustic Modern Timber Suite',
    style: 'Rustic',
    finish: 'Synchronized Deep Woodgrain',
    colorName: 'Natural Warm Walnut',
    colorHex: '#645447',
    description:
      'Contemporary rustic composition featuring open grain textured laminate, black architectural bracket accents, and heavy-duty tandem pot drawers.',
    features: [
      'Waterproof marine ply core with synchronized grain face',
      'Matte black metal open shelving brackets and pulls',
      'Heavy-duty tandem box drawers tested for 100,000 cycles',
      'High-capacity corner carousel and blind-corner pull-out',
    ],
    image: KITCHEN_IMAGE_PATHS.kkk156,
    imageAlt: 'Kumar Kitchen King KKK-156 Rustic modern timber kitchen',
  },
  {
    code: 'KKK-168',
    name: 'Popular Cabinet Doors Series (KKK-157 to KKK-176)',
    style: 'Traditional',
    finish: 'Custom Spec (Acrylic / PU / Laminate)',
    colorName: 'Custom Colour Range',
    colorHex: '#B8793A',
    description:
      'Extensive catalogue collection spanning codes KKK-157 through KKK-176. Precision custom-sized for kitchen replacement doors or complete new installations.',
    features: [
      '20 distinct profile cuts from modern bevel to stepped French',
      'Available across all 20 Greiges and custom RAL colors',
      'Matching drawer fronts, tall panels, and dummy fascias',
      'Standard 18mm & 22mm thickness in HDHMR / Solid Teak',
    ],
    image: KITCHEN_IMAGE_PATHS.kkk168,
    imageAlt: 'Kumar Kitchen King popular cabinet door profile collection KKK-157 to KKK-176',
  },
];

// ============================================================================
// 5. KITCHEN LAYOUTS
// ============================================================================
export const KITCHEN_LAYOUTS: KitchenLayoutItem[] = [
  {
    id: 'straight',
    name: 'Straight Line (Single Wall) Layout',
    tagline: 'Streamlined Efficiency for Compact Living',
    description:
      'All appliances, prep zones, and storage arranged along a single architectural wall. Ideal for studio apartments, compact high-rise homes, or modern open lofts.',
    idealFor: 'Studio apartments, narrow kitchens, and open-plan lofts',
    workflow: 'Linear sequence: Refrigerator → Prep Counter → Sink → Cooking Hob',
    diagramPath: KITCHEN_IMAGE_PATHS.layoutStraight,
  },
  {
    id: 'l-shape',
    name: 'L-Shape Kitchen Layout',
    tagline: 'The Classic Ergonomic Work Triangle',
    description:
      'Cabinetry spans two perpendicular adjoining walls, creating a natural golden work triangle between refrigerator, sink, and stove, with ample central floor space.',
    idealFor: 'Small to medium family apartments and open dining rooms',
    workflow: 'Natural triangle with distinct cleaning, prep, and cooking zones',
    diagramPath: KITCHEN_IMAGE_PATHS.layoutLshape,
  },
  {
    id: 'u-shape',
    name: 'U-Shape (Horseshoe) Layout',
    tagline: 'Maximum Storage & Countertop Continuous Surface',
    description:
      'Three continuous walls of cabinetry and worktops wrap around the cook, providing unmatched continuous preparation space and expansive upper/lower storage.',
    idealFor: 'Medium to large independent houses and avid home cooks',
    workflow: 'Dedicated wall each for Cold Storage, Cleaning/Sink, and Cooking/Baking',
    diagramPath: KITCHEN_IMAGE_PATHS.layoutUshape,
  },
  {
    id: 'parallel',
    name: 'Parallel (Galley) Kitchen Layout',
    tagline: 'Professional Chef Ergonomics & Maximum Volume',
    description:
      'Two parallel counter runs facing each other across a central aisle. Widely considered by professional chefs to be the most efficient workflow layout with zero wasted space.',
    idealFor: 'Long rectangular rooms and multi-cook households',
    workflow: 'One wall for wet/prep work (sink & prep) and opposite wall for dry/cooking',
    diagramPath: KITCHEN_IMAGE_PATHS.layoutParallel,
  },
  {
    id: 'island',
    name: 'Island Kitchen Layout',
    tagline: 'Social Hub & Statement Culinary Luxury',
    description:
      'An expansive freestanding central island unit paired with L-shape or single-wall cabinetry. Combines extra food prep surfaces, under-counter wine storage, and family breakfast dining.',
    idealFor: 'Large open-concept luxury villas, kothis, and penthouse homes',
    workflow: 'Island acts as prep and social hub while perimeter wall handles cooking and refrigeration',
    diagramPath: KITCHEN_IMAGE_PATHS.layoutIsland,
  },
];

// ============================================================================
// 6. 4-STEP MANUFACTURING & INSTALLATION PROCESS
// ============================================================================
export const KITCHEN_PROCESS_STEPS: KitchenProcessStep[] = [
  {
    step: '01',
    title: 'Consultation & Site Measurement',
    tagline: 'Lifestyle Audit & 3D Space Assessment',
    description:
      'Our senior kitchen engineer visits your site or welcomes you to our Sector 82 Mohali Master Gallery to review plumbing points, electrical outlets, appliances, and your family cooking habits.',
    timeline: 'Day 1 – 2',
  },
  {
    step: '02',
    title: '3D CAD Design & Material Selection',
    tagline: 'Photorealistic Visualisation & Ergonomic Plan',
    description:
      'We generate millimeter-accurate 3D walkthroughs with real finish samples (PU lacquer, acrylic, quartz tops) and finalize your preferred Blum/Hettich internal drawer layouts.',
    timeline: 'Day 3 – 5',
  },
  {
    step: '03',
    title: '100% Factory Production',
    tagline: 'CNC Precision Cutting at Yamuna Nagar Plant',
    description:
      'Cabinets are CNC-routed, PUR-edgebanded, and spray-painted in dust-free negative-pressure booths at our factory. Every box is pre-assembled and quality-checked before dispatch.',
    timeline: 'Day 6 – 18',
  },
  {
    step: '04',
    title: 'Mess-Free Site Installation',
    tagline: 'Zero Sawdust & Assembled in 48 Hours',
    description:
      'Pre-manufactured modules arrive fully finished. Our certified factory technicians bolt, level, install hardware, and fit countertops without cutting wood inside your home.',
    timeline: 'Within 48 Hours',
  },
];
