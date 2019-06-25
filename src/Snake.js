class Snake {
  constructor(direction, velocity, blockSize) {
    this.blocks = [];
    this.direction = direction;
    this.directionChangePoints = [];
    this.velocity = velocity;
    this.blockSize = blockSize;
    this.score = 0;
    this.blocks.push(new Block(0, 0, this.blockSize, direction, velocity));
    this.blocks.push(
      new Block(-blockSize, 0, this.blockSize, direction, velocity)
    );
  }

  draw() {
    noStroke();
    fill(255);
    this.blocks.forEach((block, index) => {
      this.directionChangePoints.forEach(change => {
        if (change.x === block.x && change.y === block.y) {
          block.direction = change.direction;
          if (this.blocks.length - 1 === index)
            this.directionChangePoints.shift();
        }
      });
      if (block.x === food.x && block.y === food.y) {
        this.score += 1;
        food.spawn();
        let lastBlock = this.blocks[this.blocks.length - 1];
        this.blocks.push(
          new Block(
            lastBlock.x,
            lastBlock.y,
            this.blockSize,
            lastBlock.direction,
            this.velocity
          )
        );
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
    this.directionChangePoints.push({
      x: head.x,
      y: head.y,
      direction: this.direction
    });
  }

  getHead() {
    return this.blocks[0];
  }

  getScore() {
    return this.score;
  }

  checkForSelfCollision() {
    let head = this.getHead();
    this.blocks.forEach(function (block, index) {
      if (index > 2 && head.inCollision(block)) return true;
    });
    return false;
  }

  checkForWallCollision(window_width, window_height) {
    let head = this.getHead();
    return !(
      head.x + head.size <= window_width &&
      head.x >= 0 &&
      head.y + head.size <= window_height &&
      head.y >= 0
    )
  }
}