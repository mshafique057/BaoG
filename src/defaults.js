const T = (title, body) => ({ type: 'text', title, body, image: '' });
export const defaults = {
  site: { name: 'BAO:G', tagline: 'The Dining Residence', footer: '© BAO:G – The Dining Residence' },
  contact: {
    phone: '+44 1274 000000', email: 'hello@example.com', address: '12 Example Street, Bradford, BD1 1AA',
    hours: [{ label: 'Mon – Thu', time: '12:00 – 22:00' }, { label: 'Fri – Sun', time: '12:00 – 23:00' }],
    instagram: 'https://instagram.com/example', facebook: 'https://facebook.com/example',
  },
  nav: [['Home', '/'], ['About Us', '/about'], ['Menu', '/menu'], ['Gallery', '/gallery'], ['Booking', '/booking'], ['Franchise', '/franchise'], ['Contact Us', '/contact']].map(([label, path]) => ({ label, path })),
  pages: [
    { slug: '', title: 'Home', blocks: [
      { type: 'hero', eyebrow: 'Welcome', title: 'A table set with tradition', text: 'Slow-cooked flavours, warm hospitality and a dining room that feels like home.', button: 'Book a table', link: '/booking', image: '' },
      { type: 'menu', title: 'Signature dishes', featuredOnly: true },
      { type: 'features', title: 'The BAO:G way', items: [{ title: 'Fresh daily', text: 'Prepared every day with quality ingredients.' }, { title: 'Family recipes', text: 'Traditional methods, passed down and perfected.' }, { title: 'Warm welcome', text: 'Every guest is treated like family.' }] },
      { type: 'cta', title: 'Join us this week', text: 'Reserve your table in under a minute.', button: 'Book now', link: '/booking' },
    ] },
    { slug: 'about', title: 'About Us', blocks: [T('Our story', 'BAO:G began with a simple idea: serve food the way it is served at home.\n\nReplace this text with your own story from the admin panel.')] },
    { slug: 'menu', title: 'Menu', blocks: [{ type: 'menu', title: 'Our menu', featuredOnly: false }] },
    { slug: 'gallery', title: 'Gallery', blocks: [{ type: 'gallery', title: 'Gallery' }] },
    { slug: 'booking', title: 'Booking', blocks: [{ type: 'booking', title: 'Reserve a table', body: 'Tell us when you would like to visit and we will confirm shortly.' }] },
    { slug: 'franchise', title: 'Franchise', blocks: [{ type: 'franchise', title: 'Franchise opportunities', body: 'Interested in bringing BAO:G to your city? Send us your details.', steps: [{ title: 'Enquire', text: 'Send us your details.' }, { title: 'Discuss', text: 'We talk about the concept and location.' }, { title: 'Launch', text: 'We support you through opening.' }] }] },
    { slug: 'contact', title: 'Contact Us', blocks: [{ type: 'contact', title: 'Get in touch', body: 'We would love to hear from you.' }] },
    { slug: 'blog', title: 'Blog', blocks: [{ type: 'posts', title: 'News & stories' }] },
  ],
  menu: [
    { name: 'Starters', items: [{ name: 'Seekh Kebab', desc: 'Charcoal-grilled minced lamb, mint chutney.', price: '£7.50', featured: true }, { name: 'Samosa Chaat', desc: 'Crisp pastry, chickpeas, yoghurt, tamarind.', price: '£6.00', featured: false }] },
    { name: 'Mains', items: [{ name: 'Chicken Karahi', desc: 'Tomato, ginger and green chilli, slow-cooked.', price: '£13.50', featured: true }, { name: 'Lamb Nihari', desc: 'Overnight-braised shank in a rich gravy.', price: '£15.00', featured: true }, { name: 'Vegetable Biryani', desc: 'Fragrant basmati, saffron, raita.', price: '£11.00', featured: false }] },
    { name: 'Desserts & Drinks', items: [{ name: 'Gulab Jamun', desc: 'Warm milk dumplings in rose syrup.', price: '£5.00', featured: false }, { name: 'Sweet Lassi', desc: 'Chilled yoghurt drink.', price: '£3.50', featured: false }] },
  ],
  gallery: [],
  posts: [{ slug: 'hello', title: 'Welcome to our blog', date: '2026-11-13', image: '', body: 'This is a sample post. Edit or delete it from the admin panel.' }],
  uc: { text: 'Our website is being prepared. Please check back soon.' },
};
