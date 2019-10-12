let currentQuestion = 1;

$("#start-btn").on("click", startQuiz);
$(".choice-btn").on("click", function(i) {
  //console.log($(this).text);
  checkAnswer($(this).text(), questions[currentQuestion - 1].answer);
});

// Starts the quiz by hiding the start-card, showing the questions card, and beginning the timer.
function startQuiz() {
  // $("#start-card").addClass("d-none");
  // TODO: SHOW QUESTIONS CARD. Add "d-none" to .questions-card
  // $("#questions-card").addClass("d-block");

  getNextQuestion();
  startTimer();
}

function startTimer() {
  let timerInterval = setInterval(timeCountdown, 1000);
  let totalTime = questions.length * 15;
  $("#timeRem").text(totalTime);

  // Reduces the time remaining and ends the game when the timer reaches 0;
  // TODO: stop game if all questions answered.
  function timeCountdown() {
    let timeCurr = parseInt($("#timeRem").text(), 10);
    if (timeCurr <= 0 || currentQuestion - 1 == questions.length) {
      displayEndCard();
      clearInterval(timerInterval);
    } else {
      $("#timeRem").text(parseInt(timeCurr, 10) - 1);
    }
  }
  return timerInterval;
}

function getNextQuestion() {
  if (currentQuestion - 1 != questions.length) {
    let question = questions[currentQuestion - 1];
    $("#question").text(question.question);

    let choiceButtons = $(".choice-btn");
    choiceButtons.each(function(i) {
      $(this).text(question.choices[i]);
    });
  } else {
  }
}

function checkAnswer(choiceSelected, answer) {
  let answerIndicatorEle = $("#answer-indicator");
  // TODO: make indicator fade? Add green/red colors
  if (choiceSelected === answer) {
    answerIndicatorEle.text("Correct!");
  } else {
    let timeCurr = $("#timeRem").text();
    answerIndicatorEle.text("Wrong!");
    $("#timeRem").text(parseInt(timeCurr, 10) - 15);
  }
  currentQuestion++;
  getNextQuestion();
}

function displayEndCard() {
  // $("#questions-card").addClass("d-none");
  // TODO: Add "d-none" to .end-card in html
  // $("#end-card").addClass("d-block");
  let score = $("#timeRem").text();
  $("#score").text(score);
}

$("#submit-score-btn").on("click", function(event) {
  event.preventDefault();
  submitScore();
});

function submitScore() {
  let score = $("#score").text();
  let initials = $("#inputInitials")
    .val()
    .toUpperCase();
  let entry = { initials: initials, score: score };
  localStorage.setItem("Quiz High Scores", JSON.stringify(entry));
}

// Takes an array and outputs the array with the contents shuffled.
// Taken from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let m = array.length;
  let t, i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
