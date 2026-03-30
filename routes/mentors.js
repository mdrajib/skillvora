const express = require('express');
const router  = express.Router();
const { Mentor, Course } = require('../models');

router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.findAll({
      include: [{
        model: Course,
        as: 'courses',
        where: { is_published: true },
        required: false,
        attributes: ['id', 'title']
      }],
      order: [['is_featured', 'DESC'], ['id', 'ASC']],
    });

    res.render('pages/mentors', {
      title: 'Our Mentors — Skillvora',
      description: 'Learn from Bangladesh\'s leading AI and ERP experts at Skillvora.',
      mentors, page: 'mentors',
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).render('pages/500', {
      title: '500 — Server Error',
      description: 'An error occurred while loading mentors.',
      page: 'error',
    });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const mentor = await Mentor.findOne({
      where: { slug: req.params.slug },
      include: [{
        model: Course,
        as: 'courses',
        where: { is_published: true },
        required: false,
        attributes: ['id', 'title', 'slug', 'short_desc', 'category', 'level', 'duration', 'price']
      }],
    });

    if (!mentor) {
      return res.status(404).render('pages/404', {
        title: '404 — Mentor Not Found',
        description: 'The mentor profile you are looking for does not exist.',
        page: '404',
      });
    }

    res.render('pages/mentor-detail', {
      title: `${mentor.name} — Skillvora`,
      description: mentor.short_bio,
      mentor, page: 'mentors',
    });
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).render('pages/500', {
      title: '500 — Server Error',
      description: 'An error occurred while loading the mentor profile.',
      page: 'error',
    });
  }
});

module.exports = router;
