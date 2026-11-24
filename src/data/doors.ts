/**
 * Centralized Doors Data Module for Door World (Kumar Kitchen King)
 * All paths match exact filenames in /public/images/doors/web/<category>/<file>.webp
 * Case-sensitive on Vercel.
 */

export interface DoorItem {
  id: string;
  title: string;
  category: DoorCategory;
  image: string;
  alt: string;
  description?: string;
  isColourStrip?: boolean;
}

export type DoorCategory =
  | 'Carved & Entrance Doors'
  | 'Classic Panel Doors'
  | 'Modern Designer Doors'
  | 'Fluted & Textured Doors'
  | 'Glass & Lattice Doors'
  | 'Leather-Finish Doors'
  | 'Colour Options'
  | 'Interiors';

// ============================================================================
// 1. ALL VERIFIED DOOR IMAGES BY CATEGORY
// ============================================================================

export const CARVED_ENTRANCE_DOORS: DoorItem[] = [
  {
    id: 'radial-carved-entrance-door',
    title: 'Radial Carved Wood Door',
    category: 'Carved & Entrance Doors',
    image: '/images/doors/web/cnc-carved/17-radial-carved-wood-door.webp',
    alt: 'Radial carved solid wood entrance door with central sunburst motif',
    description: 'Precision 3D CNC machined sunburst geometry crafted in high-density seasoned timber.',
  },
  {
    id: 'ornate-carved-wood-door',
    title: 'Ornate Carved Wood Door',
    category: 'Carved & Entrance Doors',
    image: '/images/doors/web/cnc-carved/06-ornate-carved-wood-door.webp',
    alt: 'Deeply carved architectural wooden door with ornamental scrollwork',
    description: 'Traditional deep-relief architectural carvings with hand-finished flourishes.',
  },
  {
    id: 'abstract-wave-double-door',
    title: 'Abstract Wave Double Door',
    category: 'Carved & Entrance Doors',
    image: '/images/doors/web/double-entrance/25-abstract-wave-double-door.webp',
    alt: 'Contemporary double entrance door with sculpted wave relief patterns',
    description: 'Fluid organic contour lines routed across dual entrance leaves.',
  },
  {
    id: 'ornate-wood-double-door',
    title: 'Ornate Wood Double Door',
    category: 'Carved & Entrance Doors',
    image: '/images/doors/web/double-entrance/41-ornate-wood-double-door.webp',
    alt: 'Grand double entrance wooden door with classical ornamental paneling',
    description: 'Grand classical double portal featuring symmetrical raised moldings and grand proportions.',
  },
  {
    id: 'white-classic-double-door',
    title: 'White Classic Double Door',
    category: 'Carved & Entrance Doors',
    image: '/images/doors/web/double-entrance/46-white-classic-double-door.webp',
    alt: 'Pure white classical double entrance door with molded architectural profiles',
    description: 'European architectural pure white double entrance door with stepped beading.',
  },
  {
    id: 'radial-grid-double-door',
    title: 'Radial Grid Double Door',
    category: 'Carved & Entrance Doors',
    image: '/images/doors/web/double-entrance/47-radial-grid-double-door.webp',
    alt: 'Architectural radial grid double entrance door with geometric wood panels',
    description: 'Monumental symmetrical geometric grid composition creating an imposing villa entrance.',
  },
];

