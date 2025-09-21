document.addEventListener('DOMContentLoaded', ()=>{

  // MENU FLOTTANT
  const menuToggle = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');
  menuToggle.addEventListener('click', ()=>{ sideMenu.classList.toggle('open'); });

  // AFFICHER / TELECHARGER CODE PYTHON
  const showCodeBtn = document.getElementById('showCodeBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const codeContainer = document.getElementById('codeContainer');

  showCodeBtn.addEventListener('click', ()=>{
    fetch('contacts_manager.py')
      .then(resp=>resp.text())
      .then(data=>{
        codeContainer.style.display='block';
        codeContainer.textContent=data;
      }).catch(()=>{ alert("Erreur lors du chargement du code"); });
  });

  downloadBtn.addEventListener('click', ()=>{
    fetch('contacts_manager.py')
      .then(resp=>resp.blob())
      .then(blob=>{
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "contacts_manager.py";
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(()=>{ alert("Erreur téléchargement"); });
  });

});
