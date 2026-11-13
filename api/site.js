import { get, set, persistent, isAdmin, needJson, hasPassword } from './_lib.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    const raw = await get('content');
    return res.status(200).json({ live: (await get('live')) === '1', content: raw ? JSON.parse(raw) : null, admin: isAdmin(req), persistent, passwordSet: hasPassword() });
  }
  if (req.method === 'PUT') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Login required' });
    if (!needJson(req, res)) return;
    const { content, live } = req.body || {};
    if (typeof live === 'boolean') await set('live', live ? '1' : '0');
    if (content) {
      const s = JSON.stringify(content);
      if (s.length > 900000) return res.status(413).json({ error: 'Content too large' });
      await set('content', s);
    }
    return res.status(200).json({ ok: true, persistent });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