export const CLASSIC_PANEL_DOORS: DoorItem[] = [
  {
    id: 'white-classic-panel-door',
    title: 'White Classic Panel Door',
    category: 'Classic Panel Doors',
    image: '/images/doors/web/classic-panel/05-white-classic-panel-door.webp',
    alt: 'Classic white painted panel interior door with molded bevels',
    description: 'Crisp multi-panel interior door in velvet satin finish for refined residences.',
  },
  {
    id: 'taupe-classic-panel-door',
    title: 'Taupe Classic Panel Door',
    category: 'Classic Panel Doors',
    image: '/images/doors/web/classic-panel/11-taupe-classic-panel-door.webp',
    alt: 'Warm taupe painted classic panel door with architectural trim',
    description: 'Warm architectural greige finish with traditional mortise-and-tenon appearance.',
  },
  {
    id: 'light-wood-panel-door',
    title: 'Light Wood Panel Door',
    category: 'Classic Panel Doors',
    image: '/images/doors/web/classic-panel/18-light-wood-panel-door.webp',
    alt: 'Natural light oak finish solid wood panel door',
    description: 'Natural blonde oak graining with balanced square raised panels.',
  },
  {
    id: 'white-fluted-panel-door',
    title: 'White Fluted Panel Door',
    category: 'Classic Panel Doors',
    image: '/images/doors/web/classic-panel/30-white-fluted-panel-door.webp',
    alt: 'White classic door with fine vertical fluted interior panels',
    description: 'Fusion of classical outer rail proportion with modern fluted core insert.',
  },
  {
    id: 'beige-fluted-panel-door',
    title: 'Beige Fluted Panel Door',
    category: 'Classic Panel Doors',
    image: '/images/doors/web/classic-panel/43-beige-fluted-panel-door.webp',
    alt: 'Refined beige panel door with fluted texture and subtle detailing',
    description: 'Muted architectural tone featuring tactile linear grooving.',
  },
];

export const MODERN_DESIGNER_DOORS: DoorItem[] = [
  {
    id: 'charcoal-wood-panel-door',
    title: 'Charcoal Wood Panel Door',
    category: 'Modern Designer Doors',
    image: '/images/doors/web/modern-designer/08-charcoal-wood-panel-door.webp',
    alt: 'Deep charcoal stained wood panel door with minimalist profile',
    description: 'Dramatic dark timber tone with minimalist seamless rail construction.',
  },
  {
    id: 'bronze-grid-door',
    title: 'Bronze Grid Designer Door',
    category: 'Modern Designer Doors',
    image: '/images/doors/web/modern-designer/13-bronze-grid-door.webp',
    alt: 'Modern architectural door with warm bronze grid inlay accents',
    description: 'Refined metallic grid inlays embedded flush within seasoned architectural timber.',
  },
  {
    id: 'wood-grid-entrance-door',
    title: 'Wood Grid Entrance Door',
    category: 'Modern Designer Doors',
    image: '/images/doors/web/modern-designer/14-wood-grid-entrance-door.webp',
    alt: 'Contemporary entrance door featuring geometric wood grid geometry',
    description: 'High-architectural balance of square geometric recesses creating tactile depth.',
  },
  {
    id: 'light-wood-metal-accent-door',
    title: 'Light Wood Metal Accent Door',
    category: 'Modern Designer Doors',
    image: '/images/doors/web/modern-designer/16-light-wood-metal-accent-door.webp',
    alt: 'Natural light timber door with recessed metallic accent strip',
    description: 'Modern champagne ash timber highlighted with brushed metallic accent lines.',
  },
  {
    id: 'charcoal-woven-accent-door',
    title: 'Charcoal Woven Accent Door',
    category: 'Modern Designer Doors',
    image: '/images/doors/web/modern-designer/20-charcoal-woven-accent-door.webp',
    alt: 'Charcoal modern door with textured woven tactile center panel',
    description: 'Bespoke woven geometric textured insert bordered by deep espresso timber rails.',
  },
  {
    id: 'beige-textured-modern-door',
    title: 'Beige Textured Modern Door',
    category: 'Modern Designer Doors',
    image: '/images/doors/web/modern-designer/31-beige-textured-modern-door.webp',
    alt: 'Warm beige textured architectural door for contemporary interiors',
    description: 'Subtle plaster-like textural face laminated over solid acoustic HDHMR core.',
  },
  {
    id: 'dark-brass-accent-door',
    title: 'Dark Brass Accent Door',
    category: 'Modern Designer Doors',
    image: '/images/doors/web/modern-designer/34-dark-brass-accent-door.webp',
    alt: 'Matte dark timber door with integrated brushed brass hardware accent',
    description: 'Full-height satin brass edge detail paired with deep walnut surface veneer.',
  },
  {
    id: 'wood-grid-modern-door',
    title: 'Wood Grid Modern Door',
    category: 'Modern Designer Doors',
    image: '/images/doors/web/modern-designer/40-wood-grid-modern-door.webp',
    alt: 'Minimalist flush door with fine architectural wood grid scoring',
    description: 'Clean CNC V-groove scoring creating contemporary geometric rhythm.',
  },
];

