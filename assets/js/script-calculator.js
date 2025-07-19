const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let justCalculated = false;

function updateDisplay(value) {
  // Transformă valoarea în string ca să putem înlocui "null" nedorit
  let text = String(value);

  // Înlocuiește toate aparițiile de "null" din text cu string gol
  text = text.replace(/null/g, "");

  // Dacă textul rămas e gol, afișează "0"
  if (text.trim() === "") {
    text = "0";
  }

  display.textContent = text;

  // Scroll automat la final (urmărește numărul)
  requestAnimationFrame(() => {
    display.scrollLeft = display.scrollWidth;
  });
}


function calculateExpression(expression) {
  try {
    if (/^[0-9+\-*/.() ]+$/.test(expression)) {
      let result = Function('"use strict"; return (' + expression + ')')();
      return Number.isFinite(result) ? parseFloat(result.toFixed(10)) : "Eroare";
    } else {
      return "Eroare";
    }
  } catch {
    return "Eroare";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const val = button.getAttribute("data-value");

    if (justCalculated && /[0-9(]/.test(val)) {
      currentInput = "";
    }
    justCalculated = false;

    switch (val) {
      case "clear":
        currentInput = "";
        updateDisplay(currentInput);
        break;

      case "back":
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
        break;

      case "=":
  const result = calculateExpression(currentInput);
  updateDisplay(result);

  // Doar dacă rezultatul este un număr valid, îl salvăm în currentInput
  if (!isNaN(result) && result !== "Eroare") {
    currentInput = result.toString();
  } else {
    currentInput = "";
  }

  justCalculated = true;
  break;


      default:
        if (val === "." && currentInput.endsWith(".")) return;

        const lastChar = currentInput.slice(-1);
        const isOperator = /[+\-*/]/.test(val);

        if (isOperator) {
          if (currentInput === "") return;
          if (/[+\-*/]/.test(lastChar)) {
            currentInput = currentInput.slice(0, -1) + val;
          } else {
            currentInput += val;
          }
        } else {
          currentInput += val;
        }

        updateDisplay(currentInput);
        break;
    }
  });
});

  // Funcția pentru schimbarea temei între dark și light
  function toggleTheme() {
    // Comută clasa dark pe body
    document.body.classList.toggle("dark");
  
    // Selectează iconița pentru temă
    const icon = document.querySelector("#theme-toggle i");
  
    // Dacă tema este dark, schimbă iconița și salvează tema în localStorage
    if (document.body.classList.contains("dark")) {
      icon.classList.add("bx-sun");  // Iconița pentru soare
      icon.classList.remove("bx-moon");  // Iconița pentru lună
      localStorage.setItem("theme", "dark");  // Salvează tema ca "dark"
    } else {
      // Dacă tema nu este dark, schimbă iconița și salvează tema în localStorage
      icon.classList.add("bx-moon");  // Iconița pentru lună
      icon.classList.remove("bx-sun");  // Iconița pentru soare
      localStorage.setItem("theme", "light");  // Salvează tema ca "light"
    }
  }
  
  // La încărcarea paginii, verificăm dacă există o temă salvată și o aplicăm
  window.addEventListener('load', () => {
    //const loader = document.getElementById('loader-wrapper');
    const modal = document.getElementById("logoModal");

  // Verificăm dacă pagina curentă este sistemul-osos.html
  if (window.location.pathname.includes('calculator.html')) {
    // Afișăm loader-ul pentru pagina sistemul-osos.html
   // loader.style.display = 'flex';  // Asigură-te că loader-ul este vizibil

   // setTimeout(() => {
    //  loader.classList.add('loader-close');
    //  setTimeout(() => {
      //  loader.style.display = 'none';
    //    sessionStorage.setItem("loaderShown", "true");
    //  }, 1000); 
  //  }, 2500);
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
  
   const toggleBtn = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-active");
  });