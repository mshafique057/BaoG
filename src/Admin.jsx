import { useEffect, useState } from 'react';
import { defaults } from './defaults.js';
const api = (url, method = 'GET', body) => fetch(url, { method, credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) }).then(async (r) => ({ ok: r.ok, ...(await r.json().catch(() => ({}))) }));
const BLOCKS = {
  hero: { type: 'hero', eyebrow: '', title: '', text: '', button: '', link: '/', image: '' }, text: { type: 'text', title: '', body: '', image: '' },
  features: { type: 'features', title: '', items: [{ title: '', text: '' }] }, cta: { type: 'cta', title: '', text: '', button: '', link: '/' },
  menu: { type: 'menu', title: 'Menu', featuredOnly: false }, gallery: { type: 'gallery', title: 'Gallery' }, booking: { type: 'booking', title: '', body: '' },
  contact: { type: 'contact', title: '', body: '' }, franchise: { type: 'franchise', title: '', body: '', steps: [{ title: '', text: '' }] }, posts: { type: 'posts', title: 'Blog' },
};
const TPL = { gallery: { src: '', caption: '' }, posts: { slug: '', title: '', date: new Date().toISOString().slice(0, 10), image: '', body: '' }, items: { name: '', desc: '', price: '', featured: false }, hours: { label: '', time: '' } };
const blank = (s) => (Array.isArray(s) ? [] : s && typeof s === 'object' ? Object.fromEntries(Object.entries(s).map(([k, v]) => [k, blank(v)])) : typeof s === 'boolean' ? false : '');
const nice = (k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (x) => x.toUpperCase());

function Ed({ v, set, k }) {
  if (Array.isArray(v)) {
    const mv = (i, d) => { const a = [...v]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; set(a); };
    return (
      <div className="a-list">
        {v.map((it, i) => (
          <div className="a-item" key={i}>
            <div className="a-bar"><b>{typeof it === 'object' ? it.title || it.name || it.label || it.slug || it.type || `#${i + 1}` : `#${i + 1}`}</b>
              <span><button onClick={() => mv(i, -1)}>↑</button><button onClick={() => mv(i, 1)}>↓</button><button onClick={() => confirm('Delete this?') && set(v.filter((_, j) => j !== i))}>✕</button></span></div>
            <Ed v={it} set={(n) => set(v.map((x, j) => (j === i ? n : x)))} />
          </div>))}
        {k === 'blocks' ? <select value="" onChange={(e) => e.target.value && set([...v, structuredClone(BLOCKS[e.target.value])])}><option value="">+ Add section…</option>{Object.keys(BLOCKS).map((b) => <option key={b}>{b}</option>)}</select>
          : <button className="a-add" onClick={() => set([...v, structuredClone(v.length ? blank(v[v.length - 1]) : TPL[k] ?? '')])}>+ Add</button>}
      </div>);
  }
  if (v && typeof v === 'object') return <>{Object.keys(v).filter((x) => x !== 'type').map((key) => <label className="a-f" key={key}><span>{nice(key)}</span><Ed k={key} v={v[key]} set={(n) => set({ ...v, [key]: n })} /></label>)}</>;
  if (typeof v === 'boolean') return <input type="checkbox" checked={v} onChange={(e) => set(e.target.checked)} />;
  return /^(body|text|desc|message)$/.test(k) ? <textarea rows="4" value={v} onChange={(e) => set(e.target.value)} /> : <input value={v ?? ''} onChange={(e) => set(e.target.value)} />;
}

export default function Admin() {
  const [st, setSt] = useState(null); const [c, setC] = useState(null); const [tab, setTab] = useState('dash');
  const [pw, setPw] = useState(''); const [msg, setMsg] = useState(''); const [inbox, setInbox] = useState([]);
  const load = async () => { const d = await api('/api/site'); setSt(d); setC(d.content || structuredClone(defaults)); if (d.admin) api('/api/inbox').then((r) => setInbox(r.items || [])); };
  useEffect(() => { load(); }, []);
  if (!st) return <div className="s-splash">…</div>;
  const login = async (e) => { e.preventDefault(); const r = await api('/api/auth', 'POST', { password: pw }); r.ok ? load() : setMsg(r.error); };
  if (!st.admin) return (
    <form className="a-login" onSubmit={login}><h1>BAO:G Admin</h1>
      {!st.passwordSet && <p className="a-warn">Vercel mein ADMIN_PASSWORD set karein (guide dekhein).</p>}
      <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus /><button>Login</button>{msg && <p className="a-warn">{msg}</p>}</form>);
  const save = async () => { const r = await api('/api/site', 'PUT', { content: c }); setMsg(r.ok ? (r.persistent ? 'Saved ✓' : 'Saved only temporarily — storage connect nahi hai!') : r.error); };
  const live = async (v) => { const r = await api('/api/site', 'PUT', { live: v }); r.ok && setSt({ ...st, live: v }); };
  const TABS = { dash: 'Dashboard', site: 'Site & Contact', nav: 'Menu (Navigation)', pages: 'Pages', menu: 'Food Menu', gallery: 'Gallery', posts: 'Blog', uc: 'Under Construction', inbox: `Inbox (${inbox.length})` };
  const part = { site: ['site', 'contact'], nav: ['nav'], pages: ['pages'], menu: ['menu'], gallery: ['gallery'], posts: ['posts'], uc: ['uc'] }[tab];
  return (
    <div className="a-app">
      <aside><h2>BAO:G Admin</h2>{Object.entries(TABS).map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}
        <a href="/?preview=1" target="_blank" rel="noreferrer">Preview site ↗</a><button onClick={async () => { await api('/api/auth', 'DELETE'); load(); }}>Logout</button></aside>
      <section>
        {!st.persistent && <p className="a-warn">Database connect nahi hai — changes save nahi rahengi. Guide ka Phase 3 dekhein.</p>}
        {tab === 'dash' && <div><h1>Dashboard</h1><div className="a-card"><h3>Website status: {st.live ? 'LIVE' : 'Under Construction'}</h3>
          <button className="a-big" onClick={() => live(!st.live)}>{st.live ? 'Switch to Under Construction' : 'Go Live'}</button></div>
          <p>Inbox mein {inbox.length} messages/bookings hain.</p></div>}
        {part && <div><h1>{TABS[tab]}</h1>{part.map((p) => <Ed key={p} k={p} v={c[p]} set={(n) => setC({ ...c, [p]: n })} />)}</div>}
        {tab === 'inbox' && <div><h1>Inbox</h1>{inbox.map((m) => <div className="a-item" key={m.id}><div className="a-bar"><b>{m.type} — {m.name}</b><button onClick={async () => { await api(`/api/inbox?id=${m.id}`, 'DELETE'); load(); }}>✕</button></div>
          <p>{[m.phone, m.email, m.date, m.time, m.guests && `${m.guests} guests`, m.city].filter(Boolean).join(' · ')}</p><p>{m.message}</p><small>{new Date(m.at).toLocaleString()}</small></div>)}</div>}
        {part && <div className="a-save"><button onClick={save}>Save changes</button> {msg}</div>}
      </section>
    </div>);
}
