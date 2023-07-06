// Initialize game variables
let currentPlayer = "X";
let gameOver = false;
let moves = 0;

// Initialize score variables
let player1Score = 0;
let player2Score = 0;

// Get DOM elements
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset-button");
const player1ScoreElement = document.querySelector(".player-score-value:nth-of-type(1)");
const player2ScoreElement = document.querySelector(".player-score-value:nth-of-type(2)");

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

// Add event listener to reset button
resetButton.addEventListener("click", resetGame);

// Function to handle cell click
function handleCellClick() {
  if (!gameOver && !this.textContent) {
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
      endGame(currentPlayer);
    } else if (moves === 8) {
      endGame("draw");
    } else {
      togglePlayer();
    }

    moves++;
  }
}

// Function to toggle player
function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check for a win
function checkWin(player) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

// Function to end the game
function endGame(result) {
  gameOver = true;
  if (result === "draw") {
    alert("It's a draw!");
  } else {
    const winner = result === "X" ? "Player 1" : "Player 2";
    alert(`${winner} wins!`);
    updateScore(result);
  }
}

// Function to update the score
function updateScore(player) {
  if (player === "X") {
    player1Score++;
    player1ScoreElement.textContent = player1Score;
  } else {
    player2Score++;
    player2ScoreElement.textContent = player2Score;
  }
}

// Function to reset the game
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });

  currentPlayer = "X";
  gameOver = false;
  moves = 0;
}

// Initial game setup
resetGame();
