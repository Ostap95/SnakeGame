/* CONSTANTS */
const SIZE = 20;
const VELOCITY = SIZE;
const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
const gameStates = {
  INITIAL: "initial",
  RUNNING: "running",
  PAUSED: "running",
  END: "end"
};
const directions = {
  NORTH: "north",
  SOUTH: "south",
  WEST: "west",
  EAST: "east"
};
/* END CONSTANTS */

var startTime;
var snake;
var food;
var gameTitle;
var gameState;
var scoreText;

function setup() {
  let canvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  canvas.parent("canvas-container");
  gameTitle = select("#game-title");
  gameOverTitle = select("#game-over-title");
  gameOverTitle.style("display", "none");
  scoreText = select("#score");
  background(255, 204, 0);
  gameState = gameStates.INITIAL;
  startTime = millis();
  snake = new Snake(directions.EAST, VELOCITY, SIZE);
  food = new Food(SIZE, width, height);
}

function draw() {
  scoreText.html(snake.getScore());
  if (gameState === gameStates.RUNNING) {
    if (millis() - startTime >= 100) {
      background(255, 204, 0);
      food.draw();
      console.log(snake.checkForSelfCollision())
      if (snake.checkForWallCollision(WINDOW_WIDTH, WINDOW_HEIGHT) || snake.checkForSelfCollision()) {
        gameOver();
      } else {
        snake.draw();
      }
      startTime = millis();
    }
  }
}

function gameOver() {
  background(255, 204, 0);
  gameState = gameStates.END;
  gameOverTitle.style("display", "inline");
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.changeDirection(directions.WEST);
      break;
    case RIGHT_ARROW:
      snake.changeDirection(directions.EAST);
      break;
    case UP_ARROW:
      snake.changeDirection(directions.NORTH);
      break;
    case DOWN_ARROW:
      snake.changeDirection(directions.SOUTH);
      break;
    case 32: // space
      switch (gameState) {
        case gameStates.INITIAL:
          gameTitle.style("display", "none");
          gameState = gameStates.RUNNING;
          break;
        case gameStates.END:
          gameState = gameStates.RUNNING;
          snake = new Snake(directions.EAST, VELOCITY, SIZE);
          gameOverTitle.style('display', 'none');
          break;
      }
      break;
  }
}
