const express = require('express');
const router  = express.Router();
const { Contact } = require('../models');
const { sendWhatsApp, normalisePhone } = require('../services/whatsapp');

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
    // ── Save to database ───────────────────────────────────────────────────────
    await Contact.create({ name, email, phone, subject, message });

    // ── Send WhatsApp welcome message ──────────────────────────────────────────
    const waPhone = normalisePhone(phone);
    if (waPhone) {
      // templateParams maps to {{1}}, {{2}}, {{3}} in your Meta template body.
      // Adjust the order/count to match exactly what your template expects.
      const templateParams = [name, subject || 'your enquiry'];

      const fallbackText =
        `Hello ${name}! 👋\n\n` +
        `Thank you for contacting *Skillvora*. We have received your message` +
        `${subject ? ` regarding *${subject}*` : ''} and will get back to you within 24 hours.\n\n` +
        `_Hungry to Learn. Powered by AI._ 🚀\n` +
        `🌐 myskillvora.com`;

      // Fire-and-forget — a WhatsApp failure should not block the user's redirect
      sendWhatsApp(waPhone, templateParams, fallbackText).catch(err => {
        console.error('[WhatsApp] Failed to send welcome message:', err.message);
      });
    }

    res.redirect('/contact?success=true');
  } catch (err) {
    console.error('[Contact] Form submission error:', err);
    res.redirect('/contact?error=true');
  }
});

module.exports = router;
