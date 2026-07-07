export type ProjectSlug = "aston-martin" | "red-bull" | "desert-drive" | "performance-cars" | "lifestyle-cars";

export type PortfolioImage = {
  src: string;
  alt: string;
  project: ProjectSlug;
  category: "Motion" | "Design" | "Interior" | "Event" | "Lifestyle" | "Desert";
  width: number;
  height: number;
  caption: string;
};

export type Project = {
  slug: ProjectSlug;
  title: string;
  eyebrow: string;
  year: string;
  role: string;
  location: string;
  hero: string;
  summary: string;
  context: string;
  stats: { label: string; value: string }[];
  images: PortfolioImage[];
};

const astonRows: Array<[string, string, PortfolioImage["category"], string]> = [
  ["IMG_3268.jpg", "Aston Martin rolling through mountain road", "Motion", "Precision at speed, framed with enough negative space to feel engineered."],
  ["IMG_3269.jpg", "Aston Martin front rolling shot", "Motion", "Low, direct, and assertive."],
  ["IMG_3260.jpg", "Aston Martin wheel and carbon brake detail", "Design", "Material, brake, and color detail held in a clean product crop."],
  ["IMG_3261.jpg", "Aston Martin rear diffuser and tail light", "Design", "Rear geometry and carbon elements framed with launch-day restraint."],
  ["IMG_3262.jpg", "Aston Martin wheel center badge macro", "Design", "Macro focus turns hardware into a brand signature."],
  ["IMG_3263.jpg", "Aston Martin rear badge close-up", "Design", "The badge sits inside a quiet study of paint, shadow, and surface."],
  ["IMG_3264.jpg", "Aston Martin rolling rear three-quarter", "Motion", "A controlled rear angle with road motion as the energy line."],
  ["IMG_3265.jpg", "Aston Martin from rear in motion", "Motion", "Road texture becomes the motion layer while the car stays composed."],
  ["IMG_3266.jpg", "Aston Martin front rolling through canyon", "Motion", "Black paint, hard light, and canyon speed."],
  ["IMG_3272.jpg", "Aston Martin seat embroidery", "Interior", "Interior craftsmanship photographed as a design object."],
  ["IMG_3275.jpg", "Aston Martin digital cluster and steering wheel", "Interior", "Driver interface captured as technology detail."],
  ["IMG_3277.jpg", "Aston Martin cockpit and console", "Interior", "A wider cabin frame for material and interface hierarchy."],
  ["IMG_3278.jpg", "Aston Martin engine start button detail", "Interior", "A tactile control becomes the moment before motion."],
  ["IMG_3279.jpg", "Aston Martin instrument cluster detail", "Interior", "The driver display as precision product UI."],
  ["IMG_3280.jpg", "Aston Martin full cockpit view", "Interior", "Cabin design held in soft, premium shadow."],
  ["IMG_3283.jpg", "Aston Martin side badge close-up", "Design", "Brand mark, surface tension, and macro geometry."],
  ["IMG_3257.jpg", "Silver Aston Martin on launch display", "Event", "Event coverage with a clean commercial read."]
];

const aston: PortfolioImage[] = astonRows.map(([file, alt, category, caption]) => ({
  src: `/images/aston-martin/${file}`,
  alt,
  project: "aston-martin",
  category,
  width: 2048,
  height: file === "IMG_3272.jpg" ? 1152 : 1024,
  caption
}));

const cars = {
  drift: "/images/cars/IMG_3284.jpg",
  kart: "/images/cars/IMG_3285.jpg",
  kartWide: "/images/cars/IMG_3286.jpg",
  desertHero: "/images/cars/IMG_7531.jpg",
  desertJump: "/images/cars/IMG_7532.jpg",
  desertSpray: "/images/cars/IMG_7533.jpg",
  desertClimb: "/images/cars/IMG_7535.jpg",
  desertConvoy: "/images/cars/IMG_7541.jpg",
  desertWide: "/images/cars/IMG_7542.jpg",
  desertRoad: "/images/cars/IMG_7549.jpg",
  desertStatic: "/images/cars/IMG_7553.jpg",
  desertClose: "/images/cars/IMG_7556.jpg",
  ferrariBlack: "/images/cars/65929DFF-C1D4-4C1F-932B-0BEF615B0F91.jpg",
  ferrariWhite: "/images/cars/3C0DC720-ECDA-4232-8AFB-838BB01CEA83.jpg",
  ferrariRed: "/images/cars/B4DEDB5C-1CA1-4E7B-AAFC-1AE3DC69BDBB.jpg"
};

const image = (
  src: string,
  alt: string,
  project: ProjectSlug,
  category: PortfolioImage["category"],
  caption: string,
  height = 1024
): PortfolioImage => ({ src, alt, project, category, width: 2048, height, caption });

