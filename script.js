"use-strict";
document.addEventListener("DOMContentLoaded", function () {
  let playerOneScore = 0;
  let playerTwoScore = 0;
  let playerOneTurn = true;
  let playerCurrentScore = 0;
  let playerOneCurrent = document.getElementById("playerOneCurrent");
  let playerTwoCurrent = document.getElementById("playerTwoCurrent");
  let playerOneTotal = document.getElementById("playerOneTotal");
  let playerTwoTotal = document.getElementById("playerTwoTotal");
  const playerOneSide = document.querySelector(".left");
  const playerTwoSide = document.querySelector(".right");
  const rollBtn = document.getElementById("roll");
  const holdBtn = document.querySelector(".holdBtn");
  const newBtn = document.querySelector(".newBtn");
  const dice = document.getElementById("faces");

  const faces = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  function renderDice(face) {
    dice.innerHTML = " ";
    for (let i = 1; i <= 9; i++) {
      const dot = document.createElement("div");
      if (faces[face].includes(i)) {
        dot.classList.add("dot");
      }
      dice.appendChild(dot);
    }
  }

  function rollDice() {
    const randomFace = Math.trunc(Math.random() * 6 + 1);
    renderDice(randomFace);
    if (randomFace === 1) {
      playerCurrentScore = 0;
      scoreBoard();
      updateScore();
      playerOneTurn = !playerOneTurn;
    } else {
      playerCurrentScore += randomFace;
      updateScore();
    }
  }

  function updateScore() {
    if (playerOneTurn) {
      playerOneCurrent.textContent = playerCurrentScore;
    } else {
      playerTwoCurrent.textContent = playerCurrentScore;
    }
  }

  function scoreBoard() {
    if (playerOneTurn) {
      playerOneScore += playerCurrentScore;
      playerOneTotal.textContent = playerOneScore;
      playerOneSide.style.background = "rgba(255, 255, 255, 0.366)";
      playerTwoSide.style.background = "rgba(255, 255, 255, 0.789)";
    } else {
      playerTwoScore += playerCurrentScore;
      playerTwoTotal.textContent = playerTwoScore;
      playerOneSide.style.background = "rgba(255, 255, 255, 0.789)";
      playerTwoSide.style.background = "rgba(255, 255, 255, 0.366)";
    }
    winner();
  }

  function winner() {
    if (playerOneScore >= 50 && playerOneScore > playerTwoScore) {
      playerOneTotal.textContent = "WINNER";
      console.log(playerOneTotal);
      rollBtn.disabled = true;
      return;
    } else if (playerTwoScore >= 50 && playerTwoScore > playerOneScore) {
      playerTwoTotal.textContent = "WINNER";
      console.log(playerTwoTotal);
      rollBtn.disabled = true;
      return;
    }
  }

  function hold() {
    scoreBoard();
    playerCurrentScore = 0;
    updateScore();
    playerOneTurn = !playerOneTurn;
  }

  function newGame() {
    playerCurrentScore = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    playerOneCurrent.textContent = playerCurrentScore;
    playerTwoCurrent.textContent = playerCurrentScore;
    playerOneTotal.textContent = playerOneScore;
    playerTwoTotal.textContent = playerTwoScore;
    rollBtn.disabled = false;
    renderDice(1);
  }

  renderDice(1);
  rollBtn.addEventListener("click", rollDice);
  holdBtn.addEventListener("click", hold);
  newBtn.addEventListener("click", newGame);
});
