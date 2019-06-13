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

class Block {
  constructor(x, y, size, direction, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.direction = direction;
    this.size = size;
  }

  draw(newDirection) {
    this.direction = newDirection;
    this.updatePosition();
    square(this.x, this.y, this.size);
  }

  updatePosition() {
    switch (this.direction) {
      case "north":
        this.yVelocity -= this.velocity;
        this.xVelocity = 0;
        break;
      case "south":
        console.log("south");
        this.yVelocity += this.velocity;
        this.xVelocity = 0;
        break;
      case "west":
        this.xVelocity -= this.velocity;
        this.yVelocity = 0;
        break;
      case "east":
        this.xVelocity += this.velocity;
        this.yVelocity = 0;
        break;
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.xVelocity = 0;
    this.yVelocity = 0;
  }
}

class Snake {
  constructor(direction, velocity) {
    this.blocks = [];
    this.direction = direction;
    this.blocks.push(new Block(0, 0, SIZE, direction, velocity));
  }

  draw() {
    this.blocks.forEach(block => {
      block.draw(this.direction);
    });
  }

  changeDirection(newDirection) {
    if (
      (this.direction === "north" || this.direction === "south") &&
      (newDirection === "south" || newDirection === "north")
    )
      return;

    if (
      (this.direction === "west" || this.direction === "east") &&
      (newDirection === "west" || newDirection === "east")
    )
      return;
    
    this.direction = newDirection;
  }
}

let startTime = 0;
let keyPressStartTime = 0;
let snake = new Snake(directions.EAST, VELOCITY);

function setup() {
  let canvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  canvas.parent("canvas-container");
  background(255, 204, 0);
  startTime = millis();
}

function draw() {
  if (millis() - startTime >= 100) {
    background(255, 204, 0);
    snake.draw();
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
