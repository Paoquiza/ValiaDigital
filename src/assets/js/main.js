// Nav scroll effect — transparent on hero, solid on scroll
const mainNav = document.getElementById('main-nav');
if (mainNav && mainNav.classList.contains('nav-transparent')) {
  function updateNav() {
    if (window.scrollY > 80) {
      mainNav.classList.remove('nav-transparent');
      mainNav.classList.add('nav-solid');
    } else {
      mainNav.classList.remove('nav-solid');
      mainNav.classList.add('nav-transparent');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuClose = document.getElementById('menu-close');

if (menuToggle && mobileMenu && menuClose) {
  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMenu(); });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Contact form submission
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form && successMsg) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.classList.add('form-submitted');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'generate_lead',
          event_category: 'contact',
          event_label: 'contact_form'
        });
      } else {
        btn.textContent = 'Error, intenta de nuevo';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error, intenta de nuevo';
      btn.disabled = false;
    }
  });

  // Form validation — show errors on submit attempt
  form.addEventListener('invalid', (e) => {
    e.target.classList.add('touched');
  }, true);
}

// GTM CTA click tracking
document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cta_click',
      event_category: 'engagement',
      event_label: btn.textContent.trim()
    });
  });
});

// Scroll-reveal animations (IntersectionObserver)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  document.querySelectorAll('.reveal-card').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  document.querySelectorAll('.reveal-card').forEach(el => el.classList.add('visible'));
}

// Animated stat counters
document.querySelectorAll('[id$="-stats"], #stats-section').forEach(function(section) {
  var counters = section.querySelectorAll('[data-count]');
  if (!counters.length) return;
  var counted = false;

  var countObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(function(counter) {
          var target = parseInt(counter.getAttribute('data-count'), 10);
          var prefix = counter.getAttribute('data-prefix') || '';
          var suffix = counter.getAttribute('data-suffix') || '';
          var duration = 1200;
          var start = performance.now();

          function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(eased * target);
            counter.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        });
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  countObserver.observe(section);
});
