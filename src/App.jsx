import { useState, useEffect } from 'react';
import { INITIAL_SITE_DATA } from './defaultSiteData';

const STORAGE_KEY = 'baog_cms_site_data_v2';
const INQUIRIES_KEY = 'baog_cms_inquiries_v2';

function FloralOrnament() {
  return (
    <svg
      className="sign-flo-svg"
      width="28"
      height="28"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 2C15.5 7 15.5 11.5 18 15.5C20.5 11.5 20.5 7 18 2Z"
        fill="currentColor"
      />
      <path
        d="M18 34C15.5 29 15.5 24.5 18 20.5C20.5 24.5 20.5 29 18 34Z"
        fill="currentColor"
      />
      <path
        d="M2 18C7 15.5 11.5 15.5 15.5 18C11.5 20.5 7 20.5 2 18Z"
        fill="currentColor"
      />
      <path
        d="M34 18C29 15.5 24.5 15.5 20.5 18C24.5 20.5 29 20.5 34 18Z"
        fill="currentColor"
      />
      <circle cx="11.5" cy="11.5" r="1.6" fill="currentColor" />
      <circle cx="24.5" cy="11.5" r="1.6" fill="currentColor" />
      <circle cx="11.5" cy="24.5" r="1.6" fill="currentColor" />
      <circle cx="24.5" cy="24.5" r="1.6" fill="currentColor" />
      <circle cx="18" cy="18" r="1.8" fill="currentColor" />
    </svg>
  );
}

function ComingSoonPosterCard({ siteData }) {
  return (
    <div
      className="sign"
      role="img"
      aria-label={`${siteData.brand.fullName}, coming soon`}
    >
      <span className="sign-corner sign-corner-tl" aria-hidden="true" />
      <span className="sign-corner sign-corner-br" aria-hidden="true" />

      <img
        className="sign-logo"
        src="/logo-circle.png"
        alt="BAO:G Circular Emblem"
        width="676"
        height="735"
      />

      <div className="sign-urdu-row">
        <img
          className="sign-urdu"
          src="/urdu.png"
          alt={siteData.brand.urduName}
          width="796"
          height="236"
        />
      </div>

      <div className="sign-word">{siteData.comingSoon.cardTitle || siteData.brand.name}</div>
      <div className="sign-sub">
        {siteData.comingSoon.cardSubtitle || 'THE DINING RESIDENCE'}
      </div>

      <div className="sign-rule">
        <FloralOrnament />
      </div>

      <div className="sign-brush">
        {siteData.comingSoon.badgeText || 'Coming Soon'}
      </div>
    </div>
  );
}

