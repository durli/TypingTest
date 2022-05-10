let sampleText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error perferendis doloremque nesciunt voluptas, a eveniet sint enim reprehenderit, omnis impedit quo! Ullam repudiandae odio non voluptas.";

var timeInput, time, timerStarted, timer, blinkerPos;

function isCorrect(inp) {
  let txt = document.querySelector(".not-typed").textContent;
  if (txt[0] == inp) {
    return true;
  } else {
    return false;
  }
}

function deleteText() {
  let typingArea = document.getElementById("typing-area");
  let arr = document.querySelectorAll("#typing-area span");
  for (let i = 0; i < arr.length; i++) {
    typingArea.removeChild(arr[i]);
  }
}

function addText(text) {
  updateBlinker();
  let typingArea = document.querySelector("#typing-area");
  console.log("texttt= ");
  for (let i = 0; i < text.length; i++) {
    // console.log(text[i]);
    let char = document.createElement("span");
    char.textContent = text[i];
    char.classList.add("not-typed");
    char.setAttribute("id", i);
    typingArea.appendChild(char);
  }
}

function restartTyping(timeLimit, txt, lang) {
  //(time, text, lang)
  console.log("Typing restarted....");
  timeInput = timeLimit;
  time = timeInput;
  timerStarted = false;
  blinkerPos = 0;
  sampleText = txt;

  document.getElementById("timer").style.display = "none";
  stopTimer(timer);
  let langElement = document.getElementById("lang");
  langElement.style.display = "inline";
  langElement.textContent = lang;
  document.getElementById("globe").style.display = "inline";

  deleteText();
  addText(txt);
}

function calcWPM() {
  let typedCorrect = document.querySelectorAll(".typed-correctly").length;
  let typedIncorrect = document.querySelectorAll(".typed-incorrectly").length;
  let totalTyped = typedCorrect + typedIncorrect;
  let netWPM = ((totalTyped / 5 - typedIncorrect) * 60) / timeInput;
  if (netWPM < 0) netWPM = 0; //We don't want the net typing speed to be negative

  return netWPM;
}

function showWPM() {
  let wpm = calcWPM();
  let lang = document.getElementById("lang");
  lang.style.display = "inline";
  lang.textContent = "Your typing speed: ";
  document.getElementById("timer").textContent = wpm + " wpm";
}

function destroyAllBlinkers() {
  let paras = document.getElementsByClassName("blinker");
  console.log("paras = ", paras.length);
  let typingArea = document.getElementById("typing-area");
  for (let i = 0; i < paras.length; i++) {
    typingArea.removeChild(paras[i]);
  }
  //     for(let i = 0;i<paras.length;i++) {
  //         paras[0].parentNode.removeChild(paras[0]);​
  // }
}

function updateBlinker() {
  destroyAllBlinkers();
  let newBlinker = document.createElement("span");
  newBlinker.classList.add("blinker");
  //   document.querySelectorAll(".blinker")[0].style.display = "inline";
  let typingArea = document.querySelector("#typing-area");
  let notTyped = document.querySelectorAll(".not-typed");
  typingArea.insertBefore(newBlinker, notTyped[0]);
}

function stopTimer(para) {
  clearInterval(para);
}

function updateTimer() {
  time--;
  let timerElement = document.getElementById("timer");
  timerElement.textContent = time;
  if (time == 0) {
    stopTimer(timer);
    showWPM();
  }
}

function startTimer() {
  timerStarted = true;
  document.getElementById("globe").style.display = "none";
  document.getElementById("lang").style.display = "none";
  document.getElementById("timer").style.display = "inline";
  document.getElementById("timer").textContent = time;
  timer = setInterval(updateTimer, 1000);
}

function handleBackspace(e) {
  var keynum;

  if (window.event) {
    // IE
    keynum = e.keyCode;
  } else if (e.which) {
    // Netscape/Firefox/Opera
    keynum = e.which;
  }
  console.log("keynum = ", keynum);

  if (keynum != 8) return;

  let typingArea = document.querySelector("typing-area");
  let prev = document.querySelector(".blinker").previousElementSibling;
  console.log("classList = ", prev.classList);
  prev.classList.remove("typed-correctly");
  prev.classList.remove("typed-incorrectly");
  prev.classList.add("not-typed");

  if (blinkerPos > 0) {
    blinkerPos--;
    updateBlinker();
  } else {
    return;
  }
}

function keyPress(e) {
  var keynum;

  if (window.event) {
    // IE
    keynum = e.keyCode;
  } else if (e.which) {
    // Netscape/Firefox/Opera
    keynum = e.which;
  }

  //start the timer if it is not already started
  if (timerStarted == false) {
    timerStarted = true;
    document.querySelector("#lang-button").setAttribute("disabled", true); //In order to disable clicking of this button when the typing test starts
    startTimer();
  }

  let inp = String.fromCharCode(keynum);
  let notTyped = document.querySelectorAll(".not-typed");
  let txt = notTyped[0].textContent;
  let char = txt[0];

  let typingArea = document.querySelector("#typing-area");

  //   txt = txt.substring(1);

  typingArea.removeChild(notTyped[0]);

  console.log("typed = ", inp);
  console.log("reqd = ", char);

  let para = document.createElement("span");

  if (inp == char) {
    para.classList.add("typed-correctly");
  } else {
    para.classList.add("typed-incorrectly");
  }

  para.innerText = char;
  //   document.querySelector("#typing-area").appendChild(para);
  typingArea.insertBefore(para, notTyped[1]);
  if (blinkerPos < sampleText.length) {
    blinkerPos++;
    updateBlinker();
  }
}

addText(sampleText);
restartTyping(60, sampleText, "English");

document.querySelector("body").addEventListener("keypress", keyPress);
document.querySelector("body").addEventListener("keydown", handleBackspace); // In case backspace is pressed
document.getElementById("restart-button").addEventListener("mousedown", () => {
  console.log("restart button clicked...");
  restartTyping(60, sampleText, "English");
});
// document.querySelector("body").addEventListener("load", () => {
//   console.log("Site loaded...");
//   restartTyping(60, sampleText, "English");
// });
