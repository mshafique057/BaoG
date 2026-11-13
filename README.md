# BAO:G The Dining Residence — Complete Website + Admin CMS

Modern, spacious, animated React + Vite website for **BAO:G The Dining Residence (Bradford)** with built-in **Under Construction (Coming Soon)** mode, **Full Live Restaurant Website**, and **Admin CMS Panel**.

## Features Included
1. **Default Under Construction Mode (`coming_soon`)**:
   - Opens with the official BAO:G Warm White emblem, Urdu calligraphy (`باؤجی`), 4-petal floral divider, and `COMING SOON` banner.
2. **Full Live Luxury Restaurant Website (`live`)**:
   - **Home**: Hero section, 3-pillar BAO:G Experience, 4-dish Signature Selection preview, and Editorial Quote.
   - **About Us**: Brand story, heritage philosophy, and 3 key distinction pillars.
   - **Menu**: Category filter pills (`Royal Starters`, `Signature Mains`, `Charcoal Grills`, `Artisan Desserts & Drinks`) + spacious 2-column dish grid.
   - **Gallery**: Visual showcase cards with support for direct photo uploads or URLs.
   - **Booking**: Table reservation form connected to the Admin Inbox.
   - **Franchise**: Partnership pillars + Franchise inquiry form connected to the Admin Inbox.
   - **Contact Us**: Pre-filled with dummy Bradford UK contact details (editable anytime from Admin) + direct message form.
   - **Journal / Blog + Custom Pages**: Can be toggled visible/hidden from the Admin Panel anytime, with full article publishing.
3. **Complete Admin CMS Panel (`#admin` or Footer "Admin Panel" button)**:
   - **Default PIN**: `1234` (changeable inside Admin -> Site Mode & Coming Soon).
   - **1-Click Master Toggle**: Switch between **Under Construction** and **Live Website** anytime.

## Run Locally
```bash
npm install
npm run dev
```

## Deploy on GitHub + Vercel
1. Upload/push all project files to your GitHub repository.
2. Connect the repository on Vercel (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
