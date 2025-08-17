(function(){
  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');

  const startCard = document.getElementById('start-card');
  const quizCard = document.getElementById('quiz-card');
  const resultCard = document.getElementById('result-card');

  const questionText = document.getElementById('question-text');
  const questionCount = document.getElementById('question-count');
  const optionsWrap = document.getElementById('options');
  const scoreText = document.getElementById('score-text');

  let current = 0;
  let score = 0;
  let locked = false;

  function show(el){ el.classList.remove('hidden'); }
  function hide(el){ el.classList.add('hidden'); }

  function startQuiz(){
    current = 0; score = 0; locked = false;
    hide(startCard); hide(resultCard); show(quizCard);
    renderQuestion();
  }

  function renderQuestion(){
    const q = window.QUIZ_QUESTIONS[current];
    questionText.textContent = q.question;
    questionCount.textContent = `Question ${current+1} of ${window.QUIZ_QUESTIONS.length}`;
    optionsWrap.innerHTML = '';
    nextBtn.disabled = true;
    locked = false;

    q.options.forEach((opt, idx)=>{
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = opt;
      btn.addEventListener('click', ()=>onOptionClick(idx));
      optionsWrap.appendChild(btn);
    });
  }

  function onOptionClick(idx){
    if(locked) return;
    const q = window.QUIZ_QUESTIONS[current];
    const optionButtons = Array.from(document.querySelectorAll('.option'));
    optionButtons.forEach((btn, i)=>{
      if(i === q.answerIndex){ btn.classList.add('correct'); }
      if(i === idx && idx !== q.answerIndex){ btn.classList.add('wrong'); }
      btn.disabled = true;
    });
    if(idx === q.answerIndex) score++;
    locked = true;
    nextBtn.disabled = false;
  }

  function next(){
    current++;
    if(current >= window.QUIZ_QUESTIONS.length){
      finish();
    } else {
      renderQuestion();
    }
  }

  function finish(){
    hide(quizCard); show(resultCard);
    scoreText.textContent = `You scored ${score} / ${window.QUIZ_QUESTIONS.length}`;
  }

  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', next);
  restartBtn.addEventListener('click', startQuiz);
})();