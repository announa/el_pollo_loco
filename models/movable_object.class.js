class MovableObject extends GameComponents {
  speed;
  moveX;
  turnLeft = false;
  moveY = 0;
  gravAcceleration;
  y_landing;
  energy = 100;
  timeWhenHurt = 0;

  constructor(canvas) {
    super();
    this.gravAcceleration = canvas.height / 500;
  }

  playAnimation(images) {
    let mod = this.currentImage % images.length;
    let path = images[mod];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveLeft() {
    this.x -= this.moveX;
  }

  moveRight() {
    this.x += this.moveX;
  }

  fallingAnimation(worldCanvas) {
    setInterval(() => {
      if (this.moveY > 0 || this.isAboveGround(this.y_landing)) {
        this.moveY -= this.gravAcceleration;
        this.y -= this.moveY;
      }
    }, 1000 / 25);
  }

  jump(worldCanvas) {
    this.moveY = worldCanvas.height / 33;
  }

  isAboveGround(y_landing) {
    return this.y < y_landing;
  }

  isColliding(object) {
    let x_start;
    let x_end;
    let y_end = this.y + 0.95 * this.height;
    if (!this.turnLeft) {
      x_start = this.x + 0.18 * this.width;
      x_end = this.x + 0.73 * this.width;
    } else {
      x_start = this.x + 0.27 * this.width;
      x_end = this.x + 0.82 * this.width;
    }
    return (
      ((x_end > object.x && x_start < object.x) || (x_start < object.x + object.width && x_end > object.x)) &&
      y_end > object.y && this.y < object.y);
  }

  looseEnergy() {
    this.energy -= 0.25;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.timeWhenHurt = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.timeWhenHurt;
    return timePassed < 500;
  }

  isDead() {
    return this.energy == 0;
  }
}
