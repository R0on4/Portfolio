document.addEventListener('DOMContentLoaded', ()=>{

  // MENU FLOTTANT
  const menuToggle = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');
  menuToggle.addEventListener('click', ()=>{
    const open = sideMenu.classList.toggle('open');
    sideMenu.setAttribute('aria-hidden',!open);
  });

  // ANIMATION TITRE "TYPING"
  const typedTitle = document.getElementById('typedTitle');
  const text = "Aaron Prin";
  let i = 0;
  function typeTitle(){
    if(i < text.length){
      typedTitle.textContent += text[i];
      i++;
      setTimeout(typeTitle, 150);
    }
  }
  typeTitle();

  // ANIMATION COMPÉTENCES
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = '0';
    setTimeout(()=>{ fill.style.width = width; },500);
  });

  // ANIMATION DES CARTES PROJETS AU SCROLL
  const projectCards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  }, {threshold:0.2});
  projectCards.forEach(card=>observer.observe(card));

});
