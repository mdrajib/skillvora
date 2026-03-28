const express = require('express');
const router  = express.Router();

// Sample data (replace with DB queries)
const featuredCourses = [
  { id:1, slug:'odoo-functional-training', title:'Odoo Functional Training', short_desc:'Master Odoo ERP from scratch — sales, inventory, accounting & more.', duration:'40 Hours', level:'Beginner', price:'৳ 4,500', category:'ERP', thumbnail:'/images/course-odoo.jpg', mentor:'Rafiur Rahman Rafit' },
  { id:2, slug:'ai-for-business', title:'AI for Business Leaders', short_desc:'Practical AI tools and strategies to transform your business operations.', duration:'20 Hours', level:'Intermediate', price:'৳ 3,500', category:'AI', thumbnail:'/images/course-ai.jpg', mentor:'MD Rajibul Islam' },
  { id:3, slug:'chatgpt-mastery', title:'ChatGPT & Prompt Engineering', short_desc:'Unlock the full power of generative AI for work and business.', duration:'12 Hours', level:'Beginner', price:'৳ 2,000', category:'AI', thumbnail:'/images/course-chatgpt.jpg', mentor:'Rafiur Rahman Rafit' },
];

const featuredMentors = [
  { id:1, slug:'rafiur-rahman-rafit', name:'Rafiur Rahman Rafit', title:'Technical & Functional Odoo Consultant', short_bio:'ERP consultant at DOT BD Solutions with expertise in Odoo, AI integration, and full-stack development.', photo:'/images/mentor-rafit.jpg', expertise:'Odoo ERP · AI · Full-Stack Dev' },
  { id:2, slug:'md-rajibul-islam', name:'MD Rajibul Islam', title:'CEO — DOT BD Solutions', short_bio:'Entrepreneur and AI strategist leading digital transformation projects across Bangladesh.', photo:'/images/mentor-rajib.jpg', expertise:'AI Strategy · Business · ERP' },
];

const testimonials = [
  { name:'Tanvir Ahmed', role:'Business Owner', text:'Skillvora completely transformed how we use ERP. The Odoo training was practical, deep, and incredibly well taught.', rating:5, avatar:'TA' },
  { name:'Nusrat Jahan', role:'Fresh Graduate', text:'I landed my first tech job within 2 months of completing the AI course. The mentorship here is unmatched.', rating:5, avatar:'NJ' },
  { name:'Arif Hossain', role:'IT Manager', text:'The AI consulting team helped us automate our reporting process. We saved 20+ hours per week immediately.', rating:5, avatar:'AH' },
  { name:'Sumaiya Islam', role:'Entrepreneur', text:'Premium quality education at an affordable price. The instructors genuinely care about your progress.', rating:5, avatar:'SI' },
];

router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'Skillvora — Hungry to Learn. Powered by AI.',
    description: 'Skillvora is Bangladesh\'s premier AI Education & Agency platform. Learn Odoo, AI, and business automation from industry experts.',
    featuredCourses,
    featuredMentors,
    testimonials,
    page: 'home',
  });
});

module.exports = router;
