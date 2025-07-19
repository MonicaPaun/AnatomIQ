
function evaluateQuiz() {
  const answers = {
    q1: { 
        correct: "c", 
        explanation: "Sistemul osos are rolul principal de a susține țesuturile moi ale corpului și de a conferi forma generală a acestuia. De asemenea, oasele sunt implicate în mișcare și protecția organelor interne."
    },
    q2: { 
        correct: "true", 
        explanation: "Vertebrele toracale sunt parte din scheletul axial și sunt implicate în protejarea organelor vitale din cavitatea toracică, cum ar fi inima și plămânii."
    },
    q3: { 
        correct: "a", 
        explanation: "Femurul este un os lung, care se articulează cu pelvisul și joacă un rol esențial în susținerea greutății corpului și în mișcarea piciorului."
    },
    q4: { 
        correct: "b", 
        explanation: "Coloana vertebrală susține capul și trunchiul, protejează măduva spinării și permite flexibilitatea și mobilitatea trunchiului."
    },
    q5: { 
        correct: "a", 
        explanation: "Osteoblastele sunt celulele care sintetizează matricea osoasă, contribuind la formarea oaselor și la mineralizarea acestora."
    },
    q6: { 
        correct: "a", 
        explanation: "Articulația genunchiului este o articulație balama, permițând mișcări unghiulare într-o singură direcție."
    },
    q7: { 
        correct: "a", 
        explanation: "Sacrumul face parte din centura pelviană și leagă coloana vertebrală de pelvis, susținând greutatea corpului."
    },
    q8: { 
        correct: "c", 
        explanation: "Osteocitele sunt celule mature care ajută la menținerea structurii osoase, monitorizând condițiile din matricea osoasă."
    },
    q9: { 
        correct: "b", 
        explanation: "Cartilajul din articulații ajută la amortizarea șocurilor, la mișcarea fluidă și la reducerea frecării între oase."
    },
    q10: { 
        correct: "b", 
        explanation: "Osificarea endocondrală este procesul prin care cartilajul se transformă în os în cazul oaselor lungi, cum ar fi femurul."
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