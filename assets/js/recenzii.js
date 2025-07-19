const reviewsData = [
  {
    user: "Balaban Eva",
    rating: 5,
    comment: "Foarte frumos realizat site ul!! Este usor de parcurs si are informatii pe intelesul tuturor. Totul arata bine vizual, dat fiind culorile si imaginile simple dar cu toate datele necesare. Mi se pare interesanta ideea cu chat bot ul, chiar e un mod super de a invata, avand posibilitatea de a clarifica orice neclaritate ai legata de materiale. De asemenea, Imaginile 3D sunt foarte clare si te ajuta sa vizualizezi totul mai bine. Bravo!!",
     date: "2025-05-22"
  },
  {
    user: "Cotoranu Alexandra Andreea",
    rating: 4,
    comment: "Vreau să vă felicit pentru acest site! Este foarte bine structurat și ușor de parcurs. Testele m-au ajutat mult să mă pregătesc, fiind clare și bine organizate. De asemenea, modelele 3D sunt extrem de utile și bine realizate — explică vizual conceptele într-un mod simplu și eficient. Mulțumesc pentru tot ajutorul oferit!",
     date: "2025-05-22"
  },
   {
    user: "Mareș Mădălina ",
    rating: 5,
    comment: "Site-ul are informațiile organizate într-un mod natural. Noțiunile teoretice sunt aranjate astfel încât toate elementele par la locul lor logic, ușor de intuit. Testele pentru verificarea cunoștințelor sunt de un real folos.",
     date: "2025-05-22"
  },
   {
    user: "Chițoi Andrada.",
    rating: 5,
    comment: "Vreau să vă mulțumesc pentru site-ul pe care l-ați realizat. Este foarte util și ușor de parcurs, informația este bine structurată, iar testele m-au ajutat mult în pregătire. De asemenea, modelele 3D sunt foarte clare și m-au ajutat să înțeleg mai bine conceptele. Continuați tot așa!",
     date: "2025-05-22"
  },
   {
    user: "Lică Maria Andreea",
    rating: 5,
    comment: "Mă atrage un site interactiv care ajută pentru cunoașterea corpului tău propriu și pentru anatomie. De multe ori,elevii nu pot învăța totul de la profesori din motive diverse,poate că nu înțeleg de exemplu sau li se pare greu,dar mereu un site de acest gen poate ajuta când este nevoie de actualizarea sau cunoașterea anumitor lucruri legate de această temă. Succes în continuare!!",
    date: "2025-05-22"
  },
   {
    user: "George Capruciu",
    rating: 4,
    comment: "Din punctul meu de vedere, site-ul este unul foarte folositor, videoclipurile sunt foarte bine realizate si alese, testele de verificare cuprind toate elementele cheie dintr-un aumit capitol, iar reprezentarile 3D sunt detaliate si pot veni foarte bine in ajutor pentru un elev in procesul de invatare.",
     date: "2025-05-22"
  },
   {
    user: "Negru Teodora",
    rating: 5,
    comment: "sunt de mare ajutor testele, chiar mi au usurat munca si am inteles foarte bine materia. m au ajutat sa ma pregatesc. se lucreaza foarte usor cu site ul☺️",
    date: "2025-05-22"
  },
   {
    user: "Camelia ",
    rating: 5,
    comment: "O pagină lucrată cu pasiune și atenție la detalii , se vede cât suflet s-a pus în fiecare colț. Felicitări pentru munca depusă !",
    date: "2025-05-22"
  },
  {
    user: "Gheorghita Florin Stefan",
    rating: 5,
    comment: "Site-ul este foarte util și bine structurat, oferind o experiență de navigare intuitivă și ușor de parcurs. Testele interactive incluse ajută semnificativ la pregătire, oferind o modalitate eficientă de autoevaluare. În plus, modelele 3D sunt extrem de clare și detaliate, ceea ce contribuie considerabil la învățarea vizuală a anatomiei umane.",
    date: "2025-05-22"
  }
];

function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  container.innerHTML = ''; // Curățăm containerul

  reviewsData.forEach(review => {
    const reviewEl = document.createElement('div');
    reviewEl.className = 'single-review';

    reviewEl.innerHTML = `
      <strong>${review.user}</strong> - <em>${new Date(review.date).toLocaleDateString()}</em><br/>
      <span>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
      <p>${review.comment}</p>
    `;

    container.appendChild(reviewEl);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderReviews();

  // Scroll la recenzii
  const scrollBtn = document.getElementById('scroll-to-reviews');
  const reviewsSection = document.querySelector('.reviews-section');

  if (scrollBtn && reviewsSection) {
    scrollBtn.addEventListener('click', () => {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  
  
});
//meniu mobil

  const toggleBtn = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-active");
  });

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