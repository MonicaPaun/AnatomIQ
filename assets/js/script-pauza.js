(function(){
  let pauseInterval;
  let pauseData = null;

  const startBtn = document.getElementById("startPauseBtn");
  const endBtn = document.getElementById("endPauseBtn");
  const overlay = document.getElementById("pauseOverlay");
  const pauseMessage = document.getElementById("pauseMessage");
  const pauseTimer = document.getElementById("pauseTimer");
  const gameFrame = document.getElementById("gameFrame");
  const changeGameSelect = document.getElementById("changeGameSelect");

  startBtn.addEventListener("click", () => {
    if(pauseData) {
      alert(translations[currentLang].alerts.alreadyOnPause);
      return;
    }

    const choice = confirm(translations[currentLang].alerts.choosePause);
    if(choice){
      startPause("relax", 10 * 60);
    } else {
      chooseGame();
    }
  });

  endBtn.addEventListener("click", () => {
    if(confirm(translations[currentLang].alerts.confirmStopPause)) {
      endPause(true);
    }
  });

  changeGameSelect.addEventListener("change", () => {
    const selectedGameCode = changeGameSelect.value;
    if(selectedGameCode){
      pauseData.gameCode = selectedGameCode;
      pauseData.gameName = getGameNameByCode(selectedGameCode);
      loadGame(selectedGameCode);
    }
    changeGameSelect.value = "";
  });

  function chooseGame(){
    const game = prompt(
      translations[currentLang].alerts.chooseGamePrompt || 
      "Alege joc:\n1 = Puzzle\n2 =Memory \n3 = Desen"
    );
    let gameName = "";
    let gameCode = "";

    switch(game){
      case "1":
        gameCode = "Puzzle";
        gameName = translations[currentLang]["text_603"];
        break;
      case "2":
        gameCode = "Memory";
        gameName = translations[currentLang]["text_605"];
        break;
      case "3":
        gameCode = "Desen";
        gameName = translations[currentLang]["text_606"];
        break;
      default: 
        alert(translations[currentLang].alerts.invalidPause);
        return;
    }
    startPause("game", 5 * 60, gameName, gameCode);
  }

  function startPause(type, duration, gameName="", gameCode=""){
    const endTime = Date.now() + duration * 1000;
    pauseData = { type, endTime, gameName, gameCode };
    applyPause(pauseData);
  }

  function applyPause(data){
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    gameFrame.style.display = "none";
    gameFrame.src = "";

    if(data.type === "relax"){
      pauseMessage.innerText = translations[currentLang].alerts.relaxPauseMessage;
      changeGameSelect.style.display = "none";
    } else {
     pauseMessage.innerText = data.gameName;


      loadGame(data.gameCode);
      changeGameSelect.style.display = "inline-block";
    }

    updateTimer(data);
    pauseInterval = setInterval(() => updateTimer(data), 1000);

    document.querySelectorAll("a, button, input, select").forEach(el => {
      if(el !== startBtn && el !== endBtn && el !== changeGameSelect) el.disabled = true;
    });

    startBtn.disabled = true;
    endBtn.disabled = false;

    window.onbeforeunload = () => translations[currentLang].alerts.confirmLeave;
  }

  function loadGame(gameCode){
    const url = getGameUrl(gameCode);
    if(url){
      gameFrame.src = url;
      gameFrame.style.display = "block";
    }
  }

  function updateTimer(data){
    const remaining = Math.max(0, Math.floor((data.endTime - Date.now()) / 1000));
    pauseTimer.innerText = `${translations[currentLang].text_remainingTime} ${formatTime(remaining)}`;

    if(remaining <= 0){
      endPause(false);
    }
  }

  function endPause(force){
    clearInterval(pauseInterval);
    overlay.style.display = "none";
    gameFrame.src = "";
    gameFrame.style.display = "none";
    changeGameSelect.style.display = "none";

    document.querySelectorAll("a, button, input, select").forEach(el => el.disabled = false);

    window.onbeforeunload = null;

    pauseData = null;

    startBtn.disabled = false;
    endBtn.disabled = true;

    if(!force) alert(translations[currentLang].alerts.pauseOver);
  }

  function formatTime(sec){
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function getGameUrl(gameCode){
    if(gameCode === "Puzzle") return "puzzle.html"; 
    if(gameCode === "Memory") return "memory.html";
    if(gameCode === "Desen") return "desen.html"; 
    return "";
  }

  function getGameNameByCode(gameCode){
    switch(gameCode){
      case "Puzzle": return translations[currentLang]["text_603"];
      case "Memory": return translations[currentLang]["text_605"];
      case "Desen": return translations[currentLang]["text_606"];
      default: return "";
    }
  }

  overlay.style.display = "none";
  endBtn.disabled = true;
})();