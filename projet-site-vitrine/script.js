/* === NAVIGATION === */
const snavToggle = document.getElementById('snav-toggle');
const snavLinks  = document.getElementById('snav-links');

snavToggle.addEventListener('click', () => {
  const open = snavLinks.classList.toggle('open');
  snavToggle.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
snavLinks.querySelectorAll('.snav__link').forEach(l => {
  l.addEventListener('click', () => {
    snavLinks.classList.remove('open');
    snavToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* === REVEAL ON SCROLL === */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal-card, .feature-card, .stack-item').forEach(el => observer.observe(el));

/* === DEMO INTERACTIVE === */
const demoBtn    = document.getElementById('demo-btn');
const resetBtn   = document.getElementById('reset-btn');
const demoResult = document.getElementById('demo-result');

const messages = [
  '🎉 Bouton fonctionnel !',
  '⚡ JavaScript vanilla en action !',
  '✅ Interaction réussie !',
  '🚀 Tout fonctionne parfaitement !',
  '💡 C\'est aussi simple que ça !',
];
let msgIndex = 0;

demoBtn.addEventListener('click', () => {
  demoResult.style.opacity = '0';
  setTimeout(() => {
    demoResult.textContent = messages[msgIndex % messages.length];
    demoResult.style.opacity = '1';
    msgIndex++;
  }, 200);
  resetBtn.style.display = 'inline-flex';
});

resetBtn.addEventListener('click', () => {
  demoResult.style.opacity = '0';
  setTimeout(() => { demoResult.textContent = ''; }, 200);
  resetBtn.style.display = 'none';
  msgIndex = 0;
});

/* === NOTIFICATION === */
function showNotif(msg, type = 'info') {
  const c  = document.getElementById('notif-container');
  const el = document.createElement('div');
  el.className = `notif notif--${type}`;
  el.textContent = msg;
  c.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => {
    el.classList.replace('show', 'hide');
    setTimeout(() => el.remove(), 400);
  }, 3000);
}
