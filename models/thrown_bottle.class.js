class ThrownBottle extends MovableObject {
  name = 'thrown bottle';
  explode = false;
  destroyed = false;

  constructor(worldCanvas, x, y, startspeed_x, toTheLeft, IMAGES, AUDIOS) {
    super(worldCanvas);
    super.setImages(IMAGES);
    super.loadImage(this.IMAGES.ROTATING[0]);
    super.setSounds(AUDIOS)
    this.setDimensions(x, y, startspeed_x);
    this.changeDirection = toTheLeft;
    this.animate();
    this.applyGravity(100);
    this.playSound(this.SOUNDS.THROW)
  }

    /**
   * Sets the ThrownBottles dimensions which depend on the canvassize, and the characters x- and y-position and its speed.
   * @param {Number} x - The characters x-coordinate
   * @param {Number} y - The characters y-coordinate
   * @param {Number} startspeed_x - The characters speed (moveX)
   */
  setDimensions(x, y, startspeed_x) {
    this.x = x;
    this.y = y;
    this.height = 0.1 * this.worldCanvas.height;
    this.width = 0.1 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 50 + startspeed_x;
    this.y_landing = this.worldCanvas.height;
  }

   /**
   * Hands the parameters for calculating the chickens collision coordinates to setCollisionCoordinates().
   */
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

  setSounds(AUDIOS) {
    this.SOUNDS = AUDIOS;
    this.sound_throw = new Audio(this.SOUNDS.THROW.AUDIO);
    this.sound_throw.volume = this.SOUNDS.THROW.VOLUME;
    this.sound_break = new Audio(this.SOUNDS.BREAK.AUDIO);
    this.sound_break.volume = this.SOUNDS.BREAK.VOLUME;
  }

    /**
   * Initiates the thrown bottle animation when the game is not paused and pushes the animation-interval to the intervals-array.
   */
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

  /**
   * Shows the exploding-bottle-animation and clears the interval of the current bottle.
   * @param {Number} bottleInterval - The ID of the bottle-interval
   */
  bottleExplode(bottleInterval) {
    this.height = 0.2 * this.worldCanvas.height;
    this.width = 0.2 * this.worldCanvas.height;
    this.y_landing = this.y;
    this.playSound(this.SOUNDS.BREAK)
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
