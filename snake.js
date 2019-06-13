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

let x_velocity = 0;
let y_velocity = 0;
let start_time = 0;

let snake = new Snake();

function setup() {
  createCanvas(640, 480);
  background(255, 204, 0);
  start_time = millis();
}

function draw() {
  if ((millis() - start_time) >= 100) {
    snake.x += x_velocity;
    snake.y += y_velocity;
    square(snake.x, snake.y, SIZE);
    start_time = millis();
  }
}

function keyPressed() {
  switch(keyCode) {
    case LEFT_ARROW:
      x_velocity -= VELOCITY;
      y_velocity = 0;
      break;
    case RIGHT_ARROW:
      x_velocity += VELOCITY;
      y_velocity = 0;
      break;
    case UP_ARROW:
      y_velocity -= VELOCITY;
      x_velocity = 0;
      break;
    case DOWN_ARROW:
      y_velocity += VELOCITY;
      x_velocity = 0;
      break;
  }
}