export const INITIAL_SITE_DATA = {
  // Master Toggle: 'coming_soon' (default as requested) or 'live'
  siteMode: 'coming_soon',
  adminPin: '1234',

  brand: {
    name: 'BAO:G',
    subtitle: 'The Dining Residence',
    fullName: 'BAO:G The Dining Residence',
    urduName: 'باؤجی',
  },

  comingSoon: {
    tag: 'Under construction',
    headline: 'Our website is coming soon.',
    text: 'BAO:G The Dining Residence is getting its website ready. Please check back soon.',
    cardTitle: 'BAO:G',
    cardSubtitle: 'THE DINING RESIDENCE',
    badgeText: 'Coming Soon',
  },

  navigation: [
    { id: 'home', label: 'Home', visible: true },
    { id: 'about', label: 'About Us', visible: true },
    { id: 'menu', label: 'Menu', visible: true },
    { id: 'gallery', label: 'Gallery', visible: true },
    { id: 'booking', label: 'Booking', visible: true },
    { id: 'franchise', label: 'Franchise', visible: true },
    { id: 'contact', label: 'Contact Us', visible: true },
    { id: 'blog', label: 'Journal', visible: false }, // Can be enabled anytime from Admin when Blog is needed
  ],

  home: {
    eyebrow: 'THE ROYAL CULINARY RESIDENCE • BRADFORD',
    heroTitle: 'A Heritage of Royal Taste & Warm Hospitality.',
    heroLead:
      'Experience unhurried fine dining where traditional South Asian recipes meet contemporary elegance in the heart of Bradford.',
    primaryCta: 'Reserve a Table',
    secondaryCta: 'Explore Menu',
    highlightsTitle: 'The BAO:G Experience',
    highlightsSubtitle: 'Crafted with restraint, served with royal warmth.',
    highlights: [
      {
        id: 'h1',
        tag: '01 • HERITAGE',
        title: 'Slow-Cooked Authenticity',
        desc: 'Hand-ground spices and time-honoured dum and charcoal techniques prepared fresh for every table.',
      },
      {
        id: 'h2',
        tag: '02 • AMBIENCE',
        title: 'The Dining Residence',
        desc: 'An intimate, uncrowded setting designed for family gatherings, executive dinners, and celebrations.',
      },
      {
        id: 'h3',
        tag: '03 • HOSPITALITY',
        title: 'Bao:G Signature Service',
        desc: 'Warm, attentive hosting inspired by classic royal dastarkhwan traditions.',
      },
    ],
    quoteText: '“True hospitality is never rushed — every dish is a quiet celebration of heritage.”',
    quoteAuthor: 'BAO:G Culinary Philosophy',
  },

  about: {
    eyebrow: 'OUR STORY',
    title: 'Welcome to BAO:G — The Dining Residence',
    lead:
      'Born from a passion for authentic regal flavours, BAO:G brings a refined, unhurried dining sanctuary to Bradford.',
    storyParagraph1:
      'At BAO:G, the name “باؤجی” represents respect, warmth, and the timeless grace of a welcoming family residence. Every detail — from our deep espresso and warm gold interiors to our curated menu — is designed so guests can savour conversations and cuisine without distraction.',
    storyParagraph2:
      'Our master chefs select prime halal cuts, locally sourced produce, and aromatic whole spices, preparing each course to order with uncompromising care.',
    pillars: [
      { id: 'p1', metric: '100%', label: 'Prime HMC Halal Ingredients' },
      { id: 'p2', metric: 'Fresh', label: 'Prepared to Order Daily' },
      { id: 'p3', metric: 'Private', label: 'Family & VIP Dining Suites' },
    ],
  },

  menuCategories: [
    'Royal Starters',
    'Signature Mains',
    'Charcoal Grills',
    'Artisan Desserts & Drinks',
  ],

  menuItems: [
    {
      id: 'm1',
      category: 'Royal Starters',
      name: 'Zafrani Malai Tikka',
      badge: "Chef's Special",
      price: '£9.50',
      desc: 'Velvety chicken supreme marinated in saffron, white pepper, and aged cream, charred over glowing embers.',
    },
    {
      id: 'm2',
      category: 'Royal Starters',
      name: 'Royal Lamb Chops (4 pcs)',
      badge: 'Signature',
      price: '£12.95',
      desc: 'Tender Yorkshire lamb cutlets infused with smoky black cardamom, ginger, and Kashmiri chilli.',
    },
    {
      id: 'm3',
      category: 'Royal Starters',
      name: 'Crispy Lotus & Tamarind Chaat',
      badge: 'Vegetarian',
      price: '£7.95',
      desc: 'Crisp lotus stem medallions tossed with roasted cumin yoghurt, pomegranate, and date-tamarind glaze.',
    },
    {
      id: 'm4',
      category: 'Signature Mains',
      name: 'BAO:G Royal Lamb Karahi',
      badge: 'House Classic',
      price: '£16.95',
      desc: 'Slow-simmered bone-in lamb in a rich heirloom tomato, crushed coriander, and fresh ginger reduction.',
    },
    {
      id: 'm5',
      category: 'Signature Mains',
      name: 'Old Delhi Butter Chicken',
      badge: 'Popular',
      price: '£14.50',
      desc: 'Chargrilled tandoori chicken simmered in a silky fenugreek, roasted tomato, andcultured butter gravy.',
    },
    {
      id: 'm6',
      category: 'Signature Mains',
      name: 'Awadhi Dum Gost Biryani',
      badge: 'Slow Cooked',
      price: '£15.95',
      desc: 'Aged basmati rice and tender spiced lamb sealed under pastry with saffron milk and fresh mint.',
    },
    {
      id: 'm7',
      category: 'Charcoal Grills',
      name: 'The Residence Mixed Grill Platter',
      badge: 'For 2–3 Guests',
      price: '£29.95',
      desc: 'An assortment of lamb chops, seekh kebabs, malai tikka, and king prawns served on a sizzling platter.',
    },
    {
      id: 'm8',
      category: 'Charcoal Grills',
      name: 'Chargrilled King Prawns',
      badge: 'Seafood',
      price: '£17.50',
      desc: 'Jumbo tiger prawns marinated in ajwain, lemon zest, and garlic butter, flame-roasted in the clay oven.',
    },
    {
      id: 'm9',
      category: 'Artisan Desserts & Drinks',
      name: 'Pistachio & Rose Shahi Tukda',
      badge: 'Dessert',
      price: '£7.50',
      desc: 'Brioche steeped in cardamom saffron rabri, finished with Iranian pistachios and edible silver leaf.',
    },
    {
      id: 'm10',
      category: 'Artisan Desserts & Drinks',
      name: 'Smoked Cardamom Kashmiri Chai',
      badge: 'Hot Beverage',
      price: '£4.50',
      desc: 'Traditional pink tea brewed with star anise and crushed almonds.',
    },
  ],

  gallery: {
    eyebrow: 'VISUAL ATMOSPHERE',
    title: 'Inside The Dining Residence',
    subtitle: 'A glimpse into our warm interiors, signature plating, and private dining spaces.',
    items: [
      {
        id: 'g1',
        title: 'The Main Dining Hall',
        category: 'Interiors',
        caption: 'Warm espresso panelling, soft ambient lighting, and uncrowded table spacing.',
        imageUrl: '',
      },
      {
        id: 'g2',
        title: 'Charcoal & Clay Oven Craft',
        category: 'Culinary',
        caption: 'Authentic live-fire grilling using prime cuts and aromatic whole spices.',
        imageUrl: '',
      },
      {
        id: 'g3',
        title: 'The Royal Private Suite',
        category: 'Private Dining',
        caption: 'Bespoke seating for family celebrations and executive gatherings.',
        imageUrl: '',
      },
      {
        id: 'g4',
        title: 'Artisan Desserts & Chai',
        category: 'Signature Finish',
        caption: 'Handcrafted sweets and traditional Kashmiri chai served in brassware.',
        imageUrl: '',
      },
    ],
  },

  booking: {
    eyebrow: 'RESERVATIONS',
    title: 'Reserve Your Table',
    subtitle:
      'We keep our dining room intentionally uncrowded. Please book ahead for evening and weekend dining.',
    note: 'For private dining suites or groups of 10+ guests, please mention your requirements in the notes.',
  },

  franchise: {
    eyebrow: 'PARTNERSHIP OPPORTUNITIES',
    title: 'Bring BAO:G to Your City',
    subtitle:
      'We are selectively partnering with experienced hospitality operators across the UK to expand The Dining Residence.',
    benefits: [
      {
        id: 'f1',
        title: 'Distinctive Royal Identity',
        desc: 'Complete brand architecture, interior design blueprints, and signature visual storytelling.',
      },
      {
        id: 'f2',
        title: 'Centralised Culinary Training',
        desc: 'Standardised spice blends, kitchen workflows, and chef training programmes.',
      },
      {
        id: 'f3',
        title: 'Dedicated Launch Support',
        desc: 'Site selection guidance, digital presence, and opening hospitality teams.',
      },
    ],
  },

  contact: {
    eyebrow: 'GET IN TOUCH',
    title: 'Visit or Contact Us',
    subtitle: 'Dummy contact details configured for preview — easily editable anytime from the Admin Panel.',
    phone: '+44 (0) 1274 000 123',
    whatsapp: '+44 7700 900123',
    email: 'reservations@baogdining-dummy.co.uk',
    address: '124 Royal Residence Parade, Bradford, West Yorkshire, BD1 1AA (Dummy Address)',
    hours: 'Mon – Thu: 5:00 PM – 11:00 PM | Fri – Sun: 1:00 PM – 11:30 PM',
    instagram: 'https://instagram.com/baogdining',
    facebook: 'https://facebook.com/baogdining',
    tiktok: 'https://tiktok.com/@baogdining',
  },

  blog: {
    eyebrow: 'CULINARY JOURNAL',
    title: 'Stories & Notes from BAO:G',
    subtitle: 'Reflections on heritage recipes, spice craft, and behind-the-scenes updates.',
    posts: [
      {
        id: 'b1',
        title: 'The Art of Slow-Cooked Dum Cuisine at BAO:G',
        category: 'Culinary Heritage',
        date: 'November 2026',
        readTime: '3 min read',
        excerpt:
          'Why patience, heavy-bottomed copper vessels, and whole hand-roasted spices make all the difference in royal dining.',
        content:
          'At BAO:G The Dining Residence, our kitchen operates on a simple belief: authentic flavour cannot be rushed. From sealing our Awadhi Biryani to simmering bone-in lamb over low heat, every dish honours centuries-old culinary craftsmanship.',
        published: true,
      },
      {
        id: 'b2',
        title: 'Designing an Uncrowded Dining Sanctuary in Bradford',
        category: 'The Residence',
        date: 'November 2026',
        readTime: '2 min read',
        excerpt:
          'How our warm espresso and champagne gold palette creates a calm, welcoming atmosphere for families.',
        content:
          'Great dining is as much about space and acoustics as it is about food. We designed BAO:G with generous spacing between tables, warm lighting, and timeless architectural details so every visit feels like returning to a royal residence.',
        published: true,
      },
    ],
  },

  customPages: [],
};
