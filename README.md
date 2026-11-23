# Kitchen33 & Bakery website

Next.js 16 (App Router, Cache Components) + Tailwind CSS 4, built from the "Version 01 – Fresh Community" mockups.

## Run it

```bash
cp .env.example .env.local   # set ADMIN_PASSWORD and SESSION_SECRET
npm install
npm run dev                  # http://localhost:3000
```

- Public pages: `/`, `/about`, `/programs`, `/get-involved`, `/events`, `/contact`
- Content dashboard: `/admin` (password from `ADMIN_PASSWORD`)

## How content works

All page copy, images, links, business details and events live in `data/content.json`.
The dashboard edits that file through validated Server Actions. Saving invalidates the
`site-content` cache tag, so the public pages update immediately.

- **Images** uploaded in the dashboard are stored in `data/uploads/` and served from `/uploads/<file>`.
- **Contact form** submissions are stored in `data/messages.json` and appear under **Messages** in the dashboard.
- **Events** only appear on the site when they are marked *Published* and dated today or later.

## Deploying

Content is file-based, so the server needs a **persistent, writable disk** (a VPS, Docker
volume, Render/Fly/Railway disk, etc.). Point `DATA_DIR` at it and copy `data/content.json`
there on first deploy. Serverless hosts with read-only/ephemeral filesystems (e.g. Vercel)
would need the storage swapped for a database or blob store; only `src/lib/content.ts`,
`src/lib/messages.ts` and the upload action touch the disk.

## Content accuracy notes

Business details were checked against kitchen33.org, Richmond Magazine (Nov 2022) and Pie
Insurance's Kitchen33 profile. The mockups' AI-generated copy (Richmond address, 788-0033
phone, info@ email, workforce-training program, specific event dates) was **not** used.

- Hero photos (`public/images/hero-*.jpg`) and the About-page storefront
  (`about-storefront.jpg`) are the higher-resolution images supplied. The storefront is
  still an AI concept, not the real building. Program-card and event photos are still
  low-resolution crops from the concept mockups and are placeholders.
- Each hero has a "Photo focus" setting (top/center/bottom) in the dashboard to control cropping.
- Editing `data/content.json` by hand? Restart the server afterwards; only dashboard saves
  refresh the content cache automatically.
- The three events are unpublished **samples**. Edit and publish real ones from `/admin/events`.
- Sources disagree on the street number used for online ordering (Toast URL says 13151);
  the site uses 13155 Mountain Road, as on kitchen33.org.
