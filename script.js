const cells = document.querySelectorAll(".cell");
const endgame = document.querySelector(".endgame");
const text = document.querySelector(".endgame .text");
const btn = document.querySelector("#btn");

let turn = "X";
let gameActive = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  cell.textContent = turn;

  if (checkWin(turn)) {
    showEnd(turn + " Wins 🎉");
    gameActive = false;
    return;
  }

  if (isDraw()) {
    showEnd("Draw 🤝");
    gameActive = false;
    return;
  }

  turn = turn === "X" ? "O" : "X";
}

function checkWin(player) {
  return winCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function showEnd(message) {
  endgame.style.display = "block";
  text.textContent = message;
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });

  turn = "X";
  gameActive = true;
  endgame.style.display = "none";
}

btn.addEventListener("click", resetGame);