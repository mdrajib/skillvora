const express = require('express');
const router  = express.Router();

const mentors = [
  { id:1, slug:'rafiur-rahman-rafit', name:'Rafiur Rahman Rafit', title:'Technical & Functional Odoo Consultant', expertise:'Odoo ERP · AI Integration · Full-Stack Development', short_bio:'ERP consultant at DOT BD Solutions with expertise in Odoo, AI integration, and full-stack development.', bio:'Rafiur Rahman Rafit is a Technical & Functional Odoo Consultant at DOT BD Solutions Limited, an Official Odoo Ready Partner in Bangladesh. With deep expertise in Odoo ERP implementation, custom module development, and AI integration, Rafit has led numerous successful ERP projects across multiple industries. His broader technical background spans Django, PHP, Node.js, Flutter, server administration, and cybersecurity. He has published research in IoT and machine learning, and developed several notable Odoo modules including ZKTeco HR Attendance Suite, MuthoSMS Integration, and a Healthcare Service Management System.', photo:'/images/mentor-rafit.jpg', experience:'5+ Years', linkedin:'https://linkedin.com', youtube:'https://youtube.com', website:'https://rafiurrahmanrafit.com', courses:['Odoo Functional Training','ChatGPT & Prompt Engineering'], is_featured:true },
  { id:2, slug:'md-rajibul-islam', name:'MD Rajibul Islam', title:'CEO — DOT BD Solutions Limited', expertise:'AI Strategy · Business Transformation · ERP Consulting', short_bio:'Entrepreneur and AI strategist leading digital transformation projects across Bangladesh.', bio:'MD Rajibul Islam is the CEO of DOT BD Solutions Limited, an Official Odoo Ready Partner in Bangladesh. As an entrepreneur and AI strategist, Rajib has led digital transformation initiatives for clients across multiple industries. His focus is on democratising AI education and making enterprise technology accessible to businesses of all sizes in Bangladesh.', photo:'/images/mentor-rajib.jpg', experience:'8+ Years', linkedin:'https://linkedin.com', courses:['AI for Business Leaders'], is_featured:true },
];

router.get('/', (req, res) => {
  res.render('pages/mentors', {
    title: 'Our Mentors — Skillvora',
    description: 'Learn from Bangladesh\'s leading AI and ERP experts at Skillvora.',
    mentors, page: 'mentors',
  });
});

router.get('/:slug', (req, res) => {
  const mentor = mentors.find(m => m.slug === req.params.slug);
  if (!mentor) return res.status(404).render('pages/404', {
    title: '404 — Mentor Not Found',
    description: 'The mentor profile you are looking for does not exist.',
    page: '404',
  });
  res.render('pages/mentor-detail', {
    title: `${mentor.name} — Skillvora`,
    description: mentor.short_bio,
    mentor, page: 'mentors',
  });
});

module.exports = router;
