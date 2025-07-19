
function evaluateQuiz() {
  const answers = {
    q1: { 
        correct: "b", 
        explanation: "Un țesut este o grupare de celule care au aceeași formă, structură și funcție. Celulele dintr-un țesut lucrează împreună pentru a îndeplini un rol specific în organism."
    },
    q2: { 
        correct: "a", 
        explanation: "Histologia este știința care studiază țesuturile, structura și funcția acestora, analizând diferitele tipuri de celule care formează țesuturile din organisme."
    },
    q3: { 
        correct: "c", 
        explanation: "Țesuturile meristematice sunt formate din celule care se divid continuu, în timp ce țesuturile definitive sunt formate din celule care nu se mai divid."
    },
    q4: { 
        correct: "b", 
        explanation: "Meristemele apicale sunt responsabile pentru creșterea în lungime a plantelor, contribuind la dezvoltarea vârfului rădăcinii și a tulpinii."
    },
    q5: { 
        correct: "b", 
        explanation: "Țesuturile de apărare ale plantelor protejează plantele împotriva factorilor externi dăunători, cum ar fi dăunătorii sau condițiile nefavorabile ale mediului."
    },
    q6: { 
        correct: "c", 
        explanation: "Țesuturile conducătoare, cum ar fi xilem și floem, sunt responsabile pentru transportul apei, nutrienților și produselor fotosintezei prin plantă."
    },
    q7: { 
        correct: "c", 
        explanation: "Țesuturile mecanice (de susținere) ajută la menținerea formei plantei și susțin greutatea acesteia. Ele sunt esențiale pentru plantele care cresc în înălțime."
    },
    q8: { 
        correct: "c", 
        explanation: "Epitelialul pseudostratificat este un tip de țesut epitelial care pare stratificat, dar toate celulele se sprijină pe membrana bazală, iar unele nu ajung la suprafață."
    },
    q9: { 
        correct: "b", 
        explanation: "Țesutul muscular neted se găsește în pereții organelor interne, fiind responsabil pentru mișcările involuntare ale acestora, cum ar fi mișcările intestinale."
    },
    q10: { 
        correct: "b", 
        explanation: "Celulele gliale sunt celule din sistemul nervos care susțin și protejează neuronii, dar nu transmit impulsuri nervoase. Ele sunt esențiale pentru funcționarea optimă a neuronilor."
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