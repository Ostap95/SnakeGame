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
    this.x = Math.floor(new_x / this.size) * this.size;
    this.y = Math.floor(new_y / this.size) * this.size;
  }

  draw() {
    fill(0);
    square(this.x, this.y, this.size);
  }
}