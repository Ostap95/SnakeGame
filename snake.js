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

class Food {
  constructor(size, windowWidth, windowHeight) {
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.spawn();
  }

  spawn() {
    let new_x = Math.floor(Math.random() * this.windowWidth);
    let new_y = Math.floor(Math.random() * this.windowHeight); 
    this.x = Math.floor(new_x/this.size) * this.size;
    this.y = Math.floor(new_y/this.size) * this.size;
  }

  draw() {
    fill(0);
    square(this.x, this.y, this.size);
  }
}

class Snake {
  constructor(direction, velocity, blockSize) {
    this.blocks = [];
    this.direction = direction;
    this.directionChangePoints = [];
    this.velocity = velocity;
    this.blockSize = blockSize;
    this.blocks.push(new Block(0, 0, this.blockSize, direction, velocity));
    this.blocks.push(new Block(-blockSize, 0, this.blockSize, direction, velocity));
  }

  draw() {
    noStroke();
    fill(255);
    this.blocks.forEach((block, index) => {
      this.directionChangePoints.forEach(change => {
        if (change.x === block.x && change.y === block.y) {
          block.direction = change.direction;
          if ((this.blocks.length - 1) === index) this.directionChangePoints.shift();
        }
      })
      if (block.x === food.x && block.y === food.y) {
        food.spawn();
        let lastBlock = this.blocks[this.blocks.length - 1];
        this.blocks.push(new Block(lastBlock.x, lastBlock.y, this.blockSize, lastBlock.direction, this.velocity));
      }
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
let snake = new Snake(directions.EAST, VELOCITY, SIZE);
let food = new Food(SIZE, WINDOW_WIDTH, WINDOW_HEIGHT);

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
