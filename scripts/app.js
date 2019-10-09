let timerInterval = setInterval(timeCountdown, 1000)

function timeCountdown() {
  let timeRemEl = document.getElementById("timeRem");
  let timeCurr = timeRemEl.textContent;
  if (timeCurr === "0") {
    timeRemEl.textContent = "Times Up!"
    // TODO: FUNCTION TO STOP THE GAME
    clearInterval(timerInterval);
  } else {
    timeRemEl.textContent = parseInt(timeCurr, 10) - 1;
  }
}