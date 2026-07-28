/* ============================================
   HIMworks Portfolio Script
   ============================================
   - Scroll reveal animations
   - Animated skill counters
   - Mobile navigation toggle
   - Back to top button
   - Navbar scroll effect
   - Smooth scrolling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================
  // NAVIGATION
  // ============================================

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.querySelectorAll('.hamburger-line').forEach(line => {
        line.classList.toggle('active');
      });
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.querySelectorAll('.hamburger-line').forEach(line => {
        line.classList.remove('active');
      });
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Navbar scroll effect
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after reveal for performance
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // ANIMATED SKILL COUNTERS
  // ============================================

  const skillLevels = document.querySelectorAll('.skill-level');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        let current = 0;
        const duration = 1500; // ms
        const startTime = performance.now();

        function updateCounter(timestamp) {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(eased * target);
          el.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
        // Unobserve after starting
        counterObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  skillLevels.forEach(el => counterObserver.observe(el));

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================

  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR NAV LINKS (progressive enhancement)
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ============================================

  const sections = document.querySelectorAll('section[id], header[id]');

  const navLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('nav-link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-link--active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  sections.forEach(section => navLinkObserver.observe(section));

  // ============================================
  // KEYBOARD ACCESSIBILITY: Close menu on Escape
  // ============================================

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      document.querySelectorAll('.hamburger-line').forEach(line => {
        line.classList.remove('active');
      });
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  console.log('🚀 HIMworks — Built with passion, code and creativity.');
});