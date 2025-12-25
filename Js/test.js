const QUESTIONS = [
  { q: "Q1: How old am I?", options: ["19", "20", "21", "22"], answer: 2, explain: "Born on 2004/03/23 → age is 21." },
  { q: "Q2: Guess my MBTI?", options: ["INFP", "ENTP", "ISTJ", "ENFP"], answer: 1, explain: "Answer: ENTP." },
  { q: "Q3: What is my favorite color?", options: ["Warm tones", "Cold tones", "Pastel pink", "Neon green"], answer: 1, explain: "Answer: Cold tones." },
  { q: "Q4: Guess what type of music I enjoy more?", options: ["K-PoP", "Hip-hop", "Classical", "EDM"], answer: 2, explain: "Answer: Classical." },
  { q: "Q5: What subject I currently focus on?", options: ["Product Design", "Digital design", "Mechanical engineering", "Physic"], answer: 3, explain: "Answer: Physic." }
];

document.addEventListener("DOMContentLoaded", () => {
  let idx = 0;
  let score = 0;
  let locked = false;

  const stage = document.getElementById("stage");
  const orb = document.getElementById("orb");

  const qIndex = document.getElementById("qIndex");
  const progress = document.getElementById("progress");
  const questionText = document.getElementById("questionText");
  const choices = document.getElementById("choices");

  const reveal = document.getElementById("reveal");
  const revealLine = document.getElementById("revealLine");

  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");

  const scoreBox = document.getElementById("scoreBox");
  const scoreNum = document.getElementById("scoreNum");
  const scoreNote = document.getElementById("scoreNote");

  const panelClose = document.getElementById("panelClose");

  const must = { stage, orb, qIndex, progress, questionText, choices, reveal, revealLine, nextBtn, restartBtn, scoreBox, scoreNum, scoreNote };
  for (const [k, v] of Object.entries(must)) {
    if (!v) {
      console.error(`[quiz] Missing element: ${k}`);
      return; 
    }
  }

  console.log("[quiz] mounted ok");

  orb.addEventListener("click", () => {
    stage.classList.add("is-active");
    resetQuiz();
  });

  if (panelClose) {
    panelClose.addEventListener("click", () => backToStart());
  }

  nextBtn.addEventListener("click", () => {
    if (nextBtn.disabled) return;

    if (idx < QUESTIONS.length - 1) {
      idx++;
      renderQuestion();
    } else {
      showScore();
    }
  });

  restartBtn.addEventListener("click", () => resetQuiz());

  function resetQuiz() {
    idx = 0;
    score = 0;
    locked = false;

    scoreBox.hidden = true;
    nextBtn.textContent = "Next";
    nextBtn.disabled = true;
    reveal.hidden = true;

    renderQuestion();
  }

  function renderQuestion() {
    locked = false;
    nextBtn.disabled = true;
    reveal.hidden = true;

    const data = QUESTIONS[idx];

    qIndex.textContent = `Q${idx + 1}`;
    progress.textContent = `${idx + 1} / ${QUESTIONS.length}`;
    questionText.textContent = data.q;

    choices.innerHTML = "";
    data.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.type = "button";
      btn.textContent = opt;

      btn.addEventListener("click", () => choose(i));
      choices.appendChild(btn);
    });
  }

  function choose(selectedIndex) {
    if (locked) return;
    locked = true;

    const data = QUESTIONS[idx];
    const correctIndex = data.answer;

    const btns = [...choices.querySelectorAll(".choice")];
    btns.forEach((b) => (b.disabled = true));

    if (selectedIndex === correctIndex) {
      score++;
      btns[selectedIndex].classList.add("is-correct");
    } else {
      btns[selectedIndex].classList.add("is-wrong");
      btns[correctIndex].classList.add("is-correct");
    }

    reveal.hidden = false;
    const isRight = selectedIndex === correctIndex;
    const correctText = data.options[correctIndex];

    revealLine.textContent = isRight
      ? `⭕️Correct! — ${data.explain}`
      : `❌ Wrong. Correct answer: ${correctText}. — ${data.explain}`;

    nextBtn.disabled = false;
    nextBtn.textContent = idx === QUESTIONS.length - 1 ? "See Score" : "Next";

    console.log("[quiz] next enabled:", nextBtn.disabled === false);
  }

  function showScore() {
    scoreBox.hidden = false;
    scoreNum.textContent = `${score} / ${QUESTIONS.length}`;

    scoreNote.textContent =
      score === QUESTIONS.length ? "Perfect." :
      score >= 3 ? "Nice!" :
      "It's okay, try again!";

    questionText.textContent = "Quiz finished!";
    choices.innerHTML = "";
    reveal.hidden = true;
    nextBtn.disabled = true;
  }

  function backToStart() {
    stage.classList.remove("is-active");
    idx = 0;
    score = 0;
    locked = false;

    qIndex.textContent = "Q1";
    progress.textContent = `1 / ${QUESTIONS.length}`;
    questionText.textContent = "";
    choices.innerHTML = "";
    reveal.hidden = true;
    nextBtn.disabled = true;
    nextBtn.textContent = "Next";
    scoreBox.hidden = true;
  }
});