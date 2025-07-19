
function evaluateQuiz() {
  const answers = {
    q1: { 
        correct: "a", 
        explanation: "Sistemul endocrin este format din glande care secretă hormoni direct în sânge și reglează funcțiile organismului precum metabolismul, creșterea și reproducerea."
    },
    q2: { 
        correct: "true", 
        explanation: "Hipotalamusul conectează sistemul nervos cu cel endocrin și se află sub talamus, în encefal."
    },
    q3: { 
        correct: "a", 
        explanation: "Adenohipofiza (hipofiza anterioară) secretă hormoni precum GH, TSH, ACTH, FSH, LH și PRL, care reglează alte glande și creșterea."
    },
    q4: { 
        correct: "b", 
        explanation: "Glanda tiroidă este localizată anterior de trahee, sub cartilajul tiroid și secreta hormonii T3, T4 și calcitonină."
    },
    q5: { 
        correct: "a", 
        explanation: "Glandele paratiroide sunt patru glande mici pe fața posterioară a tiroidei care secretă parathormon (PTH), hormon ce crește nivelul calciului în sânge."
    },
    q6: { 
        correct: "a", 
        explanation: "Cortexul suprarenal produce mineralocorticoizi (ex. aldosteron), glucocorticoizi (ex. cortizol) și androgeni, iar medula produce adrenalină și noradrenalină."
    },
    q7: { 
        correct: "a", 
        explanation: "Pancreasul endocrin conține insulele Langerhans care secretă insulină (scade glicemia), glucagon (crește glicemia) și somatostatină (inhibă alți hormoni)."
    },
    q8: { 
        correct: "a", 
        explanation: "Testiculele secretă testosteron prin celulele Leydig, hormon responsabil cu dezvoltarea sexuală și spermatogeneza."
    },
    q9: { 
        correct: "a", 
        explanation: "Hormonii hidrosolubili (peptidici) acționează prin receptori membranari la nivelul membranei celulare, exemplu: insulina și ADH."
    },
    q10: { 
        correct: "a", 
        explanation: "Reglarea hormonală se face prin feedback negativ, de exemplu TSH este inhibat de nivelul crescut de T3/T4."
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