/**
 * Souradeep De — Portfolio Website
 * Main JavaScript — Interactions, Animations & Form Handling
 */

(function () {
  'use strict';

  // ===== DOM REFERENCES =====
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = mobileNav?.querySelectorAll('a');
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card, .portfolio__featured');
  const revealElements = document.querySelectorAll('.reveal');

  // ===== MOBILE NAV =====
  function toggleMobileNav() {
    const isOpen = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileNav() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', toggleMobileNav);

  mobileNavLinks?.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMobileNav();
    }
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== NAVBAR SHADOW =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavbarScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 10) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ===== SCROLL REVEAL =====
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 80;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

  // ===== PORTFOLIO FILTERING =====
  filterPills.forEach(pill => {
    pill.addEventListener('click', function () {
      filterPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          card.style.display = '';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          });
        } else {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ===== STAT COUNTER ANIMATION =====
  function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-card__number');
    statNumbers.forEach(el => {
      if (el.dataset.animated) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      el.dataset.animated = 'true';
      const text = el.textContent;
      const number = parseFloat(text);
      const suffix = text.replace(/[\d.]/g, '');
      const duration = 1500;
      const startTime = performance.now();
      const isDecimal = text.includes('.');
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * number;
        if (isDecimal) { el.textContent = current.toFixed(1) + suffix; }
        else { el.textContent = Math.floor(current) + suffix; }
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  // ===== ACTIVE NAV HIGHLIGHTING =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  function highlightNavLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) { link.style.color = '#1A1A1A'; }
          else { link.style.color = ''; }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ===== PARALLAX =====
  const heroVisual = document.querySelector('.hero__visual');
  function heroParallax() {
    if (!heroVisual || window.innerWidth < 768) return;
    const scrollY = window.scrollY;
    if (scrollY < 600) { heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`; }
  }
  window.addEventListener('scroll', heroParallax, { passive: true });

  console.log('%c✨ Souradeep De — Portfolio Website', 'font-size: 16px; font-weight: bold; color: #2AABB8;');
  console.log('%cDesigned & Built with care', 'font-size: 12px; color: #6B7280;');

  const copyEmail = document.getElementById('copy-email');

  copyEmail?.addEventListener('click', async () => {
    const email = 'souradeepde2021@gmail.com';

    try {
      await navigator.clipboard.writeText(email);

      const message = copyEmail.querySelector('.copy-message');
      message.classList.add('show');

      setTimeout(() => {
        message.classList.remove('show');
      }, 2000);

    } catch (err) {
      console.error('Copy failed', err);
    }
  });

  document.getElementById('current-year').textContent = new Date().getFullYear();

  // ===== LIGHTBOX =====
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxName    = document.getElementById('lightbox-name');
  const lightboxYear    = document.getElementById('lightbox-year');
  const lightboxTags    = document.getElementById('lightbox-tags');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose   = document.getElementById('lightbox-close');
  const lightboxPrev    = document.getElementById('lightbox-prev');
  const lightboxNext    = document.getElementById('lightbox-next');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  let lbItems  = [];  // active (visible) items
  let lbIndex  = 0;

  function buildItemList() {
    // Collect all visible portfolio images (featured + grid cards)
    const nodes = document.querySelectorAll(
      '.portfolio__featured:not([style*="display: none"]) .portfolio__featured-img img, ' +
      '.project-card:not([style*="display: none"]) .project-card__img img'
    );
    return Array.from(nodes).map(img => {
      const card = img.closest('.portfolio__featured, .project-card');
      const infoEl = card.querySelector('.portfolio__featured-info, .project-card__info');
      const nameEl = infoEl?.querySelector('.portfolio__featured-name, .project-card__name');
      const yearEl = infoEl?.querySelector('.portfolio__featured-year, .project-card__year');
      const tagsEl = card.querySelector('.portfolio__featured-tags, .project-card__tags');
      return {
        src    : img.src,
        alt    : img.alt,
        name   : nameEl?.textContent.trim() || '',
        year   : yearEl?.textContent.trim() || '',
        tagsHTML: tagsEl?.innerHTML || ''
      };
    });
  }

  function openLightbox(index) {
    lbItems = buildItemList();
    lbIndex = index;
    renderLightbox();
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function renderLightbox() {
    const item = lbItems[lbIndex];
    if (!item) return;
    lightboxImg.classList.add('loading');
    lightboxImg.src   = item.src;
    lightboxImg.alt   = item.alt;
    lightboxImg.onload = () => lightboxImg.classList.remove('loading');
    lightboxName.textContent  = item.name;
    lightboxYear.textContent  = item.year;
    lightboxTags.innerHTML    = item.tagsHTML;
    lightboxCounter.textContent = `${lbIndex + 1} / ${lbItems.length}`;
    lightboxPrev.disabled = lbIndex === 0;
    lightboxNext.disabled = lbIndex === lbItems.length - 1;
  }

  function navigateLightbox(dir) {
    const next = lbIndex + dir;
    if (next < 0 || next >= lbItems.length) return;
    lbIndex = next;
    renderLightbox();
  }

  // Attach click to project images
  function attachLightboxTriggers() {
    document.querySelectorAll(
      '.portfolio__featured-img img, .project-card__img img'
    ).forEach((img, idx) => {
      img.parentElement.addEventListener('click', () => {
        lbItems = buildItemList();
        // Find the matching index in lbItems by src
        const matchIdx = lbItems.findIndex(i => i.src === img.src);
        openLightbox(matchIdx >= 0 ? matchIdx : 0);
      });
    });
  }

  attachLightboxTriggers();

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  lightboxNext.addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    if (e.key === 'ArrowRight')  navigateLightbox(1);
  });

})();