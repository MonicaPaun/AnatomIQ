const countdownElement = document.getElementById('countdown');
    const targetDate = new Date('2026-06-24T00:00:00');

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdownElement.textContent = "Mult succes la examen!";
        clearInterval(interval);
        return;
      }

      const zile = Math.floor(diff / (1000 * 60 * 60 * 24));
      const ore = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minute = Math.floor((diff / (1000 * 60)) % 60);
      const secunde = Math.floor((diff / 1000) % 60);

      countdownElement.textContent = 
        `${zile} zile ${ore} ore ${minute} minute ${secunde} secunde`;
    }

    updateCountdown(); // apel inițial
    const interval = setInterval(updateCountdown, 1000);
