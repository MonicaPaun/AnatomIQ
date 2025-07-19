function evaluateQuiz() {
  const answers = {
    q1: { 
        correct: "a", 
        explanation: "Sistemul digestiv transformă alimentele în substanțe simple, utilizabile de către celulele organismului. Rolul său principal este digestia și absorbția nutrienților."
    },
    q2: { 
        correct: "true", 
        explanation: "Glandele salivare secretă salivă care conține amilază salivară, ajutând la începutul digestiei amidonului în cavitatea bucală."
    },
    q3: { 
        correct: "a", 
        explanation: "Stomacul are rolul de a realiza o digestie mecanică și chimică parțială a alimentelor, folosind pepsina și acidul clorhidric pentru a descompune proteinele."
    },
    q4: { 
        correct: "a", 
        explanation: "Intestinul subțire este principalul loc de digestie finală și de absorbție a nutrienților în sânge și limfă."
    },
    q5: { 
        correct: "a", 
        explanation: "Ficatul produce bila, care este importantă pentru emulsifierea grăsimilor în intestinul subțire, facilitând digestia acestora."
    },
    q6: { 
        correct: "b", 
        explanation: "Pancreasul produce suc pancreatic, care conține enzime pentru digestia glucidelor, lipidelor și proteinelor."
    },
    q7: { 
        correct: "b", 
        explanation: "Intestinul gros este responsabil pentru absorbția apei și electroliților și pentru formarea și eliminarea fecalelor."
    },
    q8: { 
        correct: "a", 
        explanation: "Amilaza salivară este enzima care începe digestia amidonului în cavitatea bucală, transformându-l în zaharuri mai simple."
    },
    q9: { 
        correct: "b", 
        explanation: "Bila are rolul de a emulsiona grăsimile, adică de a le descompune în picături mici, facilitând astfel digestia lor în intestinul subțire."
    },
    q10: { 
        correct: "b", 
        explanation: "Absorbția nutrienților în intestinul subțire are loc în jejun și ileon, unde substanțele nutritive sunt transferate în sânge și limfă."
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