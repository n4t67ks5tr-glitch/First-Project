/* Product catalog for Burrow & Bolt — niche household items used daily. */

const CATEGORIES = [
  { id: "cleaning", name: "Cleaning Supplies", icon: "🧽", blurb: "Sprays, scrubs & refills for a spotless home." },
  { id: "hardware", name: "Hardware & Tools", icon: "🔧", blurb: "Small fixes, done right, without a hardware-store trip." },
  { id: "kitchen", name: "Kitchen Essentials", icon: "🍽️", blurb: "The unglamorous tools you reach for every day." },
  { id: "storage", name: "Storage & Organization", icon: "📦", blurb: "Contain the chaos, one drawer at a time." },
  { id: "laundry", name: "Bath & Laundry", icon: "🧺", blurb: "Everyday care for clothes, towels & tile." },
  { id: "safety", name: "Pest & Safety", icon: "🛡️", blurb: "Quiet protection for every room in the house." },
];

const PRODUCTS = [
  {
    id: "p01", name: "Microfiber Streak-Free Cloth Set (6-pack)", category: "cleaning",
    price: 14.5, oldPrice: 18.0, rating: 4.8, reviews: 312, badge: "Bestseller", icon: "🧽",
    tags: ["glass", "dusting", "reusable"],
    description: "Six lint-free microfiber cloths sized for counters, glass, and screens. Machine washable up to 300 cycles before they lose grip.",
  },
  {
    id: "p02", name: "Concentrated All-Purpose Cleaner Refill", category: "cleaning",
    price: 11.0, rating: 4.6, reviews: 189, badge: "Refill", icon: "🧴",
    tags: ["concentrate", "citrus", "refill"],
    description: "One bottle makes 4 spray bottles' worth of cleaner. Cuts grease on counters, stovetops, and sinks without leaving residue.",
  },
  {
    id: "p03", name: "Grout & Tile Detail Brush Trio", category: "cleaning",
    price: 9.75, rating: 4.5, reviews: 97, icon: "🪥",
    tags: ["grout", "bathroom", "detail"],
    description: "Three angled brush heads for grout lines, corners, and faucet bases — the spots a sponge always misses.",
  },
  {
    id: "p04", name: "Precision Screwdriver Set (32-piece)", category: "hardware",
    price: 22.0, oldPrice: 27.0, rating: 4.9, reviews: 421, badge: "Bestseller", icon: "🪛",
    tags: ["repair", "electronics", "gift"],
    description: "Magnetic bits for eyeglasses, laptops, furniture hinges, and battery covers. Comes in a labeled snap-shut case.",
  },
  {
    id: "p05", name: "Anti-Slip Furniture Pad Kit (48-piece)", category: "hardware",
    price: 13.25, rating: 4.4, reviews: 156, icon: "🪑",
    tags: ["floor protection", "felt", "adhesive"],
    description: "Self-adhesive felt pads in four sizes to stop chair legs and table feet from scratching hardwood or tile.",
  },
  {
    id: "p06", name: "Picture-Hanging Kit with Level", category: "hardware",
    price: 16.5, rating: 4.7, reviews: 203, icon: "🖼️",
    tags: ["wall hooks", "level", "drywall"],
    description: "Weight-rated hooks, drywall anchors, and a built-in bubble level so frames go up straight the first time.",
  },
  {
    id: "p07", name: "Cordless Mini Screwdriver, USB-C", category: "hardware",
    price: 34.0, rating: 4.6, reviews: 88, badge: "New", icon: "🔋",
    tags: ["rechargeable", "compact", "torque"],
    description: "A pocket-sized power driver with adjustable torque for flat-pack furniture and everyday tightening jobs.",
  },
  {
    id: "p08", name: "Silicone Stretch Lids (Set of 8)", category: "kitchen",
    price: 15.0, rating: 4.5, reviews: 264, icon: "🥣",
    tags: ["food storage", "reusable", "dishwasher-safe"],
    description: "Stretch over bowls, cans, and cut fruit to replace single-use wrap. Freezer, microwave, and dishwasher safe.",
  },
  {
    id: "p09", name: "Drawer Knife Organizer Block", category: "kitchen",
    price: 19.5, rating: 4.3, reviews: 74, icon: "🔪",
    tags: ["knife storage", "bamboo", "in-drawer"],
    description: "An in-drawer bamboo insert that keeps blades sheathed and off the counter, holding up to 9 knives safely.",
  },
  {
    id: "p10", name: "Compost Countertop Caddy", category: "kitchen",
    price: 24.0, oldPrice: 29.0, rating: 4.6, reviews: 131, badge: "Sale", icon: "🥬",
    tags: ["compost", "odor-control", "charcoal filter"],
    description: "A 1.3-gallon steel caddy with a charcoal filter lid that keeps scraps odor-free between compost runs.",
  },
  {
    id: "p11", name: "Clear Stackable Pantry Bins (Set of 6)", category: "storage",
    price: 28.5, rating: 4.8, reviews: 358, badge: "Bestseller", icon: "📦",
    tags: ["pantry", "stackable", "BPA-free"],
    description: "Airtight, stackable bins with write-and-wipe labels for flour, cereal, snacks, and pet food.",
  },
  {
    id: "p12", name: "Under-Sink Sliding Organizer", category: "storage",
    price: 21.0, rating: 4.4, reviews: 112, icon: "🚿",
    tags: ["cabinet", "sliding tray", "adjustable"],
    description: "Two adjustable sliding trays that pull out around pipes to finally use the back of the cabinet.",
  },
  {
    id: "p13", name: "Velvet Non-Slip Hangers (30-pack)", category: "storage",
    price: 17.75, rating: 4.7, reviews: 246, icon: "👔",
    tags: ["closet", "slim", "velvet"],
    description: "Slim, space-saving hangers with a grippy finish so blouses and slippery fabrics stay put.",
  },
  {
    id: "p14", name: "Entryway Cubby Shoe Rack", category: "storage",
    price: 42.0, rating: 4.5, reviews: 67, badge: "New", icon: "👟",
    tags: ["entryway", "shoe storage", "wood"],
    description: "A 12-cubby wooden shoe rack sized for an entryway, mudroom, or closet floor.",
  },
  {
    id: "p15", name: "Enzyme Laundry Booster Pods", category: "laundry",
    price: 13.0, rating: 4.6, reviews: 198, icon: "🧺",
    tags: ["stain removal", "sensitive skin", "pods"],
    description: "Add one pod to tackle sweat, grass, and food stains without the fragrance load of standard detergent.",
  },
  {
    id: "p16", name: "Wool Dryer Balls (Set of 6)", category: "laundry",
    price: 16.0, rating: 4.7, reviews: 289, badge: "Bestseller", icon: "🧶",
    tags: ["fabric softener alternative", "reusable", "reduces drying time"],
    description: "Reusable New Zealand wool balls that soften fabric and cut drying time — replaces 1,000+ dryer sheets.",
  },
  {
    id: "p17", name: "Squeegee Shower Set", category: "laundry",
    price: 10.5, rating: 4.4, reviews: 143, icon: "🚿",
    tags: ["shower", "hard water", "daily habit"],
    description: "A hook-mounted squeegee that lives in the shower so wiping down glass takes ten seconds, not a scrub session.",
  },
  {
    id: "p18", name: "Bath Mat, Quick-Dry Diatomite", category: "laundry",
    price: 26.5, rating: 4.5, reviews: 176, icon: "🛁",
    tags: ["quick-dry", "non-slip", "stone mat"],
    description: "A stone-powder mat that absorbs a puddle in seconds and dries fully between showers, so it never smells musty.",
  },
  {
    id: "p19", name: "Peppermint Rodent Deterrent Pouches", category: "safety",
    price: 12.5, rating: 4.2, reviews: 84, icon: "🌿",
    tags: ["non-toxic", "pantry", "garage"],
    description: "Plant-oil pouches for pantries, garages, and closets — a scent deterrent with no traps or poison.",
  },
  {
    id: "p20", name: "Outlet Safety Cover Pack (24-piece)", category: "safety",
    price: 8.75, rating: 4.6, reviews: 215, icon: "🔌",
    tags: ["childproofing", "outlet", "clear"],
    description: "Low-profile, nearly invisible outlet covers that still allow furniture to sit flush against the wall.",
  },
  {
    id: "p21", name: "Smoke & CO Detector, 10-Year Battery", category: "safety",
    price: 38.0, rating: 4.9, reviews: 502, badge: "Bestseller", icon: "🚨",
    tags: ["sealed battery", "combo alarm", "hallway"],
    description: "A combo smoke and carbon-monoxide alarm with a sealed 10-year battery — no chirping, no swaps.",
  },
  {
    id: "p22", name: "Silicone Cabinet Corner Guards (16-pack)", category: "safety",
    price: 9.0, rating: 4.3, reviews: 61, icon: "🛡️",
    tags: ["childproofing", "corners", "clear silicone"],
    description: "Clear silicone bumpers for coffee tables, counters, and cabinet edges throughout the house.",
  },
  {
    id: "p23", name: "Reusable Swedish Dishcloths (10-pack)", category: "cleaning",
    price: 18.0, rating: 4.7, reviews: 231, badge: "New", icon: "🧻",
    tags: ["compostable", "replaces paper towels", "absorbent"],
    description: "Each cloth absorbs 15x its weight and replaces up to 17 rolls of paper towels — compostable at end of life.",
  },
  {
    id: "p24", name: "Adjustable Wrench & Plier Travel Set", category: "hardware",
    price: 27.5, rating: 4.5, reviews: 102, icon: "🔩",
    tags: ["apartment toolkit", "compact", "rust-resistant"],
    description: "A compact 8-piece set sized for apartment junk drawers — everything you need, nothing you'll never use.",
  },
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}
