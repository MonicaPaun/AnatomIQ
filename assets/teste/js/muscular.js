function evaluateQuiz() {
const answers = {
    q1: { 
        correct: "b", 
        explanation: "Sistemul muscular include toți mușchii care sunt responsabili pentru mișcarea corpului și menținerea posturii."
    },
    q2: { 
        correct: "false", 
        explanation: "Sistemul muscular are mai multe funcții importante, inclusiv mișcarea corpului, menținerea posturii și ajutorul în circulația sângelui."
    },
    q3: { 
        correct: "b", 
        explanation: "Mușchii netezi sunt controlati involuntar și se găsesc în pereții organelor interne, cum ar fi stomacul și intestinele."
    },
    q4: { 
        correct: "a", 
        explanation: "Bicepsul este un mușchi striat (scheletic), controlat voluntar, care se află în braț și ajută la flexia acestuia."
    },
    q5: { 
        correct: "b", 
        explanation: "Contracția izometrică are loc atunci când mușchiul se contractă, dar lungimea sa nu se schimbă. Un exemplu este ținerea unei greutăți în poziție statică."
    },
    q6: { 
        correct: "b", 
        explanation: "Bicepsul brahial este un mușchi agonist într-o mișcare de flexie a brațului. Agoniștii sunt mușchii principali care efectuează mișcarea."
    },
    q7: { 
        correct: "b", 
        explanation: "Diafragma este mușchiul principal care ajută la respirație, separând cavitatea toracică de cea abdominală și ajutând la inhalare."
    },
    q8: { 
        correct: "c", 
        explanation: "Mușchii tenar și hipotenar sunt esențiali pentru mișcările fine ale mâinii, cum ar fi prinderea și apucarea obiectelor."
    },
    q9: { 
        correct: "b", 
        explanation: "Contracțiile izotonice sunt cele în care mușchiul își schimbă lungimea pentru a produce mișcare. Un exemplu este ridicarea unui obiect."
    },
    q10: { 
        correct: "b", 
        explanation: "Mușchii toracelui și umărului sunt implicați în mișcările brațului. Mușchii pectorali, deltoidul și trapezul joacă un rol important în mobilitatea brațului."
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