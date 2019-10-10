$("#start-btn").on("click", startQuiz);

function startQuiz() {
  $("#start-card").addClass("d-none");
  // TODO: SHOW QUESTIONS CARD. Add "d-none" to .questions-card
  $("#questions-card").addClass("d-block");
  let timerInterval = setInterval(timeCountdown, 1000);
  let totalTime = questions.length * 15;
  let timeRemEl = $("#timeRem");
  timeRemEl.text(totalTime);

  function timeCountdown() {
    let timeCurr = timeRemEl.text();
    if (timeCurr === "0") {
      timeRemEl.text("Times Up!");
      // TODO: FUNCTION TO STOP THE GAME
      clearInterval(timerInterval);
    } else {
      timeRemEl.text(parseInt(timeCurr, 10) - 1);
    }
  }
}
