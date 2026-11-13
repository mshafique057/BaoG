import { useEffect, useState, lazy, Suspense } from 'react';
import UnderConstruction from './UnderConstruction.jsx';
import Site from './Site.jsx';
import { defaults } from './defaults.js';
const Admin = lazy(() => import('./Admin.jsx'));

export default function App() {
  const [state, setState] = useState(null);
  useEffect(() => {
    if (new URLSearchParams(location.search).get('preview')) sessionStorage.setItem('preview', '1');
    fetch('/api/site', { credentials: 'same-origin' }).then((r) => r.json()).catch(() => ({}))
      .then((d) => setState({ live: !!d.live, admin: !!d.admin, content: d.content || defaults }));
  }, []);
  if (!state) return <div className="s-splash">BAO:G</div>;
  if (location.pathname.startsWith('/admin')) return <Suspense fallback={<div className="s-splash">…</div>}><Admin /></Suspense>;
  const preview = state.admin && sessionStorage.getItem('preview');
  if (!state.live && !preview) return <UnderConstruction />;
  return <Site content={state.content} preview={!state.live} />;
}
