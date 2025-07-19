
function evaluateQuiz() {
  const answers = {
    q1: {
      correct: "b",
      explanation: "Sistemul excretor elimină produși azotoși (precum ureea), reglează volumul și compoziția sângelui, menține pH-ul și homeostazia organismului."
    },
    q2: {
      correct: "b",
      explanation: "Corpul renal (Malpighi), format din glomerul și capsula Bowman, este responsabil de filtrarea inițială a sângelui."
    },
    q3: {
      correct: "b",
      explanation: "Filtrarea glomerulară are loc în glomerulul capilar și capsula Bowman, unde plasma este ultrafiltrată sub presiune."
    },
    q4: {
      correct: "b",
      explanation: "ADH (vasopresina), secretat de hipotalamus și stocat în neurohipofiză, favorizează reabsorbția apei în tubii colectori, concentrând urina."
    },
    q5: {
      correct: "c",
      explanation: "Aldosteronul stimulează reabsorbția sodiului (Na⁺) și eliminarea potasiului (K⁺) în tubii distali ai nefronului."
    },
    q6: {
      correct: "c",
      explanation: "Ureterele sunt tuburi care transportă urina de la rinichi la vezica urinară prin peristaltism."
    },
    q7: {
      correct: "c",
      explanation: "În cazul secreției crescute de ADH, se reabsoarbe mai multă apă în tubii colectori, rezultând o urină mai concentrată."
    },
    q8: {
      correct: "b",
      explanation: "Celulele podocitare din capsula Bowman reglează fin filtrarea, formând o barieră selectivă ce permite doar moleculelor mici să treacă."
    },
    q9: {
      correct: "c",
      explanation: "Diabetul insipid este cauzat de lipsa ADH sau de insensibilitatea tubilor renali la acest hormon, determinând poliurie și deshidratare."
    },
    q10: {
      correct: "a",
      explanation: "Tubul contort proximal reabsoarbe masiv apă, glucoză, aminoacizi și ioni, recuperând substanțele utile din urina primară."
    }
  };

  let score = 0;
  const questions = document.querySelectorAll('.question');
  questions.forEach((question, index) => {
    const questionName = question.querySelector('input').name;
    const selectedOption = question.querySelector('input[type="radio"]:checked') || question.querySelector('input[type="checkbox"]:checked');
    const explanationDiv = question.querySelector('.explanation');

    if (selectedOption) {
      const userAnswer = selectedOption.value;
      const correctAnswer = answers[questionName].correct;
      const explanation = answers[questionName].explanation;

      if (Array.isArray(correctAnswer)) {
        const selectedValues = Array.from(question.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
        const isCorrect = correctAnswer.every(val => selectedValues.includes(val)) && selectedValues.length === correctAnswer.length;
        if (isCorrect) {
          score++;
          explanationDiv.classList.add('correct');
        } else {
          explanationDiv.classList.add('wrong');
        }
      } else {
        if (userAnswer === correctAnswer) {
          score++;
          explanationDiv.classList.add('correct');
        } else {
          explanationDiv.classList.add('wrong');
        }
      }
      explanationDiv.textContent = explanation;
    }
  });

  let feedbackMessage = "";
  let emoji = "";

  if (score === 10) {
    feedbackMessage = "🌟 Felicitări! Ai răspuns corect la toate întrebările!";
    emoji = "🎉🎉🎉";
  } else if (score >= 9) {
    feedbackMessage = "Ai făcut o treabă grozavă! Mai exersează puțin pentru perfecțiune!";
    emoji = "👍";
  } else if (score >= 7) {
    feedbackMessage = "Bravo! Ești pe drumul cel bun. Continuă să înveți!";
    emoji = "😊";
  } else if (score >= 5) {
    feedbackMessage = "Bine! Îți recomand să exersezi mai mult pentru a înțelege mai bine conceptul.";
    emoji = "📘";
  } else {
    feedbackMessage = "Nu-i nimic! Continuă să înveți și vei progresa rapid.";
    emoji = "💪";
  }

  document.getElementById('results').innerHTML = `${feedbackMessage} ${emoji} Ai obținut ${score} din ${questions.length} puncte!`;
}
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