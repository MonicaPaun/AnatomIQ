
function evaluateQuiz() {
  const answers = {
    q1: { 
        correct: "b", 
        explanation: "Sistemul respirator are rolul principal de a asigura schimbul de gaze între organism și mediul înconjurător, prin aducerea oxigenului în corp și eliminarea dioxidului de carbon."
    },
    q2: { 
        correct: "true", 
        explanation: "Cavitatea nazală ajută la filtrarea, umidificarea și încălzirea aerului inspirat, ceea ce este esențial pentru protecția căilor respiratorii."
    },
    q3: { 
        correct: "b", 
        explanation: "Alveolele pulmonare sunt unitățile funcționale ale plămânului, unde se produce schimbul de gaze între oxigen și dioxidul de carbon."
    },
    q4: { 
        correct: "c", 
        explanation: "Diafragma joacă un rol esențial în respirație, controlând volumul toracic în timpul inspirației și expirației."
    },
    q5: { 
        correct: "a", 
        explanation: "Schimbul de gaze la nivelul alveolelor se face prin difuzie, proces pasiv unde oxigenul trece din aer în sânge și dioxidul de carbon din sânge în aer."
    },
    q6: { 
        correct: "true", 
        explanation: "Astmul bronșic este caracterizat de inflamația cronică a căilor respiratorii, ceea ce duce la dificultăți de respirație și tuse."
    },
    q7: { 
        correct: "b", 
        explanation: "Epiglota previne pătrunderea alimentelor și lichidelor în trahee, protejând astfel căile respiratorii."
    },
    q8: { 
        correct: "b", 
        explanation: "Schimbul de gaze între oxigen și dioxidul de carbon la nivel celular are loc în țesuturi, în cadrul procesului de respirație celulară."
    },
    q9: { 
        correct: "b", 
        explanation: "Fumatul distruge epiteliul ciliar din căile respiratorii și reduce eficiența hematozei, afectând astfel respirația."
    },
    q10: { 
        correct: "b", 
        explanation: "Mucoasa olfactivă din cavitatea nazală are rolul de a contribui la perceperea mirosurilor, esențială pentru detectarea substanțelor chimice din aer."
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