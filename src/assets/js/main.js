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
var form = document.getElementById('contact-form');
var successMsg = document.getElementById('form-success');
var sendingMsg = document.getElementById('form-sending');

function playLottie(id) {
  var player = document.getElementById(id);
  if (player) {
    player.stop();
    player.seek(0);
    setTimeout(function() { player.play(); }, 50);
  }
}

function resetFadeAnimations(container) {
  var fades = container.querySelectorAll('.success-fade, .success-fade-2, .success-fade-3, .sending-fade');
  fades.forEach(function(el) {
    el.style.animation = 'none';
    el.offsetHeight; // force reflow
    el.style.animation = '';
  });
}

function showFormAnimation() {
  // Phase 1: fade out form only, left column stays
  form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  form.style.opacity = '0';
  form.style.transform = 'translateY(-10px)';

  setTimeout(function() {
    form.classList.add('hidden');
    sendingMsg.classList.remove('hidden');
    sendingMsg.style.opacity = '0';
    sendingMsg.style.transform = 'none';
    sendingMsg.style.transition = 'opacity 0.3s ease';
    resetFadeAnimations(sendingMsg);
    playLottie('lottie-sending');
    requestAnimationFrame(function() { sendingMsg.style.opacity = '1'; });
  }, 400);

  // Phase 2: wait for sending animation to finish (~8s at speed 1), then show success
  setTimeout(function() {
    sendingMsg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    sendingMsg.style.opacity = '0';
    sendingMsg.style.transform = 'translateY(-10px)';

    setTimeout(function() {
      sendingMsg.classList.add('hidden');
      successMsg.classList.remove('hidden');
      successMsg.style.opacity = '0';
      successMsg.style.transform = 'none';
      successMsg.style.transition = 'opacity 0.4s ease';
      resetFadeAnimations(successMsg);
      playLottie('lottie-success');
      requestAnimationFrame(function() { successMsg.style.opacity = '1'; });
    }, 400);
  }, 6600);
}

// Dev preview function
window.__previewFormAnimation = function() {
  // Reset all states
  form.classList.remove('hidden');
  form.style.opacity = '1';
  form.style.transform = 'none';
  sendingMsg.classList.add('hidden');
  sendingMsg.style.opacity = '1';
  sendingMsg.style.transform = 'none';
  successMsg.classList.add('hidden');
  successMsg.style.opacity = '1';
  successMsg.style.transform = 'none';

  // Start animation
  setTimeout(showFormAnimation, 300);
};

if (form && successMsg && sendingMsg) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.classList.add('form-submitted');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.classList.add('opacity-80');

    try {
      // Get reCAPTCHA v3 token
      if (window.grecaptcha) {
        var token = await grecaptcha.execute('6Ld3WJgsAAAAADF0nqqHHSSfSFbB6XhVJawU2g54', { action: 'submit' });
        document.getElementById('recaptchaToken').value = token;
      }

      var res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showFormAnimation();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'generate_lead',
          event_category: 'contact',
          event_label: 'contact_form'
        });
      } else {
        btn.disabled = false;
        btn.classList.remove('opacity-80');
      }
    } catch {
      btn.disabled = false;
      btn.classList.remove('opacity-80');
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
