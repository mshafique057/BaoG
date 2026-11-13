import { get, set, isAdmin, needJson } from './_lib.js';
const clip = (v, n = 1000) => String(v ?? '').slice(0, n);
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const list = JSON.parse((await get('inbox')) || '[]');
  if (req.method === 'POST') {
    if (!needJson(req, res)) return;
    const b = req.body || {};
    if (b.website) return res.status(200).json({ ok: true }); // honeypot
    if (!['booking', 'contact', 'franchise'].includes(b.type) || !clip(b.name) || !(clip(b.phone) || clip(b.email))) return res.status(400).json({ error: 'Name aur phone/email zaroori hain.' });
    const f = {}; for (const k of ['name', 'phone', 'email', 'date', 'time', 'guests', 'city', 'message']) if (b[k]) f[k] = clip(b[k], k === 'message' ? 2000 : 200);
    list.unshift({ id: Date.now().toString(36), type: b.type, at: new Date().toISOString(), ...f });
    await set('inbox', JSON.stringify(list.slice(0, 300)));
    return res.status(200).json({ ok: true });
  }
  if (!isAdmin(req)) return res.status(401).json({ error: 'Login required' });
  if (req.method === 'GET') return res.status(200).json({ items: list });
  if (req.method === 'DELETE') { await set('inbox', JSON.stringify(list.filter((x) => x.id !== req.query.id))); return res.status(200).json({ ok: true }); }
  return res.status(405).json({ error: 'Method not allowed' });
}
