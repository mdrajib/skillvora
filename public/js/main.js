/* ── Skillvora Main JS ─────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ────────────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ─────────────────────────────────────────────────────────────
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const hamburgerSpans = document.querySelectorAll('.hamburger span');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburgerSpans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
      hamburgerSpans[1].style.opacity   = isOpen ? '0' : '1';
      hamburgerSpans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburgerSpans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ── Scroll reveal ────────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
  }

  // ── Scroll to top ────────────────────────────────────────────────────────────
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── FAQ accordion ────────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const icon   = btn.querySelector('.faq-icon');
      const isOpen = answer.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('open'));

      // Open this one
      if (!isOpen) {
        answer.classList.add('open');
        icon.classList.add('open');
      }
    });
  });

  // ── Curriculum accordion ─────────────────────────────────────────────────────
  document.querySelectorAll('.curriculum-header').forEach(header => {
    header.addEventListener('click', () => {
      const lessons = header.nextElementSibling;
      const icon    = header.querySelector('.curriculum-toggle');
      if (lessons) {
        const isOpen = lessons.classList.toggle('open');
        if (icon) icon.textContent = isOpen ? '−' : '+';
      }
    });
  });

  // ── Counter animation ────────────────────────────────────────────────────────
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const dur    = 1800;
          const step   = 16;
          const inc    = target / (dur / step);
          let current  = 0;
          const timer  = setInterval(() => {
            current += inc;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current) + suffix;
          }, step);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  // ── Smooth anchor links ──────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Contact form validation ──────────────────────────────────────────────────
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const name    = contactForm.querySelector('[name="name"]');
      const email   = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');
      let valid = true;

      [name, email, message].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#E24B4A';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (email && !/\S+@\S+\.\S+/.test(email.value)) {
        email.style.borderColor = '#E24B4A';
        valid = false;
      }

      if (!valid) e.preventDefault();
    });
  }

  // ── Newsletter form ──────────────────────────────────────────────────────────
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn   = newsletterForm.querySelector('button');
      if (input && input.value.trim()) {
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#1D9E75';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  // ── Typewriter for hero ──────────────────────────────────────────────────────
  const typeTarget = document.querySelector('.typewriter');
  if (typeTarget) {
    const words  = ['AI Education.', 'AI Agency.', 'Real Results.'];
    let wi = 0, ci = 0, deleting = false;
    const type = () => {
      const word = words[wi];
      typeTarget.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1600); return; }
      if (deleting && ci < 0)            { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
      setTimeout(type, deleting ? 50 : 90);
    };
    type();
  }

});
