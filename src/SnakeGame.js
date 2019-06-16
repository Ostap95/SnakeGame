/* CONSTANTS */
const SIZE = 20;
const VELOCITY = SIZE;
const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
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

function setup() {
  let canvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  canvas.parent("canvas-container");
  background(255, 204, 0);
  startTime = millis();
  snake = new Snake(directions.EAST, VELOCITY, SIZE);
  food = new Food(SIZE, width, height);
}

function draw() {
  if (millis() - startTime >= 100) {
    background(255, 204, 0);
    snake.draw();
    food.draw();
    startTime = millis();
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
  }
}
