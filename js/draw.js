// Drawing canvas with a 1 minute timer.
// The timer starts on the first mark, then the user is sent to the gallery.

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var timer = document.getElementById("timer");
var message = document.getElementById("message");

var timeLeft = 60;
var started = false;
var finished = false;
var drawing = false;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 5;
ctx.lineCap = "round";

function getPos(e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function startTimer() {
  var countdown = setInterval(function () {
    timeLeft = timeLeft - 1;
    var secs = timeLeft < 10 ? "0" + timeLeft : timeLeft;
    timer.textContent = "Timer: 0:" + secs;

    if (timeLeft === 0) {
      clearInterval(countdown);
      finish();
    }
  }, 1000);
}

function finish() {
  finished = true;
  message.textContent = "Time's up!";
  // Save the drawing so the gallery can show it
  localStorage.setItem("webseumArt", canvas.toDataURL());
  setTimeout(function () {
    window.location.href = "gallery.html";
  }, 1500);
}

canvas.addEventListener("pointerdown", function (e) {
  if (finished) {
    return;
  }
  if (!started) {
    started = true;
    startTimer();
  }
  drawing = true;
  var pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener("pointermove", function (e) {
  if (!drawing || finished) {
    return;
  }
  var pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
});

canvas.addEventListener("pointerup", function () {
  drawing = false;
});

canvas.addEventListener("pointerleave", function () {
  drawing = false;
});
