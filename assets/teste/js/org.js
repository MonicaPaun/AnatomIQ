
function evaluateQuiz() {
  const answers = {
    q1: {
      correct: "a",
      explanation: "Organele de simț sunt structuri specializate care recepționează stimuli din mediu și îi transformă în impulsuri nervoase interpretate de creier."
    },
    q2: {
      correct: "true",
      explanation: "Fotoreceptorii din retină percep stimuli luminoși, esențiali pentru vedere."
    },
    q3: {
      correct: "a",
      explanation: "Ochiul percepe vederea și se află în cavitatea orbitară."
    },
    q4: {
      correct: "b",
      explanation: "Irisul controlează diametrul pupilei și culoarea ochilor."
    },
    q5: {
      correct: "a",
      explanation: "Urechea externă colectează și direcționează sunetele către urechea medie și internă."
    },
    q6: {
      correct: "c",
      explanation: "Papilele gustative conțin chemoreceptori care identifică gusturile."
    },
    q7: {
      correct: "a",
      explanation: "Mucoasa olfactivă conține chemoreceptori pentru miros."
    },
    q8: {
      correct: "c",
      explanation: "Corpusculii tactili din piele detectează presiunea, temperatura și durerea."
    },
    q9: {
      correct: "a",
      explanation: "Miopia este o afecțiune în care imaginea se formează în fața retinei, ceea ce cauzează dificultăți la distanță."
    },
    q10: {
      correct: "a",
      explanation: "Calea nervoasă pentru simțul văzului trece prin nervul optic către lobul occipital al creierului."
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