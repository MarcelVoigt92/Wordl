import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

const initBoard = () => {
  let board = document.getElementById("game-board");
  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }
    board.appendChild(row);
  }
};

initBoard();

const insertLetter = (pressedKey) => {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
};

const deleteLetter = () => {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
};

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }
  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }
  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

const checkGuess = () => {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    alert("Not enough letters!");
    return;
  }

  if (!WORDS.includes(guessString)) {
    alert("Word is not in the list");
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = "";
    let box = row.children[i];
    let letter = currentGuess[i];
    let letterPosition = rightGuess.indexOf(currentGuess[i]);
    // is the letter in the correct spot
    if (letterPosition === -1) {
      letterColor = "grey";
    } else {
      if (currentGuess[i] === rightGuess[i]) {
        letterColor = "green";
      } else {
        letterColor = "yellow";
      }
      rightGuess[letterPosition] = "#";
    }
    let delay = 250 * i;
    setTimeout(() => {
      box.getElementsByClassName.backgroundColor = letterColor;
      shadeKeyBoard(letter, letterColor);
    }, delay);
  }
  if (guessString === rightGuessString) {
    alert("You got the correct word");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;
  }
  if (guessesRemaining === 0) {
    alert("You got no shots left! Game over!");
    alert(`The right word was: ${rightGuessString}`);
  }
};

const shadeKeyBoard = (letter, color) => {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.getElementsByClassName.backgroundColor;
      if (oldColor === "green") {
        return;
      }
      if (oldColor === "yellow" && color !== "green") {
        return;
      }
      elem.getElementsByClassName.backgroundColor = color;
      break;
    }
  }
};
