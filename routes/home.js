const express = require('express');
const router  = express.Router();
const { Course, Mentor } = require('../models');

const testimonials = [
  { name:'Tanvir Ahmed', role:'Business Owner', text:'Skillvora completely transformed how we use ERP. The Odoo training was practical, deep, and incredibly well taught.', rating:5, avatar:'TA' },
  { name:'Nusrat Jahan', role:'Fresh Graduate', text:'I landed my first tech job within 2 months of completing the AI course. The mentorship here is unmatched.', rating:5, avatar:'NJ' },
  { name:'Arif Hossain', role:'IT Manager', text:'The AI consulting team helped us automate our reporting process. We saved 20+ hours per week immediately.', rating:5, avatar:'AH' },
  { name:'Sumaiya Islam', role:'Entrepreneur', text:'Premium quality education at an affordable price. The instructors genuinely care about your progress.', rating:5, avatar:'SI' },
];

router.get('/', async (req, res) => {
  try {
    const featuredCourses = await Course.findAll({
      where: { is_featured: true, is_published: true },
      include: [{ model: Mentor, as: 'mentor', attributes: ['id', 'name', 'photo', 'slug'] }],
      limit: 3,
      order: [['created_at', 'DESC']],
    });

    const featuredMentors = await Mentor.findAll({
      where: { is_featured: true },
      limit: 2,
      order: [['id', 'ASC']],
    });

    res.render('pages/home', {
      title: 'Skillvora — Hungry to Learn. Powered by AI.',
      description: 'Skillvora is Bangladesh\'s premier AI Education & Agency platform. Learn Odoo, AI, and business automation from industry experts.',
      featuredCourses,
      featuredMentors,
      testimonials,
      page: 'home',
    });
  } catch (error) {
    console.error('Error loading home page:', error);
    res.status(500).render('pages/500', {
      title: '500 — Server Error',
      description: 'An error occurred while loading the page.',
      page: 'error',
    });
  }
});

module.exports = router;
