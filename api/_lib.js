import crypto from 'node:crypto';
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
export const persistent = !!(URL_ && TOKEN);
const mem = globalThis.__mem || (globalThis.__mem = {});
export async function get(key) {
  if (!persistent) return mem[key] ?? null;
  const r = await fetch(URL_, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify(['GET', key]) });
  const j = await r.json(); return j.result ?? null;
}
export async function set(key, val) {
  if (!persistent) { mem[key] = val; return; }
  await fetch(URL_, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify(['SET', key, val]) });
}
const secret = () => process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
const sign = (s) => crypto.createHmac('sha256', secret()).update(s).digest('hex');
export const hasPassword = () => !!process.env.ADMIN_PASSWORD;
export function checkPassword(p) {
  const a = crypto.createHash('sha256').update(String(p || '')).digest();
  const b = crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD || '\0none').digest();
  return hasPassword() && crypto.timingSafeEqual(a, b);
}
export function makeCookie() {
  const exp = Date.now() + 7 * 864e5;
  return `bg_admin=${exp}.${sign('a' + exp)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${7 * 86400}`;
}
export const clearCookie = () => 'bg_admin=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0';
export function isAdmin(req) {
  if (!hasPassword()) return false;
  const m = /(?:^|;\s*)bg_admin=(\d+)\.([a-f0-9]+)/.exec(req.headers.cookie || '');
  if (!m || Number(m[1]) < Date.now()) return false;
  const good = sign('a' + m[1]);
  return good.length === m[2].length && crypto.timingSafeEqual(Buffer.from(good), Buffer.from(m[2]));
}
export function needJson(req, res) {
  if (!String(req.headers['content-type'] || '').includes('application/json')) { res.status(415).json({ error: 'JSON only' }); return false; }
  return true;
}