export default function App() {
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_SITE_DATA, ...JSON.parse(saved) };
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_SITE_DATA;
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'sample-1',
        type: 'Booking',
        name: 'Tariq Mahmood (Sample)',
        phone: '+44 7700 900456',
        email: 'tariq.sample@example.com',
        date: '2026-11-20',
        time: '19:30',
        guests: '4 Guests',
        notes: 'Window table preferred if available.',
        createdAt: 'Sample Entry',
      },
    ];
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [selectedMenuCat, setSelectedMenuCat] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  // Admin state
  const [isAdminView, setIsAdminView] = useState(
    () => window.location.hash === '#admin' || window.location.pathname === '/admin'
  );
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [adminTab, setAdminTab] = useState('status');
  const [saveToast, setSaveToast] = useState('');
  const [previewLiveInAdmin, setPreviewLiveInAdmin] = useState(false);

  // Form states for Booking, Franchise, Contact
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '19:00',
    guests: '2 Guests',
    notes: '',
  });
  const [bookingSent, setBookingSent] = useState(false);

  const [franchiseForm, setFranchiseForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    budget: '£150k – £300k',
    experience: '',
  });
  const [franchiseSent, setFranchiseSent] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [contactSent, setContactSent] = useState(false);

  // Sync hash changes (#admin)
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Save siteData to localStorage & optional backend API
  const updateSiteData = (updater, toastMsg = 'Changes saved!') => {
    setSiteData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore quota errors
      }
      fetch('/api/site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteData: next }),
      }).catch(() => {});
      return next;
    });
    if (toastMsg) {
      setSaveToast(toastMsg);
      setTimeout(() => setSaveToast(''), 2600);
    }
  };

  const addInquiry = (entry) => {
    const newEntry = {
      ...entry,
      id: 'inq-' + Date.now(),
      createdAt: new Date().toLocaleString('en-GB'),
    };
    setInquiries((prev) => {
      const next = [newEntry, ...prev];
      try {
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      fetch('/api/site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newInquiry: newEntry }),
      }).catch(() => {});
      return next;
    });
  };

  const visibleNavItems = [
    ...(siteData.navigation || []).filter((item) => item.visible),
    ...(siteData.customPages || [])
      .filter((p) => p.visible)
      .map((p) => ({ id: p.id, label: p.title, visible: true, isCustom: true })),
  ];

  // Determine whether the visitor sees Coming Soon mode or Live Website mode
  const isComingSoonActive =
    siteData.siteMode === 'coming_soon' && !previewLiveInAdmin;

  const handleNavClick = (e, itemId) => {
    e.preventDefault();
    setActivePage(itemId);
    setSelectedPost(null);
    setMenuOpen(false);
    if (!isComingSoonActive) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // =========================================================================
  // ADMIN PANEL VIEW
  // =========================================================================
  if (isAdminView) {
    if (!adminUnlocked) {
      return (
        <div className="page admin-auth-page">
          <div className="admin-auth-card animate-fade-up">
            <img
              src="/logo-circle.png"
              alt="BAO:G"
              className="admin-auth-logo"
              width="96"
              height="104"
            />
            <h2>BAO:G Admin CMS</h2>
            <p className="admin-auth-sub">
              Enter your Admin PIN to manage website mode, pages, menu, blog, and contact details.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (pinInput === (siteData.adminPin || '1234')) {
                  setAdminUnlocked(true);
                  setPinError('');
                } else {
                  setPinError('Incorrect PIN. Default PIN is 1234.');
                }
              }}
            >
              <input
                type="password"
                className="admin-input admin-pin-input"
                placeholder="Enter PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
              />
              {pinError && <div className="admin-error">{pinError}</div>}
              <div className="admin-auth-actions">
                <button type="submit" className="btn-gold">
                  Unlock Admin Panel
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    if (window.location.hash === '#admin') window.location.hash = '';
                    setIsAdminView(false);
                  }}
                >
                  Back to Website
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    return (
      <AdminDashboard
        siteData={siteData}
        updateSiteData={updateSiteData}
        inquiries={inquiries}
        setInquiries={(next) => {
          setInquiries(next);
          localStorage.setItem(INQUIRIES_KEY, JSON.stringify(next));
        }}
        adminTab={adminTab}
        setAdminTab={setAdminTab}
        saveToast={saveToast}
        onExitAdmin={() => {
          if (window.location.hash === '#admin') window.location.hash = '';
          setIsAdminView(false);
        }}
        onPreviewLive={() => {
          setPreviewLiveInAdmin(true);
          if (window.location.hash === '#admin') window.location.hash = '';
          setIsAdminView(false);
        }}
      />
    );
  }

  // =========================================================================
  // VISITOR WEBSITE VIEW (Coming Soon Mode OR Full Live Website Mode)
  // =========================================================================
  return (
    <div className="page">
      {/* Admin Floating Bar when unlocked or previewing */}
      {(adminUnlocked || previewLiveInAdmin) && (
        <div className="admin-floating-bar">
          <div className="container admin-floating-inner">
            <div className="admin-floating-status">
              <span
                className={`status-dot ${
                  siteData.siteMode === 'live' ? 'is-live' : 'is-construction'
                }`}
              />
              <span>
                Public Status:{' '}
                <strong>
                  {siteData.siteMode === 'live'
                    ? 'LIVE WEBSITE'
                    : 'UNDER CONSTRUCTION (Coming Soon)'}
                </strong>
                {previewLiveInAdmin && siteData.siteMode === 'coming_soon'
                  ? ' • (Admin Live Preview Active)'
                  : ''}
              </span>
            </div>
            <div className="admin-floating-btns">
              <button
                type="button"
                className="admin-bar-btn"
                onClick={() =>
                  updateSiteData((prev) => ({
                    ...prev,
                    siteMode: prev.siteMode === 'live' ? 'coming_soon' : 'live',
                  }))
                }
              >
                Switch Public Site to{' '}
                {siteData.siteMode === 'live' ? 'Under Construction' : 'LIVE'}
              </button>
              {siteData.siteMode === 'coming_soon' && (
                <button
                  type="button"
                  className="admin-bar-btn"
                  onClick={() => setPreviewLiveInAdmin((v) => !v)}
                >
                  {previewLiveInAdmin
                    ? 'Show Coming Soon View'
                    : 'Preview Full Live Pages'}
                </button>
              )}
              <button
                type="button"
                className="admin-bar-btn is-primary"
                onClick={() => setIsAdminView(true)}
              >
                Open Admin Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#home"
            className="brand"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <img
              className="brand-mark"
              src="/logo-circle.png"
              alt="BAO:G Emblem"
              width="52"
              height="56"
            />
            <div>
              <div className="brand-name">{siteData.brand.name}</div>
              <div className="brand-sub">{siteData.brand.subtitle}</div>
            </div>
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <nav
            id="main-nav"
            aria-label="Main"
            className={`main-nav${menuOpen ? ' is-open' : ''}`}
          >
            {visibleNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={item.id === activePage ? 'is-active' : ''}
                aria-current={item.id === activePage ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      {isComingSoonActive ? (
        /* ---------------- UNDER CONSTRUCTION / COMING SOON VIEW ---------------- */
        <main className="container hero animate-fade-up">
          <div className="hero-text">
            <span className="tag">{siteData.comingSoon.tag}</span>
            <h1>{siteData.comingSoon.headline}</h1>
            <p>{siteData.comingSoon.text}</p>
          </div>

          <ComingSoonPosterCard siteData={siteData} />
        </main>
      ) : (
        /* ---------------- FULL LIVE LUXURY RESTAURANT WEBSITE ---------------- */
        <main className="live-main">
          {/* 1. HOME PAGE */}
          {activePage === 'home' && (
            <div className="live-page animate-fade-up" key="home">
              <section className="container hero live-hero">
                <div className="hero-text">
                  <span className="eyebrow-tag">{siteData.home.eyebrow}</span>
                  <h1>{siteData.home.heroTitle}</h1>
                  <p>{siteData.home.heroLead}</p>
                  <div className="hero-cta-row">
                    <button
                      type="button"
                      className="btn-gold"
                      onClick={(e) => handleNavClick(e, 'booking')}
                    >
                      {siteData.home.primaryCta}
                    </button>
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={(e) => handleNavClick(e, 'menu')}
                    >
                      {siteData.home.secondaryCta}
                    </button>
                  </div>
                </div>

                <div className="hero-emblem-wrap">
                  <div className="sign live-emblem-card">
                    <span className="sign-corner sign-corner-tl" aria-hidden="true" />
                    <span className="sign-corner sign-corner-br" aria-hidden="true" />
                    <img
                      className="sign-logo"
                      src="/logo-circle.png"
                      alt="BAO:G Emblem"
                      width="676"
                      height="735"
                    />
                    <div className="sign-urdu-row">
                      <img
                        className="sign-urdu"
                        src="/urdu.png"
                        alt={siteData.brand.urduName}
                        width="796"
                        height="236"
                      />
                    </div>
                    <div className="sign-word">{siteData.brand.name}</div>
                    <div className="sign-sub">THE DINING RESIDENCE</div>
                    <div className="sign-rule">
                      <FloralOrnament />
                    </div>
                    <div className="emblem-location-tag">BRADFORD • WEST YORKSHIRE</div>
                  </div>
                </div>
              </section>

              {/* Calm 3-Pillar Experience Section */}
              <section className="section-band">
                <div className="container">
                  <div className="section-head">
                    <span className="eyebrow-tag">DISTINCTION</span>
                    <h2>{siteData.home.highlightsTitle}</h2>
                    <p>{siteData.home.highlightsSubtitle}</p>
                  </div>

                  <div className="calm-grid-3">
                    {(siteData.home.highlights || []).map((h) => (
                      <article key={h.id} className="luxury-card">
                        <span className="card-index">{h.tag}</span>
                        <h3>{h.title}</h3>
                        <p>{h.desc}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              {/* Curated 4-Dish Signature Preview (Uncrowded) */}
              <section className="section-band is-alt">
                <div className="container">
                  <div className="section-head">
                    <span className="eyebrow-tag">CURATED TASTES</span>
                    <h2>Signature Selections</h2>
                    <p>A preview of our guests’ most loved dishes prepared fresh daily.</p>
                  </div>

                  <div className="menu-preview-grid">
                    {(siteData.menuItems || []).slice(0, 4).map((dish) => (
                      <div key={dish.id} className="dish-row-card">
                        <div className="dish-row-top">
                          <div>
                            <h3 className="dish-title">{dish.name}</h3>
                            {dish.badge && (
                              <span className="dish-badge">{dish.badge}</span>
                            )}
                          </div>
                          <span className="dish-price">{dish.price}</span>
                        </div>
                        <p className="dish-desc">{dish.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="section-Center-action">
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={(e) => handleNavClick(e, 'menu')}
                    >
                      View Full Dining Menu
                    </button>
                  </div>
                </div>
              </section>

              {/* Editorial Quote Banner */}
              <section className="section-band">
                <div className="container">
                  <div className="editorial-quote-box">
                    <FloralOrnament />
                    <blockquote>{siteData.home.quoteText}</blockquote>
                    <cite>— {siteData.home.quoteAuthor}</cite>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* 2. ABOUT US PAGE */}
          {activePage === 'about' && (
            <section className="container section-page animate-fade-up" key="about">
              <div className="about-split">
                <div className="about-visual-card">
                  <span className="sign-corner sign-corner-tl" aria-hidden="true" />
                  <span className="sign-corner sign-corner-br" aria-hidden="true" />
                  <img
                    src="/lockup.png"
                    alt="BAO:G Lockup"
                    className="about-lockup-img"
                  />
                  <img
                    src="/urdu.png"
                    alt={siteData.brand.urduName}
                    className="about-urdu-img"
                  />
                </div>

                <div className="about-copy">
                  <span className="eyebrow-tag">{siteData.about.eyebrow}</span>
                  <h1>{siteData.about.title}</h1>
                  <p className="lead-para">{siteData.about.lead}</p>
                  <p className="body-para">{siteData.about.storyParagraph1}</p>
                  <p className="body-para">{siteData.about.storyParagraph2}</p>

                  <div className="pillars-row">
                    {(siteData.about.pillars || []).map((p) => (
                      <div key={p.id} className="pillar-stat">
                        <div className="pillar-metric">{p.metric}</div>
                        <div className="pillar-label">{p.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 3. MENU PAGE */}
          {activePage === 'menu' && (
            <section className="container section-page animate-fade-up" key="menu">
              <div className="section-head">
                <span className="eyebrow-tag">FINE DINING MENU</span>
                <h1>The Culinary Collection</h1>
                <p>
                  Prepared fresh to order using prime halal cuts and hand-roasted whole spices.
                </p>
              </div>

              <div className="category-pills">
                {['All', ...(siteData.menuCategories || [])].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`cat-pill ${selectedMenuCat === cat ? 'is-active' : ''}`}
                    onClick={() => setSelectedMenuCat(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="menu-preview-grid">
                {(siteData.menuItems || [])
                  .filter(
                    (item) =>
                      selectedMenuCat === 'All' || item.category === selectedMenuCat
                  )
                  .map((dish) => (
                    <div key={dish.id} className="dish-row-card">
                      <div className="dish-row-top">
                        <div>
                          <span className="dish-cat-label">{dish.category}</span>
                          <h3 className="dish-title">{dish.name}</h3>
                          {dish.badge && (
                            <span className="dish-badge">{dish.badge}</span>
                          )}
                        </div>
                        <span className="dish-price">{dish.price}</span>
                      </div>
                      <p className="dish-desc">{dish.desc}</p>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* 4. GALLERY PAGE */}
          {activePage === 'gallery' && (
            <section className="container section-page animate-fade-up" key="gallery">
              <div className="section-head">
                <span className="eyebrow-tag">{siteData.gallery.eyebrow}</span>
                <h1>{siteData.gallery.title}</h1>
                <p>{siteData.gallery.subtitle}</p>
              </div>

              <div className="gallery-grid">
                {(siteData.gallery.items || []).map((item, idx) => (
                  <figure key={item.id} className="gallery-card">
                    <div className="gallery-visual">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="gallery-photo"
                        />
                      ) : (
                        <div className="gallery-placeholder">
                          <img
                            src={idx % 2 === 0 ? '/logo-circle.png' : '/mascot.png'}
                            alt=""
                            className="gallery-emblem-watermark"
                          />
                          <span className="gallery-cat-badge">{item.category}</span>
                        </div>
                      )}
                    </div>
                    <figcaption className="gallery-caption">
                      <span className="card-index">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* 5. BOOKING PAGE */}
          {activePage === 'booking' && (
            <section className="container section-page animate-fade-up" key="booking">
              <div className="form-split-layout">
                <div className="form-split-copy">
                  <span className="eyebrow-tag">{siteData.booking.eyebrow}</span>
                  <h1>{siteData.booking.title}</h1>
                  <p className="lead-para">{siteData.booking.subtitle}</p>
                  <div className="info-callout">
                    <FloralOrnament />
                    <p>{siteData.booking.note}</p>
                  </div>
                  <div className="direct-contact-mini">
                    <div>
                      <strong>Reservations Desk:</strong> {siteData.contact.phone}
                    </div>
                    <div>
                      <strong>Opening Hours:</strong> {siteData.contact.hours}
                    </div>
                  </div>
                </div>

                <div className="luxury-form-card">
                  {bookingSent ? (
                    <div className="form-success-state">
                      <FloralOrnament />
                      <h3>Reservation Request Received</h3>
                      <p>
                        Thank you, <strong>{bookingForm.name}</strong>. Our hosts will confirm your table shortly.
                      </p>
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => {
                          setBookingSent(false);
                          setBookingForm({
                            name: '',
                            phone: '',
                            email: '',
                            date: '',
                            time: '19:00',
                            guests: '2 Guests',
                            notes: '',
                          });
                        }}
                      >
                        Make Another Reservation
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addInquiry({
                          type: 'Booking',
                          ...bookingForm,
                        });
                        setBookingSent(true);
                      }}
                    >
                      <h3>Table Reservation Details</h3>
                      <div className="form-grid-2">
                        <label>
                          <span>Full Name *</span>
                          <input
                            type="text"
                            required
                            className="luxury-input"
                            placeholder="Your full name"
                            value={bookingForm.name}
                            onChange={(e) =>
                              setBookingForm({ ...bookingForm, name: e.target.value })
                            }
                          />
                        </label>
                        <label>
                          <span>Phone Number *</span>
                          <input
                            type="tel"
                            required
                            className="luxury-input"
                            placeholder="+44 7700 900000"
                            value={bookingForm.phone}
                            onChange={(e) =>
                              setBookingForm({ ...bookingForm, phone: e.target.value })
                            }
                          />
                        </label>
                      </div>

                      <div className="form-grid-3">
                        <label>
                          <span>Preferred Date *</span>
                          <input
                            type="date"
                            required
                            className="luxury-input"
                            value={bookingForm.date}
                            onChange={(e) =>
                              setBookingForm({ ...bookingForm, date: e.target.value })
                            }
                          />
                        </label>
                        <label>
                          <span>Time *</span>
                          <select
                            className="luxury-input"
                            value={bookingForm.time}
                            onChange={(e) =>
                              setBookingForm({ ...bookingForm, time: e.target.value })
                            }
                          >
                            <option>17:30</option>
                            <option>18:00</option>
                            <option>18:30</option>
                            <option>19:00</option>
                            <option>19:30</option>
                            <option>20:00</option>
                            <option>20:30</option>
                            <option>21:00</option>
                            <option>21:30</option>
                          </select>
                        </label>
                        <label>
                          <span>Guests *</span>
                          <select
                            className="luxury-input"
                            value={bookingForm.guests}
                            onChange={(e) =>
                              setBookingForm({ ...bookingForm, guests: e.target.value })
                            }
                          >
                            <option>2 Guests</option>
                            <option>3 Guests</option>
                            <option>4 Guests</option>
                            <option>5 Guests</option>
                            <option>6 Guests</option>
                            <option>8+ Guests (Family Table)</option>
                            <option>12+ Guests (Private Suite)</option>
                          </select>
                        </label>
                      </div>

                      <label>
                        <span>Email Address</span>
                        <input
                          type="email"
                          className="luxury-input"
                          placeholder="name@example.com"
                          value={bookingForm.email}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, email: e.target.value })
                          }
                        />
                      </label>

                      <label>
                        <span>Special Requests / Dietary Notes</span>
                        <textarea
                          rows="3"
                          className="luxury-input"
                          placeholder="Anniversary, high chair, private suite preference..."
                          value={bookingForm.notes}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, notes: e.target.value })
                          }
                        />
                      </label>

                      <button type="submit" className="btn-gold is-full">
                        Confirm Table Request
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* 6. FRANCHISE PAGE */}
          {activePage === 'franchise' && (
            <section className="container section-page animate-fade-up" key="franchise">
              <div className="section-head">
                <span className="eyebrow-tag">{siteData.franchise.eyebrow}</span>
                <h1>{siteData.franchise.title}</h1>
                <p>{siteData.franchise.subtitle}</p>
              </div>

              <div className="calm-grid-3 franchise-benefits">
                {(siteData.franchise.benefits || []).map((b, idx) => (
                  <article key={b.id} className="luxury-card">
                    <span className="card-index">0{idx + 1} • PARTNER PILLAR</span>
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                  </article>
                ))}
              </div>

              <div className="luxury-form-card franchise-form-wrap">
                {franchiseSent ? (
                  <div className="form-success-state">
                    <FloralOrnament />
                    <h3>Franchise Expression of Interest Received</h3>
                    <p>
                      Thank you, <strong>{franchiseForm.name}</strong>. Our franchise development director will review your profile and reach out.
                    </p>
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => setFranchiseSent(false)}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addInquiry({
                        type: 'Franchise',
                        ...franchiseForm,
                      });
                      setFranchiseSent(true);
                    }}
                  >
                    <h3>Register Franchise Interest</h3>
                    <div className="form-grid-2">
                      <label>
                        <span>Full Name *</span>
                        <input
                          type="text"
                          required
                          className="luxury-input"
                          placeholder="Your full name"
                          value={franchiseForm.name}
                          onChange={(e) =>
                            setFranchiseForm({ ...franchiseForm, name: e.target.value })
                          }
                        />
                      </label>
                      <label>
                        <span>Phone Number *</span>
                        <input
                          type="tel"
                          required
                          className="luxury-input"
                          placeholder="+44 7700 900000"
                          value={franchiseForm.phone}
                          onChange={(e) =>
                            setFranchiseForm({ ...franchiseForm, phone: e.target.value })
                          }
                        />
                      </label>
                    </div>
                    <div className="form-grid-3">
                      <label>
                        <span>Email Address *</span>
                        <input
                          type="email"
                          required
                          className="luxury-input"
                          placeholder="partner@example.com"
                          value={franchiseForm.email}
                          onChange={(e) =>
                            setFranchiseForm({ ...franchiseForm, email: e.target.value })
                          }
                        />
                      </label>
                      <label>
                        <span>Target City / Region *</span>
                        <input
                          type="text"
                          required
                          className="luxury-input"
                          placeholder="e.g. Leeds, Manchester, Birmingham"
                          value={franchiseForm.city}
                          onChange={(e) =>
                            setFranchiseForm({ ...franchiseForm, city: e.target.value })
                          }
                        />
                      </label>
                      <label>
                        <span>Investment Capacity</span>
                        <select
                          className="luxury-input"
                          value={franchiseForm.budget}
                          onChange={(e) =>
                            setFranchiseForm({ ...franchiseForm, budget: e.target.value })
                          }
                        >
                          <option>£150k – £300k</option>
                          <option>£300k – £500k</option>
                          <option>£500k+ (Multi-Unit)</option>
                        </select>
                      </label>
                    </div>
                    <label>
                      <span>Hospitality / Business Background</span>
                      <textarea
                        rows="3"
                        className="luxury-input"
                        placeholder="Briefly share your background and proposed territory..."
                        value={franchiseForm.experience}
                        onChange={(e) =>
                          setFranchiseForm({
                            ...franchiseForm,
                            experience: e.target.value,
                          })
                        }
                      />
                    </label>
                    <button type="submit" className="btn-gold">
                      Submit Franchise Inquiry
                    </button>
                  </form>
                )}
              </div>
            </section>
          )}

          {/* 7. CONTACT US PAGE */}
          {activePage === 'contact' && (
            <section className="container section-page animate-fade-up" key="contact">
              <div className="form-split-layout">
                <div className="form-split-copy">
                  <span className="eyebrow-tag">{siteData.contact.eyebrow}</span>
                  <h1>{siteData.contact.title}</h1>
                  <p className="lead-para">{siteData.contact.subtitle}</p>

                  <div className="contact-details-stack">
                    <div className="contact-detail-item">
                      <span className="card-index">ADDRESS</span>
                      <p>{siteData.contact.address}</p>
                    </div>
                    <div className="contact-detail-item">
                      <span className="card-index">PHONE & WHATSAPP</span>
                      <p>
                        Tel: {siteData.contact.phone}
                        <br />
                        WhatsApp: {siteData.contact.whatsapp}
                      </p>
                    </div>
                    <div className="contact-detail-item">
                      <span className="card-index">EMAIL</span>
                      <p>{siteData.contact.email}</p>
                    </div>
                    <div className="contact-detail-item">
                      <span className="card-index">OPENING HOURS</span>
                      <p>{siteData.contact.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="luxury-form-card">
                  {contactSent ? (
                    <div className="form-success-state">
                      <FloralOrnament />
                      <h3>Message Sent</h3>
                      <p>Thank you for reaching out to BAO:G. We will reply shortly.</p>
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => setContactSent(false)}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addInquiry({
                          type: 'Contact',
                          ...contactForm,
                        });
                        setContactSent(true);
                      }}
                    >
                      <h3>Send Us a Message</h3>
                      <label>
                        <span>Your Name *</span>
                        <input
                          type="text"
                          required
                          className="luxury-input"
                          placeholder="Full name"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, name: e.target.value })
                          }
                        />
                      </label>
                      <div className="form-grid-2">
                        <label>
                          <span>Phone Number</span>
                          <input
                            type="tel"
                            className="luxury-input"
                            placeholder="+44 7700 900000"
                            value={contactForm.phone}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, phone: e.target.value })
                            }
                          />
                        </label>
                        <label>
                          <span>Email Address *</span>
                          <input
                            type="email"
                            required
                            className="luxury-input"
                            placeholder="name@example.com"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, email: e.target.value })
                            }
                          />
                        </label>
                      </div>
                      <label>
                        <span>Your Message *</span>
                        <textarea
                          rows="4"
                          required
                          className="luxury-input"
                          placeholder="How can we assist you?"
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, message: e.target.value })
                          }
                        />
                      </label>
                      <button type="submit" className="btn-gold is-full">
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* 8. BLOG / JOURNAL PAGE */}
          {activePage === 'blog' && (
            <section className="container section-page animate-fade-up" key="blog">
              <div className="section-head">
                <span className="eyebrow-tag">{siteData.blog.eyebrow}</span>
                <h1>{siteData.blog.title}</h1>
                <p>{siteData.blog.subtitle}</p>
              </div>

              {selectedPost ? (
                <article className="blog-reader-card animate-fade-up">
                  <button
                    type="button"
                    className="btn-outline blog-back-btn"
                    onClick={() => setSelectedPost(null)}
                  >
                    ← Back to All Articles
                  </button>
                  <span className="card-index">
                    {selectedPost.category} • {selectedPost.date} • {selectedPost.readTime}
                  </span>
                  <h2>{selectedPost.title}</h2>
                  <p className="lead-para">{selectedPost.excerpt}</p>
                  <div className="blog-body-content">{selectedPost.content}</div>
                </article>
              ) : (
                <div className="menu-preview-grid">
                  {(siteData.blog.posts || [])
                    .filter((p) => p.published !== false)
                    .map((post) => (
                      <article key={post.id} className="luxury-card blog-card">
                        <span className="card-index">
                          {post.category} • {post.date}
                        </span>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <button
                          type="button"
                          className="text-gold-btn"
                          onClick={() => setSelectedPost(post)}
                        >
                          Read Article →
                        </button>
                      </article>
                    ))}
                </div>
              )}
            </section>
          )}

          {/* 9. CUSTOM PAGES ADDED VIA ADMIN */}
          {(siteData.customPages || []).map((cp) =>
            activePage === cp.id ? (
              <section key={cp.id} className="container section-page animate-fade-up">
                <div className="section-head">
                  <span className="eyebrow-tag">{cp.subtitle || 'BAO:G RESIDENCE'}</span>
                  <h1>{cp.title}</h1>
                </div>
                <div className="blog-reader-card">
                  <div className="blog-body-content">{cp.content}</div>
                </div>
              </section>
            ) : null
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img
              className="footer-mascot"
              src="/mascot.png"
              alt=""
              width="34"
              height="42"
            />
            <img
              className="footer-urdu"
              src="/urdu.png"
              alt={siteData.brand.urduName}
              width="796"
              height="236"
            />
          </div>
          <div className="footer-right">
            <span>© {siteData.brand.fullName}</span>
            <button
              type="button"
              className="footer-admin-link"
              onClick={() => setIsAdminView(true)}
            >
              Admin Panel
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===========================================================================
// COMPLETE ADMIN CMS DASHBOARD COMPONENT
// ===========================================================================
function AdminDashboard({
  siteData,
  updateSiteData,
  inquiries,
  setInquiries,
  adminTab,
  setAdminTab,
  saveToast,
  onExitAdmin,
  onPreviewLive,
}) {
  // Local state for adding a new dish
  const [newDish, setNewDish] = useState({
    category: siteData.menuCategories?.[0] || 'Royal Starters',
    name: '',
    badge: '',
    price: '£',
    desc: '',
  });
  const [newCategoryName, setNewCategoryName] = useState('');

  // Local state for adding a new blog post
  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Culinary Heritage',
    date: 'November 2026',
    readTime: '3 min read',
    excerpt: '',
    content: '',
  });

  // Local state for adding a new gallery item
  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'Interiors',
    caption: '',
    imageUrl: '',
  });

  // Local state for adding a custom page
  const [newPage, setNewPage] = useState({
    title: '',
    subtitle: '',
    content: '',
  });

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(siteData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'baog-site-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        updateSiteData(parsed, 'Backup JSON restored successfully!');
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="page admin-dashboard">
      {/* Top Admin Header */}
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <div className="brand">
            <img src="/logo-circle.png" alt="" className="brand-mark" />
            <div>
              <div className="brand-name">BAO:G CMS Control Center</div>
              <div className="brand-sub">Manage Website Mode, Menu, Pages, Blog & Contacts</div>
            </div>
          </div>

          <div className="admin-master-controls">
            {/* MASTER SITE MODE TOGGLE */}
            <div className="mode-toggle-pill">
              <span className="mode-label">Site Mode:</span>
              <button
                type="button"
                className={`mode-btn ${
                  siteData.siteMode === 'coming_soon' ? 'is-active-construction' : ''
                }`}
                onClick={() =>
                  updateSiteData(
                    (prev) => ({ ...prev, siteMode: 'coming_soon' }),
                    'Switched to Under Construction (Coming Soon) mode!'
                  )
                }
              >
                Under Construction
              </button>
              <button
                type="button"
                className={`mode-btn ${
                  siteData.siteMode === 'live' ? 'is-active-live' : ''
                }`}
                onClick={() =>
                  updateSiteData(
                    (prev) => ({ ...prev, siteMode: 'live' }),
                    'Website is now LIVE!'
                  )
                }
              >
                Live Website
              </button>
            </div>

            <button type="button" className="btn-outline" onClick={onPreviewLive}>
              Preview Full Site
            </button>
            <button type="button" className="btn-gold" onClick={onExitAdmin}>
              View Public Site
            </button>
          </div>
        </div>
      </header>

      {saveToast && <div className="admin-toast">{saveToast}</div>}

      <div className="container admin-body">
        {/* Sidebar Tabs */}
        <aside className="admin-sidebar">
          {[
            { id: 'status', label: '1. Site Mode & Coming Soon' },
            { id: 'nav', label: '2. Menu Tabs & Custom Pages' },
            { id: 'dining', label: '3. Food Menu & Dishes' },
            { id: 'pages', label: '4. Home & About Content' },
            { id: 'gallery', label: '5. Gallery Manager' },
            { id: 'blog', label: '6. Blog / Journal Posts' },
            { id: 'contact', label: '7. Contact, Booking & Franchise' },
            { id: 'inbox', label: `8. Inquiries Inbox (${inquiries.length})` },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              className={`admin-tab-btn ${adminTab === t.id ? 'is-active' : ''}`}
              onClick={() => setAdminTab(t.id)}
            >
              {t.label}
            </button>
          ))}

          <div className="admin-sidebar-footer">
            <button type="button" className="admin-util-btn" onClick={handleExportJson}>
              ⬇ Export Backup JSON
            </button>
            <label className="admin-util-btn">
              ⬆ Import Backup JSON
              <input
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleImportJson}
              />
            </label>
            <button
              type="button"
              className="admin-util-btn is-danger"
              onClick={() => {
                if (window.confirm('Reset all content back to factory defaults?')) {
                  updateSiteData(INITIAL_SITE_DATA, 'Reset to default content!');
                }
              }}
            >
              ↺ Reset to Defaults
            </button>
          </div>
        </aside>

        {/* Main Editor Panel */}
        <section className="admin-panel-content">
          {/* TAB 1: SITE STATUS & COMING SOON */}
          {adminTab === 'status' && (
            <div className="admin-card">
              <h2>Website Mode & Coming Soon Banner Settings</h2>
              <p className="admin-help">
                Keep the website on <strong>Under Construction</strong> right now while you prepare, or switch to <strong>Live Website</strong> anytime with one click.
              </p>

              <div className="status-banner-box">
                <div>
                  <strong>Current Public Mode: </strong>
                  <span className="status-badge">
                    {siteData.siteMode === 'live'
                      ? '🟢 LIVE WEBSITE (Full Restaurant Site Active)'
                      : '🟠 UNDER CONSTRUCTION (Coming Soon Page Active)'}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() =>
                    updateSiteData((prev) => ({
                      ...prev,
                      siteMode: prev.siteMode === 'live' ? 'coming_soon' : 'live',
                    }))
                  }
                >
                  {siteData.siteMode === 'live'
                    ? 'Switch Back to Under Construction'
                    : 'Make Full Website LIVE Now'}
                </button>
              </div>

              <div className="form-grid-2">
                <label>
                  <span>Brand Name</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.brand.name}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        brand: { ...prev.brand, name: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Brand Subtitle</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.brand.subtitle}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        brand: { ...prev.brand, subtitle: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>

              <h3>Under Construction (Coming Soon) Page Text</h3>
              <div className="form-grid-2">
                <label>
                  <span>Top Pill Tag</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.comingSoon.tag}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        comingSoon: { ...prev.comingSoon, tag: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Poster Brush Badge Text</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.comingSoon.badgeText}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        comingSoon: { ...prev.comingSoon, badgeText: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>
              <label>
                <span>Main Headline</span>
                <input
                  type="text"
                  className="luxury-input"
                  value={siteData.comingSoon.headline}
                  onChange={(e) =>
                    updateSiteData((prev) => ({
                      ...prev,
                      comingSoon: { ...prev.comingSoon, headline: e.target.value },
                    }))
                  }
                />
              </label>
              <label>
                <span>Description Paragraph</span>
                <textarea
                  rows="2"
                  className="luxury-input"
                  value={siteData.comingSoon.text}
                  onChange={(e) =>
                    updateSiteData((prev) => ({
                      ...prev,
                      comingSoon: { ...prev.comingSoon, text: e.target.value },
                    }))
                  }
                />
              </label>

              <h3>Admin Security PIN</h3>
              <label>
                <span>Admin Login PIN (Default: 1234)</span>
                <input
                  type="text"
                  className="luxury-input"
                  style={{ maxWidth: '240px' }}
                  value={siteData.adminPin || '1234'}
                  onChange={(e) =>
                    updateSiteData((prev) => ({ ...prev, adminPin: e.target.value }))
                  }
                />
              </label>
            </div>
          )}

          {/* TAB 2: NAVIGATION MENU & CUSTOM PAGES */}
          {adminTab === 'nav' && (
            <div className="admin-card">
              <h2>Navigation Menu & Custom Pages</h2>
              <p className="admin-help">
                Rename menu tabs, hide/show sections (including enabling the <strong>Journal / Blog</strong> tab whenever you want), or add brand-new custom pages.
              </p>

              <div className="admin-list">
                {(siteData.navigation || []).map((nav, idx) => (
                  <div key={nav.id} className="admin-list-row">
                    <input
                      type="text"
                      className="luxury-input"
                      value={nav.label}
                      onChange={(e) => {
                        const updated = [...siteData.navigation];
                        updated[idx] = { ...nav, label: e.target.value };
                        updateSiteData((prev) => ({ ...prev, navigation: updated }));
                      }}
                    />
                    <label className="admin-checkbox">
                      <input
                        type="checkbox"
                        checked={nav.visible}
                        onChange={(e) => {
                          const updated = [...siteData.navigation];
                          updated[idx] = { ...nav, visible: e.target.checked };
                          updateSiteData((prev) => ({ ...prev, navigation: updated }));
                        }}
                      />
                      <span>{nav.visible ? 'Visible in Menu' : 'Hidden'}</span>
                    </label>
                  </div>
                ))}
              </div>

              <h3>Add a New Custom Page</h3>
              <div className="admin-subcard">
                <div className="form-grid-2">
                  <label>
                    <span>Page Menu Title</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="e.g. Events & Catering"
                      value={newPage.title}
                      onChange={(e) =>
                        setNewPage({ ...newPage, title: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>Page Subtitle / Eyebrow</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="e.g. BESPOKE CELEBRATIONS"
                      value={newPage.subtitle}
                      onChange={(e) =>
                        setNewPage({ ...newPage, subtitle: e.target.value })
                      }
                    />
                  </label>
                </div>
                <label>
                  <span>Page Content</span>
                  <textarea
                    rows="4"
                    className="luxury-input"
                    placeholder="Write page content here..."
                    value={newPage.content}
                    onChange={(e) =>
                      setNewPage({ ...newPage, content: e.target.value })
                    }
                  />
                </label>
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => {
                    if (!newPage.title.trim()) return;
                    const pageObj = {
                      id: 'page-' + Date.now(),
                      title: newPage.title.trim(),
                      subtitle: newPage.subtitle.trim(),
                      content: newPage.content,
                      visible: true,
                    };
                    updateSiteData((prev) => ({
                      ...prev,
                      customPages: [...(prev.customPages || []), pageObj],
                    }));
                    setNewPage({ title: '', subtitle: '', content: '' });
                  }}
                >
                  + Add Custom Page to Menu
                </button>
              </div>

              {(siteData.customPages || []).length > 0 && (
                <div>
                  <h3>Existing Custom Pages</h3>
                  {(siteData.customPages || []).map((cp, idx) => (
                    <div key={cp.id} className="admin-subcard">
                      <div className="admin-row-between">
                        <strong>{cp.title}</strong>
                        <button
                          type="button"
                          className="btn-danger-sm"
                          onClick={() =>
                            updateSiteData((prev) => ({
                              ...prev,
                              customPages: prev.customPages.filter(
                                (_, i) => i !== idx
                              ),
                            }))
                          }
                        >
                          Delete Page
                        </button>
                      </div>
                      <textarea
                        rows="3"
                        className="luxury-input"
                        value={cp.content}
                        onChange={(e) => {
                          const next = [...siteData.customPages];
                          next[idx] = { ...cp, content: e.target.value };
                          updateSiteData((prev) => ({ ...prev, customPages: next }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FOOD MENU & DISHES */}
          {adminTab === 'dining' && (
            <div className="admin-card">
              <h2>Dining Menu & Dishes Manager</h2>
              <p className="admin-help">
                Add new categories, add new dishes, update prices (`£`), or edit/remove existing dishes.
              </p>

              {/* Categories */}
              <div className="admin-subcard">
                <h3>Menu Categories</h3>
                <div className="category-pills">
                  {(siteData.menuCategories || []).map((cat, idx) => (
                    <span key={cat} className="cat-pill is-active">
                      {cat}{' '}
                      <button
                        type="button"
                        className="pill-del-btn"
                        title="Remove category"
                        onClick={() =>
                          updateSiteData((prev) => ({
                            ...prev,
                            menuCategories: prev.menuCategories.filter(
                              (_, i) => i !== idx
                            ),
                          }))
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="admin-inline-add">
                  <input
                    type="text"
                    className="luxury-input"
                    placeholder="New category name (e.g. Royal Karahi)"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      if (!newCategoryName.trim()) return;
                      updateSiteData((prev) => ({
                        ...prev,
                        menuCategories: [
                          ...(prev.menuCategories || []),
                          newCategoryName.trim(),
                        ],
                      }));
                      setNewCategoryName('');
                    }}
                  >
                    + Add Category
                  </button>
                </div>
              </div>

              {/* Add New Dish */}
              <div className="admin-subcard">
                <h3>Add New Menu Item</h3>
                <div className="form-grid-2">
                  <label>
                    <span>Dish Name *</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="e.g. Peshawari Charsi Karahi"
                      value={newDish.name}
                      onChange={(e) =>
                        setNewDish({ ...newDish, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>Category *</span>
                    <select
                      className="luxury-input"
                      value={newDish.category}
                      onChange={(e) =>
                        setNewDish({ ...newDish, category: e.target.value })
                      }
                    >
                      {(siteData.menuCategories || []).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="form-grid-2">
                  <label>
                    <span>Price (e.g. £15.95) *</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="£15.95"
                      value={newDish.price}
                      onChange={(e) =>
                        setNewDish({ ...newDish, price: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>Badge / Tag (Optional)</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="e.g. Chef's Special, Spicy, Halal"
                      value={newDish.badge}
                      onChange={(e) =>
                        setNewDish({ ...newDish, badge: e.target.value })
                      }
                    />
                  </label>
                </div>
                <label>
                  <span>Short Description</span>
                  <textarea
                    rows="2"
                    className="luxury-input"
                    placeholder="Concise 1-2 line dish description..."
                    value={newDish.desc}
                    onChange={(e) =>
                      setNewDish({ ...newDish, desc: e.target.value })
                    }
                  />
                </label>
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => {
                    if (!newDish.name.trim()) return;
                    const item = {
                      id: 'dish-' + Date.now(),
                      ...newDish,
                    };
                    updateSiteData((prev) => ({
                      ...prev,
                      menuItems: [item, ...(prev.menuItems || [])],
                    }));
                    setNewDish({
                      category: siteData.menuCategories?.[0] || 'Royal Starters',
                      name: '',
                      badge: '',
                      price: '£',
                      desc: '',
                    });
                  }}
                >
                  + Add Dish to Menu
                </button>
              </div>

              {/* Existing Dishes */}
              <h3>Existing Menu Items ({(siteData.menuItems || []).length})</h3>
              <div className="admin-items-stack">
                {(siteData.menuItems || []).map((dish, idx) => (
                  <div key={dish.id} className="admin-subcard">
                    <div className="form-grid-3">
                      <input
                        type="text"
                        className="luxury-input"
                        value={dish.name}
                        onChange={(e) => {
                          const next = [...siteData.menuItems];
                          next[idx] = { ...dish, name: e.target.value };
                          updateSiteData((prev) => ({ ...prev, menuItems: next }));
                        }}
                      />
                      <select
                        className="luxury-input"
                        value={dish.category}
                        onChange={(e) => {
                          const next = [...siteData.menuItems];
                          next[idx] = { ...dish, category: e.target.value };
                          updateSiteData((prev) => ({ ...prev, menuItems: next }));
                        }}
                      >
                        {(siteData.menuCategories || []).map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <div className="admin-inline-price">
                        <input
                          type="text"
                          className="luxury-input"
                          value={dish.price}
                          onChange={(e) => {
                            const next = [...siteData.menuItems];
                            next[idx] = { ...dish, price: e.target.value };
                            updateSiteData((prev) => ({ ...prev, menuItems: next }));
                          }}
                        />
                        <button
                          type="button"
                          className="btn-danger-sm"
                          onClick={() =>
                            updateSiteData((prev) => ({
                              ...prev,
                              menuItems: prev.menuItems.filter((_, i) => i !== idx),
                            }))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows="2"
                      className="luxury-input"
                      value={dish.desc}
                      onChange={(e) => {
                        const next = [...siteData.menuItems];
                        next[idx] = { ...dish, desc: e.target.value };
                        updateSiteData((prev) => ({ ...prev, menuItems: next }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HOME & ABOUT CONTENT */}
          {adminTab === 'pages' && (
            <div className="admin-card">
              <h2>Home & About Us Content Editor</h2>

              <div className="admin-subcard">
                <h3>Home Hero Section</h3>
                <label>
                  <span>Eyebrow Tag</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.home.eyebrow}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        home: { ...prev.home, eyebrow: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Hero Headline</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.home.heroTitle}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        home: { ...prev.home, heroTitle: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Hero Lead Paragraph</span>
                  <textarea
                    rows="2"
                    className="luxury-input"
                    value={siteData.home.heroLead}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        home: { ...prev.home, heroLead: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Editorial Quote</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.home.quoteText}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        home: { ...prev.home, quoteText: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="admin-subcard">
                <h3>About Us Story</h3>
                <label>
                  <span>About Headline</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.about.title}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        about: { ...prev.about, title: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Lead Introduction</span>
                  <textarea
                    rows="2"
                    className="luxury-input"
                    value={siteData.about.lead}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        about: { ...prev.about, lead: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Story Paragraph 1</span>
                  <textarea
                    rows="3"
                    className="luxury-input"
                    value={siteData.about.storyParagraph1}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        about: { ...prev.about, storyParagraph1: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Story Paragraph 2</span>
                  <textarea
                    rows="3"
                    className="luxury-input"
                    value={siteData.about.storyParagraph2}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        about: { ...prev.about, storyParagraph2: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY MANAGER */}
          {adminTab === 'gallery' && (
            <div className="admin-card">
              <h2>Gallery Manager</h2>
              <p className="admin-help">
                Add, replace, or remove gallery showcase items. You can paste an image URL or upload a photo directly from your computer.
              </p>

              <div className="admin-subcard">
                <h3>Add Gallery Item</h3>
                <div className="form-grid-2">
                  <label>
                    <span>Title *</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="e.g. Royal Dining Room"
                      value={newGallery.title}
                      onChange={(e) =>
                        setNewGallery({ ...newGallery, title: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>Category Tag</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="e.g. Interiors / Culinary"
                      value={newGallery.category}
                      onChange={(e) =>
                        setNewGallery({ ...newGallery, category: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className="form-grid-2">
                  <label>
                    <span>Image URL (or upload below)</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="https://..."
                      value={newGallery.imageUrl}
                      onChange={(e) =>
                        setNewGallery({ ...newGallery, imageUrl: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>Upload Photo from Computer</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="luxury-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setNewGallery((prev) => ({
                            ...prev,
                            imageUrl: ev.target.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                </div>
                <label>
                  <span>Caption</span>
                  <input
                    type="text"
                    className="luxury-input"
                    placeholder="Short caption..."
                    value={newGallery.caption}
                    onChange={(e) =>
                      setNewGallery({ ...newGallery, caption: e.target.value })
                    }
                  />
                </label>
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => {
                    if (!newGallery.title.trim()) return;
                    updateSiteData((prev) => ({
                      ...prev,
                      gallery: {
                        ...prev.gallery,
                        items: [
                          { id: 'gal-' + Date.now(), ...newGallery },
                          ...(prev.gallery.items || []),
                        ],
                      },
                    }));
                    setNewGallery({
                      title: '',
                      category: 'Interiors',
                      caption: '',
                      imageUrl: '',
                    });
                  }}
                >
                  + Add Gallery Card
                </button>
              </div>

              <div className="admin-items-stack">
                {(siteData.gallery.items || []).map((item, idx) => (
                  <div key={item.id} className="admin-subcard">
                    <div className="admin-row-between">
                      <strong>
                        {item.title} ({item.category})
                      </strong>
                      <button
                        type="button"
                        className="btn-danger-sm"
                        onClick={() =>
                          updateSiteData((prev) => ({
                            ...prev,
                            gallery: {
                              ...prev.gallery,
                              items: prev.gallery.items.filter((_, i) => i !== idx),
                            },
                          }))
                        }
                      >
                        Delete
                      </button>
                    </div>
                    <input
                      type="text"
                      className="luxury-input"
                      value={item.caption}
                      onChange={(e) => {
                        const next = [...siteData.gallery.items];
                        next[idx] = { ...item, caption: e.target.value };
                        updateSiteData((prev) => ({
                          ...prev,
                          gallery: { ...prev.gallery, items: next },
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BLOG / JOURNAL MANAGER */}
          {adminTab === 'blog' && (
            <div className="admin-card">
              <h2>Blog / Culinary Journal Manager</h2>
              <p className="admin-help">
                Publish articles, recipes, or restaurant news. Toggle the switch below to show or hide the Journal/Blog tab in the main navigation menu.
              </p>

              {/* Toggle Blog in Navbar */}
              <div className="status-banner-box">
                <div>
                  <strong>Blog Menu Tab Visibility: </strong>
                  <span>
                    {siteData.navigation?.find((n) => n.id === 'blog')?.visible
                      ? '🟢 Visible in Main Navigation'
                      : '⚪ Hidden from Main Navigation'}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    const updated = (siteData.navigation || []).map((n) =>
                      n.id === 'blog' ? { ...n, visible: !n.visible } : n
                    );
                    updateSiteData((prev) => ({ ...prev, navigation: updated }));
                  }}
                >
                  {siteData.navigation?.find((n) => n.id === 'blog')?.visible
                    ? 'Hide Blog Tab from Menu'
                    : 'Enable & Show Blog Tab in Menu'}
                </button>
              </div>

              <div className="admin-subcard">
                <h3>Write a New Blog Post</h3>
                <div className="form-grid-3">
                  <label>
                    <span>Post Title *</span>
                    <input
                      type="text"
                      className="luxury-input"
                      placeholder="Article headline..."
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>Category</span>
                    <input
                      type="text"
                      className="luxury-input"
                      value={newPost.category}
                      onChange={(e) =>
                        setNewPost({ ...newPost, category: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>Date</span>
                    <input
                      type="text"
                      className="luxury-input"
                      value={newPost.date}
                      onChange={(e) =>
                        setNewPost({ ...newPost, date: e.target.value })
                      }
                    />
                  </label>
                </div>
                <label>
                  <span>Short Excerpt (Summary shown on card)</span>
                  <textarea
                    rows="2"
                    className="luxury-input"
                    placeholder="1-2 sentence summary..."
                    value={newPost.excerpt}
                    onChange={(e) =>
                      setNewPost({ ...newPost, excerpt: e.target.value })
                    }
                  />
                </label>
                <label>
                  <span>Full Article Content</span>
                  <textarea
                    rows="5"
                    className="luxury-input"
                    placeholder="Write full article here..."
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                  />
                </label>
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => {
                    if (!newPost.title.trim()) return;
                    const post = {
                      id: 'post-' + Date.now(),
                      ...newPost,
                      published: true,
                    };
                    updateSiteData((prev) => ({
                      ...prev,
                      blog: {
                        ...prev.blog,
                        posts: [post, ...(prev.blog.posts || [])],
                      },
                    }));
                    setNewPost({
                      title: '',
                      category: 'Culinary Heritage',
                      date: 'November 2026',
                      readTime: '3 min read',
                      excerpt: '',
                      content: '',
                    });
                  }}
                >
                  + Publish Blog Post
                </button>
              </div>

              <h3>Published Posts ({(siteData.blog.posts || []).length})</h3>
              <div className="admin-items-stack">
                {(siteData.blog.posts || []).map((post, idx) => (
                  <div key={post.id} className="admin-subcard">
                    <div className="admin-row-between">
                      <strong>{post.title}</strong>
                      <button
                        type="button"
                        className="btn-danger-sm"
                        onClick={() =>
                          updateSiteData((prev) => ({
                            ...prev,
                            blog: {
                              ...prev.blog,
                              posts: prev.blog.posts.filter((_, i) => i !== idx),
                            },
                          }))
                        }
                      >
                        Delete Post
                      </button>
                    </div>
                    <input
                      type="text"
                      className="luxury-input"
                      value={post.excerpt}
                      onChange={(e) => {
                        const next = [...siteData.blog.posts];
                        next[idx] = { ...post, excerpt: e.target.value };
                        updateSiteData((prev) => ({
                          ...prev,
                          blog: { ...prev.blog, posts: next },
                        }));
                      }}
                    />
                    <textarea
                      rows="3"
                      className="luxury-input"
                      value={post.content}
                      onChange={(e) => {
                        const next = [...siteData.blog.posts];
                        next[idx] = { ...post, content: e.target.value };
                        updateSiteData((prev) => ({
                          ...prev,
                          blog: { ...prev.blog, posts: next },
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT, BOOKING & FRANCHISE */}
          {adminTab === 'contact' && (
            <div className="admin-card">
              <h2>Contact Information, Booking & Franchise Settings</h2>
              <p className="admin-help">
                Currently filled with Bradford dummy contact details. Update them anytime below.
              </p>

              <div className="admin-subcard">
                <h3>Restaurant Contact Details</h3>
                <div className="form-grid-2">
                  <label>
                    <span>Phone Number</span>
                    <input
                      type="text"
                      className="luxury-input"
                      value={siteData.contact.phone}
                      onChange={(e) =>
                        updateSiteData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, phone: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label>
                    <span>WhatsApp Number</span>
                    <input
                      type="text"
                      className="luxury-input"
                      value={siteData.contact.whatsapp}
                      onChange={(e) =>
                        updateSiteData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, whatsapp: e.target.value },
                        }))
                      }
                    />
                  </label>
                </div>
                <label>
                  <span>Email Address</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.contact.email}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Physical Address</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.contact.address}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, address: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Opening Hours</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.contact.hours}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, hours: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>

              <div className="admin-subcard">
                <h3>Booking & Franchise Intro Text</h3>
                <label>
                  <span>Booking Page Subtitle</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.booking.subtitle}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        booking: { ...prev.booking, subtitle: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Franchise Page Subtitle</span>
                  <input
                    type="text"
                    className="luxury-input"
                    value={siteData.franchise.subtitle}
                    onChange={(e) =>
                      updateSiteData((prev) => ({
                        ...prev,
                        franchise: { ...prev.franchise, subtitle: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 8: INQUIRIES INBOX */}
          {adminTab === 'inbox' && (
            <div className="admin-card">
              <h2>Reservations, Franchise & Contact Inbox</h2>
              <p className="admin-help">
                All table reservations, franchise applications, and contact messages submitted on the website appear here.
              </p>

              {inquiries.length === 0 ? (
                <p>No inquiries received yet.</p>
              ) : (
                <div className="admin-items-stack">
                  {inquiries.map((inq, idx) => (
                    <div key={inq.id} className="admin-subcard">
                      <div className="admin-row-between">
                        <span className="dish-badge">
                          {inq.type} • {inq.createdAt}
                        </span>
                        <button
                          type="button"
                          className="btn-danger-sm"
                          onClick={() =>
                            setInquiries(inquiries.filter((_, i) => i !== idx))
                          }
                        >
                          Delete
                        </button>
                      </div>
                      <h4>
                        {inq.name} — {inq.phone} {inq.email ? `(${inq.email})` : ''}
                      </h4>
                      {inq.type === 'Booking' && (
                        <p>
                          <strong>Date:</strong> {inq.date} at {inq.time} |{' '}
                          <strong>Party:</strong> {inq.guests}
                          <br />
                          {inq.notes && <span>Notes: {inq.notes}</span>}
                        </p>
                      )}
                      {inq.type === 'Franchise' && (
                        <p>
                          <strong>City:</strong> {inq.city} |{' '}
                          <strong>Budget:</strong> {inq.budget}
                          <br />
                          {inq.experience && <span>Background: {inq.experience}</span>}
                        </p>
                      )}
                      {inq.type === 'Contact' && <p>{inq.message}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
