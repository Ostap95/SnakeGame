class Snake {
  constructor(direction, velocity, blockSize) {
    this.blocks = [];
    this.direction = direction;
    this.directionChangePoints = [];
    this.velocity = velocity;
    this.blockSize = blockSize;
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
}