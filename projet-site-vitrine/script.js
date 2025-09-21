document.addEventListener('DOMContentLoaded', ()=>{

  // MENU FLOTTANT
  const menuToggle = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');
  menuToggle.addEventListener('click', ()=>{
    sideMenu.classList.toggle('open');
  });

  // ANIMATION DES CARTES
  const featureCards = document.querySelectorAll('.feature-card');
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  }, {threshold:0.2});
  featureCards.forEach(card=>observer.observe(card));

  // BOUTON EXEMPLE
  const exampleBtn = document.getElementById('exampleBtn');
  exampleBtn.addEventListener('click', ()=>{
    alert("Ceci est un exemple de bouton fonctionnel !");
  });

});
