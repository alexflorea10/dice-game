"use strict";

//Selecting elements in DOM

const player0Name = prompt(`First player's name`);
const player1Name = prompt(`Second player's name`);

const durationPrompt = prompt(
  `How long would you like the game to last? (short - maximum 50 points, moderate - 100, long - 150)`
);

const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");

const score0El = document.querySelector(".score-0");
const score1El = document.querySelector(".score-1");

const currentScore0El = document.querySelector(".current-score-0");
const currentScore1El = document.querySelector(".current-score-1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Starting conditionals
diceEl.classList.add("hidden");

document.querySelector(".player-name-0").textContent = player0Name;
document.querySelector(".player-name-1").textContent = player1Name;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let max = 100;

const maximumPoints = function () {
  if (durationPrompt === "short") {
    max = 50;
    return max;
  } else if (durationPrompt === "moderate") {
    max = 100;
    return max;
  } else if (durationPrompt === "long") {
    max = 150;
    return max;
  } else max = 100;
  return max;
};

const switchPlayer = function () {
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

//Rolling the dice

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    if (scores[activePlayer] + currentScore >= maximumPoints()) {
      playing = false;
      scores[activePlayer] = scores[activePlayer] + currentScore;
      document.querySelector(`.score-${activePlayer}`).textContent =
        scores[activePlayer];
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document.querySelector(
        `.player-name-${activePlayer}`
      ).textContent = `WINNER`;
    } else {
      scores[activePlayer] = scores[activePlayer] + currentScore;
      currentScore = 0;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
      document.querySelector(`.score-${activePlayer}`).textContent =
        scores[activePlayer];
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;

  document.querySelector(".score-0").textContent = "0";
  document.querySelector(".score-1").textContent = "0";
  document.querySelector(".current-score-0").textContent = "0";
  document.querySelector(".current-score-1").textContent = "0";

  document
    .querySelector(`.player-${activePlayer}`)
    .classList.add("player-active");
  document.querySelector(`.player-0`).classList.remove("player-winner");
  document.querySelector(`.player-1`).classList.remove("player-winner");
  document.querySelector(".player-name-0").textContent = player0Name;
  document.querySelector(".player-name-1").textContent = player1Name;
});
