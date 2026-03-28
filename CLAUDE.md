# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start dev server with nodemon (auto-reload)
npm start       # Start production server
```

No linting, testing, or build steps are configured.

## Architecture

Skillvora is a server-rendered Node.js/Express MVC application — an AI education & agency platform targeting the Bangladesh market.

**Request flow:** `routes/*.js` → Sequelize model query (or inline sample data) → `res.render('pages/view', data)` → EJS template with `views/partials/` injected

**MVC layout:**
- `app.js` — Express entry point: middleware stack (helmet, compression, morgan, session, static files), route mounting, global error handlers (404/500)
- `config/database.js` — Sequelize connection with MySQL2, pool size 10
- `models/` — Sequelize models; `models/index.js` sets up associations (Mentor hasMany Course, Course belongsTo Mentor)
- `routes/` — One file per page; each exports an Express Router
- `views/pages/` — EJS page templates; `views/partials/` — `head.ejs`, `navbar.ejs`, `footer.ejs` included in every page
- `public/` — Static assets served from `/`; `css/style.css` is the full design system, `js/main.js` handles navbar scroll, mobile menu, FAQ accordion, and counter animations

**Global template variables** passed from `app.js` via `res.locals`: `siteName`, `siteUrl`, `currentPath`

## Database

MySQL via Sequelize. Schema + seed data in `database.sql`. Models use JSON column type for `curriculum` and `faq` fields on Course.

Environment config in `.env`:
```
DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
SESSION_SECRET
MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS
SITE_URL, SITE_NAME
```

## Routes

| Route | File |
|---|---|
| `/` | `routes/home.js` |
| `/courses`, `/courses/:slug` | `routes/courses.js` |
| `/mentors`, `/mentors/:slug` | `routes/mentors.js` |
| `/agency` | `routes/agency.js` |
| `/about` | `routes/about.js` |
| `/contact` (GET + POST) | `routes/contact.js` |

Most routes currently use inline sample data arrays rather than live DB queries — the Sequelize models exist and are ready to use.

## Design System

CSS custom properties in `public/css/style.css`:
- Colors: `--purple` (#7F77DD), `--deep-nexus` (#26215C), `--teal` (#1D9E75), `--amber` (#EF9F27)
- Fonts: Syne (display/headings), DM Sans (body), JetBrains Mono (code) — loaded via Google Fonts in `views/partials/head.ejs`
- Dark-mode-first design with gradient backgrounds
