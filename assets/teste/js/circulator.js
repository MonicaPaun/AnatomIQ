
function evaluateQuiz() {
  const answers = {
    q1: { 
        correct: "b", 
        explanation: "Sistemul circulator uman este ansamblul organelor care asigură transportul substanțelor prin intermediul sângelui și limfei."
    },
    q2: { 
        correct: "true", 
        explanation: "Sistemul circulator transportă oxigen și nutrienți în corp prin sânge și limfă, fiind esențial pentru funcționarea celulelor."
    },
    q3: { 
        correct: "b", 
        explanation: "Sistemul circulator include arterele, venele, capilarele și inima, toate acestea fiind esențiale pentru transportul sângelui."
    },
    q4: { 
        correct: "b", 
        explanation: "Vasele limfatice au rolul de a drena excesul de lichid interstițial și contribuie la apărarea imună prin transportul limfei."
    },
    q5: { 
        correct: "c", 
        explanation: "Arterele transportă sângele de la inimă către țesuturi, având pereți groși pentru a rezista presiunii sângelui pompat."
    },
    q6: { 
        correct: "c", 
        explanation: "Eritrocitele (hematiile) transportă oxigenul prin hemoglobină, o proteină care se leagă de oxigen și îl transportă în organism."
    },
    q7: { 
        correct: "c", 
        explanation: "Inima este compusă din 4 camere: două atrii și două ventricule, care lucrează împreună pentru a pompa sângele în corp."
    },
    q8: { 
        correct: "b", 
        explanation: "Valva semilunară aortei permite sângele să treacă din ventriculul stâng în aortă și împiedică fluxul invers."
    },
    q9: { 
        correct: "b", 
        explanation: "Hipertensiunea arterială reprezintă o tensiune arterială peste valorile normale, ceea ce poate duce la riscuri de AVC și infarct miocardic."
    },
    q10: { 
        correct: "a", 
        explanation: "Venele pulmonare sunt un tip de vas sanguin care transportă sângele oxigenat de la plămâni către inimă."
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