// @ts-nocheck 

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Star,
  Sparkles,
  SlidersHorizontal,
  Plus,
  Minus,
  Trash2,
  Check,
  CreditCard,
  Smartphone,
  Banknote,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Droplets,
  Wind,
  Layers,
  ShieldCheck,
  Truck,
  Award,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react';

// ============================================================================
// 1. LUXURY PERFUME CATALOG & BRAND DATA
// ============================================================================

const BRANDS = [
  {
    id: 'mfk',
    name: 'Maison Francis Kurkdjian',
    origin: 'Paris, France',
    tagline: 'Contemporary French haute parfumerie defined by purity and radiance.'
  },
  {
    id: 'byredo',
    name: 'Byredo',
    origin: 'Stockholm, Sweden',
    tagline: 'Translating memories and emotions into modern olfactory poetry.'
  },
  {
    id: 'pdm',
    name: 'Parfums de Marly',
    origin: 'Versailles, France',
    tagline: 'Opulent 18th-century royal heritage reimagined with bold intensity.'
  },
  {
    id: 'lelabo',
    name: 'Le Labo',
    origin: 'Grasse & New York',
    tagline: 'Slow perfumery hand-compounded with raw, soulful botanicals.'
  },
  {
    id: 'jomalone',
    name: 'Jo Malone London',
    origin: 'London, UK',
    tagline: 'Bespoke British elegance crafted for effortless scent pairing.'
  },
  {
    id: 'tomford',
    name: 'Tom Ford Private Blend',
    origin: 'New York & Milan',
    tagline: 'Sensual, provocative compositions of rare woods and warm resins.'
  }
];

const SCENT_FAMILIES = [
  'Floral',
  'Sweet / Gourmand',
  'Fresh / Citrus',
  'Woody',
  'Oriental / Spicy'
];

const PERFUMES = [
  {
    id: 'delina-exclusif',
    name: 'Delina La Rosée',
    brand: 'Parfums de Marly',
    category: 'Women',
    scentFamily: 'Floral',
    rating: 4.9,
    reviews: 342,
    bestSeller: true,
    featured: true,
    concentration: 'Eau de Parfum',
    bottleTint: '#F2D7DC',
    accentTint: '#D89BA7',
    capStyle: 'silver-dome',
    basePrices: { '30ml': 165, '50ml': 235, '100ml': 345 },
    description:
      'A luminous veil of Turkish rose petals kissed by morning dew, crisp lychee, and transparent white woods. Effortlessly romantic and radiantly modern.',
    notes: {
      top: ['Lychee', 'Pear', 'Italian Bergamot'],
      heart: ['Turkish Damask Rose', 'Peony', 'Watery Accord'],
      base: ['White Musk', 'Haitian Vetiver', 'Soft Cedar']
    }
  },
  {
    id: 'baccarat-rouge',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    category: 'Unisex',
    scentFamily: 'Sweet / Gourmand',
    rating: 5.0,
    reviews: 618,
    bestSeller: true,
    featured: true,
    concentration: 'Extrait de Parfum',
    bottleTint: '#E9C9B6',
    accentTint: '#B97B56',
    capStyle: 'gold-square',
    basePrices: { '30ml': 210, '50ml': 325, '100ml': 465 },
    description:
      'Luminous and intense, this crystalline alchemy lays amber, floral, and spun-sugar woody breezes upon the skin like a poetic signature.',
    notes: {
      top: ['Grandiflorum Jasmine', 'Saffron'],
      heart: ['Amberwood', 'Ambergris'],
      base: ['Fir Resin', 'Atlas Cedar']
    }
  },
  {
    id: 'santal-33',
    name: 'Santal 33',
    brand: 'Le Labo',
    category: 'Unisex',
    scentFamily: 'Woody',
    rating: 4.8,
    reviews: 495,
    bestSeller: true,
    featured: false,
    concentration: 'Eau de Parfum',
    bottleTint: '#EAE3D5',
    accentTint: '#9C8A6E',
    capStyle: 'silver-cylinder',
    basePrices: { '30ml': 155, '50ml': 230, '100ml': 320 },
    description:
      'An intoxicating open fire in the American West: creamy Australian sandalwood, smoky papyrus, and spiced cardamom wrapped in supple leather.',
    notes: {
      top: ['Cardamom', 'Violet Accord'],
      heart: ['Iris', 'Papyrus', 'Ambrox'],
      base: ['Australian Sandalwood', 'Virginia Cedar', 'Leather']
    }
  },
  {
    id: 'oud-wood',
    name: 'Oud Wood Reserve',
    brand: 'Tom Ford Private Blend',
    category: 'Men',
    scentFamily: 'Woody',
    rating: 4.9,
    reviews: 412,
    bestSeller: true,
    featured: true,
    concentration: 'Eau de Parfum',
    bottleTint: '#D3C7BC',
    accentTint: '#594A3E',
    capStyle: 'obsidian-pillar',
    basePrices: { '30ml': 185, '50ml': 285, '100ml': 395 },
    description:
      'Rare, exotic, and distinctive. Smoky agarwood is tempered by exotic rosewood, warm cardamom, and sensual tonka bean.',
    notes: {
      top: ['Rosewood', 'Cardamom', 'Chinese Pepper'],
      heart: ['Smoky Oud', 'Sandalwood', 'Vetiver'],
      base: ['Tonka Bean', 'Vanilla', 'Warm Amber']
    }
  },
  {
    id: 'bal-dafrique',
    name: "Bal d'Afrique",
    brand: 'Byredo',
    category: 'Unisex',
    scentFamily: 'Fresh / Citrus',
    rating: 4.8,
    reviews: 289,
    bestSeller: false,
    featured: true,
    concentration: 'Eau de Parfum',
    bottleTint: '#EFE9DB',
    accentTint: '#C5A880',
    capStyle: 'noir-dome',
    basePrices: { '30ml': 150, '50ml': 215, '100ml': 295 },
    description:
      'A warm and romantic vetiver inspired by 1920s Paris and African culture—bursting with neroli, African marigold, and Moroccan cedarwood.',
    notes: {
      top: ['Amalfi Lemon', 'Bergamot', 'African Marigold'],
      heart: ['Violet', 'Jasmine Petals', 'Cyclamen'],
      base: ['Black Amber', 'Moroccan Cedarwood', 'Vetiver']
    }
  },
  {
    id: 'vanille-fatale',
    name: 'Velvet Vanilla & Honey',
    brand: 'Maison Francis Kurkdjian',
    category: 'Women',
    scentFamily: 'Sweet / Gourmand',
    rating: 4.9,
    reviews: 274,
    bestSeller: true,
    featured: false,
    concentration: 'Eau de Parfum',
    bottleTint: '#F5E4C8',
    accentTint: '#ffe7f7',
    capStyle: 'gold-square',
    basePrices: { '30ml': 175, '50ml': 250, '100ml': 350 },
    description:
      'Whipped Madagascar vanilla bourbon drizzled with wildflower honey and roasted almond over a cashmere musk embrace.',
    notes: {
      top: ['Roasted Almond', 'Mandarin Zest'],
      heart: ['Orange Blossom', 'Wildflower Honey', 'Heliotrope'],
      base: ['Madagascar Vanilla', 'Benzoin', 'Cashmere Musk']
    }
  },
  {
    id: 'english-pear',
    name: 'English Pear & Freesia',
    brand: 'Jo Malone London',
    category: 'Women',
    scentFamily: 'Fresh / Citrus',
    rating: 4.7,
    reviews: 360,
    bestSeller: false,
    featured: true,
    concentration: 'Cologne Intense',
    bottleTint: '#E5ECE2',
    accentTint: '#8FA387',
    capStyle: 'silver-dome',
    basePrices: { '30ml': 115, '50ml': 165, '100ml': 225 },
    description:
      'The crisp sensuous freshness of just-ripe pears wrapped in a bouquet of white freesias, mellowed by amber, patchouli, and woods.',
    notes: {
      top: ['King William Pear', 'Cantaloupe'],
      heart: ['White Freesia', 'Wild Rose'],
      base: ['Patchouli', 'Sheer Amber', 'White Musk']
    }
  },
  {
    id: 'layton-royal',
    name: 'Layton Exclusif',
    brand: 'Parfums de Marly',
    category: 'Men',
    scentFamily: 'Oriental / Spicy',
    rating: 4.9,
    reviews: 398,
    bestSeller: true,
    featured: false,
    concentration: 'Eau de Parfum',
    bottleTint: '#D8DDE6',
    accentTint: '#4A5D75',
    capStyle: 'silver-dome',
    basePrices: { '30ml': 180, '50ml': 260, '100ml': 365 },
    description:
      'Seductive and aristocratic. Crisp apple and bergamot meet caramelized vanilla, Ceylon cinnamon, and deep guaiac wood.',
    notes: {
      top: ['Crisp Apple', 'Bergamot', 'Lavender'],
      heart: ['Geranium', 'Jasmine', 'Violet'],
      base: ['Vanilla', 'Ceylon Cinnamon', 'Guaiac Wood', 'Cardamom']
    }
  },
  {
    id: 'blanche-muse',
    name: 'Blanche Absolu',
    brand: 'Byredo',
    category: 'Women',
    scentFamily: 'Fresh / Citrus',
    rating: 4.8,
    reviews: 215,
    bestSeller: false,
    featured: false,
    concentration: 'Eau de Parfum',
    bottleTint: '#F2F0EC',
    accentTint: '#A9A29A',
    capStyle: 'noir-dome',
    basePrices: { '30ml': 150, '50ml': 215, '100ml': 295 },
    description:
      'An exploration of pure white linen and clean skin. Aldehydic rose, pink pepper, and neroli settle into a serene sandalwood and musk cloud.',
    notes: {
      top: ['White Rose', 'Pink Pepper', 'Aldehydes'],
      heart: ['Violet', 'Neroli', 'Peony'],
      base: ['Blonde Woods', 'Sandalwood', 'Skin Musk']
    }
  },
  {
    id: 'rose-31',
    name: 'Rose 31',
    brand: 'Le Labo',
    category: 'Women',
    scentFamily: 'Oriental / Spicy',
    rating: 4.8,
    reviews: 248,
    bestSeller: false,
    featured: false,
    concentration: 'Eau de Parfum',
    bottleTint: '#EBD6D0',
    accentTint: '#A66E63',
    capStyle: 'silver-cylinder',
    basePrices: { '30ml': 160, '50ml': 235, '100ml': 325 },
    description:
      'Centifolia rose stripped of predictability—spiced with warm cumin, olibanum, cedar, and a touch of smoky guaiac wood.',
    notes: {
      top: ['Grasse Centifolia Rose', 'Cumin'],
      heart: ['Vetiver', 'Atlas Cedar'],
      base: ['Olibanum', 'Labdanum', 'Guaiac Wood']
    }
  },
  {
    id: 'neroli-portofino',
    name: 'Neroli Portofino',
    brand: 'Tom Ford Private Blend',
    category: 'Men',
    scentFamily: 'Fresh / Citrus',
    rating: 4.7,
    reviews: 310,
    bestSeller: false,
    featured: false,
    concentration: 'Eau de Parfum',
    bottleTint: '#D7EAE8',
    accentTint: '#4F8F8B',
    capStyle: 'obsidian-pillar',
    basePrices: { '30ml': 180, '50ml': 275, '100ml': 385 },
    description:
      'Vibrant, sparkling, and transportive. Captures the cool coastal breezes, sparkling water, and lush foliage of the Italian Riviera.',
    notes: {
      top: ['Tunisian Neroli', 'Sicilian Lemon', 'Mandarin'],
      heart: ['Orange Blossom', 'Lavender', 'Rosemary'],
      base: ['Amber', 'Ambrette Seed', 'Angelica']
    }
  },
  {
    id: 'wood-sage',
    name: 'Wood Sage & Sea Salt',
    brand: 'Jo Malone London',
    category: 'Men',
    scentFamily: 'Woody',
    rating: 4.8,
    reviews: 430,
    bestSeller: false,
    featured: false,
    concentration: 'Cologne',
    bottleTint: '#E4E2DC',
    accentTint: '#8C877D',
    capStyle: 'silver-dome',
    basePrices: { '30ml': 110, '50ml': 160, '100ml': 220 },
    description:
      'Windswept cliffs, crashing white waves, and mineral sea air mingled with the woody earthiness of coastal sage.',
    notes: {
      top: ['Ambrette Seeds', 'Sea Salt'],
      heart: ['Mineral Driftwood', 'Red Algae'],
      base: ['Clary Sage', 'Guaiac Wood']
    }
  },
  {
    id: 'peony-blush',
    name: 'Peony & Blush Suede',
    brand: 'Jo Malone London',
    category: 'Women',
    scentFamily: 'Floral',
    rating: 4.9,
    reviews: 295,
    bestSeller: false,
    featured: false,
    concentration: 'Cologne',
    bottleTint: '#F4DFDF',
    accentTint: '#C98A8E',
    capStyle: 'silver-dome',
    basePrices: { '30ml': 115, '50ml': 165, '100ml': 225 },
    description:
      'Voluptuous peonies in fragile bloom, flirtatious with the juicy bite of red apple and the opulence of jasmine, rose, and supple blush suede.',
    notes: {
      top: ['Red Apple', 'Bergamot'],
      heart: ['Pink Peony', 'Jasmine', 'Carnation'],
      base: ['Blush Suede', 'Soft Amber']
    }
  },
  {
    id: 'tobacco-vanille',
    name: 'Tobacco Vanille',
    brand: 'Tom Ford Private Blend',
    category: 'Unisex',
    scentFamily: 'Oriental / Spicy',
    rating: 5.0,
    reviews: 540,
    bestSeller: true,
    featured: false,
    concentration: 'Eau de Parfum',
    bottleTint: '#DFCFC0',
    accentTint: '#7A5438',
    capStyle: 'obsidian-pillar',
    basePrices: { '30ml': 195, '50ml': 295, '100ml': 410 },
    description:
      'Opulent, warm, and iconic. Creamy tonka bean, vanilla, cocoa, and dry fruit accords elevate aromatic tobacco leaf into pure luxury.',
    notes: {
      top: ['Tobacco Leaf', 'Aromatic Spices'],
      heart: ['Vanilla Bean', 'Cocoa', 'Tonka Bean'],
      base: ['Dried Fruits', 'Sweet Wood Sap']
    }
  }
];

