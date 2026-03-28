const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('pages/contact', {
    title: 'Contact Skillvora — Get In Touch',
    description: 'Reach out to Skillvora for courses, AI consulting, or partnership inquiries.',
    success: req.query.success,
    page: 'contact',
  });
});

router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    // Save to DB if sequelize is configured
    // const { Contact } = require('../models');
    // await Contact.create({ name, email, phone, subject, message });
    console.log('Contact form submission:', { name, email, subject });
    res.redirect('/contact?success=true');
  } catch (err) {
    console.error(err);
    res.redirect('/contact?error=true');
  }
});

module.exports = router;
