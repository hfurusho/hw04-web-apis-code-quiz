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
  $("#timeRem").text("0");
});

$("#view-highscores-link").on("click", showHighscores);

populateHighscores();

// Starts the quiz by hiding the start-card, showing the questions card, and beginning the timer.
function startQuiz() {
  questions = shuffle(questions);
  $("#start-card").addClass("d-none");
  $("#start-card").removeClass("d-block");
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
    let choicesShuffled = shuffle(question.choices);
    choiceButtons.each(function(i) {
      $(this).text(choicesShuffled[i]);
    });
  } else {
    displayEndCard();
  }
}

// Checks if the choice selected is the answer and advances to the next question.
function checkAnswer(choiceSelected, answer) {
  let answerIndicatorEle = $("#answer-indicator");
  answerIndicatorEle.css("display", "inline-block");
  if (choiceSelected === answer) {
    answerIndicatorEle.text("Correct!");
    answerIndicatorEle.removeClass();
    answerIndicatorEle.addClass("correct");
  } else {
    let timeCurr = $("#timeRem").text();
    answerIndicatorEle.text("Wrong!");
    answerIndicatorEle.removeClass();
    answerIndicatorEle.addClass("wrong");
    if (timeCurr < 15) {
      $("#timeRem").text(0);
    } else {
      $("#timeRem").text(parseInt(timeCurr, 10) - 15);
    }
  }
  $("#answer-indicator").fadeOut(1000);
  currentQuestion++;
  getNextQuestion();
}

// Displays and populates the end card.
function displayEndCard() {
  $("#questions-card").addClass("d-none");
  $("#questions-card").removeClass("d-block");
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

  currentQuestion = 1;
}

// Sort highscores greatest to least.
function sortHighscores(entry1, entry2) {
  let score1 = parseInt(entry1.score);
  let score2 = parseInt(entry2.score);

  if (score1 > score2) {
    return -1;
  } else if (score1 < score2) {
    return 1;
  }
}

// Populates the highscore card.
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
function shuffle(array) {
  let itemsLeft = array.length;
  let temp;
  let i;

  while (itemsLeft) {
    i = Math.floor(Math.random() * itemsLeft--);

    temp = array[itemsLeft];
    array[itemsLeft] = array[i];
    array[i] = temp;
  }

  return array;
}
