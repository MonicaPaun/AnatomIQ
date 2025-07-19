// Elemente din DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const showAllBtn = document.getElementById("showAll");
const showInProgressBtn = document.getElementById("showInProgress");
const showCompletedBtn = document.getElementById("showCompleted");
const clearAllBtn = document.getElementById("clearAll");
const historyBtn = document.getElementById("historyBtn");
const historyContainer = document.getElementById("historyContainer");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function saveDeletedTasks() {
  localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
});

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "inProgress") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task) => {
    const index = tasks.indexOf(task);

    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks(filter);
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const leftDiv = document.createElement("div");
    leftDiv.style.display = "flex";
    leftDiv.style.alignItems = "center";
    leftDiv.style.gap = "10px";
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
   editBtn.textContent = translations[currentLang].edit;
    editBtn.addEventListener("click", () => {
     const nouText = prompt(translations[currentLang].promptEditTask, task.text);
      if (nouText !== null && nouText.trim() !== "") {
        tasks[index].text = nouText.trim();
        saveTasks();
        renderTasks(filter);
      }
    });

    const deleteBtn = document.createElement("button");
  deleteBtn.textContent = translations[currentLang].delete;
    deleteBtn.addEventListener("click", () => {
      deletedTasks.push(task);
      tasks.splice(index, 1);
      saveTasks();
      saveDeletedTasks();
      renderTasks(filter);
      if (historyContainer.style.display === "block") {
        renderDeletedTasks();
      }
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function renderDeletedTasks() {
 historyContainer.innerHTML = `<h3>${translations[currentLang].deletedTaskHistory}</h3>`;

  if (deletedTasks.length === 0) {
   historyContainer.innerHTML += `<p>${translations[currentLang].noDeletedTasks}</p>`;
    return;
  }

  const ul = document.createElement("ul");

  deletedTasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const btnGroup = document.createElement("div");

    const restoreBtn = document.createElement("button");
restoreBtn.textContent = translations[currentLang].restore;
    restoreBtn.addEventListener("click", () => {
      tasks.push(task);
      deletedTasks.splice(index, 1);
      saveTasks();
      saveDeletedTasks();
      renderTasks();
      renderDeletedTasks();
    });

    const deleteForeverBtn = document.createElement("button");
 deleteForeverBtn.textContent = translations[currentLang].deleteForever;
    deleteForeverBtn.addEventListener("click", () => {
     if (confirm(translations[currentLang].confirmPermanentDelete)) {
        deletedTasks.splice(index, 1);
        saveDeletedTasks();
        renderDeletedTasks();
      }
    });

    btnGroup.appendChild(restoreBtn);
    btnGroup.appendChild(deleteForeverBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);
    ul.appendChild(li);
  });

  historyContainer.appendChild(ul);
}

historyBtn.addEventListener("click", () => {
  if (historyContainer.style.display === "none" || historyContainer.style.display === "") {
    historyContainer.style.display = "block";
    renderDeletedTasks();
  } else {
    historyContainer.style.display = "none";
  }
});

showAllBtn.addEventListener("click", () => renderTasks("all"));
showInProgressBtn.addEventListener("click", () => renderTasks("inProgress"));
showCompletedBtn.addEventListener("click", () => renderTasks("completed"));

clearAllBtn.addEventListener("click", () => {
 if (confirm(translations[currentLang].confirmClearAll)) {
    deletedTasks = deletedTasks.concat(tasks);
    tasks = [];
    saveTasks();
    saveDeletedTasks();
    renderTasks();
    if (historyContainer.style.display === "block") {
      renderDeletedTasks();
    }
  }
});

renderTasks();


// La încărcarea paginii, verificăm dacă există o temă salvată și o aplicăm
window.addEventListener('load', () => {
  // const loader = document.getElementById('loader-wrapper'); // loader eliminat
  const modal = document.getElementById("logoModal");

  // Verificăm dacă pagina curentă este sistemul-osos.html
  if (window.location.pathname.includes('sisteme.html')) {
    // Afișăm loader-ul pentru pagina sistemul-osos.html
    // loader.style.display = 'flex';  // loader eliminat

    // setTimeout(() => {
    //   loader.classList.add('loader-close');
    //   setTimeout(() => {
    //     loader.style.display = 'none';
    //     sessionStorage.setItem("loaderShown", "true");
    //   }, 1000); 
    // }, 2500);
  }

  // Închide orice modal dacă a fost deschis
  if (modal) {
    modal.style.display = 'none';
    const modalImg = document.getElementById("modalImage");
    if (modalImg) {
      modalImg.style.transform = "scale(1)";
    }
  }

  // Tema salvată
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
      document.body.classList.add("dark");
      const icon = document.querySelector("#theme-toggle i");
      icon.classList.add("bx-sun");
      icon.classList.remove("bx-moon");
  }

  // Dacă e refresh și NU suntem pe index, redirecționează
  const isNotHome = !window.location.pathname.endsWith("index.html") && !window.location.pathname.endsWith("/");
  if (isRefresh && isNotHome) {
      sessionStorage.removeItem("loaderShown");
      window.location.href = "index.html";
  }
});

function toggleTheme() {
  document.body.classList.toggle("dark");
  const icon = document.querySelector("#theme-toggle i");

  if (document.body.classList.contains("dark")) {
      icon.classList.add("bx-sun");
      icon.classList.remove("bx-moon");
      localStorage.setItem("theme", "dark");
  } else {
      icon.classList.add("bx-moon");
      icon.classList.remove("bx-sun");
      localStorage.setItem("theme", "light");
  }
}

window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
});

const userToggle = document.getElementById('user-toggle');
const userMenu = document.getElementById('user-menu');

userToggle.addEventListener('click', () => {
  userMenu.classList.toggle('show');
});

document.addEventListener('click', function(event) {
  if (!userToggle.contains(event.target)) {
      userMenu.classList.remove('show');
  }
});

// Redirecționare spre index.html dacă e refresh pe altă pagină
const isRefresh = performance.navigation.type === 1 || performance.getEntriesByType("navigation")[0].type === "reload";
const isNotHome = !window.location.pathname.endsWith("index.html") && !window.location.pathname.endsWith("/");

if (isRefresh && isNotHome) {
  sessionStorage.removeItem("loaderShown");
  window.location.href = "index.html";
}

document.querySelector('.close-btn')?.addEventListener('click', () => {
  const searchInput = document.querySelector('.search-container input');
  searchInput.value = '';
  searchInput.blur();
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function() {
    // Nu mai oprim comportamentul implicit
    // Browserul va naviga direct fără întârziere
  });
});


function toggleDetalii(element) {
  element.classList.toggle("active");
}

// Script pentru a face un refresh și a te duce automat la index.html
if (performance.navigation.type == 1) {
  window.location.href = "index.html";  // Resetează și duce automat la index.html
}



 const toggleBtn = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-active");
  });