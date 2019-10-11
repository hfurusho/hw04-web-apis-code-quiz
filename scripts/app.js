$("#start-btn").on("click", startQuiz);

// Starts the quiz by hiding the start-card, showing the questions card, and beginning the timer.
function startQuiz() {
  // $("#start-card").addClass("d-none");
  // TODO: SHOW QUESTIONS CARD. Add "d-none" to .questions-card
  // $("#questions-card").addClass("d-block");

  getNextQuestion(1);
  startTimer();

  function getNextQuestion(questionNum) {
    let question = questions[questionNum - 1];
    $("#question").text(question.question);

    let choiceButtons = $(".choice-btn");
    choiceButtons.each(function(i) {
      $(this).text(question.choices[i]);
      if (questionNum != question.length) {
        $(this).on("click", function() {
          checkAnswer($(this).text(), question.answer);
          getNextQuestion(questionNum + 1);
        });
      } else {
        return; // TODO: END GAME. SHOW SCORE
      }
    });

    function checkAnswer(choiceSelected, answer) {
      let answerIndicatorEle = $("#answer-indicator");
      // TODO: make indicator fade? Add green/red colors
      if (choiceSelected === answer) {
        answerIndicatorEle.text("Correct!");
      } else {
        let timeCurr = $("#timeRem").text();
        console.log(timeCurr);
        answerIndicatorEle.text("Wrong!");
        $("#timeRem").text(parseInt(timeCurr, 10) - 15);
      }
    }
  }

  function startTimer() {
    let timerInterval = setInterval(timeCountdown, 1000);
    let totalTime = questions.length * 15;
    $("#timeRem").text(totalTime);

    // Reduces the time remaining and ends the game when the timer reaches 0;
    // TODO: stop game if all questions answered.
    function timeCountdown() {
      let timeCurr = $("#timeRem").text();
      if (timeCurr === "0") {
        $("#timeRem").text("Times Up!");
        // TODO: FUNCTION TO STOP THE GAME
        clearInterval(timerInterval);
      } else {
        $("#timeRem").text(parseInt(timeCurr, 10) - 1);
      }
    }
  }
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
