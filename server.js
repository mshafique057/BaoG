// Express Backend Server (Optional local/VPS persistence)
import express from 'express';
import fs from 'fs';
import { INITIAL_SITE_DATA } from './src/defaultSiteData.js';

const app = express();
app.use(express.json({ limit: '10mb' }));
const DB_FILE = './cms_database.json';

function readDb() {
  if (fs.existsSync(DB_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    } catch {
      // fallback below
    }
  }
  return {
    siteData: INITIAL_SITE_DATA,
    inquiries: [],
    updatedAt: new Date().toISOString(),
  };
}

app.get('/api/site', (req, res) => {
  return res.json(readDb());
});

app.post('/api/site', (req, res) => {
  const current = readDb();
  const body = req.body || {};
  const next = {
    siteData: body.siteData || current.siteData,
    inquiries: body.inquiries || current.inquiries || [],
    updatedAt: new Date().toISOString(),
  };
  if (body.newInquiry) {
    next.inquiries = [body.newInquiry, ...next.inquiries];
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(next, null, 2));
  return res.json({ success: true, data: next });
});

app.listen(5000, () => console.log('BAO:G CMS Server running on port 5000'));
