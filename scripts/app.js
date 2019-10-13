// TODO: Dont let score go lower than 0.
let currentQuestion = 1;
let highscoresArr = JSON.parse(localStorage.getItem("Quiz Highscores"));

$("#start-btn").on("click", startQuiz);

$(".choice-btn").on("click", function(i) {
  checkAnswer($(this).text(), questions[currentQuestion - 1].answer);
});

$("#submit-score-btn").on("click", function(event) {
  event.preventDefault();
  submitScore();
  populateHighscores();
  showHighscores();
});

$("#return-btn").on("click", function() {
  $("#highscores-card").addClass("d-none");
  $("#highscores-card").removeClass("d-block");

  $("#start-card").addClass("d-block");
  $("#start-card").removeClass("d-none");
});

$("#view-highscores-link").on("click", showHighscores);

populateHighscores();

// Starts the quiz by hiding the start-card, showing the questions card, and beginning the timer.
function startQuiz() {
  $("#start-card").addClass("d-none");
  $("#start-card").removeClass("d-block");
  // TODO: SHOW QUESTIONS CARD. Add "d-none" to .questions-card
  $("#questions-card").addClass("d-block");
  $("#questions-card").removeClass("d-none");

  getNextQuestion();
  startTimer();
}

// Sets the total time and begins the timer.
function startTimer() {
  let timerInterval = setInterval(timeCountdown, 1000);
  let totalTime = questions.length * 15;
  $("#timeRem").text(totalTime);

  // Reduces the time remaining and ends the game when the timer reaches 0;
  function timeCountdown() {
    let timeCurr = parseInt($("#timeRem").text(), 10);
    if (timeCurr <= 0 || currentQuestion - 1 == questions.length) {
      displayEndCard();
      clearInterval(timerInterval);
    } else {
      $("#timeRem").text(parseInt(timeCurr, 10) - 1);
    }
  }
}

// Populates the question card's with the question and choices.
function getNextQuestion() {
  if (currentQuestion - 1 != questions.length) {
    let question = questions[currentQuestion - 1];
    $("#question").text(question.question);

    let choiceButtons = $(".choice-btn");
    choiceButtons.each(function(i) {
      $(this).text(question.choices[i]);
    });
  }
}

// Checks if the choice selected is the answer and advances to the next question.
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

// Displays and populates the end card.
function displayEndCard() {
  $("#questions-card").addClass("d-none");
  $("#questions-card").removeClass("d-block");
  // TODO: Add "d-none" to .end-card in html
  $("#end-card").addClass("d-block");
  $("#end-card").removeClass("d-none");
  let score = $("#timeRem").text();
  $("#score").text(score);

  currentQuesiton = 1;
}

function submitScore() {
  let score = $("#score").text();
  let initials = $("#inputInitials")
    .val()
    .toUpperCase();
  let entry = { initials: initials, score: score };

  if (!highscoresArr) {
    highscoresArr = [];
  }
  highscoresArr.push(entry);
  highscoresArr.sort(sortHighscores).splice(5);
  localStorage.setItem("Quiz Highscores", JSON.stringify(highscoresArr));
}

function sortHighscores(entry1, entry2) {
  let score1 = parseInt(entry1.score);
  let score2 = parseInt(entry2.score);

  if (score1 > score2) {
    return -1;
  } else if (score1 < score2) {
    return 1;
  }
}

function populateHighscores() {
  $("#highscores").empty();
  if (highscoresArr) {
    highscoresArr.forEach(function(highscore, i) {
      let li = $("<li class='list-group-item'>");
      let divInitials = $("<div>");
      divInitials.addClass("highscore-initals d-inline-block float-left");
      let divScore = $("<div>");
      divScore.addClass("highscore-score d-inline-block float-right");
      divInitials.text(i + 1 + ". " + highscore.initials);
      divScore.text(highscore.score);
      li.append(divInitials);
      li.append(divScore);
      $("#highscores").append(li);
    });
  }
}

// Hides both the start card or end card and displays the top 5 highscores
function showHighscores() {
  $("#start-card").addClass("d-none");
  $("#start-card").removeClass("d-block");
  $("#end-card").addClass("d-none");
  $("#end-card").removeClass("d-block");
  $("#highscores-card").addClass("d-block");
  $("#highscores-card").removeClass("d-none");
  populateHighscores();
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
