import { useState } from 'react';

// ---------------------------------------------------------------
// Yahan se text / menu badal sakte hain.
// ---------------------------------------------------------------
const SITE = {
  name: 'BAO:G',
  subtitle: 'The Dining Residence',
  fullName: 'BAO:G The Dining Residence',
  tag: 'Under construction',
  headline: 'Our website is coming soon.',
  text: 'BAO:G The Dining Residence is getting its website ready. Please check back soon.',
};

const NAV_ITEMS = [
  'Home',
  'About Us',
  'Menu',
  'Gallery',
  'Booking',
  'Franchise',
  'Contact Us',
];

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
      {/* Top, Bottom, Left, Right Petals */}
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
      {/* Diagonal Accent Dots / Buds */}
      <circle cx="11.5" cy="11.5" r="1.6" fill="currentColor" />
      <circle cx="24.5" cy="11.5" r="1.6" fill="currentColor" />
      <circle cx="11.5" cy="24.5" r="1.6" fill="currentColor" />
      <circle cx="24.5" cy="24.5" r="1.6" fill="currentColor" />
      <circle cx="18" cy="18" r="1.8" fill="currentColor" />
    </svg>
  );
}

export default function UnderConstruction() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  const handleNav = (e, item) => {
    // Pages abhi tayar nahi hain, is liye sirf highlight badalta hai.
    e.preventDefault();
    setActive(item);
    setMenuOpen(false);
  };

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <img
              className="brand-mark"
              src="/logo-circle.png"
              alt="BAO:G Emblem"
              width="52"
              height="56"
            />
            <div>
              <div className="brand-name">{SITE.name}</div>
              <div className="brand-sub">{SITE.subtitle}</div>
            </div>
          </div>

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
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                className={item === active ? 'is-active' : ''}
                aria-current={item === active ? 'page' : undefined}
                onClick={(e) => handleNav(e, item)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="container hero">
        <div className="hero-text">
          <span className="tag">{SITE.tag}</span>
          <h1>{SITE.headline}</h1>
          <p>{SITE.text}</p>
        </div>

        <div
          className="sign"
          role="img"
          aria-label="BAO:G The Dining Residence, coming soon"
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
              alt="باؤجی"
              width="796"
              height="236"
            />
          </div>

          <div className="sign-word">{SITE.name}</div>
          <div className="sign-sub">THE DINING RESIDENCE</div>

          <div className="sign-rule">
            <FloralOrnament />
          </div>

          <div className="sign-brush">Coming Soon</div>
        </div>
      </main>

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
              alt="باؤجی"
              width="796"
              height="236"
            />
          </div>
          <div>© {SITE.fullName}</div>
        </div>
      </footer>
    </div>
  );
}
