
    // Se aplică clasa .dark pe body dacă userul a salvat-o anterior
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  const icon = document.querySelector("#theme-toggle i");
  icon.classList.remove("bx-moon");
  icon.classList.add("bx-sun");
}

function toggleTheme() {
  const icon = document.querySelector("#theme-toggle i");
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.classList.remove("bx-moon");
    icon.classList.add("bx-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("bx-sun");
    icon.classList.add("bx-moon");
    localStorage.setItem("theme", "light");
  }
}
