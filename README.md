# Skillvora Website

**Hungry to Learn. Powered by AI.**

Bangladesh's premier AI Education & Agency platform — built with Node.js, Express, EJS, Sequelize & MySQL.

---

## 🗂 Project Structure

```
skillvora/
├── app.js                    ← Express entry point
├── package.json
├── .env                      ← Environment variables (copy from .env.example)
├── database.sql              ← MySQL schema + seed data
│
├── config/
│   └── database.js           ← Sequelize MySQL connection
│
├── models/
│   ├── Course.js
│   ├── Mentor.js
│   ├── Contact.js
│   └── index.js              ← Associations
│
├── routes/
│   ├── home.js
│   ├── courses.js
│   ├── mentors.js
│   ├── agency.js
│   ├── about.js
│   └── contact.js
│
├── views/
│   ├── partials/
│   │   ├── head.ejs          ← SEO + meta tags
│   │   ├── navbar.ejs        ← Sticky navbar + mobile menu
│   │   └── footer.ejs        ← Footer + newsletter
│   └── pages/
│       ├── home.ejs
│       ├── courses.ejs
│       ├── course-detail.ejs
│       ├── mentors.ejs
│       ├── mentor-detail.ejs
│       ├── agency.ejs
│       ├── about.ejs
│       ├── contact.ejs
│       ├── 404.ejs
│       └── 500.ejs
│
└── public/
    ├── css/style.css         ← Full Skillvora design system
    ├── js/main.js            ← Animations, navbar, FAQ, counter
    └── images/               ← Add your images here
```

---

## 🚀 Setup & Installation

### Step 1 — Clone & Install
```bash
git clone https://github.com/yourname/skillvora.git
cd skillvora
npm install
```

### Step 2 — Configure Environment
```bash
cp .env.example .env
# Edit .env with your database credentials and settings
```

### Step 3 — Setup MySQL Database
```bash
# Login to MySQL
mysql -u root -p

# Run the SQL setup file
source /path/to/skillvora/database.sql
# OR:
mysql -u root -p < database.sql
```

### Step 4 — Add Images
Add your images to `/public/images/`:
```
public/images/
├── favicon.png           (32x32)
├── icon-512.png          (512x512 - from brand package)
├── og-image.png          (1200x630 - for social sharing)
├── logo.png              (horizontal wordmark)
├── mentor-rafit.jpg      (400x400)
├── mentor-rajib.jpg      (400x400)
├── course-odoo.jpg       (800x450)
├── course-ai.jpg         (800x450)
└── course-chatgpt.jpg    (800x450)
```

### Step 5 — Start Development Server
```bash
npm run dev
# Server runs at http://localhost:3000
```

### Step 6 — Production Start
```bash
npm start
```

---

## 🌐 Pages & Routes

| Route | Page |
|-------|------|
| `/` | Home page |
| `/courses` | All courses listing |
| `/courses/:slug` | Course detail + enroll |
| `/mentors` | Mentor listing |
| `/mentors/:slug` | Mentor profile |
| `/agency` | AI Agency services + projects |
| `/about` | Brand story + mission |
| `/contact` | Contact form + map |

---

## 🎨 Design System

**Colors (CSS Variables)**
```css
--vora-purple:  #7F77DD   /* Primary brand */
--deep-nexus:   #26215C   /* Authority/dark */
--skill-teal:   #1D9E75   /* Growth/success */
--hunger-amber: #EF9F27   /* Energy/urgency */
--dark-bg:      #0F0D20   /* Page background */
```

**Fonts**
- Display/Headings: `Syne` (Google Fonts)
- Body: `DM Sans` (Google Fonts)
- Code: `JetBrains Mono`

---

## 🔧 Customisation

### Adding a new course (via routes/courses.js)
```javascript
{
  id: 4,
  slug: 'your-course-slug',
  title: 'Your Course Title',
  short_desc: 'Short description here.',
  duration: '15 Hours',
  level: 'Beginner',  // Beginner | Intermediate | Advanced
  price: '৳ 2,500',
  category: 'AI',     // AI | ERP
  mentor: 'Mentor Name',
  is_featured: true,
  overview: 'Full course overview text...',
  curriculum: [
    { module: 'Module 1', lessons: ['Lesson 1', 'Lesson 2'] }
  ],
  faq: [
    { q: 'Question?', a: 'Answer.' }
  ]
}
```

### Connecting to MySQL (when ready)
In `routes/courses.js`, replace sample data with:
```javascript
const { Course, Mentor } = require('../models');
const courses = await Course.findAll({ where: { is_published: true }, include: ['mentor'] });
```

---

## 🚢 Deployment

### Option A — VPS (Ubuntu + Nginx)

1. Install Node.js 18+, MySQL, Nginx, PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mysql-server nginx
sudo npm install -g pm2
```

2. Upload project & install dependencies
```bash
pm2 start app.js --name skillvora
pm2 startup
pm2 save
```

3. Nginx config `/etc/nginx/sites-available/skillvora`
```nginx
server {
    listen 80;
    server_name myskillvora.com www.myskillvora.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. Enable & SSL with Certbot
```bash
sudo ln -s /etc/nginx/sites-available/skillvora /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d myskillvora.com -d www.myskillvora.com
```

### Option B — Railway / Render (easiest)
1. Push to GitHub
2. Connect to Railway or Render
3. Add environment variables from `.env`
4. Add a MySQL plugin
5. Deploy — done!

### Option C — cPanel Shared Hosting
1. Enable Node.js in cPanel
2. Upload via File Manager or Git
3. Set `app.js` as entry point
4. Add MySQL DB via cPanel and import `database.sql`

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.18 | Web framework |
| EJS | 3.1 | Template engine |
| Sequelize | 6.35 | ORM |
| MySQL2 | 3.6 | Database driver |
| TailwindCSS | CDN | Utility CSS |
| DM Sans | Google | Body font |
| Syne | Google | Display font |

---

## 📞 Support

**Website:** myskillvora.com
**Email:** hello@myskillvora.com
**Brand:** Skillvora — *Hungry to Learn. Powered by AI.*

---

© 2025 Skillvora. Built in 🇧🇩 Bangladesh.