export const FLUTED_TEXTURED_DOORS: DoorItem[] = [
  {
    id: 'vertical-fluted-wood-door',
    title: 'Vertical Fluted Wood Door',
    category: 'Fluted & Textured Doors',
    image: '/images/doors/web/fluted-textured/09-vertical-fluted-wood-door.webp',
    alt: 'Full-height vertical fluted timber door with rich wood grain',
    description: 'Precision continuous vertical flutes imparting height and architectural grandeur.',
  },
  {
    id: 'dark-textured-gold-accent-door',
    title: 'Dark Textured Gold Accent Door',
    category: 'Fluted & Textured Doors',
    image: '/images/doors/web/fluted-textured/10-dark-textured-gold-accent-door.webp',
    alt: 'Charcoal textured relief door accented with refined gold vertical line',
    description: 'Tactile textured charcoal relief intersected by an asymmetric metallic accent.',
  },
  {
    id: 'taupe-fluted-panel-door',
    title: 'Taupe Fluted Panel Door',
    category: 'Fluted & Textured Doors',
    image: '/images/doors/web/fluted-textured/33-taupe-fluted-panel-door.webp',
    alt: 'Earthy taupe door with precision fluted vertical paneling',
    description: 'Curated architectural greige tone with subtle shadow lines along every flute.',
  },
  {
    id: 'oval-relief-entrance-door',
    title: 'Oval Relief Entrance Door',
    category: 'Fluted & Textured Doors',
    image: '/images/doors/web/fluted-textured/38-oval-relief-entrance-door.webp',
    alt: 'Architectural entrance door featuring sculpted concentric oval relief',
    description: 'Concentric sculpted oval relief carved with smooth transitional depth.',
  },
];

export const GLASS_LATTICE_DOORS: DoorItem[] = [
  {
    id: 'oval-lattice-double-door',
    title: 'Oval Lattice Double Door',
    category: 'Glass & Lattice Doors',
    image: '/images/doors/web/glass-and-lattice/04-oval-lattice-double-door.webp',
    alt: 'Double entrance door with decorative oval wood lattice fretwork and glass',
    description: 'Intricate CNC lattice fretwork backed by tempered security glass.',
  },
  {
    id: 'square-lattice-door',
    title: 'Square Lattice Door',
    category: 'Glass & Lattice Doors',
    image: '/images/doors/web/glass-and-lattice/24-square-lattice-door.webp',
    alt: 'Solid wood door with geometric square lattice fretwork and translucent glass',
    description: 'Japanese-inspired geometric lattice grilles diffusing gentle ambient light.',
  },
  {
    id: 'light-wood-glass-double-door',
    title: 'Light Wood Glass Double Door',
    category: 'Glass & Lattice Doors',
    image: '/images/doors/web/glass-and-lattice/27-light-wood-glass-double-door.webp',
    alt: 'Contemporary light oak double doors with architectural clear glass lites',
    description: 'Natural oak stiles framing broad glass panes for airy modern interiors.',
  },
  {
    id: 'white-glass-double-door',
    title: 'White Glass Double Door',
    category: 'Glass & Lattice Doors',
    image: '/images/doors/web/glass-and-lattice/50-white-glass-double-door.webp',
    alt: 'Elegant white French-style double doors with multi-lite glass panes',
    description: 'Classic French architectural multi-pane double doors finished in satin white.',
  },
];

