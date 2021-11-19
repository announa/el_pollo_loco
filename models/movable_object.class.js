class MovableObject extends GameComponents {
  speed;
  moveX;
  changeDirection = false;
  moveY = 0;
  gravAcceleration;
  y_landing;
  energy = 100;
  timeWhenHurt = 0;

  constructor(canvas) {
    super();
    this.gravAcceleration = canvas.height / 200;
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
      } else{
        this.moveY = 0;
      }
    }, 1000 / 25);
  }

  jump(worldCanvas) {
    this.moveY = worldCanvas.height / 20;
  }

  isAboveGround(y_landing) {
    return this.y < y_landing;
  }

/*   isColliding(object) {
    this.getCollisionCoordinates();
    object.getCollisionCoordinates();
    let a = this.cc;
    let b = object.cc;
    return ((a.x_2 > b.x_1 && a.x_1 < b.x_2) || (a.x_1 < b.x_2 && a.x_2 > b.x_1)) && a.y_2 > b.y_1 && a.y_1 < b.y_2;
  } */
  /*   isColliding(object) {
    let x_start;
    let x_end;
    let y_end = this.y + 0.95 * this.height;
    if (!this.changeDirection) {
      x_start = this.x + 0.18 * this.width;
      x_end = this.x + 0.73 * this.width;
    } else {
      x_start = this.x + 0.27 * this.width;
      x_end = this.x + 0.82 * this.width;
    }
    return (
      ((x_end > object.x && x_start < object.x) || (x_start < object.x + object.width && x_end > object.x)) &&
      y_end > object.y && this.y < object.y);
  } */

  looseEnergy() {
    this.energy -= 2.5;
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
