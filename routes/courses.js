const express = require('express');
const router  = express.Router();

const allCourses = [
  { id:1, slug:'odoo-functional-training', title:'Odoo Functional Training', short_desc:'Master Odoo ERP from scratch — sales, inventory, accounting & HR.', duration:'40 Hours', level:'Beginner', price:'৳ 4,500', category:'ERP', thumbnail:'/images/course-odoo.jpg', mentor:'Rafiur Rahman Rafit', is_featured:true,
    overview:'This comprehensive Odoo training covers all core functional modules used in real business environments. You will go from zero knowledge to confidently managing a full ERP implementation.',
    curriculum:[
      { module:'Module 1: Introduction to Odoo', lessons:['What is ERP?','Odoo architecture','Setting up Odoo 17','Database & company setup'] },
      { module:'Module 2: Sales Module', lessons:['CRM & pipeline','Quotations & orders','Invoicing & payments','Customer management'] },
      { module:'Module 3: Inventory', lessons:['Product setup','Warehouse management','Stock moves & adjustments','Reporting'] },
      { module:'Module 4: Accounting', lessons:['Chart of accounts','Journal entries','Bank reconciliation','Financial reports'] },
      { module:'Module 5: HR & Payroll', lessons:['Employee management','Attendance & leaves','Payroll configuration','Appraisals'] },
    ],
    faq:[
      { q:'Do I need technical background?', a:'No. This is a functional training — no coding required.' },
      { q:'Will I get a certificate?', a:'Yes. A completion certificate from Skillvora is provided.' },
      { q:'Is this online or offline?', a:'Both options available. Online via Zoom + recorded sessions.' },
    ],
    mentor_id:1,
  },
  { id:2, slug:'ai-for-business', title:'AI for Business Leaders', short_desc:'Practical AI tools and strategies to transform your business operations.', duration:'20 Hours', level:'Intermediate', price:'৳ 3,500', category:'AI', thumbnail:'/images/course-ai.jpg', mentor:'MD Rajibul Islam', is_featured:true,
    overview:'A practical, no-nonsense course on implementing AI tools in your business. Perfect for managers, founders, and team leads who want to stay ahead of the curve.',
    curriculum:[
      { module:'Module 1: AI Foundations', lessons:['What is AI?','Current AI landscape','AI tools overview','Ethical AI use'] },
      { module:'Module 2: AI for Operations', lessons:['Process automation','ChatGPT for business','AI writing & content','Customer service AI'] },
      { module:'Module 3: AI Strategy', lessons:['Building an AI roadmap','ROI of AI','Team training','Implementation plan'] },
    ],
    faq:[
      { q:'Is this technical?', a:'No coding. Pure business strategy and tool usage.' },
      { q:'What tools are covered?', a:'ChatGPT, Gemini, Midjourney, Make.com, and more.' },
    ],
    mentor_id:2,
  },
  { id:3, slug:'chatgpt-mastery', title:'ChatGPT & Prompt Engineering', short_desc:'Unlock the full power of generative AI for work and business.', duration:'12 Hours', level:'Beginner', price:'৳ 2,000', category:'AI', thumbnail:'/images/course-chatgpt.jpg', mentor:'Rafiur Rahman Rafit', is_featured:true,
    overview:'Learn to write powerful prompts that get remarkable results from ChatGPT and other AI tools. From content creation to code generation.',
    curriculum:[
      { module:'Module 1: Prompt Basics', lessons:['How LLMs work','Prompt anatomy','Zero-shot vs few-shot','Common mistakes'] },
      { module:'Module 2: Advanced Prompting', lessons:['Chain of thought','Role prompting','Output formatting','System prompts'] },
      { module:'Module 3: Real Applications', lessons:['Content writing','Data analysis','Code generation','Email automation'] },
    ],
    faq:[
      { q:'Do I need ChatGPT Plus?', a:'Free version works for most exercises. Plus recommended.' },
    ],
    mentor_id:1,
  },
];

const mentors = [
  { id:1, name:'Rafiur Rahman Rafit', photo:'/images/mentor-rafit.jpg' },
  { id:2, name:'MD Rajibul Islam',    photo:'/images/mentor-rajib.jpg' },
];

router.get('/', (req, res) => {
  const { category, level } = req.query;
  let courses = [...allCourses];
  if (category) courses = courses.filter(c => c.category === category);
  if (level)    courses = courses.filter(c => c.level === level);

  res.render('pages/courses', {
    title: 'Explore Courses — Skillvora',
    description: 'Browse AI, Odoo, and business automation courses designed for professionals and entrepreneurs in Bangladesh.',
    courses, category, level, page: 'courses',
  });
});

router.get('/:slug', (req, res) => {
  const course = allCourses.find(c => c.slug === req.params.slug);
  if (!course) return res.status(404).render('pages/404', {
    title: '404 — Course Not Found',
    description: 'The course you are looking for does not exist.',
    page: '404',
  });
  const mentor = mentors.find(m => m.id === course.mentor_id);
  res.render('pages/course-detail', {
    title: `${course.title} — Skillvora`,
    description: course.short_desc,
    course, mentor, page: 'courses',
  });
});

module.exports = router;
