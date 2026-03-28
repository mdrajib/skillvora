const express = require('express');
const router  = express.Router();

const services = [
  { icon:'🤖', title:'AI Consulting', desc:'We assess your business, identify AI opportunities, and build a practical roadmap to implement AI solutions that deliver measurable ROI.', tags:['ChatGPT Integration','Process Automation','AI Strategy','ROI Analysis'] },
  { icon:'⚙️', title:'Odoo ERP Implementation', desc:'Full-cycle Odoo ERP implementation from requirement analysis to go-live support — customised for your business processes.', tags:['Odoo 17','Custom Modules','Data Migration','Training & Support'] },
  { icon:'🔗', title:'System Integration', desc:'Connect your existing tools and systems with modern APIs, automation platforms, and AI-powered workflows.', tags:['REST API','Zapier / Make','WhatsApp Bot','SMS Integration'] },
  { icon:'📊', title:'Business Intelligence', desc:'Transform raw data into actionable insights with custom dashboards, automated reports, and AI-driven analytics.', tags:['Custom Dashboards','Power BI','Automated Reports','Predictive Analytics'] },
  { icon:'🌐', title:'Digital Transformation', desc:'End-to-end digital transformation consulting — from legacy system migration to cloud infrastructure and modern workflows.', tags:['Cloud Migration','Process Redesign','Team Training','Change Management'] },
  { icon:'📱', title:'Custom Software Development', desc:'Full-stack web and mobile application development powered by modern frameworks and AI-assisted development workflows.', tags:['Node.js','Flutter','React','Python / Django'] },
];

const projects = [
  { id:1, title:'ZKTeco HR Attendance Suite', client:'Multiple Clients', desc:'A custom Odoo module that integrates ZKTeco biometric attendance devices directly with Odoo HR — eliminating manual data entry and saving hours of admin work daily.', tags:['Odoo','Python','ZKTeco','HR Automation'], youtube_id:'', result:'100% automated attendance sync across 5 client companies' },
  { id:2, title:'Healthcare Service Management System', client:'Avante Aesthetic Clinic', desc:'A complete healthcare management system built on Odoo — patient records, appointment scheduling, billing, and lab management all in one platform.', tags:['Odoo','Healthcare','ERP','Custom Module'], youtube_id:'', result:'40% reduction in administrative workload' },
  { id:3, title:'MuthoSMS — Bulk SMS Integration', client:'DOT BD Solutions', desc:'An Odoo module enabling bulk SMS campaigns directly from Odoo CRM — used for lead nurturing, event marketing, and customer communication.', tags:['Odoo','SMS API','CRM','Marketing Automation'], youtube_id:'', result:'3x improvement in lead engagement rates' },
];

router.get('/', (req, res) => {
  res.render('pages/agency', {
    title: 'AI Agency Services — Skillvora',
    description: 'Skillvora\'s AI Agency helps businesses in Bangladesh implement AI solutions, Odoo ERP, and digital transformation strategies.',
    services, projects, page: 'agency',
  });
});

module.exports = router;
