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
    this.size = size;
    this.direction = direction;
    this.velocity = velocity;
  }

  draw() {
    this.moveBlock();
    square(this.x, this.y, this.size);
  }

  moveBlock() {
    switch (this.direction) {
      case "north":
        this.y -= this.velocity;
        break;
      case "south":
        this.y += this.velocity;
        break;
      case "west":
        this.x -= this.velocity;
        break;
      case "east":
        this.x += this.velocity;
        break;
    }
  }
}

class Snake {
  constructor(direction, velocity) {
    this.blocks = [];
    this.direction = direction;
    this.directionChangePoints = [];
    this.velocity = velocity;
    this.blocks.push(new Block(0, 0, SIZE, direction, velocity));
  }

  draw() {
    this.blocks.forEach((block, index) => {
      this.directionChangePoints.forEach(change => {
        if (change.x === block.x && change.y === block.y) {
          block.direction = change.direction;
          if ((this.blocks.length - 1) === index) this.directionChangePoints.shift();
        }
      })
      block.draw();
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
    this.addChangePoint();
  }

  addChangePoint() {
    let head = this.blocks[0];
    this.directionChangePoints.push(
      {
        x: head.x,
        y: head.y,
        direction: this.direction
      }
    )
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
