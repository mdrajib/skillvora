-- ── Skillvora Database Setup ──────────────────────────────────────────────────
-- Run this file in MySQL to create and seed the database

CREATE DATABASE IF NOT EXISTS skillvora_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE skillvora_db;

-- ── MENTORS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mentors (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(150) NOT NULL,
  slug         VARCHAR(170) NOT NULL UNIQUE,
  title        VARCHAR(200),
  expertise    VARCHAR(300),
  bio          TEXT,
  short_bio    VARCHAR(300),
  photo        VARCHAR(300),
  experience   VARCHAR(100),
  linkedin     VARCHAR(300),
  twitter      VARCHAR(300),
  youtube      VARCHAR(300),
  website      VARCHAR(300),
  is_featured  TINYINT(1) DEFAULT 0,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO mentors (name, slug, title, expertise, short_bio, experience, is_featured) VALUES
('Rafiur Rahman Rafit', 'rafiur-rahman-rafit', 'Technical & Functional Odoo Consultant', 'Odoo ERP · AI Integration · Full-Stack Development', 'ERP consultant at DOT BD Solutions with expertise in Odoo, AI integration, and full-stack development.', '5+ Years', 1),
('MD Rajibul Islam', 'md-rajibul-islam', 'CEO — DOT BD Solutions Limited', 'AI Strategy · Business Transformation · ERP Consulting', 'Entrepreneur and AI strategist leading digital transformation projects across Bangladesh.', '8+ Years', 1);

-- ── COURSES ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(200) NOT NULL,
  slug         VARCHAR(220) NOT NULL UNIQUE,
  description  TEXT,
  short_desc   VARCHAR(300),
  thumbnail    VARCHAR(300),
  duration     VARCHAR(80),
  level        ENUM('Beginner','Intermediate','Advanced') DEFAULT 'Beginner',
  price        DECIMAL(10,2) DEFAULT 0,
  currency     VARCHAR(10) DEFAULT 'BDT',
  category     VARCHAR(100),
  curriculum   JSON,
  faq          JSON,
  is_featured  TINYINT(1) DEFAULT 0,
  is_published TINYINT(1) DEFAULT 1,
  mentor_id    INT,
  enroll_url   VARCHAR(300),
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (mentor_id) REFERENCES mentors(id)
);

INSERT INTO courses (title, slug, short_desc, duration, level, price, currency, category, is_featured, mentor_id) VALUES
('Odoo Functional Training', 'odoo-functional-training', 'Master Odoo ERP from scratch — sales, inventory, accounting & more.', '40 Hours', 'Beginner', 4500.00, 'BDT', 'ERP', 1, 1),
('AI for Business Leaders', 'ai-for-business', 'Practical AI tools and strategies to transform your business operations.', '20 Hours', 'Intermediate', 3500.00, 'BDT', 'AI', 1, 2),
('ChatGPT & Prompt Engineering', 'chatgpt-mastery', 'Unlock the full power of generative AI for work and business.', '12 Hours', 'Beginner', 2000.00, 'BDT', 'AI', 1, 1);

-- ── CONTACTS ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(150) NOT NULL,
  email    VARCHAR(200) NOT NULL,
  phone    VARCHAR(30),
  subject  VARCHAR(200),
  message  TEXT NOT NULL,
  status   ENUM('new','read','replied') DEFAULT 'new',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT 'Database setup complete! ✓' AS status;