// ============================================================================
// 2. BESPOKE SVG LUXURY PERFUME BOTTLE ARTWORK COMPONENT
// ============================================================================

const PerfumeBottleArt = ({ perfume, size = 'md', className = '' }) => {
  const dimensions = {
    sm: { w: 110, h: 145 },
    md: { w: 170, h: 225 },
    lg: { w: 270, h: 350 },
    hero: { w: 320, h: 420 }
  }[size] || { w: 170, h: 225 };

  const uid = `${perfume.id}-${size}`;

  return (
    <svg
      width={dimensions.w}
      height={dimensions.h}
      viewBox="0 0 240 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none drop-shadow-[0_18px_28px_rgba(30,27,24,0.12)] transition-transform duration-500 ${className}`}
    >
      <defs>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
          <stop offset="45%" stopColor={perfume.bottleTint} stopOpacity="0.78" />
          <stop offset="100%" stopColor={perfume.accentTint} stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={perfume.bottleTint} stopOpacity="0.92" />
          <stop offset="100%" stopColor={perfume.accentTint} stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="1" y2="0">
          {perfume.capStyle === 'noir-dome' || perfume.capStyle === 'obsidian-pillar' ? (
            <>
              <stop offset="0%" stopColor="#1E1B18" />
              <stop offset="40%" stopColor="#3B3530" />
              <stop offset="100%" stopColor="#141210" />
            </>
          ) : perfume.capStyle === 'gold-square' ? (
            <>
              <stop offset="0%" stopColor="#B89664" />
              <stop offset="45%" stopColor="#E6CFA8" />
              <stop offset="100%" stopColor="#9E7C4B" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#C9C5BE" />
              <stop offset="45%" stopColor="#F5F3EF" />
              <stop offset="100%" stopColor="#A6A199" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="120" cy="292" rx="68" ry="8" fill="#1E1B18" fillOpacity="0.09" />

      {/* Atomizer Collar */}
      <rect x="102" y="72" width="36" height="16" rx="2" fill={`url(#cap-${uid})`} />
      <rect x="100" y="86" width="40" height="4" rx="1" fill="#C5A880" fillOpacity="0.6" />

      {/* Cap Variations */}
      {perfume.capStyle === 'noir-dome' || perfume.capStyle === 'silver-dome' ? (
        <path
          d="M94 52C94 34 105 24 120 24C135 24 146 34 146 52V72H94V52Z"
          fill={`url(#cap-${uid})`}
        />
      ) : perfume.capStyle === 'obsidian-pillar' ? (
        <g>
          <rect x="92" y="24" width="56" height="48" rx="3" fill={`url(#cap-${uid})`} />
          <line x1="102" y1="24" x2="102" y2="72" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.5" />
          <line x1="138" y1="24" x2="138" y2="72" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.5" />
        </g>
      ) : (
        <rect x="96" y="26" width="48" height="46" rx="4" fill={`url(#cap-${uid})`} />
      )}

      {/* Outer Heavy Glass Flacon */}
      <rect
        x="48"
        y="90"
        width="144"
        height="194"
        rx="18"
        fill={`url(#glass-${uid})`}
        stroke="#FFFFFF"
        strokeOpacity="0.85"
        strokeWidth="2"
      />

      {/* Inner Perfume Liquid Chamber */}
      <rect
        x="58"
        y="104"
        width="124"
        height="164"
        rx="12"
        fill={`url(#liquid-${uid})`}
      />

      {/* Dip Tube */}
      <path
        d="M120 90V262C120 266 124 268 128 268"
        stroke="#FFFFFF"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Glass Edge Specular Highlights */}
      <rect x="54" y="102" width="5" height="168" rx="2.5" fill="#FFFFFF" fillOpacity="0.55" />
      <rect x="181" y="108" width="3" height="156" rx="1.5" fill="#FFFFFF" fillOpacity="0.3" />

      {/* Couture Editorial Label */}
      <rect
        x="70"
        y="132"
        width="100"
        height="112"
        rx="3"
        fill="#FAF8F5"
        fillOpacity="0.95"
        stroke="#C5A880"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <rect
        x="74"
        y="136"
        width="92"
        height="104"
        rx="1.5"
        stroke="#1E1B18"
        strokeOpacity="0.14"
        strokeWidth="0.7"
      />

      {/* Label Typography */}
      <text
        x="120"
        y="153"
        textAnchor="middle"
        fill="#8E7552"
        fontSize="6.5"
        fontWeight="600"
        letterSpacing="2.2"
        fontFamily="sans-serif"
      >
        L&apos;ATELIER
      </text>

      <line x1="96" y1="160" x2="144" y2="160" stroke="#C5A880" strokeOpacity="0.5" strokeWidth="0.7" />

      <text
        x="120"
        y="181"
        textAnchor="middle"
        fill="#1E1B18"
        fontSize="10.5"
        fontWeight="600"
        fontFamily="Georgia, serif"
      >
        {perfume.name.length > 16 ? perfume.name.slice(0, 15) + '…' : perfume.name}
      </text>

      <text
        x="120"
        y="197"
        textAnchor="middle"
        fill="#5C5349"
        fontSize="6.8"
        letterSpacing="0.8"
        fontFamily="sans-serif"
      >
        {perfume.brand.toUpperCase().slice(0, 20)}
      </text>

      <text
        x="120"
        y="222"
        textAnchor="middle"
        fill="#8E7552"
        fontSize="6.2"
        letterSpacing="1.6"
        fontFamily="sans-serif"
      >
        {perfume.concentration.toUpperCase()}
      </text>

      <text
        x="120"
        y="233"
        textAnchor="middle"
        fill="#1E1B18"
        fillOpacity="0.55"
        fontSize="5.8"
        letterSpacing="1.4"
        fontFamily="sans-serif"
      >
        PARIS • GRASSE
      </text>
    </svg>
  );
};

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================

export default function LuxuryBoutique() {
  // Navigation & Page State: 'home' | 'shop' | 'product' | 'checkout' | 'contact' | 'auth'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(PERFUMES[0].id);

  // User Auth State
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Drawers & Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Cart & Wishlist State
  const [cart, setCart] = useState([
    { perfumeId: 'delina-exclusif', size: '50ml', quantity: 1 },
    { perfumeId: 'baccarat-rouge', size: '30ml', quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState(['delina-exclusif', 'santal-33', 'vanille-fatale']);

  // Shop Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All'); // 'All' | 'Women' | 'Men' | 'Unisex'
  const [selectedScentFamilies, setSelectedScentFamilies] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('All'); // 'All' | '30ml' | '50ml' | '100ml'
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Product Detail State
  const [detailSize, setDetailSize] = useState('50ml');
  const [detailQty, setDetailQty] = useState(1);

  // Checkout State
  const [orderCompleted, setOrderCompleted] = useState(null);

  // Helper: Show subtle luxury notification toast
  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedPerfumeId]);

  // Navigation helpers
  const navigateToShop = ({ category = 'All', brand = null, scent = null } = {}) => {
    setSelectedCategory(category);
    setSelectedBrands(brand ? [brand] : []);
    setSelectedScentFamilies(scent ? [scent] : []);
    setSelectedSizeFilter('All');
    setMaxPrice(500);
    setSearchQuery('');
    setCurrentPage('shop');
    setMobileMenuOpen(false);
  };

  const openProductDetail = (perfumeId) => {
    setSelectedPerfumeId(perfumeId);
    setDetailSize('50ml');
    setDetailQty(1);
    setCurrentPage('product');
    setSearchModalOpen(false);
    setMobileMenuOpen(false);
  };

  // Cart Actions
  const addToCart = (perfumeId, size = '50ml', quantity = 1) => {
    const perfume = PERFUMES.find((p) => p.id === perfumeId);
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.perfumeId === perfumeId && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { perfumeId, size, quantity }];
    });
    triggerToast(`Added ${perfume?.name} (${size}) to your bag`);
  };

  const updateCartQty = (perfumeId, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.perfumeId === perfumeId && item.size === size
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (perfumeId, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.perfumeId === perfumeId && item.size === size))
    );
  };

  // Wishlist Actions
  const toggleWishlist = (perfumeId) => {
    const perfume = PERFUMES.find((p) => p.id === perfumeId);
    setWishlist((prev) => {
      const exists = prev.includes(perfumeId);
      if (exists) {
        triggerToast(`Removed ${perfume?.name} from wishlist`);
        return prev.filter((id) => id !== perfumeId);
      } else {
        triggerToast(`Saved ${perfume?.name} to wishlist`);
        return [...prev, perfumeId];
      }
    });
  };

  // Computed Cart Totals
  const cartItemsDetailed = useMemo(() => {
    return cart
      .map((item) => {
        const perfume = PERFUMES.find((p) => p.id === item.perfumeId);
        if (!perfume) return null;
        const unitPrice = perfume.basePrices[item.size] || perfume.basePrices['50ml'];
        return {
          ...item,
          perfume,
          unitPrice,
          lineTotal: unitPrice * item.quantity
        };
      })
      .filter(Boolean);
  }, [cart]);

  const cartCount = useMemo(
    () => cartItemsDetailed.reduce((sum, item) => sum + item.quantity, 0),
    [cartItemsDetailed]
  );

  const cartSubtotal = useMemo(
    () => cartItemsDetailed.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItemsDetailed]
  );

  // Filtered & Sorted Perfumes for Shop Page
  const filteredPerfumes = useMemo(() => {
    return PERFUMES.filter((perfume) => {
      // 1. Search filter (name, brand, notes, scentFamily)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const allNotes = [
          ...perfume.notes.top,
          ...perfume.notes.heart,
          ...perfume.notes.base
        ]
          .join(' ')
          .toLowerCase();
        const matchesSearch =
          perfume.name.toLowerCase().includes(q) ||
          perfume.brand.toLowerCase().includes(q) ||
          perfume.scentFamily.toLowerCase().includes(q) ||
          allNotes.includes(q);
        if (!matchesSearch) return false;
      }

      // 2. Category / Gender filter
      if (selectedCategory !== 'All' && perfume.category !== selectedCategory) {
        return false;
      }

      // 3. Scent Family filter (active when Women or All selected, or whenever scent pills chosen)
      if (selectedScentFamilies.length > 0) {
        if (!selectedScentFamilies.includes(perfume.scentFamily)) {
          return false;
        }
      }

      // 4. Brand filter
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(perfume.brand)) {
          return false;
        }
      }

      // 5. Bottle Size availability & Price check
      const checkSize = selectedSizeFilter === 'All' ? '50ml' : selectedSizeFilter;
      if (!perfume.basePrices[checkSize]) return false;
      const priceToCompare = perfume.basePrices[checkSize];
      if (priceToCompare > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      const sizeKey = selectedSizeFilter === 'All' ? '50ml' : selectedSizeFilter;
      if (sortBy === 'price-asc') return a.basePrices[sizeKey] - b.basePrices[sizeKey];
      if (sortBy === 'price-desc') return b.basePrices[sizeKey] - a.basePrices[sizeKey];
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedScentFamilies,
    selectedBrands,
    selectedSizeFilter,
    maxPrice,
    sortBy
  ]);

  const activePerfume = useMemo(
    () => PERFUMES.find((p) => p.id === selectedPerfumeId) || PERFUMES[0],
    [selectedPerfumeId]
  );

  const relatedPerfumes = useMemo(() => {
    return PERFUMES.filter(
      (p) =>
        p.id !== activePerfume.id &&
        (p.category === activePerfume.category || p.scentFamily === activePerfume.scentFamily)
    ).slice(0, 4);
  }, [activePerfume]);

  // ============================================================================
  // 4. SUB-COMPONENTS & PAGE VIEWS
  // ============================================================================

  const ProductCard = ({ perfume, displaySize = '50ml' }) => {
    const isWishlisted = wishlist.includes(perfume.id);
    const activeSize = displaySize === 'All' ? '50ml' : displaySize;
    const price = perfume.basePrices[activeSize];

    return (
      <div className="group relative flex flex-col rounded-2xl bg-[#FFFFFF]/80 border border-[#E6DFD5] p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(30,27,24,0.10)] hover:border-[#C5A880]/60">
        {/* Top Badges & Wishlist Button */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium bg-[#F3EFEA] text-[#5C5349]">
              {perfume.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium bg-[#FAF3E8] text-[#9A7B4F] border border-[#C5A880]/25">
              {perfume.scentFamily.split(' ')[0]}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(perfume.id);
            }}
            aria-label="Toggle Wishlist"
            className={`p-2 rounded-full transition-all duration-300 ${
              isWishlisted
                ? 'bg-[#F8EAEB] text-[#B85D68]'
                : 'bg-[#FAF8F5] text-[#7A7067] hover:text-[#1E1B18] hover:bg-[#EFECE6]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottle Visual Stage */}
        <div
          onClick={() => openProductDetail(perfume.id)}
          className="relative my-3 py-4 flex items-center justify-center rounded-xl bg-gradient-to-b from-[#FAF8F5] to-[#F2ECE3]/60 cursor-pointer overflow-hidden"
        >
          <div
            className="absolute w-32 h-32 rounded-full blur-2xl opacity-45 transition-opacity duration-500 group-hover:opacity-75"
            style={{ backgroundColor: perfume.bottleTint }}
          />
          <PerfumeBottleArt
            perfume={perfume}
            size="md"
            className="group-hover:scale-105"
          />
          <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[#5C5349] border border-[#E6DFD5]">
            {activeSize}
          </span>
        </div>

        {/* Metadata */}
        <div className="flex-1 flex flex-col justify-between pt-1">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#8E7552] font-medium">
              {perfume.brand}
            </p>
            <h3
              onClick={() => openProductDetail(perfume.id)}
              className="mt-1 font-serif text-lg font-medium text-[#1E1B18] cursor-pointer hover:text-[#8E7552] transition-colors"
            >
              {perfume.name}
            </h3>
            <p className="mt-1.5 text-xs text-[#6E655C] line-clamp-2 leading-relaxed">
              {perfume.notes.top[0]} • {perfume.notes.heart[0]} • {perfume.notes.base[0]}
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#EFECE6] flex items-center justify-between gap-2">
            <div>
              <span className="font-serif text-xl font-semibold text-[#1E1B18]">
                ${price}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#7A7067]">
                <Star className="w-3 h-3 fill-[#C5A880] text-[#C5A880]" />
                <span>{perfume.rating}</span>
                <span>({perfume.reviews})</span>
              </div>
            </div>

            <button
              onClick={() => addToCart(perfume.id, activeSize, 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase hover:bg-[#8E7552] transition-colors duration-300 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // PAGE 1: HOME PAGE (EDITORIAL & IMMERSIVE)
  // --------------------------------------------------------------------------
  const renderHomePage = () => {
    const bestSellers = PERFUMES.filter((p) => p.bestSeller).slice(0, 4);
    const heroPerfume = PERFUMES[0]; // Delina La Rosée

    return (
      <div className="space-y-24 pb-24">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
          {/* Ambient Organic Glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-[#EAD9C3]/45 blur-3xl" />
          <div className="pointer-events-none absolute top-40 -left-32 w-[380px] h-[380px] rounded-full bg-[#EED9DC]/40 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Copy Left */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3ECE1] border border-[#C5A880]/40 text-[#8E7552] text-xs uppercase tracking-[0.22em] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Haute Parfumerie Collection 2026</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[64px] leading-[1.08] tracking-tight text-[#1E1B18]">
                Where Rare Botanicals Become{' '}
                <span className="italic font-normal text-[#8E7552]">Invisible Couture.</span>
              </h1>

              <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-[#5C5349] leading-relaxed font-light">
                Discover curated extrait and eau de parfum creations from the world&apos;s most
                revered fragrance houses. Macerated in small batches to linger like a second skin.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigateToShop({ category: 'All' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8E7552] transition-all duration-300 shadow-lg shadow-[#1E1B18]/10"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/80 border border-[#D8CFC2] text-[#1E1B18] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#8E7552] hover:bg-[#F5EFE6] transition-all duration-300"
                >
                  <span>Contact us</span>
                </button>
              </div>

              {/* Trust Pillars */}
              <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 border-t border-[#E6DFD5]">
                <div>
                  <p className="font-serif text-2xl text-[#1E1B18]">100%</p>
                  <p className="text-[11px] uppercase tracking-wider text-[#7A7067]">
                    Authentic Houses
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-[#1E1B18]">90 Days</p>
                  <p className="text-[11px] uppercase tracking-wider text-[#7A7067]">
                    Slow Maceration
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-[#1E1B18]">2 Samples</p>
                  <p className="text-[11px] uppercase tracking-wider text-[#7A7067]">
                    With Every Order
                  </p>
                </div>
              </div>
            </div>

            {/* Sculptural Flacon Showcase Right */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[36px] bg-gradient-to-b  via-[#EFE6D8] to-[#E6D9C6] border border-[#DFD3C3] p-8 flex flex-col items-center justify-center shadow-[9px_5px_6px_#0000005e]">
                {/* Decorative Arch Frame */}
                <div className="absolute inset-5 rounded-[28px] border border-white/70 pointer-events-none" />

                <PerfumeBottleArt
                  perfume={heroPerfume}
                  size="hero"
                  className="hover:scale-105 cursor-pointer"
                />

                {/* Floating Glassmorphic Olfactory Note Card */}
                <div
                  onClick={() => openProductDetail(heroPerfume.id)}
                  className="cursor-pointer absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E6DFD5] p-4 shadow-lg flex items-center justify-between gap-3 hover:border-[#C5A880] transition-colors"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E7552] font-semibold">
                      Featured Creation
                    </span>
                    <h3 className="font-serif text-base text-[#1E1B18]">
                      {heroPerfume.name} — {heroPerfume.brand}
                    </h3>
                    <p className="text-xs text-[#6E655C]">
                      Turkish Damask Rose • Lychee • White Musk
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1E1B18] text-[#FAF8F5] flex items-center justify-center shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 OLFACTORY CATEGORIES: WOMEN, MEN, UNISEX */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#8E7552] font-medium">
                Curated Wardrobes
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#1E1B18]">
                Explore by Fragrance Persona
              </h2>
            </div>
            <p className="text-sm text-[#6E655C] max-w-md">
              Select a collection tailored to your sensibility—from luminous florals to smoky
              woods and boundary-defying unisex elixirs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                category: 'Women',
                subtitle: 'Pour Femme',
                title: 'Feminine Elixirs',
                desc: 'Velvety Damascus roses, spun gourmand vanilla, and sunlit white petals.',
                bg: 'from-[#F7ECEE] to-[#EED9DD]',
                accent: '#B57B84',
                samplePerfume: PERFUMES[0],
                count: PERFUMES.filter((p) => p.category === 'Women').length
              },
              {
                category: 'Men',
                subtitle: 'Pour Homme',
                title: 'Masculine Signatures',
                desc: 'Aged agarwood, spiced Ceylon cinnamon, coastal sage, and crisp bergamot.',
                bg: 'from-[#EAECEF] to-[#D8DEE6]',
                accent: '#56677D',
                samplePerfume: PERFUMES[3],
                count: PERFUMES.filter((p) => p.category === 'Men').length
              },
              {
                category: 'Unisex',
                subtitle: 'Sans Frontières',
                title: 'Shared Alchemy',
                desc: 'Crystalline ambergris, creamy sandalwood, and warm tobacco leaf.',
                bg: 'from-[#F3ECE1] to-[#E5D7C3]',
                accent: '#9A7B4F',
                samplePerfume: PERFUMES[1],
                count: PERFUMES.filter((p) => p.category === 'Unisex').length
              }
            ].map((item) => (
              <div
                key={item.category}
                onClick={() => navigateToShop({ category: item.category })}
                className={`group relative rounded-3xl bg-gradient-to-br ${item.bg} border border-[#E2D9CC] p-7 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#6E655C] font-medium">
                      {item.subtitle} • {item.count} Scents
                    </span>
                    <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl text-[#1E1B18]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1E1B18] group-hover:bg-[#1E1B18] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <p className="mt-3 text-sm text-[#5C5349] leading-relaxed max-w-[240px]">
                  {item.desc}
                </p>

                <div className="mt-6 flex items-end justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#1E1B18] border-b border-[#1E1B18]/40 pb-1 group-hover:border-[#1E1B18]">
                    Shop {item.category}
                  </span>
                  <div className="-mb-6 -mr-2 transform group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-500">
                    <PerfumeBottleArt perfume={item.samplePerfume} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED BRANDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-[#F3EFE8] border border-[#E4DDD2] p-8 sm:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[#8E7552] font-medium">
                The Fragrance Houses
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#1E1B18]">
                Featured Haute Maisons
              </h2>
              <p className="mt-2 text-sm text-[#6E655C]">
                Select an iconic perfumery house to explore their complete olfactory archive.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => navigateToShop({ brand: brand.name })}
                  className="group text-left p-6 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] hover:border-[#C5A880] hover:bg-white transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E7552]">
                        {brand.origin}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#8E7552] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <h3 className="mt-2 font-serif text-xl text-[#1E1B18] group-hover:text-[#8E7552] transition-colors">
                      {brand.name}
                    </h3>
                    <p className="mt-2 text-xs text-[#6E655C] leading-relaxed">
                      {brand.tagline}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#8E7552] font-medium">
                Most Coveted
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#1E1B18]">
                Atelier Best Sellers
              </h2>
            </div>
            <button
              onClick={() => navigateToShop({ category: 'All' })}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#1E1B18] hover:text-[#8E7552] transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((perfume) => (
              <ProductCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        </section>

        {/* BESPOKE ATELIER STORYTELLING BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-[#1E1B18] text-[#FAF8F5] p-8 sm:p-14 lg:p-16 relative overflow-hidden">
            <div className="pointer-events-none absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-block px-3.5 py-1 rounded-full border border-[#C5A880]/40 text-[#C5A880] text-[11px] uppercase tracking-[0.22em]">
                  The Art of Maceration
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                  Unsure Which Scent Speaks to Your Soul?
                </h2>
                <p className="text-sm sm:text-base text-[#D3CBC0] leading-relaxed max-w-xl font-light">
                  Filter our collection by olfactory family—whether you gravitate toward luminous
                  Damask florals, spun-sugar gourmands, crisp Mediterranean citrus, or deep
                  resinous woods.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  {SCENT_FAMILIES.map((family) => (
                    <button
                      key={family}
                      onClick={() => navigateToShop({ scent: family })}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#C5A880] hover:text-[#1E1B18] text-xs tracking-wider transition-colors"
                    >
                      {family}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <Droplets className="w-6 h-6 text-[#C5A880]" />
                  <h4 className="font-serif text-lg">Pure Essential Oils</h4>
                  <p className="text-xs text-[#B8AFA4] leading-relaxed">
                    High concentration extrait &amp; parfum formulations with 12+ hour sillage.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
                  <h4 className="font-serif text-lg">Sealed Authenticity</h4>
                  <p className="text-xs text-[#B8AFA4] leading-relaxed">
                    Batch-verified flacons sourced directly from authorized European maisons.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <Truck className="w-6 h-6 text-[#C5A880]" />
                  <h4 className="font-serif text-lg">Climate Delivery</h4>
                  <p className="text-xs text-[#B8AFA4] leading-relaxed">
                    Temperature-protected courier delivery with complimentary gift wrapping.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <Award className="w-6 h-6 text-[#C5A880]" />
                  <h4 className="font-serif text-lg">Private Concierge</h4>
                  <p className="text-xs text-[#B8AFA4] leading-relaxed">
                    Need bespoke layering advice? Our fragrance specialists are ready to assist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // PAGE 2: SHOP PAGE (SEARCH + SMART DYNAMIC FILTERS)
  // --------------------------------------------------------------------------
  const renderShopPage = () => {
    const toggleBrandFilter = (brandName) => {
      setSelectedBrands((prev) =>
        prev.includes(brandName)
          ? prev.filter((b) => b !== brandName)
          : [...prev, brandName]
      );
    };

    const toggleScentFilter = (family) => {
      setSelectedScentFamilies((prev) =>
        prev.includes(family)
          ? prev.filter((f) => f !== family)
          : [...prev, family]
      );
    };

    const clearAllFilters = () => {
      setSearchQuery('');
      setSelectedCategory('All');
      setSelectedScentFamilies([]);
      setSelectedBrands([]);
      setSelectedSizeFilter('All');
      setMaxPrice(500);
      setSortBy('featured');
    };

    const hasActiveFilters =
      searchQuery !== '' ||
      selectedCategory !== 'All' ||
      selectedScentFamilies.length > 0 ||
      selectedBrands.length > 0 ||
      selectedSizeFilter !== 'All' ||
      maxPrice < 500;

    // Show Scent Family filter prominently when Women is selected (as requested), or when All/any family is active
    const showScentFamilyFilter =
      selectedCategory === 'Women' ||
      selectedCategory === 'All' ||
      selectedScentFamilies.length > 0;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 pb-24">
        {/* Shop Header */}
        <div className="border-b border-[#E6DFD5] pb-8 mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#8E7552] font-medium">
            The Fragrance Archive
          </p>
          <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1B18]">
              {selectedCategory === 'All'
                ? 'All Haute Fragrances'
                : `${selectedCategory}'s Collection`}
            </h1>
            <p className="text-sm text-[#6E655C]">
              Showing <span className="font-semibold text-[#1E1B18]">{filteredPerfumes.length}</span>{' '}
              curated creations
            </p>
          </div>

          {/* Search & Quick Category Bar */}
          <div className="mt-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 text-[#8E7552] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by perfume name, brand, or notes (e.g. Rose, Oud, Vanilla)..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-[#DFD7CC] text-sm text-[#1E1B18] placeholder-[#9A9086] focus:outline-none focus:border-[#8E7552] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A7067] hover:text-[#1E1B18]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Quick Pills + Sort */}
            <div className="flex flex-wrap items-center gap-2.5">
              {['All', 'Women', 'Men', 'Unisex'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (cat !== 'Women' && cat !== 'All') {
                      setSelectedScentFamilies([]);
                    }
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-sm'
                      : 'bg-white border border-[#E2D9CC] text-[#5C5349] hover:border-[#8E7552]'
                  }`}
                >
                  {cat}
                </button>
              ))}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort fragrances"
                className="px-4 py-2.5 rounded-full bg-white border border-[#E2D9CC] text-xs font-medium text-[#1E1B18] focus:outline-none focus:border-[#8E7552]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F3ECE1] text-[#1E1B18] text-xs font-medium"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Dedicated Women's Scent Family Quick Banner when Women is selected */}
          {selectedCategory === 'Women' && (
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F8ECEE] to-[#F5EFE6] border border-[#E5CED3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E5B66] font-semibold">
                  Feminine Olfactory Filter
                </span>
                <h3 className="font-serif text-lg text-[#1E1B18]">
                  Filter Women&apos;s Perfumes by Scent Family
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {SCENT_FAMILIES.map((family) => {
                  const active = selectedScentFamilies.includes(family);
                  return (
                    <button
                      key={family}
                      onClick={() => toggleScentFilter(family)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        active
                          ? 'bg-[#9E5B66] text-white shadow-sm'
                          : 'bg-white/90 text-[#5C5349] border border-[#DFD2D4] hover:border-[#9E5B66]'
                      }`}
                    >
                      {family}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Main Grid: Filter Sidebar + Product Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FILTER SIDEBAR */}
          <aside
            className={`lg:col-span-3 space-y-6 rounded-2xl bg-white/80 border border-[#E6DFD5] p-6 ${
              mobileFiltersOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
              <h2 className="font-serif text-lg text-[#1E1B18] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8E7552]" />
                <span>Refine Selection</span>
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#8E7552] hover:underline font-medium"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* 1. Gender / Category */}
            <div className="space-y-2.5">
              <h3 className="text-xs uppercase tracking-[0.18em] text-[#7A7067] font-semibold">
                Category
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['All', 'Women', 'Men', 'Unisex'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                        : 'bg-[#FAF8F5] text-[#5C5349] border-[#E6DFD5] hover:border-[#C5A880]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Conditional Scent Family Filter (Highlighted for Women / All) */}
            {showScentFamilyFilter && (
              <div className="space-y-2.5 pt-2 border-t border-[#EFECE6]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.18em] text-[#8E7552] font-semibold">
                    Scent Family
                  </h3>
                  {selectedCategory === 'Women' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F8ECEE] text-[#9E5B66] font-medium">
                      For Her
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {SCENT_FAMILIES.map((family) => {
                    const checked = selectedScentFamilies.includes(family);
                    return (
                      <label
                        key={family}
                        className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-[#FAF8F5] cursor-pointer text-sm text-[#3D3630]"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleScentFilter(family)}
                          className="rounded border-[#C5A880] text-[#8E7552] focus:ring-[#8E7552]"
                        />
                        <span>{family}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Bottle Size */}
            <div className="space-y-2.5 pt-2 border-t border-[#EFECE6]">
              <h3 className="text-xs uppercase tracking-[0.18em] text-[#7A7067] font-semibold">
                Bottle Size
              </h3>
              <div className="grid grid-cols-4 gap-1.5">
                {['All', '30ml', '50ml', '100ml'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSizeFilter(sz)}
                    className={`py-2 rounded-xl text-xs font-medium border transition-colors ${
                      selectedSizeFilter === sz
                        ? 'bg-[#8E7552] text-white border-[#8E7552]'
                        : 'bg-[#FAF8F5] text-[#5C5349] border-[#E6DFD5] hover:border-[#8E7552]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Price Range Slider */}
            <div className="space-y-2.5 pt-2 border-t border-[#EFECE6]">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-[0.18em] text-[#7A7067] font-semibold">
                  Max Price ({selectedSizeFilter === 'All' ? '50ml' : selectedSizeFilter})
                </h3>
                <span className="font-serif text-sm font-semibold text-[#1E1B18]">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8E7552] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8A8077]">
                <span>$100</span>
                <span>$500+</span>
              </div>
            </div>

            {/* 5. Luxury Brands */}
            <div className="space-y-2.5 pt-2 border-t border-[#EFECE6]">
              <h3 className="text-xs uppercase tracking-[0.18em] text-[#7A7067] font-semibold">
                Fragrance House
              </h3>
              <div className="space-y-1.5">
                {BRANDS.map((b) => {
                  const checked = selectedBrands.includes(b.name);
                  return (
                    <label
                      key={b.id}
                      className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-[#FAF8F5] cursor-pointer text-xs text-[#3D3630]"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleBrandFilter(b.name)}
                        className="rounded border-[#C5A880] text-[#8E7552] focus:ring-[#8E7552]"
                      />
                      <span className="truncate">{b.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID RESULTS */}
          <div className="lg:col-span-9">
            {filteredPerfumes.length === 0 ? (
              <div className="rounded-3xl bg-white/80 border border-[#E6DFD5] p-14 text-center space-y-4">
                <Sparkles className="w-10 h-10 text-[#C5A880] mx-auto" />
                <h3 className="font-serif text-2xl text-[#1E1B18]">
                  No Fragrances Match Your Criteria
                </h3>
                <p className="text-sm text-[#6E655C] max-w-md mx-auto">
                  Try widening your price range, clearing selected brands, or exploring another
                  scent family.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 rounded-full bg-[#1E1B18] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#8E7552] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPerfumes.map((perfume) => (
                  <ProductCard
                    key={perfume.id}
                    perfume={perfume}
                    displaySize={selectedSizeFilter}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // PAGE 3: PRODUCT DETAILS PAGE (FULL SENSORY BREAKDOWN & RELATED PRODUCTS)
  // --------------------------------------------------------------------------
  const renderProductDetailPage = () => {
    const isWishlisted = wishlist.includes(activePerfume.id);
    const currentPrice = activePerfume.basePrices[detailSize] || activePerfume.basePrices['50ml'];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 pb-24 space-y-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7A7067]">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#1E1B18]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigateToShop({ category: activePerfume.category })}
            className="hover:text-[#1E1B18]"
          >
            {activePerfume.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1E1B18] font-medium">{activePerfume.name}</span>
        </nav>

        {/* Product Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Flacon Gallery */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] bg-gradient-to-b from-[#F5EFE6] to-[#EAE0D2] border border-[#E2D8CA] p-10 sm:p-16 flex flex-col items-center justify-center min-h-[460px]">
              <div
                className="absolute w-64 h-64 rounded-full blur-3xl opacity-55"
                style={{ backgroundColor: activePerfume.bottleTint }}
              />
              <PerfumeBottleArt perfume={activePerfume} size="lg" />
              <div className="mt-6 flex items-center gap-3 text-xs text-[#6E655C] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E6DFD5]">
                <span>{activePerfume.concentration}</span>
                <span>•</span>
                <span>Natural Spray Vaporisateur</span>
              </div>
            </div>
          </div>

          {/* Right Sensory & Purchase Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-semibold bg-[#1E1B18] text-[#FAF8F5]">
                {activePerfume.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-semibold bg-[#F3ECE1] text-[#8E7552] border border-[#C5A880]/40">
                {activePerfume.scentFamily}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#5C5349] ml-auto">
                <Star className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                <span className="font-semibold text-[#1E1B18]">{activePerfume.rating}</span>
                <span>({activePerfume.reviews} verified reviews)</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => navigateToShop({ brand: activePerfume.brand })}
                className="text-xs uppercase tracking-[0.22em] text-[#8E7552] font-semibold hover:underline"
              >
                {activePerfume.brand}
              </button>
              <h1 className="mt-1.5 font-serif text-4xl sm:text-5xl text-[#1E1B18]">
                {activePerfume.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E1B18]">
                ${currentPrice}
              </span>
              <span className="text-xs text-[#7A7067]">
                Tax included • Complimentary 2ml discovery vials
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#5C5349] leading-relaxed">
              {activePerfume.description}
            </p>

            {/* OLFACTORY PYRAMID / MAIN ESSENTIAL OILS */}
            <div className="rounded-2xl bg-white/90 border border-[#E6DFD5] p-5 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#8E7552] font-semibold flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                <span>Main Essential Oils &amp; Olfactory Pyramid</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFECE6]">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E7552] font-semibold block">
                    Top Notes
                  </span>
                  <p className="mt-1 text-xs font-medium text-[#1E1B18] leading-relaxed">
                    {activePerfume.notes.top.join(', ')}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFECE6]">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E7552] font-semibold block">
                    Heart Notes
                  </span>
                  <p className="mt-1 text-xs font-medium text-[#1E1B18] leading-relaxed">
                    {activePerfume.notes.heart.join(', ')}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFECE6]">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E7552] font-semibold block">
                    Base Notes
                  </span>
                  <p className="mt-1 text-xs font-medium text-[#1E1B18] leading-relaxed">
                    {activePerfume.notes.base.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* BOTTLE SIZE SELECTOR */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-[#5C5349] font-semibold">
                  Select Volume
                </span>
                <span className="text-xs text-[#8E7552]">In Stock &amp; Ready to Ship</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(activePerfume.basePrices).map(([sizeKey, sizePrice]) => (
                  <button
                    key={sizeKey}
                    onClick={() => setDetailSize(sizeKey)}
                    className={`py-3 px-4 rounded-2xl border text-center transition-all ${
                      detailSize === sizeKey
                        ? 'bg-[#1E1B18] text-white border-[#1E1B18] shadow-md'
                        : 'bg-white text-[#1E1B18] border-[#DFD7CC] hover:border-[#8E7552]'
                    }`}
                  >
                    <span className="block text-sm font-semibold">{sizeKey}</span>
                    <span
                      className={`block text-xs mt-0.5 ${
                        detailSize === sizeKey ? 'text-[#C5A880]' : 'text-[#7A7067]'
                      }`}
                    >
                      ${sizePrice}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY + ADD TO CART + WISHLIST */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity Stepper */}
              <div className="inline-flex items-center justify-between sm:justify-center rounded-full bg-white border border-[#DFD7CC] px-4 py-3">
                <button
                  onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
                  className="p-1 text-[#5C5349] hover:text-[#1E1B18]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[#1E1B18]">
                  {detailQty}
                </span>
                <button
                  onClick={() => setDetailQty((q) => q + 1)}
                  className="p-1 text-[#5C5349] hover:text-[#1E1B18]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => addToCart(activePerfume.id, detailSize, detailQty)}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#8E7552] transition-colors shadow-lg shadow-[#1E1B18]/10"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag — ${currentPrice * detailQty}</span>
              </button>

              {/* Wishlist Heart Button */}
              <button
                onClick={() => toggleWishlist(activePerfume.id)}
                className={`inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full border text-xs uppercase tracking-wider font-medium transition-colors ${
                  isWishlisted
                    ? 'bg-[#F8EAEB] border-[#DFB2B8] text-[#B85D68]'
                    : 'bg-white border-[#DFD7CC] text-[#1E1B18] hover:border-[#8E7552]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span className="sm:hidden lg:inline">
                  {isWishlisted ? 'Saved' : 'Wishlist'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        <section className="pt-12 border-t border-[#E6DFD5]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#8E7552] font-medium">
                Olfactory Harmony
              </p>
              <h2 className="mt-1 font-serif text-3xl text-[#1E1B18]">
                Related Fragrances You May Adore
              </h2>
            </div>
            <button
              onClick={() => navigateToShop({ category: activePerfume.category })}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#1E1B18] hover:text-[#8E7552]"
            >
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPerfumes.map((item) => (
              <ProductCard key={item.id} perfume={item} />
            ))}
          </div>
        </section>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // PAGE 4: CHECKOUT & DELIVERY PAGE (VISA, VODAFONE CASH, CASH ON DELIVERY)
  // --------------------------------------------------------------------------
  const CheckoutPage = () => {
    const [deliveryInfo, setDeliveryInfo] = useState({
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      city: 'Cairo',
      address: '',
      notes: '',
      shippingMethod: 'standard' // 'standard' | 'express'
    });

    const [paymentMethod, setPaymentMethod] = useState('visa'); // 'visa' | 'vodafone' | 'cod'
    const [visaDetails, setVisaDetails] = useState({
      cardName: user?.name || '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
    const [vodafoneNumber, setVodafoneNumber] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [formError, setFormError] = useState('');

    const shippingFee = deliveryInfo.shippingMethod === 'express' ? 25 : 0;
    const discountAmount = discountApplied ? Math.round(cartSubtotal * 0.1) : 0;
    const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

    const handleApplyPromo = (e) => {
      e.preventDefault();
      if (promoCode.trim().toUpperCase() === 'ATELIER10') {
        setDiscountApplied(true);
        triggerToast('Promo code ATELIER10 applied (10% off)');
      } else {
        triggerToast('Try promo code: ATELIER10');
      }
    };

    const handlePlaceOrder = (e) => {
      e.preventDefault();
      if (cartItemsDetailed.length === 0) {
        setFormError('Your shopping bag is currently empty.');
        return;
      }
      if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.address) {
        setFormError('Please complete your full name, phone number, and delivery address.');
        return;
      }
      if (paymentMethod === 'visa' && (!visaDetails.cardNumber || !visaDetails.expiry || !visaDetails.cvv)) {
        setFormError('Please enter complete Visa card details.');
        return;
      }
      if (paymentMethod === 'vodafone' && vodafoneNumber.trim().length < 10) {
        setFormError('Please enter a valid 11-digit Vodafone Cash mobile wallet number.');
        return;
      }

      setFormError('');
      const orderSummary = {
        orderId: 'ATL-' + Math.floor(100000 + Math.random() * 900000),
        customer: deliveryInfo,
        paymentMethod,
        items: cartItemsDetailed,
        total: grandTotal,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      setOrderCompleted(orderSummary);
      setCart([]);
    };

    if (orderCompleted) {
      return (
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-16 pb-24">
          <div className="rounded-3xl bg-white border border-[#E6DFD5] p-8 sm:p-12 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#EEF5EE] text-[#3D7A47] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#8E7552] font-semibold">
                Order Confirmed • {orderCompleted.orderId}
              </span>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-[#1E1B18]">
                Thank You, {orderCompleted.customer.fullName}
              </h1>
              <p className="mt-2 text-sm text-[#6E655C]">
                Your bespoke fragrance parcel is being prepared in our climate-controlled atelier
                for delivery to <strong className="text-[#1E1B18]">{orderCompleted.customer.city}</strong>.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] p-5 text-left space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#7A7067]">Payment Method:</span>
                <span className="font-semibold text-[#1E1B18] uppercase">
                  {orderCompleted.paymentMethod === 'visa'
                    ? 'Visa / Credit Card'
                    : orderCompleted.paymentMethod === 'vodafone'
                    ? 'Vodafone Cash Wallet'
                    : 'Cash on Delivery'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7067]">Delivery Address:</span>
                <span className="font-medium text-[#1E1B18] text-right max-w-[240px]">
                  {orderCompleted.customer.address}, {orderCompleted.customer.city}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7067]">Contact Phone:</span>
                <span className="font-medium text-[#1E1B18]">{orderCompleted.customer.phone}</span>
              </div>
              <div className="pt-2 border-t border-[#E6DFD5] flex justify-between text-sm">
                <span className="font-serif text-[#1E1B18]">Total Paid / Due:</span>
                <span className="font-serif font-bold text-[#1E1B18]">${orderCompleted.total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderCompleted(null);
                setCurrentPage('home');
              }}
              className="px-8 py-4 rounded-full bg-[#1E1B18] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#8E7552] transition-colors"
            >
              Return to Boutique
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 pb-24">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8E7552] font-medium">
            Private Dispatch
          </p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[#1E1B18]">
            Delivery &amp; Payment Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Delivery Details + Payment Method */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Delivery Details */}
            <div className="rounded-3xl bg-white border border-[#E6DFD5] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-[#EFECE6]">
                <span className="w-7 h-7 rounded-full bg-[#1E1B18] text-white text-xs flex items-center justify-center font-semibold">
                  1
                </span>
                <h2 className="font-serif text-2xl text-[#1E1B18]">Customer &amp; Delivery Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryInfo.fullName}
                    onChange={(e) =>
                      setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })
                    }
                    placeholder="e.g. Nour El-Din"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={deliveryInfo.phone}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                    placeholder="010 XXXX XXXX"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={deliveryInfo.email}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                    placeholder="client@atelierparfum.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                    City / Governorate *
                  </label>
                  <select
                    value={deliveryInfo.city}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                  >
                    <option value="Cairo">Cairo</option>
                    <option value="Giza">Giza</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Mansoura">Mansoura</option>
                    <option value="Tanta">Tanta</option>
                    <option value="Hurghada">Hurghada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                  Detailed Street Address &amp; Apartment *
                </label>
                <input
                  type="text"
                  required
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  placeholder="Street name, building number, floor, apartment..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                  Courier &amp; Gift Wrapping Notes (Optional)
                </label>
                <textarea
                  rows="2"
                  value={deliveryInfo.notes}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                  placeholder="Include a handwritten gift card or preferred delivery time..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                />
              </div>

              {/* Delivery Speed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setDeliveryInfo({ ...deliveryInfo, shippingMethod: 'standard' })
                  }
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryInfo.shippingMethod === 'standard'
                      ? 'border-[#1E1B18] bg-[#FAF8F5]'
                      : 'border-[#E6DFD5] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                      Standard Courier
                    </span>
                    <span className="text-xs font-semibold text-[#8E7552]">FREE</span>
                  </div>
                  <p className="text-xs text-[#7A7067] mt-1">2–3 business days</p>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDeliveryInfo({ ...deliveryInfo, shippingMethod: 'express' })
                  }
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryInfo.shippingMethod === 'express'
                      ? 'border-[#1E1B18] bg-[#FAF8F5]'
                      : 'border-[#E6DFD5] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                      Same-Day White Glove
                    </span>
                    <span className="text-xs font-semibold text-[#1E1B18]">$25</span>
                  </div>
                  <p className="text-xs text-[#7A7067] mt-1">Priority climate-controlled dispatch</p>
                </button>
              </div>
            </div>

            {/* Step 2: Payment Method (Visa, Vodafone Cash, Cash on Delivery) */}
            <div className="rounded-3xl bg-white border border-[#E6DFD5] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-[#EFECE6]">
                <span className="w-7 h-7 rounded-full bg-[#1E1B18] text-white text-xs flex items-center justify-center font-semibold">
                  2
                </span>
                <h2 className="font-serif text-2xl text-[#1E1B18]">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'visa',
                    label: 'Visa / Card',
                    sub: 'Instant & Encrypted',
                    icon: CreditCard
                  },
                  {
                    id: 'vodafone',
                    label: 'Vodafone Cash',
                    sub: 'Mobile Wallet',
                    icon: Smartphone
                  },
                  {
                    id: 'cod',
                    label: 'Cash on Delivery',
                    sub: 'Pay Upon Arrival',
                    icon: Banknote
                  }
                ].map((method) => {
                  const Icon = method.icon;
                  const active = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                        active
                          ? 'border-[#1E1B18] bg-[#1E1B18] text-[#FAF8F5] shadow-md'
                          : 'border-[#E2D9CC] bg-[#FAF8F5] text-[#1E1B18] hover:border-[#8E7552]'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${active ? 'text-[#C5A880]' : 'text-[#8E7552]'}`}
                      />
                      <div>
                        <span className="block text-sm font-semibold">{method.label}</span>
                        <span
                          className={`block text-[11px] ${
                            active ? 'text-[#CFC7BC]' : 'text-[#7A7067]'
                          }`}
                        >
                          {method.sub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Conditional Payment Fields */}
              {paymentMethod === 'visa' && (
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#8E7552] font-semibold">
                      Visa / Mastercard Details
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[#1E1B18] text-[#C5A880] text-[10px] font-bold tracking-widest">
                      VISA
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs text-[#5C5349] mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={visaDetails.cardName}
                      onChange={(e) =>
                        setVisaDetails({ ...visaDetails, cardName: e.target.value })
                      }
                      placeholder="Name on card"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD7CC] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5C5349] mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength="19"
                      value={visaDetails.cardNumber}
                      onChange={(e) =>
                        setVisaDetails({ ...visaDetails, cardNumber: e.target.value })
                      }
                      placeholder="4532 •••• •••• 8890"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD7CC] text-sm font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#5C5349] mb-1">Expiry Date</label>
                      <input
                        type="text"
                        maxLength="5"
                        value={visaDetails.expiry}
                        onChange={(e) =>
                          setVisaDetails({ ...visaDetails, expiry: e.target.value })
                        }
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD7CC] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#5C5349] mb-1">Security CVV</label>
                      <input
                        type="password"
                        maxLength="4"
                        value={visaDetails.cvv}
                        onChange={(e) =>
                          setVisaDetails({ ...visaDetails, cvv: e.target.value })
                        }
                        placeholder="•••"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFD7CC] text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'vodafone' && (
                <div className="p-5 rounded-2xl bg-[#FDF6F6] border border-[#EBCBCB] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#B83B3B] font-semibold">
                      Vodafone Cash Instant Wallet
                    </span>
                    <Smartphone className="w-4 h-4 text-[#B83B3B]" />
                  </div>
                  <p className="text-xs text-[#5C5349] leading-relaxed">
                    Enter your Vodafone Cash wallet number below. You will receive an instant USSD
                    confirmation prompt to authorize <strong className="text-[#1E1B18]">${grandTotal}</strong>.
                  </p>
                  <div>
                    <label className="block text-xs text-[#5C5349] mb-1">
                      Vodafone Cash Mobile Number
                    </label>
                    <input
                      type="tel"
                      maxLength="11"
                      value={vodafoneNumber}
                      onChange={(e) => setVodafoneNumber(e.target.value)}
                      placeholder="010 XXXX XXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFC2C2] text-sm font-mono"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] flex items-start gap-3">
                  <Banknote className="w-5 h-5 text-[#8E7552] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#5C5349] leading-relaxed">
                    <p className="font-semibold text-[#1E1B18] mb-1">
                      Cash on Delivery Selected
                    </p>
                    Please have <strong className="text-[#1E1B18]">${grandTotal}</strong> ready in
                    cash upon arrival of our courier. Inspection of outer sealed packaging is
                    welcomed prior to payment.
                  </div>
                </div>
              )}

              {formError && (
                <p className="text-xs text-[#B84A4A] bg-[#FBEFEF] border border-[#E8C5C5] px-4 py-3 rounded-xl">
                  {formError}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-white border border-[#E6DFD5] p-6 sm:p-8 space-y-6">
              <h2 className="font-serif text-2xl text-[#1E1B18] pb-3 border-b border-[#EFECE6]">
                Order Summary ({cartCount})
              </h2>

              {cartItemsDetailed.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <p className="text-sm text-[#7A7067]">Your shopping bag is empty.</p>
                  <button
                    type="button"
                    onClick={() => navigateToShop()}
                    className="px-5 py-2.5 rounded-full bg-[#1E1B18] text-white text-xs uppercase tracking-wider"
                  >
                    Browse Perfumes
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {cartItemsDetailed.map((item) => (
                    <div
                      key={`${item.perfumeId}-${item.size}`}
                      className="flex items-center gap-3.5 pb-3 border-b border-[#F3EFEA]"
                    >
                      <div className="w-14 h-16 rounded-xl bg-[#FAF8F5] flex items-center justify-center shrink-0">
                        <PerfumeBottleArt perfume={item.perfume} size="sm" className="w-10 h-14" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm text-[#1E1B18] truncate">
                          {item.perfume.name}
                        </h4>
                        <p className="text-xs text-[#7A7067]">
                          {item.size} • Qty {item.quantity}
                        </p>
                      </div>
                      <span className="font-serif text-sm font-semibold text-[#1E1B18]">
                        ${item.lineTotal}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (try ATELIER10)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-xs"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 rounded-xl bg-[#F3ECE1] text-[#1E1B18] text-xs font-semibold hover:bg-[#C5A880] transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-2.5 pt-2 border-t border-[#EFECE6] text-sm">
                <div className="flex justify-between text-[#6E655C]">
                  <span>Subtotal</span>
                  <span>${cartSubtotal}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#3D7A47]">
                    <span>Atelier Privilege (10%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6E655C]">
                  <span>Delivery</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#E6DFD5] font-serif text-xl font-semibold text-[#1E1B18]">
                  <span>Total</span>
                  <span>${grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={cartItemsDetailed.length === 0}
                className="w-full py-4 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#8E7552] disabled:opacity-40 transition-colors shadow-lg"
              >
                Complete Order • ${grandTotal}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // PAGE 5: CONTACT US PAGE (ATELIER CONCIERGE)
  // --------------------------------------------------------------------------
  const ContactUsPage = () => {
    const [contactForm, setContactForm] = useState({
      name: user?.name || '',
      email: user?.email || '',
      subject: 'Bespoke Fragrance Consultation',
      message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      triggerToast('Your message has been received by our Fragrance Concierge');
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 pb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.24em] text-[#8E7552] font-medium">
            Private Concierge
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-[#1E1B18]">
            Visit or Write to Our Atelier
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#6E655C]">
            Whether you seek personalized scent pairing, bespoke gifting, or order assistance, our
            perfume specialists are delighted to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Boutique Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl bg-[#F3EFE8] border border-[#E4DDD2] p-7 space-y-6">
              <h2 className="font-serif text-2xl text-[#1E1B18]">Flagship Salon</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#8E7552] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1B18]">Boutique Address</p>
                    <p className="text-[#6E655C]">
                      24 Rue Saint-Honoré, Zamalek Pavilion, Cairo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#8E7552] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1B18]">Salon Hours</p>
                    <p className="text-[#6E655C]">Daily: 11:00 AM – 11:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#8E7552] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1B18]">Private Line</p>
                    <p className="text-[#6E655C]">+20 100 884 2910</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#8E7552] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1E1B18]">Concierge Email</p>
                    <p className="text-[#6E655C]">concierge@latelierparfum.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-[#E6DFD5] p-8 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#EEF5EE] text-[#3D7A47] flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1E1B18]">
                    Merci, {contactForm.name}
                  </h3>
                  <p className="text-sm text-[#6E655C] max-w-md mx-auto">
                    A dedicated fragrance specialist will respond to{' '}
                    <strong>{contactForm.email}</strong> within 2 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setContactForm({ ...contactForm, message: '' });
                    }}
                    className="px-6 py-3 rounded-full bg-[#1E1B18] text-white text-xs uppercase tracking-widest"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-serif text-2xl text-[#1E1B18]">Send a Private Note</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, name: e.target.value })
                        }
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                    >
                      <option>Bespoke Fragrance Consultation</option>
                      <option>Order &amp; Delivery Assistance</option>
                      <option>Corporate &amp; Bridal Gifting</option>
                      <option>Brand &amp; Press Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, message: e.target.value })
                      }
                      placeholder="Tell us about the notes or mood you are searching for..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full bg-[#1E1B18] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#8E7552] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // PAGE 6: LOGIN & REGISTER PAGE
  // --------------------------------------------------------------------------
  const AuthPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleAuthSubmit = (e) => {
      e.preventDefault();
      const displayName =
        authMode === 'register' && name.trim()
          ? name.trim()
          : email.split('@')[0] || 'Valued Guest';

      setUser({
        name: displayName,
        email: email || 'member@latelierparfum.com'
      });
      triggerToast(
        authMode === 'login'
          ? `Welcome back, ${displayName}`
          : `Welcome to L'Atelier Private Circle, ${displayName}`
      );
      setCurrentPage('home');
    };

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] overflow-hidden bg-white border border-[#E6DFD5] shadow-xl">
          {/* Editorial Left Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#F4EDE3] to-[#E6D8C4] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#8E7552] font-semibold">
                L&apos;Atelier Private Circle
              </span>
              <h2 className="mt-3 font-serif text-3xl text-[#1E1B18] leading-snug">
                Curate Your Personal Scent Wardrobe.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#5C5349] leading-relaxed">
                Members enjoy saved wishlists across devices, early access to limited extrait
                editions, and complimentary discovery samples.
              </p>
            </div>

            <div className="my-6 flex justify-center">
              <PerfumeBottleArt perfume={PERFUMES[1]} size="md" />
            </div>

            <p className="text-[11px] text-[#7A7067] italic">
              &ldquo;Perfume is the unseen, unforgettable, ultimate accessory.&rdquo;
            </p>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            {/* Switch Tabs */}
            <div className="flex gap-6 border-b border-[#EFECE6] mb-8">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`pb-3 text-xs uppercase tracking-[0.2em] font-semibold border-b-2 transition-colors ${
                  authMode === 'login'
                    ? 'border-[#1E1B18] text-[#1E1B18]'
                    : 'border-transparent text-[#8A8077] hover:text-[#1E1B18]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`pb-3 text-xs uppercase tracking-[0.2em] font-semibold border-b-2 transition-colors ${
                  authMode === 'register'
                    ? 'border-[#1E1B18] text-[#1E1B18]'
                    : 'border-transparent text-[#8A8077] hover:text-[#1E1B18]'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Camille Laurent"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5C5349] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DFD7CC] text-sm focus:outline-none focus:border-[#8E7552]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A7067]"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1E1B18] text-white text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#8E7552] transition-colors shadow-md"
              >
                {authMode === 'login' ? 'Sign In to Atelier' : 'Join Private Circle'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // 5. GLOBAL LAYOUT (STICKY NAVBAR, DRAWERS, FOOTER, TOAST)
  // ============================================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18] selection:bg-[#C5A880]/30">
      {/* Subtle Top Announcement Strip */}
      <div className="bg-[#1E1B18] text-[#E6DFD5] text-[11px] uppercase tracking-[0.22em] py-2 px-4 text-center">
        Complimentary Delivery &amp; Two 2ml Discovery Vials on Every Order • Code:{' '}
        <span className="text-[#C5A880] font-semibold">ATELIER10</span>
      </div>

      {/* Sticky Glassmorphic Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#E6DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1E1B18]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="text-left sm:text-center lg:text-left group"
          >
            <span className="block font-serif text-xl sm:text-2xl tracking-[0.14em] text-[#1E1B18]">
              L&apos;ATELIER
            </span>
            <span className="block text-[9px] uppercase tracking-[0.34em] text-[#8E7552] -mt-0.5">
              De Parfum
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium">
            <button
              onClick={() => setCurrentPage('home')}
              className={`transition-colors ${
                currentPage === 'home' ? 'text-[#8E7552] font-semibold' : 'text-[#3D3630] hover:text-[#8E7552]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateToShop({ category: 'All' })}
              className={`transition-colors ${
                currentPage === 'shop' && selectedCategory === 'All'
                  ? 'text-[#8E7552] font-semibold'
                  : 'text-[#3D3630] hover:text-[#8E7552]'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => navigateToShop({ category: 'Women' })}
              className={`transition-colors ${
                currentPage === 'shop' && selectedCategory === 'Women'
                  ? 'text-[#8E7552] font-semibold'
                  : 'text-[#3D3630] hover:text-[#8E7552]'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => navigateToShop({ category: 'Men' })}
              className={`transition-colors ${
                currentPage === 'shop' && selectedCategory === 'Men'
                  ? 'text-[#8E7552] font-semibold'
                  : 'text-[#3D3630] hover:text-[#8E7552]'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => navigateToShop({ category: 'Unisex' })}
              className={`transition-colors ${
                currentPage === 'shop' && selectedCategory === 'Unisex'
                  ? 'text-[#8E7552] font-semibold'
                  : 'text-[#3D3630] hover:text-[#8E7552]'
              }`}
            >
              Unisex
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`transition-colors ${
                currentPage === 'contact' ? 'text-[#8E7552] font-semibold' : 'text-[#3D3630] hover:text-[#8E7552]'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Quick Search"
              className="p-2.5 rounded-full hover:bg-[#EFECE6] text-[#1E1B18] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative p-2.5 rounded-full hover:bg-[#EFECE6] text-[#1E1B18] transition-colors"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B85D68] text-white text-[10px] flex items-center justify-center font-semibold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative p-2.5 rounded-full hover:bg-[#EFECE6] text-[#1E1B18] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1E1B18] text-[#C5A880] text-[10px] flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#E6DFD5]">
                <span className="hidden sm:inline text-xs font-medium text-[#1E1B18]">
                  {user.name}
                </span>
                <button
                  onClick={() => {
                    setUser(null);
                    triggerToast('Signed out of your account');
                  }}
                  title="Sign Out"
                  className="p-2 rounded-full hover:bg-[#EFECE6] text-[#7A7067]"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setCurrentPage('auth');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#DFD7CC] hover:border-[#8E7552] text-xs font-medium text-[#1E1B18] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#8E7552]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E6DFD5] px-6 py-5 space-y-3 text-xs uppercase tracking-[0.2em]">
            <button
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2"
            >
              Home
            </button>
            <button
              onClick={() => navigateToShop({ category: 'All' })}
              className="block w-full text-left py-2"
            >
              Shop All
            </button>
            <button
              onClick={() => navigateToShop({ category: 'Women' })}
              className="block w-full text-left py-2"
            >
              Women&apos;s Fragrances
            </button>
            <button
              onClick={() => navigateToShop({ category: 'Men' })}
              className="block w-full text-left py-2"
            >
              Men&apos;s Fragrances
            </button>
            <button
              onClick={() => navigateToShop({ category: 'Unisex' })}
              className="block w-full text-left py-2"
            >
              Unisex Elixirs
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      {/* MAIN PAGE VIEWPORT */}
      <main className="flex-1">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'shop' && renderShopPage()}
        {currentPage === 'product' && renderProductDetailPage()}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'contact' && <ContactUsPage />}
        {currentPage === 'auth' && <AuthPage />}
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="bg-[#F2ECE3] border-t border-[#E2D9CC] pt-16 pb-10 text-[#5C5349]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E2D9CC]">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl tracking-[0.14em] text-[#1E1B18]">
              L&apos;ATELIER
            </h3>
            <p className="text-xs leading-relaxed text-[#6E655C]">
              Curating the finest haute parfumerie creations from Paris, Grasse, Stockholm, and
              London. Crafted for discerning connoisseurs.
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-[#1E1B18]">
              Collections
            </h4>
            <button
              onClick={() => navigateToShop({ category: 'Women' })}
              className="block hover:text-[#8E7552]"
            >
              Women&apos;s Perfumes
            </button>
            <button
              onClick={() => navigateToShop({ category: 'Men' })}
              className="block hover:text-[#8E7552]"
            >
              Men&apos;s Colognes &amp; Ouds
            </button>
            <button
              onClick={() => navigateToShop({ category: 'Unisex' })}
              className="block hover:text-[#8E7552]"
            >
              Unisex Extraits
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-[#1E1B18]">
              Client Care
            </h4>
            <button
              onClick={() => setCurrentPage('contact')}
              className="block hover:text-[#8E7552]"
            >
              Contact Fragrance Concierge
            </button>
            <button
              onClick={() => setCurrentPage('checkout')}
              className="block hover:text-[#8E7552]"
            >
              Delivery &amp; Payment Options
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setCurrentPage('auth');
              }}
              className="block hover:text-[#8E7552]"
            >
              Join Private Circle
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-[#1E1B18]">
              Accepted Payments
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-white border border-[#DFD7CC] font-semibold text-[#1E1B18]">
                VISA
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-[#DFD7CC] font-semibold text-[#B83B3B]">
                Vodafone Cash
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-[#DFD7CC] font-semibold text-[#5C5349]">
                Cash on Delivery
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A7067] gap-2">
          <p>© 2026 L&apos;Atelier de Parfum. All rights reserved.</p>
          <p>Crafted with olfactory precision.</p>
        </div>
      </footer>

      {/* ==================================================================== */}
      {/* SLIDE-OVER SHOPPING BAG DRAWER                                       */}
      {/* ==================================================================== */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1E1B18]/45 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FAF8F5] h-full flex flex-col justify-between shadow-2xl border-l border-[#E6DFD5]">
            <div className="p-6 border-b border-[#E6DFD5] flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#1E1B18]">Your Shopping Bag</h2>
                <p className="text-xs text-[#7A7067]">{cartCount} items selected</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-[#EFECE6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItemsDetailed.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-10 h-10 text-[#C5A880]" />
                  <p className="font-serif text-xl text-[#1E1B18]">Your bag is empty</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigateToShop();
                    }}
                    className="px-6 py-3 rounded-full bg-[#1E1B18] text-white text-xs uppercase tracking-widest"
                  >
                    Explore Fragrances
                  </button>
                </div>
              ) : (
                cartItemsDetailed.map((item) => (
                  <div
                    key={`${item.perfumeId}-${item.size}`}
                    className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E6DFD5]"
                  >
                    <div className="w-16 h-20 rounded-xl bg-[#FAF8F5] flex items-center justify-center shrink-0">
                      <PerfumeBottleArt perfume={item.perfume} size="sm" className="w-12 h-16" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-[#8E7552]">
                            {item.perfume.brand}
                          </p>
                          <h4 className="font-serif text-base text-[#1E1B18]">
                            {item.perfume.name}
                          </h4>
                          <span className="text-xs text-[#7A7067]">Size: {item.size}</span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.perfumeId, item.size)}
                          className="text-[#9A9086] hover:text-[#B84A4A]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-[#E6DFD5] bg-[#FAF8F5] px-2.5 py-1">
                          <button
                            onClick={() => updateCartQty(item.perfumeId, item.size, -1)}
                            className="p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.perfumeId, item.size, 1)}
                            className="p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-serif text-base font-semibold">
                          ${item.lineTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItemsDetailed.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E6DFD5] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#7A7067]">
                    Subtotal
                  </span>
                  <span className="font-serif text-2xl font-semibold text-[#1E1B18]">
                    ${cartSubtotal}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCurrentPage('checkout');
                  }}
                  className="w-full py-4 rounded-full bg-[#1E1B18] text-white text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#8E7552] transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SLIDE-OVER WISHLIST DRAWER                                           */}
      {/* ==================================================================== */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1E1B18]/45 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FAF8F5] h-full flex flex-col justify-between shadow-2xl border-l border-[#E6DFD5]">
            <div className="p-6 border-b border-[#E6DFD5] flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#1E1B18]">Saved Wishlist</h2>
                <p className="text-xs text-[#7A7067]">{wishlist.length} curated scents</p>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-[#EFECE6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                  <Heart className="w-10 h-10 text-[#C5A880]" />
                  <p className="font-serif text-xl text-[#1E1B18]">No Saved Scents Yet</p>
                  <p className="text-xs text-[#7A7067]">
                    Tap the heart icon on any perfume to save it here.
                  </p>
                </div>
              ) : (
                wishlist.map((id) => {
                  const p = PERFUMES.find((item) => item.id === id);
                  if (!p) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E6DFD5]"
                    >
                      <div
                        onClick={() => {
                          setWishlistOpen(false);
                          openProductDetail(p.id);
                        }}
                        className="w-14 h-18 rounded-xl bg-[#FAF8F5] flex items-center justify-center cursor-pointer"
                      >
                        <PerfumeBottleArt perfume={p} size="sm" className="w-11 h-14" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#8E7552]">
                          {p.brand}
                        </p>
                        <h4
                          onClick={() => {
                            setWishlistOpen(false);
                            openProductDetail(p.id);
                          }}
                          className="font-serif text-base text-[#1E1B18] cursor-pointer hover:text-[#8E7552]"
                        >
                          {p.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#1E1B18] mt-0.5">
                          From ${p.basePrices['30ml']}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            addToCart(p.id, '50ml', 1);
                            setWishlistOpen(false);
                            setCartOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#1E1B18] text-white text-[10px] uppercase tracking-wider"
                        >
                          Add Bag
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="text-[11px] text-[#7A7067] hover:text-[#B84A4A]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* QUICK SEARCH OVERLAY MODAL                                           */}
      {/* ==================================================================== */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1E1B18]/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-[#FAF8F5] border border-[#E6DFD5] p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E6DFD5] pb-4">
              <Search className="w-5 h-5 text-[#8E7552]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fragrances, brands, or notes..."
                className="flex-1 bg-transparent text-base text-[#1E1B18] focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#EFECE6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2">
              {PERFUMES.filter(
                (p) =>
                  p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.scentFamily.toLowerCase().includes(searchQuery.toLowerCase())
              )
                .slice(0, 5)
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => openProductDetail(p.id)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <PerfumeBottleArt perfume={p} size="sm" className="w-9 h-12" />
                      <div>
                        <h4 className="font-serif text-base text-[#1E1B18]">{p.name}</h4>
                        <p className="text-xs text-[#7A7067]">
                          {p.brand} • {p.category} • {p.scentFamily}
                        </p>
                      </div>
                    </div>
                    <span className="font-serif text-sm font-semibold text-[#1E1B18]">
                      ${p.basePrices['50ml']}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTLE FLOATING TOAST FEEDBACK */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs tracking-wide shadow-2xl border border-[#C5A880]/40 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}