  const tabButtons = document.querySelectorAll('#structura-nefronului .tab-btn');
  const tabPanels = document.querySelectorAll('#structura-nefronului .tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Dezactivează toate tab-urile și panourile
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
        b.setAttribute('tabindex', '-1');
      });
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.hidden = true;
      });

      // Activează tab-ul și panoul selectat
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');
      const tabId = btn.getAttribute('data-tab');
      const tabPanel = document.getElementById(tabId);
      tabPanel.classList.add('active');
      tabPanel.hidden = false;
      tabPanel.focus();
    });
  });

  const stepButtons = document.querySelectorAll('.step-btn');
  const stepContents = document.querySelectorAll('.step-content');

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');

      // Scoate clasa active de la toate
      stepButtons.forEach(b => b.classList.remove('active'));
      stepContents.forEach(c => c.classList.remove('active'));

      // Activează pasul curent
      btn.classList.add('active');
      document.querySelector(`.step-content[data-step="${step}"]`).classList.add('active');
    });
  });

  const hidratare = document.getElementById('hidratare');
const volum = document.getElementById('volum');
const tensiune = document.getElementById('tensiune');

const hormon = document.getElementById('hormon');
const mecanism = document.getElementById('mecanism');
const efect = document.getElementById('efect');

function updateSimulator() {
  if (hidratare.value == 0) {
    hormon.textContent = "👉 ADH ↑";
    mecanism.textContent = "Reabsorbție de apă în tubii colectori";
    efect.textContent = "Urina devine concentrată, volum redus";
  } else if (hidratare.value == 2) {
    hormon.textContent = "👉 ADH ↓, ANP ↑";
    mecanism.textContent = "Reabsorbție redusă de apă și Na⁺";
    efect.textContent = "Urina este diluată, volum crescut";
  } else {
    hormon.textContent = "👉 ADH normal";
    mecanism.textContent = "Reabsorbție echilibrată de apă";
    efect.textContent = "Urina cu volum și concentrație normale";
  }

  // Volum sangvin – efect ANP
  if (volum.value == 2) {
    hormon.textContent = "👉 ANP ↑";
    mecanism.textContent = "Inhibă reabsorbția de Na⁺";
    efect.textContent = "Volum urină ↑, tensiune ↓";
  }

  // Tensiune scăzută – sistem renină-angiotensină
  if (tensiune.value == 0) {
    hormon.textContent = "👉 Renină → Angiotensină II → Aldosteron";
    mecanism.textContent = "Reabsorbție de Na⁺, crește volumul sangvin";
    efect.textContent = "Tensiunea arterială crește";
  }
}

[hidratare, volum, tensiune].forEach(slider => {
  slider.addEventListener('input', updateSimulator);
});

updateSimulator(); // apel inițial
document.querySelectorAll('.patologie-item').forEach(item => {
  item.addEventListener('click', () => {
    const expanded = item.getAttribute('aria-expanded') === 'true';
    
    // Închide toate elementele
    document.querySelectorAll('.patologie-item').forEach(i => {
      i.setAttribute('aria-expanded', 'false');
      i.querySelector('.patologie-info').hidden = true;
    });

    // Deschide/închide elementul curent
    if (!expanded) {
      item.setAttribute('aria-expanded', 'true');
      item.querySelector('.patologie-info').hidden = false;
    }
  });

  // Permite toggle și la apăsarea Enter sau Space când e focusat
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});
