/* CONSTANTS */
const SIZE = 20;
const VELOCITY = SIZE;
const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
/* END CONSTANTS */

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

let xVelocity = 0;
let yVelocity = 0;
let startTime = 0;
let keyPressStartTime = 0;

let snake = new Snake();

function setup() {
  let canvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  canvas.parent("canvas-container");
  background(255, 204, 0);
  startTime = millis();
}

function draw() {
  if ((millis() - startTime) >= 100) {
    background(255, 204, 0);
    snake.x += xVelocity;
    snake.y += yVelocity;
    square(snake.x, snake.y, SIZE);
    startTime = millis();
  }
}

function keyPressed() {
  switch(keyCode) {
    case LEFT_ARROW:
      xVelocity -= VELOCITY;
      yVelocity = 0;
      break;
    case RIGHT_ARROW:
      xVelocity += VELOCITY;
      yVelocity = 0;
      break;
    case UP_ARROW:
      yVelocity -= VELOCITY;
      xVelocity = 0;
      break;
    case DOWN_ARROW:
      yVelocity += VELOCITY;
      xVelocity = 0;
      break;
  }
}