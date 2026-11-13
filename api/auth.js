import { checkPassword, makeCookie, clearCookie, hasPassword, needJson } from './_lib.js';
export default async function handler(req, res) {
  if (req.method === 'DELETE') { res.setHeader('Set-Cookie', clearCookie()); return res.status(200).json({ ok: true }); }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!needJson(req, res)) return;
  if (!hasPassword()) return res.status(500).json({ error: 'ADMIN_PASSWORD Vercel mein set nahi hai.' });
  if (!checkPassword(req.body?.password)) { await new Promise((r) => setTimeout(r, 800)); return res.status(401).json({ error: 'Password ghalat hai.' }); }
  res.setHeader('Set-Cookie', makeCookie());
  return res.status(200).json({ ok: true });
}
