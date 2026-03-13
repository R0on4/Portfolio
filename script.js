/* ============================================
   NAVIGATION
   ============================================ */
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ============================================
   TYPING ANIMATION
   ============================================ */
const heroName = document.getElementById('hero-name');
const nameText = 'Aaron Prin';
let charIndex = 0;

heroName.classList.add('typing');

function type() {
  if (charIndex < nameText.length) {
    heroName.textContent += nameText[charIndex];
    charIndex++;
    setTimeout(type, 110);
  }
}

setTimeout(type, 600);

/* ============================================
   REVEAL ON SCROLL (Intersection Observer)
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');

        // Animate skill bar if present
        const fill = entry.target.querySelector('.skill-card__fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + '%';
          }, 150);
        }
      }, i * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   CONTACT FORM
   ============================================ */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !email || !message) {
    showNotif('Veuillez remplir tous les champs.', 'error');
    return;
  }

  const subject = encodeURIComponent(`Message de ${name} via portfolio`);
  const body    = encodeURIComponent(`${message}\n\n---\nEnvoyé par : ${name} (${email})`);
  window.location.href = `mailto:aaronprin44@gmail.com?subject=${subject}&body=${body}`;

  showNotif('Votre client email va s\'ouvrir !', 'success');
  contactForm.reset();
});

/* ============================================
   NOTIFICATIONS
   ============================================ */
function showNotif(message, type = 'info') {
  const container = document.getElementById('notification-container');

  const el = document.createElement('div');
  el.className = `notif notif--${type}`;
  el.textContent = message;
  container.appendChild(el);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('show'));
  });

  setTimeout(() => {
    el.classList.replace('show', 'hide');
    setTimeout(() => el.remove(), 400);
  }, 3500);
}
