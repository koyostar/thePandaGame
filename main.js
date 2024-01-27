const blockSize = 70;
const rows = 10;
const cols = 10;

let gameBoard;
let context;

let pandaX = blockSize * 5;
let pandaY = blockSize * 5;

let bambooX;
let bambooY;

let velocityX = 0;
let velocityY = 0;

let speed;

let miniPandas = [];
const maxMiniPandas = 20;

let gameOver = false;

const scoreEl = document.getElementById("scoreEl");
let score = 0;
let scoreIncrement = 5;

window.onload = startGame;

////////////////////////////////////////////////////////

function startGame() {
  document.removeEventListener("keyup", restartGame);
  document.addEventListener("keyup", changeDirections);
  document
    .getElementById("upBtn")
    .addEventListener("click", () => changeDirections("upBtn"));
  document
    .getElementById("downBtn")
    .addEventListener("click", () => changeDirections("downBtn"));
  document
    .getElementById("leftBtn")
    .addEventListener("click", () => changeDirections("leftBtn"));
  document
    .getElementById("rightBtn")
    .addEventListener("click", () => changeDirections("rightBtn"));
  document
    .getElementById("restartBtn")
    .addEventListener("click", () => restartGame("restartBtn"));

  gameBoard = document.querySelector("#gameContainer canvas");
  gameBoard.height = rows * blockSize;
  gameBoard.width = cols * blockSize;
  context = gameBoard.getContext("2d");

  placeBamboo();

  speed = setInterval(draw, 2000 / 10);
}

function restartGame(keyPressed) {
  if (
    keyPressed.code == "Space" ||
    keyPressed.code == "Enter" ||
    keyPressed == "restartBtn"
  ) {
    let gameOverScreen = document.getElementById("gameOverScreen");
    if (gameOverScreen) {
      document.querySelector("#gameContainer").removeChild(gameOverScreen);
    }

    pandaX = blockSize * 5;
    pandaY = blockSize * 5;

    velocityX = 0;
    velocityY = 0;
    miniPandas = [];
    gameOver = false;
    score = 0;
    scoreIncrement = 5;
    scoreEl.innerText = 0;

    speed = clearInterval(speed);
    document.removeEventListener("keyup", changeDirections);
    document
      .getElementById("upBtn")
      .removeEventListener("click", () => changeDirections("upBtn"));
    document
      .getElementById("downBtn")
      .removeEventListener("click", () => changeDirections("downBtn"));
    document
      .getElementById("leftBtn")
      .removeEventListener("click", () => changeDirections("leftBtn"));
    document
      .getElementById("rightBtn")
      .removeEventListener("click", () => changeDirections("rightBtn"));
    document
      .getElementById("restartBtn")
      .removeEventListener("click", () => restartGame("restartBtn"));

    startGame();
  }
}

function draw() {
  context.fillStyle = "rgb(149, 247, 191)";
  context.fillRect(0, 0, gameBoard.width, gameBoard.height);

  let bamboos = document.getElementById("bamboosPic");
  context.drawImage(bamboos, bambooX, bambooY, blockSize, blockSize);

  if (pandaX == bambooX && pandaY == bambooY) {
    if (miniPandas.length < maxMiniPandas) {
      miniPandas.push([bambooX, bambooY]);
      placeBamboo();
      score += scoreIncrement;
      scoreEl.innerText = score;
    }
  }

  for (let i = miniPandas.length - 1; i > 0; i--) {
    miniPandas[i] = miniPandas[i - 1];
  }

  if (miniPandas.length) {
    miniPandas[0] = [pandaX, pandaY];
  }

  pandaX += velocityX * blockSize;
  pandaY += velocityY * blockSize;
  let panda = document.getElementById("pandaPic");
  let miniPanda = document.getElementById("miniPandaPic");

  context.drawImage(panda, pandaX, pandaY, blockSize, blockSize);
  for (let i = 0; i < miniPandas.length; i++) {
    context.drawImage(
      miniPanda,
      miniPandas[i][0],
      miniPandas[i][1],
      blockSize,
      blockSize
    );
  }

  if (score >= 50) {
    speed = clearInterval(speed);
    speed = setInterval(draw, 1000 / 10);
    scoreIncrement = 10;
  }

  if (score >= 150) {
    speed = clearInterval(speed);
    speed = setInterval(draw, 500 / 10);
    scoreIncrement = 20;
  }

  if (
    pandaX < 0 ||
    pandaX >= cols * blockSize ||
    pandaY < 0 ||
    pandaY >= rows * blockSize
  ) {
    gameOver = true;
    clearInterval(speed);
    gameOverMsg();
  }

  for (let i = 0; i < miniPandas.length; i++) {
    if (pandaX == miniPandas[i][0] && pandaY == miniPandas[i][1]) {
      gameOver = true;
      clearInterval(speed);
      gameOverMsg();
    }
  }
}

function placeBamboo() {
  bambooX = Math.floor(Math.random() * cols) * blockSize;
  bambooY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirections(control) {
  if (
    (control.code == "ArrowUp" ||
      control.code == "KeyW" ||
      control == "upBtn") &&
    velocityY != 1
  ) {
    velocityX = 0;
    velocityY = -1;
  } else if (
    (control.code == "ArrowDown" ||
      control.code == "KeyS" ||
      control == "downBtn") &&
    velocityY != -1
  ) {
    velocityX = 0;
    velocityY = 1;
  } else if (
    (control.code == "ArrowLeft" ||
      control.code == "KeyA" ||
      control == "leftBtn") &&
    velocityX != 1
  ) {
    velocityX = -1;
    velocityY = 0;
  } else if (
    (control.code == "ArrowRight" ||
      control.code == "KeyD" ||
      control == "rightBtn") &&
    velocityX != -1
  ) {
    velocityX = 1;
    velocityY = 0;
  }
}

function gameOverMsg() {
  document.removeEventListener("keyup", changeDirections);
  context.fillStyle = "black";
  context.fillRect(0, 0, gameBoard.width, gameBoard.height);

  let gameOverScreen = document.createElement("div");
  gameOverScreen.setAttribute("id", "gameOverScreen");
  gameOverScreen.innerHTML =
    "<header id='gameOver'>Game Over!</header><p id='finalScore'>Your score is: <br>" +
    scoreEl.innerText +
    "</p><p id='resetmsg'> Hit Spacebar or Enter to try again.</p>";

  document.querySelector("#gameContainer").appendChild(gameOverScreen);

  document.addEventListener("keyup", restartGame);
}
