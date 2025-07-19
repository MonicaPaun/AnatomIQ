function evaluateQuiz() {
  const answers = {
    q1: { correct: "a", explanation: "Sistemul nervos recepționează, prelucrează și transmite informații, controlând activitățile organismului." },
    q2: { correct: "false", explanation: "Sistemul nervos central controlează mișcările voluntare și percepțiile senzoriale, nu sistemul nervos periferic." },
    q3: { correct: "a", explanation: "Neuronul este unitatea structurală și funcțională a sistemului nervos." },
    q4: { correct: "b", explanation: "Sistemul nervos vegetativ reglează funcțiile involuntare, cum ar fi respirația și ritmul cardiac." },
    q5: { correct: "b", explanation: "Nervii cranieni și spinali sunt componente ale sistemului nervos periferic." },
    q6: { correct: "b", explanation: "Teaca de mielină accelerează transmiterea impulsului nervos de-a lungul axonului." },
    q7: { correct: "a", explanation: "Boala Parkinson este o tulburare neurodegenerativă care afectează mișcările motorii." },
    q8: { correct: "b", explanation: "Cerebelul este responsabil pentru coordonarea mișcărilor și menținerea echilibrului." },
    q9: { correct: "a", explanation: "Neurotransmițătorii transmit impulsurile nervoase între neuroni." },
    q10: { correct: "c", explanation: "Arcul reflex asigură o reacție rapidă și automată la stimuli." }
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