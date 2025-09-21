document.addEventListener('DOMContentLoaded', () => {

  // MENU FLOTTANT
  const menuToggle = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');
  menuToggle.addEventListener('click', () => {
    const open = sideMenu.classList.toggle('open');
    sideMenu.setAttribute('aria-hidden', !open);
  });

  // VARIABLES TODO
  const taskInput = document.getElementById('taskInput');
  const taskMinutes = document.getElementById('taskMinutes');
  const taskPriority = document.getElementById('taskPriority');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const tasksContainer = document.getElementById('tasksContainer');
  const completedTasks = document.getElementById('completedTasks');

  // FONCTION NOTIFICATION
  function showNotification(message){
    const notif = document.createElement('div');
    notif.classList.add('notification');
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(()=>{ notif.classList.add('show'); }, 10);
    setTimeout(()=>{ notif.classList.remove('show'); setTimeout(()=>{ notif.remove(); },500); }, 2500);
  }

  // CHARGER TÂCHES DE LOCALSTORAGE
  function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(t => createTaskCard(t.text, t.minutes, t.priority, t.completed));
  }

  // SAUVEGARDER TÂCHES
  function saveTasks(){
    const tasks = [];
    document.querySelectorAll('.task-card').forEach(card=>{
      const text = card.querySelector('strong').textContent;
      const minutesText = card.querySelector('span').textContent;
      const minutes = minutesText.includes(':') ? parseInt(minutesText.split(':')[0]) : 0;
      const priority = card.dataset.priority;
      const completed = card.classList.contains('completed');
      tasks.push({text, minutes, priority, completed});
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // CREER TACHE
  function createTaskCard(text, minutes, priority, completed=false){
    const taskCard = document.createElement('div');
    taskCard.className = `task-card ${priority}`;
    if(completed) taskCard.classList.add('completed');

    const taskInfo = document.createElement('div');
    taskInfo.className='task-info';
    taskInfo.innerHTML = `<strong>${text}</strong><span>${completed ? 'Terminée' : (minutes>0 ? `${minutes}:00` : '')}</span>`;

    const taskButtons = document.createElement('div');
    taskButtons.className='task-buttons';
    const startBtn = document.createElement('button'); startBtn.className='btn-start'; startBtn.textContent='Start';
    const pauseBtn = document.createElement('button'); pauseBtn.className='btn-pause'; pauseBtn.textContent='Pause';
    const terminateBtn = document.createElement('button'); terminateBtn.className='btn-terminate'; terminateBtn.textContent='Terminer';
    const deleteBtn = document.createElement('button'); deleteBtn.className='btn-delete'; deleteBtn.textContent='Supprimer';

    taskButtons.append(startBtn,pauseBtn,terminateBtn,deleteBtn);
    taskCard.append(taskInfo, taskButtons);
    if(completed) completedTasks.appendChild(taskCard); else tasksContainer.appendChild(taskCard);

    // MINUTEUR
    let totalSeconds = minutes*60;
    let interval;
    function updateTime(){
      if(totalSeconds<0) return;
      const m = Math.floor(totalSeconds/60);
      const s = totalSeconds%60;
      taskInfo.querySelector('span').textContent = `${m}:${s<10?'0'+s:s}`;
      totalSeconds--;
      if(totalSeconds<0){ showNotification(`Tâche "${text}" terminée !`); clearInterval(interval); taskCard.classList.add('completed'); completedTasks.appendChild(taskCard); saveTasks();}
    }

    startBtn.addEventListener('click', ()=>{
      clearInterval(interval);
      interval = setInterval(updateTime,1000);
      showNotification(`Tâche "${text}" lancée !`);
    });

    pauseBtn.addEventListener('click', ()=>{
      clearInterval(interval);
      showNotification(`Tâche "${text}" en pause !`);
    });

    terminateBtn.addEventListener('click', ()=>{
      clearInterval(interval);
      taskInfo.querySelector('span').textContent = 'Terminée';
      taskCard.classList.add('completed');
      completedTasks.appendChild(taskCard);
      showNotification(`Tâche "${text}" terminée !`);
      saveTasks();
    });

    deleteBtn.addEventListener('click', ()=>{
      clearInterval(interval);
      taskCard.remove();
      showNotification(`Tâche "${text}" supprimée !`);
      saveTasks();
    });

    saveTasks();
  }

  // AJOUTER TACHE
  addTaskBtn.addEventListener('click', ()=>{
    const text = taskInput.value.trim();
    const minutes = parseInt(taskMinutes.value) || 0;
    const priority = taskPriority.value;
    if(!text){ showNotification("Veuillez entrer une tâche."); return; }
    createTaskCard(text,minutes,priority);
    taskInput.value=''; taskMinutes.value='';
  });

  loadTasks();
});