export const LEATHER_LOOK_DOORS: DoorItem[] = [
  {
    id: 'brown-tufted-door',
    title: 'Brown Tufted Leather-Finish Door',
    category: 'Leather-Finish Doors',
    image: '/images/doors/web/leather-look/26-brown-tufted-door.webp',
    alt: 'Luxury rich brown tufted leather-finish door with padded acoustic relief',
    description: 'Deep espresso tufted finish offering high sound dampening and luxury tactile touch.',
  },
  {
    id: 'blue-diamond-tufted-door',
    title: 'Royal Blue Diamond Tufted Door',
    category: 'Leather-Finish Doors',
    image: '/images/doors/web/leather-look/37-blue-diamond-tufted-door.webp',
    alt: 'Deep royal blue diamond-stitched leather-finish door for private suites',
    description: 'Diamond quilted pattern in royal sapphire tone for home theatres and private lounges.',
  },
  {
    id: 'charcoal-tufted-door',
    title: 'Charcoal Tufted Leather-Finish Door',
    category: 'Leather-Finish Doors',
    image: '/images/doors/web/leather-look/48-charcoal-tufted-door.webp',
    alt: 'Modern charcoal tufted leather-finish door with tactile matte finish',
    description: 'Contemporary square tufting in architectural charcoal leatherette.',
  },
  {
    id: 'ivory-tufted-door',
    title: 'Ivory Tufted Leather-Finish Door',
    category: 'Leather-Finish Doors',
    image: '/images/doors/web/leather-look/49-ivory-tufted-door.webp',
    alt: 'Ivory upholstered leather-finish interior door with cushioned panels',
    description: 'Subtle ivory upholstered face ideal for luxury master suites and dressing areas.',
  },
];

export const COLOUR_OPTIONS_STRIP: DoorItem[] = [
  {
    id: 'olive-arched-fluted-door',
    title: 'Olive Arched Fluted Palette',
    category: 'Colour Options',
    image: '/images/doors/web/fluted-textured/29-olive-arched-fluted-door.webp',
    alt: 'Olive tone arched fluted door design sample and colour variation',
    isColourStrip: true,
  },
  {
    id: 'arched-fluted-colour-collection',
    title: 'Arched Fluted Colour Collection',
    category: 'Colour Options',
    image: '/images/doors/web/fluted-textured/44-arched-fluted-colour-collection.webp',
    alt: 'Curated colorway swatches for arched fluted architectural doors',
    isColourStrip: true,
  },
  {
    id: 'classic-panel-colour-collection',
    title: 'Classic Panel Colour Collection',
    category: 'Colour Options',
    image: '/images/doors/web/classic-panel/52-classic-panel-colour-collection.webp',
    alt: 'Multi-colour palette variations for classic molded panel doors',
    isColourStrip: true,
  },
];

export const INTERIORS_WALL_PANELLING: DoorItem[] = [
  {
    id: 'wood-panelled-corridor',
    title: 'Wood Panelled Corridor',
    category: 'Interiors',
    image: '/images/doors/web/wall-panelling/22-wood-panelled-corridor.webp',
    alt: 'Architectural wood wall paneling and fitted door corridor interior',
    description: 'Full-height acoustic wood paneling with seamless flush door integration.',
  },
  {
    id: 'decorative-wood-wall-panelling',
    title: 'Decorative Wood Wall Panelling',
    category: 'Interiors',
    image: '/images/doors/web/wall-panelling/35-decorative-wood-wall-panelling.webp',
    alt: 'Precision geometric wooden wall cladding and feature wall paneling',
    description: 'Geometric interlocking timber wall cladding for living rooms and executive suites.',
  },
  {
    id: 'dark-patterned-wall-panelling',
    title: 'Dark Patterned Wall Panelling',
    category: 'Interiors',
    image: '/images/doors/web/wall-panelling/53-dark-patterned-wall-panelling.webp',
    alt: 'Dark patterned textured decorative wall covering and paneling integration',
    description: 'Designer textured architectural wall covering paired with custom wood cabinetry.',
  },
];

// ============================================================================
// 2. HOME FEATURED DOORS (EXACTLY 4 CARDS)
// ============================================================================

export const HOME_FEATURED_DOORS: DoorItem[] = [
  CARVED_ENTRANCE_DOORS[0], // cnc-carved/17-radial-carved-wood-door.webp
  CARVED_ENTRANCE_DOORS[5], // double-entrance/47-radial-grid-double-door.webp
  MODERN_DESIGNER_DOORS[1], // modern-designer/13-bronze-grid-door.webp
  MODERN_DESIGNER_DOORS[2], // modern-designer/14-wood-grid-entrance-door.webp
];

