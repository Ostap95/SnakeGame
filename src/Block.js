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