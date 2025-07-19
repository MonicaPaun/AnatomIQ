
function evaluateQuiz() {
  const answers = {
    q1: {
      correct: "c",
      explanation: "Testiculele sunt glandele masculine care produc spermatozoizi și hormonul testosteron."
    },
    q2: {
      correct: "b",
      explanation: "LH (hormon luteinizant) stimulează ovulația la femei și secreția de testosteron la bărbați."
    },
    q3: {
      correct: "c",
      explanation: "Fertilizarea are loc, de obicei, în trompele uterine (Fallopiene), unde ovulul se întâlnește cu spermatozoidul."
    },
    q4: {
      correct: "c",
      explanation: "Uterul este organul unde are loc implantarea și dezvoltarea embrionului până la naștere."
    },
    q5: {
      correct: "c",
      explanation: "Prostata produce un lichid care protejează și hrănește spermatozoizii în lichidul seminal."
    },
    q6: {
      correct: "d",
      explanation: "Progesteronul este produs de ovare și are un rol esențial în menținerea sarcinii și pregătirea uterului."
    },
    q7: {
      correct: "true",
      explanation: "Ovogeneza (formarea ovulelor) are loc în ovare, glandele sexuale feminine."
    },
    q8: {
      correct: "b",
      explanation: "Canalul deferent transportă spermatozoizii de la epididim către uretră, pregătindu-i pentru ejaculare."
    },
    q9: {
      correct: "c",
      explanation: "Vaginul este canalul muscular care primește spermatozoizii în timpul actului sexual și servește drept canal de naștere."
    },
    q10: {
      correct: "b",
      explanation: "Varicocelul este o dilatare anormală a venelor testiculare și poate afecta fertilitatea masculină."
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