let sampleText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error perferendis doloremque nesciunt voluptas, a eveniet sint enim reprehenderit, omnis impedit quo! Ullam repudiandae odio non voluptas.";

var blinkerPos = 0;

function isCorrect(inp) {
  let txt = document.querySelector(".not-typed").textContent;
  if (txt[0] == inp) {
    return true;
  } else {
    return false;
  }
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

  if (blinkerPos > 0) {
    blinkerPos--;
    updateBlinker();
  }

  let active = document.querySelector(".not-typed");
  let prev = active.previousElementSibling;
  let prevTxt = prev.textContent;
  let lastChar = prevTxt[prevTxt.length - 1];
  console.log("last char = ", lastChar);
  //   if(prevTxt.length)
  prevTxt = prevTxt.slice(0, prevTxt.length - 1);
  //   prevTxt.pop();
  prev.textContent = prevTxt;

  let txt = lastChar + active.textContent;
  active.textContent = txt;
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
  if (blinkerPos < sampleText.length) {
    blinkerPos++;
    updateBlinker();
  }
  let inp = String.fromCharCode(keynum);
  let notTyped = document.querySelector(".not-typed");
  let txt = notTyped.textContent;
  let char = txt[0];

  txt = txt.substring(1);
  notTyped.textContent = txt;

  let typingArea = document.querySelector("#typing-area");

  console.log("typed = ", inp);
  console.log("reqd = ", char);

  let para = document.createElement("span");

  if (inp == char) {
    para.classList.add("typed-correctly");
  } else {
    para.classList.add("typed-incorrectly");
  }

  para.innerText = char;
  document.querySelector("#typing-area").appendChild(para);
  typingArea.insertBefore(para, notTyped);
}

function keyPress1(e) {
  var keynum;

  if (window.event) {
    // IE
    keynum = e.keyCode;
  } else if (e.which) {
    // Netscape/Firefox/Opera
    keynum = e.which;
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

document.querySelector("body").addEventListener("keypress", keyPress1);
document.querySelector("body").addEventListener("keydown", handleBackspace); // In case backspace is pressed

// var txt = document.querySelector(".not-typed").textContent;
// console.log(txt);
// console.log("txt[0] = ", txt[0]);

addText(sampleText);

function addText(text) {
  updateBlinker();
  let typingArea = document.querySelector("#typing-area");
  console.log("texttt= ");
  for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
    let char = document.createElement("span");
    char.textContent = text[i];
    char.classList.add("not-typed");
    char.setAttribute("id", i);
    typingArea.appendChild(char);
  }
}
