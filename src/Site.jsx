import { useEffect, useRef, useState } from 'react';

function go(to) { history.pushState({}, '', to); window.dispatchEvent(new Event('nav')); window.scrollTo(0, 0); }
function A({ to, children, ...p }) {
  if (/^(https?:|mailto:|tel:)/.test(to || '')) return <a href={to} target="_blank" rel="noreferrer" {...p}>{children}</a>;
  return <a href={to} onClick={(e) => { e.preventDefault(); go(to); }} {...p}>{children}</a>;
}
function R({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const ref = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), o.disconnect()), { threshold: 0.12 }); o.observe(ref.current); return () => o.disconnect(); }, []);
  return <Tag ref={ref} className={`s-r ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}
const Paras = ({ text }) => String(text || '').split(/\n\s*\n/).map((p, i) => (p.startsWith('## ') ? <h3 key={i}>{p.slice(3)}</h3> : <p key={i}>{p}</p>));

function Form({ kind, c }) {
  const [st, setSt] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setSt('sending');
    const body = { type: kind, ...Object.fromEntries(new FormData(e.target)) };
    const r = await fetch('/api/inbox', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null);
    setSt(r && r.ok ? 'done' : 'error'); if (r && r.ok) e.target.reset();
  };
  const f = (n, label, t = 'text', req) => <label className="s-f">{label}<input name={n} type={t} required={req} /></label>;
  return (
    <form className="s-form" onSubmit={submit}>
      <input name="website" tabIndex="-1" autoComplete="off" className="s-hp" aria-hidden="true" />
      <div className="s-row">{f('name', 'Name', 'text', true)}{f('phone', 'Phone', 'tel', true)}</div>
      {f('email', 'Email', 'email')}
      {kind === 'booking' && <div className="s-row">{f('date', 'Date', 'date', true)}{f('time', 'Time', 'time', true)}{f('guests', 'Guests', 'number', true)}</div>}
      {kind === 'franchise' && f('city', 'City / location')}
      <label className="s-f">Message<textarea name="message" rows="4" /></label>
      <button className="s-btn" disabled={st === 'sending'}>{kind === 'booking' ? 'Request booking' : 'Send'}</button>
      {st === 'done' && <p className="s-ok">Thank you — we have received your message and will be in touch.</p>}
      {st === 'error' && <p className="s-err">Something went wrong. Please call us instead.</p>}
    </form>
  );
}

function Block({ b, content }) {
  const { contact: c, menu, gallery, posts } = content;
  const head = (b.title || b.eyebrow) && <R><div className="s-head">{b.eyebrow && <span className="s-eye">{b.eyebrow}</span>}{b.title && <h2>{b.title}</h2>}<i className="s-orn" /></div></R>;
  switch (b.type) {
    case 'hero': return (
      <section className="s-hero" style={b.image ? { backgroundImage: `linear-gradient(rgba(30,9,2,.7),rgba(30,9,2,.85)),url(${b.image})` } : undefined}>
        <R className="s-hero-in"><span className="s-eye">{b.eyebrow}</span><h1>{b.title}</h1><p>{b.text}</p>{b.button && <A to={b.link} className="s-btn">{b.button}</A>}</R>
      </section>);
    case 'text': return <section className="s-sec s-narrow">{head}<R className="s-prose"><Paras text={b.body} /></R></section>;
    case 'features': return <section className="s-sec">{head}<div className="s-grid">{(b.items || []).map((it, i) => <R key={i} delay={i * 120} className="s-card"><h3>{it.title}</h3><p>{it.text}</p></R>)}</div></section>;
    case 'cta': return <section className="s-sec"><R className="s-cta"><h2>{b.title}</h2><p>{b.text}</p>{b.button && <A to={b.link} className="s-btn">{b.button}</A>}</R></section>;
    case 'menu': return (
      <section className="s-sec s-narrow">{head}
        {(menu || []).map((cat, i) => {
          const items = (cat.items || []).filter((x) => !b.featuredOnly || x.featured);
          return items.length ? <R key={i} className="s-cat"><h3>{b.featuredOnly ? '' : cat.name}</h3>{items.map((it, j) => (
            <div className="s-dish" key={j}><div className="s-dish-top"><b>{it.name}</b><span className="s-dots" /><em>{it.price}</em></div><p>{it.desc}</p></div>))}</R> : null;
        })}
        {b.featuredOnly && <R className="s-center"><A to="/menu" className="s-link">View full menu →</A></R>}
      </section>);
    case 'gallery': return (
      <section className="s-sec">{head}<div className="s-gal">{(gallery?.length ? gallery : Array.from({ length: 6 }, () => ({ src: '', caption: '' }))).map((g, i) => (
        <R key={i} delay={(i % 3) * 100} className="s-tile">{g.src ? <img src={g.src} alt={g.caption || ''} loading="lazy" /> : <span>BAO:G</span>}{g.caption && <small>{g.caption}</small>}</R>))}</div></section>);
    case 'booking': case 'franchise': case 'contact': return (
      <section className="s-sec s-narrow">{head}<R className="s-prose s-center"><Paras text={b.body} /></R>
        {b.type === 'franchise' && <div className="s-grid">{(b.steps || []).map((s, i) => <R key={i} delay={i * 120} className="s-card"><span className="s-num">{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p></R>)}</div>}
        {b.type === 'contact' && <R className="s-info"><div><b>Visit</b><p>{c.address}</p></div><div><b>Call</b><p><a href={`tel:${c.phone}`}>{c.phone}</a></p></div><div><b>Email</b><p><a href={`mailto:${c.email}`}>{c.email}</a></p></div><div><b>Hours</b>{(c.hours || []).map((h, i) => <p key={i}>{h.label}: {h.time}</p>)}</div></R>}
        <R><Form kind={b.type} c={c} /></R></section>);
    case 'posts': return <section className="s-sec s-narrow">{head}{(posts || []).map((p, i) => <R key={i} className="s-post"><small>{p.date}</small><h3><A to={`/blog/${p.slug}`}>{p.title}</A></h3><p>{String(p.body).slice(0, 160)}…</p></R>)}</section>;
    default: return null;
  }
}

export default function Site({ content, preview }) {
  const [path, setPath] = useState(location.pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => { setPath(location.pathname); setOpen(false); }; const s = () => setScrolled(scrollY > 30);
    addEventListener('popstate', f); addEventListener('nav', f); addEventListener('scroll', s);
    return () => { removeEventListener('popstate', f); removeEventListener('nav', f); removeEventListener('scroll', s); };
  }, []);
  const { site, contact: c, nav, pages, posts } = content;
  const slug = path.replace(/^\/|\/$/g, '');
  const post = slug.startsWith('blog/') ? (posts || []).find((p) => p.slug === slug.slice(5)) : null;
  const page = post ? null : pages.find((p) => p.slug === slug);
  useEffect(() => { document.title = `${post ? post.title : page ? page.title : 'Not found'} — ${site.name}`; }, [slug]);
  return (
    <div className="s-app">
      {preview && <div className="s-prev">Preview — visitors still see the Under Construction page</div>}
      <header className={`s-header ${scrolled ? 'sc' : ''}`}>
        <A to="/" className="s-brand"><img src="/mascot.png" alt="" /><span><b>{site.name}</b><small>{site.tagline}</small></span></A>
        <button className="s-burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        <nav className={open ? 'open' : ''}>{nav.map((n, i) => <A key={i} to={n.path} className={n.path.replace(/^\/|\/$/g, '') === slug ? 'on' : ''}>{n.label}</A>)}</nav>
      </header>
      <main key={slug}>
        {post ? <section className="s-sec s-narrow s-post-full"><R><small>{post.date}</small><h1>{post.title}</h1></R>{post.image && <img src={post.image} alt="" />}<R className="s-prose"><Paras text={post.body} /></R><A to="/blog" className="s-link">← Back</A></section>
          : page ? page.blocks.map((b, i) => <Block key={i} b={b} content={content} />)
          : <section className="s-sec s-center"><h1>Page not found</h1><A to="/" className="s-btn">Home</A></section>}
      </main>
      <footer className="s-footer">
        <div><b>{site.name}</b><p>{c.address}</p></div>
        <div><p><a href={`tel:${c.phone}`}>{c.phone}</a></p><p><a href={`mailto:${c.email}`}>{c.email}</a></p></div>
        <div>{(c.hours || []).map((h, i) => <p key={i}>{h.label}: {h.time}</p>)}<p>{c.instagram && <A to={c.instagram}>Instagram</A>} {c.facebook && <A to={c.facebook}>Facebook</A>}</p></div>
        <small>{site.footer}</small>
      </footer>
    </div>
  );
}