export const projects: Project[] = [
  {
    slug: "aston-martin",
    title: "Aston Martin Oman",
    eyebrow: "Pre-launch test drive campaign",
    year: "2023",
    role: "Full-time photographer at 3DMax Media for campaign, dynamic drive, and function coverage",
    location: "Oman",
    hero: "/images/aston-martin/IMG_3268.jpg",
    summary:
      "Campaign imagery photographed before the Oman launch test drive, combining dynamic rolling shots, function coverage, product detail, and interior design frames.",
    context:
      "Produced while working full-time for 3DMax Media, a production house in Oman. Shot on Canon R5 with RF 70-200mm and RF 24-105mm f/2.8 lenses, using Servo AF, 1/800-1/900 shutter speed, ISO 200-300, and a RAW-first processing workflow.",
    stats: [
      { label: "Camera", value: "Canon R5" },
      { label: "Shutter", value: "1/800-1/900" },
      { label: "Delivery", value: "RAW Processed" }
    ],
    images: aston
  },
  {
    slug: "red-bull",
    title: "Motorsport Motion",
    eyebrow: "Trackside speed studies",
    year: "2023",
    role: "Motorsport and event action photography",
    location: "Event circuit",
    hero: cars.drift,
    summary:
      "A motorsport set built around lateral motion, smoke, heat, crowd blur, and the instinct to hold the subject sharp when everything else is accelerating.",
    context:
      "Captured as high-energy event coverage with a focus on panning technique, fast autofocus response, and decisive framing for social and campaign use.",
    stats: [
      { label: "Shutter", value: "Panning" },
      { label: "Focus", value: "Speed" },
      { label: "Mood", value: "Night" }
    ],
    images: [
      image(cars.drift, "Red drift car panning at night", "red-bull", "Motion", "A single sharp subject inside a field of speed."),
      image(cars.kart, "Kart driver photographed low and close", "red-bull", "Motion", "Close proximity makes motorsport feel tactile."),
      image(cars.kartWide, "Kart crossing cones at speed", "red-bull", "Event", "Negative space gives the image room to breathe.")
    ]
  },
  {
    slug: "desert-drive",
    title: "Haval X9 Oman",
    eyebrow: "Brand launch test drive campaign",
    year: "2023",
    role: "Commercial campaign photography with road, desert, and dynamic team coverage",
    location: "Oman road and desert routes",
    hero: cars.desertHero,
    summary:
      "A launch campaign for Haval X9, produced for OT, a Chinese car seller in Oman, during the brand test drive across road and desert environments.",
    context:
      "Shot with a team while working in Oman, covering dynamic vehicle movement, dunes, convoy moments, road sequences, and hero stills for campaign and launch use.",
    stats: [
      { label: "Client", value: "OT Oman" },
      { label: "Brand", value: "Haval X9" },
      { label: "Terrain", value: "Road + Desert" }
    ],
    images: [
      image(cars.desertHero, "White SUV cutting through desert sand", "desert-drive", "Desert", "Dust plume as direction, not decoration."),
      image(cars.desertJump, "White SUV lifting over a dune", "desert-drive", "Desert", "A decisive moment at the crest."),
      image(cars.desertSpray, "SUV pushing a wall of sand", "desert-drive", "Motion", "The product remains legible inside chaos."),
      image(cars.desertClimb, "SUV climbing through soft desert sand", "desert-drive", "Desert", "Traction, dust, and product capability in one frame."),
      image(cars.desertConvoy, "SUV moving across open desert", "desert-drive", "Lifestyle", "A wider sense of route, scale, and expedition."),
      image(cars.desertWide, "SUV moving through open desert", "desert-drive", "Lifestyle", "Scale, distance, and quiet power."),
      image(cars.desertRoad, "SUV rolling on mountain road", "desert-drive", "Motion", "Road work connects adventure to daily drivability."),
      image(cars.desertStatic, "SUV posed on desert dune at sunset", "desert-drive", "Lifestyle", "A static hero frame after the action."),
      image(cars.desertClose, "SUV carving through dune sand close-up", "desert-drive", "Desert", "Sand texture and vehicle stance held close.")
    ]
  },
  {
    slug: "performance-cars",
    title: "Ferrari Event Display",
    eyebrow: "Social media event coverage",
    year: "2023",
    role: "Event display photography for social media",
    location: "Oman",
    hero: cars.ferrariBlack,
    summary:
      "Ferrari display images photographed during an event, composed for polished social media use with clean reflections, stance, color, and luxury context.",
    context:
      "Captured locally during a display event, prioritizing fast coverage, clean vehicle presentation, and social-ready crops without clutter.",
    stats: [
      { label: "Use", value: "Social Media" },
      { label: "Format", value: "Event Display" },
      { label: "Approach", value: "Product First" }
    ],
    images: [
      image(cars.ferrariBlack, "Black Ferrari beside reflecting pool", "performance-cars", "Lifestyle", "A clean side profile with water as a premium surface."),
      image(cars.ferrariWhite, "White Ferrari beside a reflecting pool", "performance-cars", "Design", "The body line reads in one uninterrupted gesture."),
      image(cars.ferrariRed, "Red Ferrari at luxury resort", "performance-cars", "Lifestyle", "Color becomes the hero against white architecture.")
    ]
  },
  {
    slug: "lifestyle-cars",
    title: "Lifestyle Cars",
    eyebrow: "People, place, product",
    year: "2023",
    role: "Lifestyle automotive storytelling",
    location: "Road, resort, and event environments",
    hero: "/images/aston-martin/IMG_3270.jpg",
    summary:
      "Lifestyle images that keep the vehicle dominant while using place, atmosphere, and human context to suggest ownership.",
    context:
      "A supporting edit from commercial and event environments, focused on automotive lifestyle, place, and brand feeling while keeping the product visually dominant.",
    stats: [
      { label: "Voice", value: "Quiet" },
      { label: "Frame", value: "Editorial" },
      { label: "Use", value: "Brand" }
    ],
    images: [
      image("/images/aston-martin/IMG_3270.jpg", "Aston Martin front portrait under palms", "lifestyle-cars", "Lifestyle", "A controlled front portrait with place as context.", 1152)
    ]
  }
];

// Gallery shows the curated Aston Martin DB12 set only (excludes the silver
// studio display shot). Other projects keep their images for their detail pages.
export const galleryImages = aston.filter((image) => !image.src.includes("IMG_3257.jpg"));

export const featuredProjects = projects.slice(0, 4);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
