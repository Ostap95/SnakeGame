/* CONSTANTS */
const SIZE = 20;
const VELOCITY = SIZE;
const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
const gameStates = {
  INITIAL: 'initial',
  RUNNING: 'running',
  PAUSED: 'running',
  END: 'end'
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

function setup() {
  let canvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  canvas.parent("canvas-container");
  gameTitle = select('#game-title');
  background(255, 204, 0);
  gameState = gameStates.INITIAL;
  startTime = millis();
  snake = new Snake(directions.EAST, VELOCITY, SIZE);
  food = new Food(SIZE, width, height);
}

function draw() {
  if (gameState === gameStates.RUNNING) {
    if (millis() - startTime >= 100) {
      background(255, 204, 0);
      let head = snake.getHead();
      if (
        head.x + head.size <= WINDOW_WIDTH &&
        head.x >= 0 &&
        head.y + head.size <= WINDOW_HEIGHT &&
        head.y >= 0
      ) {
        snake.draw();
      } else {
        snake = new Snake(directions.EAST, VELOCITY, SIZE);
      }
      food.draw();
      startTime = millis();
    }
  }
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
      if (gameState === gameStates.INITIAL) {
        gameTitle.style('display', 'none');
        gameState = gameStates.RUNNING;
      }
      break;
  }
}
