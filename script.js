const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreDisplay = document.getElementById("finalScore");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

  gameOverScreen.style.display = "none";
    player.style.display = "none";
  obstacle.style.display = "none";


let jumping = false;
let score = 0;
let gameRunning = false;
let gameInterval;
let obstacleInterval;

// Jump logic
document.addEventListener("keydown", function(event) {
  if (event.code === "Space" && !jumping && gameRunning) {
    jump();
  }
});

function jump() {
  jumping = true;
  player.style.bottom = "160px"; // jump up

  setTimeout(() => {
    player.style.bottom = "20px"; // fall down
    setTimeout(() => jumping = false, 400);
  }, 400);
}

// Collision + Score
setInterval(() => {
    if(!gameRunning){
        return;
    }
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();



  if (
    playerRect.left < obstacleRect.right &&
    playerRect.right > obstacleRect.left &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.bottom > obstacleRect.top
  ) {
        gameOver();
  } else {
    score++;
  }
  scoreDisplay.textContent = score;
}, 100);

// Start game
startBtn.addEventListener("click", () => {
  

  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  resetGame();
  gameRunning = true;
});

// Restart game
restartBtn.addEventListener("click", () => {
  gameOverScreen.style.display = "none";
    startScreen.style.display = "none";
  resetGame();
  gameRunning = true;
});

// Reset game
function resetGame() {
    obstaclesize();
    player.style.display = "block";
  obstacle.style.display = "block";
  score = 0;
  scoreDisplay.textContent = score;
  obstacle.style.right = "0px";
  player.style.bottom = "20px";
  jumping = false;
}

// Game Over
function gameOver() {
    player.style.display = "none";
  obstacle.style.display = "none";
  gameRunning = false;
  finalScoreDisplay.textContent = score;
  gameOverScreen.style.display = "flex";
}

function obstaclesize() {
    clearInterval(obstacleInterval);
     obstacleInterval = setInterval(()=>{
    const random= Math.floor(Math.random()*2) +2;
    obstacle.style.height = random*40 + "px";
    },2500);
}