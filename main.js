
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const gameOver = document.getElementById("over");
const startAgain = document.getElementById("startAgain");
const scoreDisplay = document.getElementById("score");
let gameSpeed = 150;
let gameLoopInterval;
let snake = [{ x: 60, y: 50 }];
let dx = 10;
let dy = 0;
let score = 0;

let foodX = 0;
let foodY = 0;
const foodWidth = 20;
const foodHeight = 10;

function drawSnake() {
  ctx.fillStyle = "#026670";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 20, 10);
  });
}

function updateSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function drawFood() {
  ctx.fillStyle = "#fef9c7";
  ctx.fillRect(foodX, foodY, foodWidth, foodHeight);
}

function generateFoodPosition() {
  const maxX = canvas.width - foodWidth;
  const maxY = canvas.height - foodHeight;
  foodX = Math.floor(Math.random() * maxX);
  foodY = Math.floor(Math.random() * maxY);
}

function eatFood() {
  const tail = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y };
  snake.push(tail);
  generateFoodPosition();

  score++;
  updateScoreDisplay();

  if (snake.length > 30) {
    gameSpeed = 60;
  } else if (snake.length > 20) {
    gameSpeed = 80;
  } else if (snake.length > 10) {
    gameSpeed = 100;
  }

  restartGameLoop();
}

function updateScoreDisplay() {
  scoreDisplay.textContent = "Score: " + score;
}

function checkFoodCollision() {
  const head = snake[0];

  if (
    head.x < foodX + foodWidth &&
    head.x + 20 > foodX &&
    head.y < foodY + foodHeight &&
    head.y + 10 > foodY
  ) {
    eatFood();
  }
}

function stopTheGame() {
  dx = 0;
  dy = 0;
  clearInterval(gameLoopInterval);
  gameOver.style.display = "block";
  canvas.style.display = "none";
  startAgain.style.display = "block";
  scoreDisplay.style.display = "none";

  startAgain.addEventListener("click", function () {
    location.reload();
  });
}

function wallCollision() {
  const nextHeadX = snake[0].x + dx;
  const nextHeadY = snake[0].y + dy;

  if (
    nextHeadX < 0 ||
    nextHeadY < 0 ||
    nextHeadX >= canvas.width ||
    nextHeadY >= canvas.height
  ) {
    stopTheGame();
  }
}

function checkSelfCollision() {
  const head = snake[0];

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      stopTheGame();
      return;
    }
  }
}

function restartGameLoop() {
  clearInterval(gameLoopInterval);
  gameLoopInterval = setInterval(gameLoop, gameSpeed);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  wallCollision();
  drawSnake();
  updateSnake();
  checkSelfCollision();
  drawFood();
  checkFoodCollision();
  }
  
  document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
  case 37:
  if (dx !== 10) {
  dx = -10;
  dy = 0;
  }
  break;
  case 38:
  if (dy !== 10) {
  dx = 0;
  dy = -10;
  }
  break;
  case 39:
  if (dx !== -10) {
  dx = 10;
  dy = 0;
  }
  break;
  case 40:
  if (dy !== -10) {
  dx = 0;
  dy = 10;
  }
  break;
  }
  });
  
  generateFoodPosition();
  updateScoreDisplay();
  gameLoopInterval = setInterval(gameLoop, gameSpeed);



