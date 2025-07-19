
function evaluateQuiz() {
    const answers = {
        q1: { 
            correct: "c", 
            explanation: "Limfa este un lichid transparent care conține celule imune și are rol în apărarea organismului și în menținerea echilibrului lichidelor."
        },
        q2: { 
            correct: "c", 
            explanation: "Ganglionii limfatici filtrează limfa și distrug agenții patogeni cu ajutorul limfocitelor B și T."
        },
        q3: { 
            correct: "c", 
            explanation: "Timusul este organul în care limfocitele T se maturizează, pregătindu-se pentru funcția lor imunologică."
        },
        q4: { 
            correct: "c", 
            explanation: "Ductul limfatic drept drenează limfa din partea dreaptă a capului, gâtului și toracelui."
        },
        q5: { 
            correct: "true", 
            explanation: "Este adevărat – splina filtrează sângele, elimină celulele vechi și are rol important în imunitate."
        },
        q6: { 
            correct: "b", 
            explanation: "În intestinul subțire, vasele chilifere absorb grăsimile și le transportă în sistemul limfatic."
        },
        q7: { 
            correct: "b", 
            explanation: "Vasele chilifere sunt vase limfatice din intestinul subțire care absorb lipide în timpul digestiei."
        },
        q8: { 
            correct: "c", 
            explanation: "Limfedemul este acumularea de lichid limfatic în țesuturi, ducând la umflare (edem)."
        },
        q9: { 
            correct: "b", 
            explanation: "Măduva osoasă produce toate celulele sanguine, inclusiv limfocitele implicate în apărarea imună."
        },
        q10: { 
            correct: "d", 
            explanation: "După filtrare, limfa este transportată prin ducte și se varsă în circulația sanguină prin vena subclaviculară."
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