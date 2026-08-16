document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------
     Header scroll state
  --------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  const scrollBar = document.getElementById('scrollBar');

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------------------------------------------------
     Hero dot pagination (cosmetic, tracks scroll depth in hero)
  --------------------------------------------------- */
  const dots = document.querySelectorAll('.hero-dots span');
  function updateDots(y) {
    const heroH = document.querySelector('.hero').offsetHeight;
    const idx = Math.min(dots.length - 1, Math.floor((y / heroH) * dots.length));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('visible', y > 700);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = max > 0 ? `${(y / max) * 100}%` : '0%';
    updateDots(y);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------
     Sips dropdown (click for touch, hover for desktop via CSS)
  --------------------------------------------------- */
  const sipsTrigger = document.getElementById('sipsTrigger');
  const sipsDropdown = document.getElementById('sipsDropdown');
  sipsTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = sipsDropdown.classList.toggle('is-open');
    sipsTrigger.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', () => {
    sipsDropdown.classList.remove('is-open');
    sipsTrigger.setAttribute('aria-expanded', 'false');
  });
  sipsDropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      const cat = a.dataset.filter;
      if (cat) setTimeout(() => selectCategory(cat), 350);
    });
  });

  /* ---------------------------------------------------
     Mobile menu
  --------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobile() {
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-open');
    hamburgerBtn.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-open');
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburgerBtn.addEventListener('click', openMobile);
  mobileCloseBtn.addEventListener('click', closeMobile);
  mobileOverlay.addEventListener('click', closeMobile);
  document.querySelectorAll('.mobile-link, .mobile-order').forEach(el => el.addEventListener('click', closeMobile));

  /* ---------------------------------------------------
     Signature Sips row — next button scroll
  --------------------------------------------------- */
  const drinkRow = document.getElementById('drinkRow');
  const rowNext = document.getElementById('rowNext');
  rowNext.addEventListener('click', () => {
    const cardWidth = drinkRow.querySelector('.drink-card').offsetWidth + 20;
    drinkRow.scrollBy({ left: cardWidth * 2, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------------------------------------------------
     Menu filter
  --------------------------------------------------- */
  const menuList = document.getElementById('menuList');
  const tabs = document.querySelectorAll('.tab');

  function renderMenu(cat) {
    const items = (typeof MENU_DATA !== 'undefined' && MENU_DATA[cat]) || [];
    menuList.innerHTML = items.map((item, i) => `
      <div class="menu-row" style="animation-delay:${i * 0.045}s">
        <span class="menu-row-icon"><img src="${item.icon}" alt="" loading="lazy"></span>
        <span class="menu-row-name">${item.name}</span>
        <span class="menu-row-price">${item.price}</span>
      </div>
    `).join('');
  }

  function selectCategory(cat) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
    renderMenu(cat);
    document.getElementById('menu').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.dataset.cat);
    });
  });

  renderMenu('Signature Sips');

  /* ---------------------------------------------------
     Scroll reveals (IntersectionObserver — lightweight, no GSAP dependency)
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-card]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // Staggered reveal for grouped cards (drink row, branch cards, feed grid)
  function staggerGroup(selector, delayStep = 90) {
    document.querySelectorAll(selector).forEach((group, gi) => {
      const items = group.querySelectorAll('[data-reveal-card]');
      items.forEach((item, i) => {
        item.style.transitionDelay = `${i * delayStep}ms`;
      });
    });
  }
  staggerGroup('.drink-row');
  staggerGroup('.branch-cards');
  staggerGroup('.feed-grid');

  /* ---------------------------------------------------
     HERO ENTRANCE ANIMATION
  --------------------------------------------------- */
  function playHeroEntrance() {
    const lines = document.querySelectorAll('.hero-headline .line');
    const eyebrow = document.querySelector('.hero-eyebrow');
    const sub = document.querySelector('.hero-sub');
    const ctas = document.querySelector('.hero-ctas');
    const cupWrap = document.getElementById('heroCupWrap');
    const badge = document.getElementById('heroBadge');
    const orbit = document.querySelector('.hero-orbit');

    if (reduceMotion || !window.gsap) {
      [eyebrow, sub, ctas, badge].forEach(el => el && (el.style.opacity = 1));
      if (cupWrap) cupWrap.style.opacity = 1;
      lines.forEach(l => l.style.opacity = 1);
      startFloat(cupWrap, true);
      return;
    }

    lines.forEach(l => {
      l.style.display = 'block';
      l.innerHTML = `<span style="display:inline-block; transform: translateY(105%);">${l.innerHTML}</span>`;
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.set(orbit, { opacity: 0, scale: .9 })
      .to(orbit, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 0.05)
      .fromTo(eyebrow, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .7 }, 0.05)
      .to(lines.length ? document.querySelectorAll('.hero-headline .line span') : [], {
        y: 0, duration: 1, stagger: 0.12, ease: 'power4.out'
      }, 0.15)
      .fromTo(sub, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, 0.55)
      .fromTo(ctas.children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, stagger: 0.09 }, 0.68)
      .fromTo(cupWrap, { opacity: 0, y: 70, rotate: -6, scale: .94 },
        { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.3, ease: 'power3.out' }, 0.35)
      .fromTo(badge, { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.6)' }, 1.0)
      .add(() => startFloat(cupWrap, false), 1.5);
  }

  function startFloat(cupWrap, immediate) {
    if (!cupWrap) return;
    if (reduceMotion || !window.gsap) return;
    gsap.to(cupWrap, {
      y: '+=16',
      duration: 3.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
    gsap.to('.hero-orbit', {
      rotate: 360,
      duration: 60,
      ease: 'none',
      repeat: -1
    });
  }

  playHeroEntrance();

  /* ---------------------------------------------------
     Subtle parallax on hero cup with mouse (desktop only)
  --------------------------------------------------- */
  const heroVisual = document.querySelector('.hero-visual');
  if (window.matchMedia('(hover: hover)').matches && !reduceMotion && window.gsap) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to('#heroCupImg', { x: px * 14, y: py * 10, duration: 0.8, ease: 'power2.out' });
      gsap.to('#heroBadge', { x: px * -10, y: py * -8, duration: 0.9, ease: 'power2.out' });
    });
    heroVisual.addEventListener('mouseleave', () => {
      gsap.to('#heroCupImg', { x: 0, y: 0, duration: 1 });
      gsap.to('#heroBadge', { x: 0, y: 0, duration: 1 });
    });
  }

  /* ---------------------------------------------------
     ScrollTrigger-based section parallax (desktop, subtle)
  --------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.utils.toArray('.drink-card-img img').forEach((img) => {
      gsap.to(img, {
        y: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }
});
