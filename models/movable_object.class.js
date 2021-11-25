class MovableObject extends GameComponents {
  speed;
  moveX;
  changeDirection = false;
  moveY = 0;
  gravAcceleration;
  y_landing;
  energy = 100;
  timeWhenHurt = 0;
  imageRepetitions = 1;
  beatEnemy = false;

  constructor(worldCanvas) {
    super(worldCanvas);
  }

  playAnimation(images, repetitions) {
    if (!repetitions) {
      repetitions = 1;
    }

    let mod = this.currentImage % images.length;
    let path = images[mod];
    this.img = this.imageCache[path];

    //repeats the same image several times until repetitions is reched, then increases currentImage --> for slower animations like character idle
    if (this.imageRepetitions < repetitions) {
      this.imageRepetitions++;
    } else {
      this.currentImage++;
      this.imageRepetitions = 1;
    }
  }

  moveLeft() {
    this.x -= this.moveX;
  }

  moveRight() {
    this.x += this.moveX;
  }

    walkRight() {
    this.moveRight();
    this.sound_walking.play();
  }

  walkLeft() {
    this.moveLeft();
    this.sound_walking.play();
  }

  fallingAnimation() {
    setInterval(() => {
      this.gravAcceleration = this.worldCanvas.height / 200;
      if (this.moveY > 0 || this.isAboveGround(this.y_landing)) {
        this.moveY -= this.gravAcceleration;
        this.y -= this.moveY;
        if (this.y > this.y_landing) {
          this.y = this.y_landing;
        }
      } else {
        this.moveY = 0;
      }
    }, 1000 / 25);
  }

  jump(factor) {
    this.moveY = this.worldCanvas.height / factor;
  }

  isAboveGround(y_landing) {
    return this.y < y_landing;
  }

  /**
   * Checks if the character collides with an object (bottle or enemy)
   * @param {object} object - The object for which to check if the character is colliding with it.
   * @returns string || boolean
   */
  isColliding(object) {
    this.getCollisionCoordinates();
    object.getCollisionCoordinates();
    let a = this.cc;
    let b = object.cc;
    if (a.x_2 > b.x_1 && a.x_1 < b.x_2 && a.y_2 >= b.y_1 && a.y_1 < b.y_2 && this.moveY < 0) {
      this.beatEnemy = true;
      return 'beat enemy';
    } else if (a.x_2 > b.x_1 && a.x_1 < b.x_2 && a.y_2 >= b.y_1 && a.y_1 < b.y_2) {
      this.beatEnemy = false;
      return 'hurt';
    } else {
      this.beatEnemy = false;
      return false;
    }
  }

  looseEnergy(energyLoss) {
    this.energy -= energyLoss;
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
