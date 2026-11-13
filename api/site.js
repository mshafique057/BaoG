// Vercel Serverless Backend API (/api/site)
import { INITIAL_SITE_DATA } from '../src/defaultSiteData.js';

let memoryStore = {
  siteData: INITIAL_SITE_DATA,
  inquiries: [],
  updatedAt: new Date().toISOString(),
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(memoryStore);
  }
  if (req.method === 'POST') {
    const body = req.body || {};
    if (body.siteData) {
      memoryStore.siteData = body.siteData;
    }
    if (body.inquiries) {
      memoryStore.inquiries = body.inquiries;
    }
    if (body.newInquiry) {
      memoryStore.inquiries = [body.newInquiry, ...(memoryStore.inquiries || [])];
    }
    memoryStore.updatedAt = new Date().toISOString();
    return res.status(200).json({ success: true, data: memoryStore });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
