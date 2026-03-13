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

/* === TODO APP === */
const taskInput      = document.getElementById('taskInput');
const taskMinutes    = document.getElementById('taskMinutes');
const taskPriority   = document.getElementById('taskPriority');
const addTaskBtn     = document.getElementById('addTaskBtn');
const tasksContainer = document.getElementById('tasksContainer');
const completedContainer = document.getElementById('completedTasks');
const clearDoneBtn   = document.getElementById('clearDoneBtn');
const activeCount    = document.getElementById('active-count');
const doneCount      = document.getElementById('done-count');
const emptyActive    = document.getElementById('empty-active');
const emptyDone      = document.getElementById('empty-done');

function updateCounts() {
  const active = tasksContainer.querySelectorAll('.task-card').length;
  const done   = completedContainer.querySelectorAll('.task-card').length;
  activeCount.textContent = active;
  doneCount.textContent   = done;
  emptyActive.style.display = active === 0 ? 'block' : 'none';
  emptyDone.style.display   = done   === 0 ? 'block' : 'none';
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-card').forEach(card => {
    tasks.push({
      text:      card.querySelector('strong').textContent,
      minutes:   parseInt(card.dataset.minutes) || 0,
      priority:  card.dataset.priority,
      completed: card.dataset.completed === 'true'
    });
  });
  localStorage.setItem('ap_tasks', JSON.stringify(tasks));
  updateCounts();
}

function createTaskCard(text, minutes, priority, completed = false) {
  const card = document.createElement('div');
  card.className = `task-card ${priority}`;
  card.dataset.priority  = priority;
  card.dataset.minutes   = minutes;
  card.dataset.completed = completed;
  if (completed) card.classList.add('completed');

  const info = document.createElement('div');
  info.className = 'task-info';
  const timerText = completed ? 'Terminée' : (minutes > 0 ? `${minutes}:00` : 'Pas de minuteur');
  info.innerHTML = `<strong>${text}</strong><span>${timerText}</span>`;

  const btns = document.createElement('div');
  btns.className = 'task-buttons';

  const startBtn    = makeBtn('▶ Start',    'btn-start');
  const pauseBtn    = makeBtn('⏸ Pause',    'btn-pause');
  const terminateBtn = makeBtn('✓ Terminer', 'btn-terminate');
  const deleteBtn   = makeBtn('✕',          'btn-delete');

  btns.append(startBtn, pauseBtn, terminateBtn, deleteBtn);
  card.append(info, btns);

  if (completed) {
    completedContainer.appendChild(card);
  } else {
    tasksContainer.appendChild(card);
  }

  // Timer
  let totalSeconds = minutes * 60;
  let interval = null;

  function tick() {
    if (totalSeconds < 0) return;
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    info.querySelector('span').textContent = `${m}:${s < 10 ? '0' + s : s}`;
    totalSeconds--;
    if (totalSeconds < 0) {
      clearInterval(interval);
      markDone();
      showNotif(`✅ "${text}" terminée !`, 'success');
    }
  }

  function markDone() {
    clearInterval(interval);
    card.dataset.completed = 'true';
    card.classList.add('completed');
    info.querySelector('span').textContent = 'Terminée';
    completedContainer.appendChild(card);
    saveTasks();
  }

  startBtn.addEventListener('click', () => {
    if (minutes === 0) { showNotif('Définissez une durée pour utiliser le minuteur.', 'error'); return; }
    clearInterval(interval);
    interval = setInterval(tick, 1000);
    showNotif(`⏱ "${text}" lancée !`, 'info');
  });

  pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
    showNotif(`⏸ "${text}" en pause.`, 'info');
  });

  terminateBtn.addEventListener('click', () => {
    markDone();
    showNotif(`✅ "${text}" terminée !`, 'success');
  });

  deleteBtn.addEventListener('click', () => {
    clearInterval(interval);
    card.style.opacity = '0';
    card.style.transform = 'translateY(-8px)';
    setTimeout(() => { card.remove(); saveTasks(); }, 280);
    showNotif(`🗑 "${text}" supprimée.`, 'info');
  });

  saveTasks();
}

function makeBtn(label, cls) {
  const b = document.createElement('button');
  b.className = cls;
  b.textContent = label;
  return b;
}

// Add task
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

function addTask() {
  const text     = taskInput.value.trim();
  const minutes  = parseInt(taskMinutes.value) || 0;
  const priority = taskPriority.value;
  if (!text) { showNotif('Veuillez entrer le nom de la tâche.', 'error'); taskInput.focus(); return; }
  createTaskCard(text, minutes, priority);
  taskInput.value   = '';
  taskMinutes.value = '';
  taskInput.focus();
}

// Clear done
clearDoneBtn.addEventListener('click', () => {
  completedContainer.querySelectorAll('.task-card').forEach(c => c.remove());
  saveTasks();
  showNotif('Historique effacé.', 'info');
});

// Load saved tasks
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('ap_tasks')) || [];
  saved.forEach(t => createTaskCard(t.text, t.minutes, t.priority, t.completed));
  updateCounts();
}

loadTasks();

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
