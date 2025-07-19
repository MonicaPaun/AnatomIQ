function dataISO_Bucharest(timestamp = Date.now()) {
  const options = { timeZone: 'Europe/Bucharest', year: 'numeric', month: '2-digit', day: '2-digit' };
  const parts = new Intl.DateTimeFormat('ro-RO', options).formatToParts(new Date(timestamp));
  const y = parts.find(p => p.type === 'year').value;
  const m = parts.find(p => p.type === 'month').value;
  const d = parts.find(p => p.type === 'day').value;
  return `${y}-${m}-${d}`;
}

// Zilele ordonate de Luni la Duminică
const zileSaptOrd = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];

let trackingPornit = false;
let intervalID = null;
let startSessionTime = null;

function startTracking() {
  if (!trackingPornit) {
    startSessionTime = Date.now();
    intervalID = setInterval(() => {
     
    }, 5000);
    trackingPornit = true;
  }
}

function stopTracking() {
  if (trackingPornit && startSessionTime !== null) {
    const endSessionTime = Date.now();
    const elapsed = endSessionTime - startSessionTime;

    const dataISO = dataISO_Bucharest(startSessionTime);
    let istoric = JSON.parse(localStorage.getItem('istoricTimp')) || {};
    if (!istoric[dataISO]) istoric[dataISO] = 0;
    istoric[dataISO] += elapsed;
    localStorage.setItem('istoricTimp', JSON.stringify(istoric));

    clearInterval(intervalID);
    intervalID = null;
    trackingPornit = false;
    startSessionTime = null;
  }
}

// Salvează timpul acumulat în sesiune curentă
function salveazaTimp() {
  if (trackingPornit && startSessionTime !== null) {
    const endSessionTime = Date.now();
    const elapsed = endSessionTime - startSessionTime;

    const dataISO = dataISO_Bucharest(startSessionTime);
    let istoric = JSON.parse(localStorage.getItem('istoricTimp')) || {};
    if (!istoric[dataISO]) istoric[dataISO] = 0;
    istoric[dataISO] += elapsed;
    localStorage.setItem('istoricTimp', JSON.stringify(istoric));

    
  }
}

// Evenimente pentru focus/blur/tab activ
window.addEventListener('focus', () => {
  if (document.visibilityState === 'visible') {
    startTracking();
  }
});

window.addEventListener('blur', () => {
  salveazaTimp();
  stopTracking();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startTracking();
  } else {
    salveazaTimp();
    stopTracking();
  }
});

window.addEventListener('beforeunload', () => {
  salveazaTimp();
  stopTracking();
});

