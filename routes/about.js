const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('pages/about', {
    title: 'About Skillvora — Our Story, Mission & Vision',
    description: 'Skillvora was born from a hunger to bring world-class AI education and agency services to Bangladesh.',
    page: 'about',
  });
});

module.exports = router;
