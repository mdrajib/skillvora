const express = require('express');
const router  = express.Router();
const { Course, Mentor } = require('../models');

router.get('/', async (req, res) => {
  try {
    const { category, level } = req.query;
    const where = { is_published: true };
    if (category) where.category = category;
    if (level) where.level = level;

    const courses = await Course.findAll({
      where,
      include: [{ model: Mentor, as: 'mentor', attributes: ['id', 'name', 'photo', 'slug'] }],
      order: [['is_featured', 'DESC'], ['created_at', 'DESC']],
    });

    res.render('pages/courses', {
      title: 'Explore Courses — Skillvora',
      description: 'Browse AI, Odoo, and business automation courses designed for professionals and entrepreneurs in Bangladesh.',
      courses, category, level, page: 'courses',
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).render('pages/500', {
      title: '500 — Server Error',
      description: 'An error occurred while loading courses.',
      page: 'error',
    });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({
      where: { slug: req.params.slug, is_published: true },
      include: [{ model: Mentor, as: 'mentor' }],
    });

    if (!course) {
      return res.status(404).render('pages/404', {
        title: '404 — Course Not Found',
        description: 'The course you are looking for does not exist.',
        page: '404',
      });
    }

    res.render('pages/course-detail', {
      title: `${course.title} — Skillvora`,
      description: course.short_desc,
      course, mentor: course.mentor, page: 'courses',
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).render('pages/500', {
      title: '500 — Server Error',
      description: 'An error occurred while loading the course.',
      page: 'error',
    });
  }
});

module.exports = router;
