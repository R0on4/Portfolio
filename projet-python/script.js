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

/* === CODE VIEWER === */
const showCodeBtn    = document.getElementById('showCodeBtn');
const downloadBtn    = document.getElementById('downloadBtn');
const codeContainer  = document.getElementById('codeContainer');
let codeLoaded       = false;
let codeText         = '';

showCodeBtn.addEventListener('click', () => {
  if (!codeContainer.hidden) {
    codeContainer.hidden = true;
    showCodeBtn.textContent = '👁 Afficher le code';
    return;
  }

  if (codeLoaded) {
    codeContainer.hidden = false;
    showCodeBtn.textContent = '🙈 Masquer le code';
    return;
  }

  showCodeBtn.textContent = '⏳ Chargement…';
  showCodeBtn.disabled = true;

  fetch('contacts_manager.py')
    .then(r => {
      if (!r.ok) throw new Error('Fichier introuvable');
      return r.text();
    })
    .then(data => {
      codeText = data;
      codeContainer.textContent = data;
      codeContainer.hidden = false;
      codeLoaded = true;
      showCodeBtn.textContent = '🙈 Masquer le code';
      showCodeBtn.disabled = false;
      showNotif('Code chargé avec succès !', 'success');
    })
    .catch(() => {
      showCodeBtn.textContent = '👁 Afficher le code';
      showCodeBtn.disabled = false;
      showNotif('Impossible de charger le fichier.', 'error');
    });
});

downloadBtn.addEventListener('click', () => {
  fetch('contacts_manager.py')
    .then(r => {
      if (!r.ok) throw new Error();
      return r.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a   = Object.assign(document.createElement('a'), { href: url, download: 'contacts_manager.py' });
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showNotif('Téléchargement lancé !', 'success');
    })
    .catch(() => showNotif('Erreur lors du téléchargement.', 'error'));
});

/* === NOTIFICATIONS === */
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