// Hero visual background
export const HERO_DOOR_IMAGE = '/images/doors/web/cnc-carved/17-radial-carved-wood-door.webp';

// Open Graph / Social share image
export const OG_DOOR_IMAGE = '/images/doors/web/double-entrance/47-radial-grid-double-door.webp';

// ============================================================================
// 3. COMPLETE DOORS CATALOGUE (ALL CATEGORIES GROUPED)
// ============================================================================

export const ALL_DOOR_CATEGORIES = [
  {
    id: 'carved-entrance',
    title: 'Carved & Entrance Doors',
    subtitle: 'Grand Double Portals & 3D CNC Architectural Relief',
    doors: CARVED_ENTRANCE_DOORS,
  },
  {
    id: 'classic-panel',
    title: 'Classic Panel Doors',
    subtitle: 'Timeless Molded Bevels & Fluted Profiles',
    doors: CLASSIC_PANEL_DOORS,
  },
  {
    id: 'modern-designer',
    title: 'Modern Designer Doors',
    subtitle: 'Architectural Grids, Metal Accents & Woven Textures',
    doors: MODERN_DESIGNER_DOORS,
  },
  {
    id: 'fluted-textured',
    title: 'Fluted & Textured Doors',
    subtitle: 'Continuous Linear Fluting & Sculpted Oval Reliefs',
    doors: FLUTED_TEXTURED_DOORS,
  },
  {
    id: 'glass-lattice',
    title: 'Glass & Lattice Doors',
    subtitle: 'Tempered Glass Inserts & CNC Geometric Grilles',
    doors: GLASS_LATTICE_DOORS,
  },
  {
    id: 'leather-finish',
    title: 'Leather-Finish Doors',
    subtitle: 'Tufted Acoustic Upholstery & Tactile Luxury',
    doors: LEATHER_LOOK_DOORS,
  },
];

// Flat list of all door photos for gallery/filters
export const ALL_DOORS: DoorItem[] = [
  ...CARVED_ENTRANCE_DOORS,
  ...CLASSIC_PANEL_DOORS,
  ...MODERN_DESIGNER_DOORS,
  ...FLUTED_TEXTURED_DOORS,
  ...GLASS_LATTICE_DOORS,
  ...LEATHER_LOOK_DOORS,
];

// ============================================================================
// 4. VERIFIED DOOR SPECIFICATIONS BLOCK (ONLY FACTUAL DATA ALLOWED)
// ============================================================================

export const DOOR_SPECIFICATIONS = [
  {
    label: 'Available Thickness',
    value: '40 mm & 50 mm',
    note: 'Engineered solid core stability',
  },
  {
    label: 'Surface Finishes',
    value: 'Teakwood · PU Paint · Leather finish · Veneer',
    note: 'Factory spray & hot-pressed laminates',
  },
  {
    label: 'Chaukhat / Frame',
    value: '6-inch Wooden Frame with Aluminium Filling',
    note: 'Reinforced anti-twist jamb profile',
  },
  {
    label: 'Core Construction',
    value: 'Top & Bottom High-Density HDHMR Surface',
    note: 'Moisture resistant substrate',
  },
  {
    label: 'Adhesive Standard',
    value: 'Henkel Industrial German Adhesive',
    note: 'Permanent hot-press bonding',
  },
  {
    label: 'Perimeter Lippers',
    value: '4-Side 12 mm Solid Teakwood Edge',
    note: 'Planed flush for screw-holding strength',
  },
  {
    label: 'Machining & Forming',
    value: 'Hot Press with Precision CNC Design',
    note: 'Deep relief dimensional routing',
  },
];

/**
 * UNCONFIRMED CLIENT CLAIMS — KEPT ONLY AS COMMENTS PER BRIEF:
 * - 10/15-Year Warranty period (awaiting written warranty terms)
 * - Fire-retardant / FR-rating certifications
 * - Anti-termite chemical guarantees
 * - Total leaf weight / acoustical decibel drop ratings
 * - ISO / Bureau of Indian Standards certificate numbers
 */