// La încărcare inițială
if (document.visibilityState === 'visible') {
  startTracking();
}
function ziSapt(dataISO) {
  const parts = dataISO.split('-');
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  let zi = d.getDay();
  return zi === 0 ? 7 : zi; // Duminică = 7
}


  // Generează array cu datele pentru săptămână (luni→duminică)
  function getSaptamana(offset = 0) {
   const azi = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Bucharest" }));

    const ziCurenta = ziSapt(azi.toISOString().slice(0,10)); 
    const luni = new Date(azi);
    luni.setDate(azi.getDate() - ziCurenta + 1 + offset * 7);
    let zile = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(luni);
      d.setDate(luni.getDate() + i);
      zile.push(d.toISOString().slice(0,10));
    }
    return zile;
  }

  // Formatează durata în hh:mm:ss
  function formatDurata(ms) {
    let totalSec = Math.floor(ms / 1000);
    let ore = Math.floor(totalSec / 3600);
    let min = Math.floor((totalSec % 3600) / 60);
    let sec = totalSec % 60;
    return `${ore.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  }

  // Variabile globale pentru popup
  let saptamanaIndex = 0;
  let chartInstance = null;

  // Funcția care afișează popup-ul activității (doar pe profile.html)
  function afiseazaActivitate() {
    if (!window.location.pathname.endsWith('profile.html')) {
      alert('Vezi activitatea ta este disponibilă doar pe pagina de profil.');
      return;
    }

    const existingPopup = document.querySelector('.popup-activitate');
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement('div');
    popup.className = 'popup-activitate';
    popup.innerHTML = `
      <div class="header-popup">
        <button id="prevSapt">⬅</button>
        <span id="titluSapt">Săptămâna curentă</span>
        <button id="nextSapt">➡</button>
      </div>
      <div class="content-popup">
        <div id="zile-container"></div>
        <div id="detalii-zi">
          <h3>Durata pentru <span id="zi-selectata"></span></h3>
          <div id="durata-zi">00:00:00</div>
        </div>
        <canvas id="graficZile" width="400" height="200"></canvas>
      </div>
      <button id="inchidePopup">Închide</button>
    `;
    document.body.appendChild(popup);

    const zileContainer = popup.querySelector('#zile-container');
    const ziSelectataEl = popup.querySelector('#zi-selectata');
    const durataZiEl = popup.querySelector('#durata-zi');
    const titluSapt = popup.querySelector('#titluSapt');

    function afiseazaSaptamana() {
      salveazaTimp();
      localStorage.setItem('lastTick', Date.now());

      const istoric = JSON.parse(localStorage.getItem('istoricTimp')) || {};
      const zile = getSaptamana(saptamanaIndex);

      if (saptamanaIndex === 0) titluSapt.textContent = "Săptămâna curentă";
      else titluSapt.textContent = saptamanaIndex > 0
        ? `Săptămâna viitoare +${saptamanaIndex}`
        : `Săptămâna trecută ${Math.abs(saptamanaIndex)}`;

      zileContainer.innerHTML = '';

      zile.forEach(data => {
        const ziNume = zileSaptOrd[ziSapt(data) - 1];
        const durMs = istoric[data] || 0;

        const ziDiv = document.createElement('div');
        ziDiv.className = 'zi-popup';
        ziDiv.dataset.data = data;
        ziDiv.innerHTML = `
          <div class="nume-zi">${ziNume}</div>
          <div class="data-zi">${data}</div>
          <div class="durata-zi">${formatDurata(durMs)}</div>
        `;
        zileContainer.appendChild(ziDiv);
      });

      selecteazaZi(zile[0]);
      construieșteGrafic(zile, istoric);
    }

    function selecteazaZi(data) {
      const istoric = JSON.parse(localStorage.getItem('istoricTimp')) || {};
      ziSelectataEl.textContent = `${zileSaptOrd[ziSapt(data) - 1]} (${data})`;
      durataZiEl.textContent = formatDurata(istoric[data] || 0);

      document.querySelectorAll('.zi-popup').forEach(el => {
        el.classList.toggle('selectata', el.dataset.data === data);
      });
    }

    function construieșteGrafic(zile, istoric) {
      const ctx = popup.querySelector('#graficZile').getContext('2d');
      const labels = zile.map(data => zileSaptOrd[ziSapt(data) - 1]);
      const dataGrafic = zile.map(data => istoric[data] || 0);

      function durataLabel(ms) {
        return formatDurata(ms || 0);
      }

      if (chartInstance) chartInstance.destroy();
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Durata petrecută pe site',
            data: dataGrafic,
            backgroundColor: 'rgba(179, 0, 0, 0.7)',
            borderColor: 'rgba(179, 0, 0, 1)',
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 40,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: { display: false },
              grid: { drawTicks: false, drawBorder: false },
              title: { display: false }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => `Durata: ${durataLabel(ctx.raw)}`
              }
            }
          },
          animation: { duration: 500 }
        }
      });
    }

    zileContainer.addEventListener('click', e => {
      const ziDiv = e.target.closest('.zi-popup');
      if (ziDiv) selecteazaZi(ziDiv.dataset.data);
    });

    popup.querySelector('#prevSapt').onclick = () => {
      saptamanaIndex--;
      afiseazaSaptamana();
    };
    popup.querySelector('#nextSapt').onclick = () => {
      saptamanaIndex++;
      afiseazaSaptamana();
    };
    popup.querySelector('#inchidePopup').onclick = () => popup.remove();

    afiseazaSaptamana();
  }