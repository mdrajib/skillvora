require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// ── Security & Performance ────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// ── Session ───────────────────────────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET || 'skillvora_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// ── View Engine ───────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Static Files ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Global Template Variables ─────────────────────────────────────────────────
app.use((req, res, next) => {
  res.locals.siteName = process.env.SITE_NAME || 'Skillvora';
  res.locals.siteUrl  = process.env.SITE_URL  || 'http://localhost:3000';
  res.locals.currentPath = req.path;
  next();
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/',          require('./routes/home'));
app.use('/courses',   require('./routes/courses'));
app.use('/mentors',   require('./routes/mentors'));
app.use('/agency',    require('./routes/agency'));
app.use('/about',     require('./routes/about'));
app.use('/contact',   require('./routes/contact'));

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: '404 — Page Not Found',
    description: 'The page you are looking for does not exist.',
    page: '404',
  });
});

// ── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/500', {
    title: '500 — Server Error',
    description: 'Something went wrong. Please try again.',
    page: '500',
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Skillvora running at http://localhost:${PORT}\n`);
});

module.exports = app;
