class ThrownBottle extends MovableObject {
  name = 'thrown bottle';
  explode = false;
  destroyed = false;

  constructor(worldCanvas, x, y, startspeed_x, toTheLeft, IMAGES) {
    super(worldCanvas);
    super.setImages(IMAGES);
    super.loadImage(this.IMAGES.ROTATING[0]);
    this.setDimensions(x, y, startspeed_x);
    this.changeDirection = toTheLeft;
    this.animate();
    this.applyGravity(100);
  }

  setDimensions(x, y, startspeed_x) {
    this.x = x;
    this.y = y;
    this.height = 0.1 * this.worldCanvas.height;
    this.width = 0.1 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 50 + startspeed_x;
    this.y_landing = this.worldCanvas.height;
  }

  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.2 * this.width,
      0.8 * this.width,
      0.2 * this.width,
      0.8 * this.width,
      0.2 * this.width,
      0.8 * this.width,
      this.changeDirection
    );
  }

  animate() {
    this.moveUp(13);
    let bottleInterval = setInterval(() => {
      if (!pause) {
        if (!this.explode) {
          this.playAnimation(this.IMAGES.ROTATING);
          this.getBottleDirection();
          if (this.y == this.y_landing) {
            this.clearBottleIntervals(bottleInterval);
          }
        } else {
          this.bottleExplode(bottleInterval);
        }
      }
    }, 1000 / 25);
  }

  getBottleDirection() {
    if (this.changeDirection) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }

  bottleExplode(bottleInterval) {
    this.height = 0.2 * this.worldCanvas.height;
    this.width = 0.2 * this.worldCanvas.height;
    this.y_landing = this.y;
    this.playAnimation(this.IMAGES.SALSA);
    if (this.img.src.includes('12.png')) {
      this.clearBottleIntervals(bottleInterval);
    }
  }

  clearBottleIntervals(bottleInterval) {
    [bottleInterval, this.gravityInterval].forEach((i) => clearInterval(i));
    setTimeout(() => {
      this.destroyed = true;
    }, 100);
  }
}
