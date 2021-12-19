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
  gravityInterval;

  constructor(worldCanvas) {
    super(worldCanvas);
  }

  /**
   * Sets the current image that has to be shown from the current image array. Repeats the same image depending on the repetitions-parameter for showing slower and faster animations in the same objects-interval.
   * @param {Array} images - The current image-array that has to be played.
   * @param {Number} repetitions - The amount of repetitions of the same image.
   */
  playAnimation(images, repetitions) {
    if (!repetitions) {
      repetitions = 1;
    }

    let mod = this.currentImage % images.length;
    let path = images[mod];
    this.img = this.imageCache[path];

    this.checkIfNextImage(repetitions);
  }
  
  /**
   * Checks if repetitions is reached, then increases currentImage.
   * @param {Number} repetitions - The amount of repetitions of the same image.
   */
  checkIfNextImage(repetitions){
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

  /**
   * Recalculates the y-coordinate of the MovableObject-intance by subtracting the gravAcceleration from moveY and subtracting moveY from y when the game is not paused and the y-coordinate of the intance is lower than the instances landing y-coordinate.
   * @param {Number} gravityFactor - The factor used to calculate the gravAcceleration for the MovableObject-intance.
   */
  applyGravity(gravityFactor) {
    this.gravityInterval = setInterval(() => {
      if (!pause) {
        this.gravAcceleration = this.worldCanvas.height / gravityFactor;
        this.moveY -= this.gravAcceleration;
        this.y -= this.moveY;
        if (this.y > this.y_landing) {
          this.y = this.y_landing;
          this.moveY = 0;
        }
      }
    }, 1000 / 25);
    intervals.push(this.gravityInterval);
  }

  moveUp(factor) {
    this.moveY = this.worldCanvas.height / factor;
  }

  /**
   * Checks if the MovableObject-instances y-position is above the landing-position.
   * @param {Number} y_landing - The landing y-coordinate of the MovableObject-instance.
   * @returns {Boolean}
   */
  isAboveGround(y_landing) {
    return this.y < y_landing;
  }

  /**
   * Checks if the MovableObject-instance (Character || ThrwonBottle )collides with another object.
   * @param {Chicken||Chick||Endboss||BottleOnTheGround||Coin} object - The collision-object of the character or the thrown bottle.
   * @returns {String||Boolean}
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

  getHurt(percentage) {
    this.looseEnergy(percentage);
    this.lifeBar.updateStatusBar(this.energy);
    this.playSound(this.SOUNDS.HURT)
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.timeWhenHurt;
    return timePassed < 500;
  }

  isDead() {
    return this.energy == 0;
  }

  stopAnimation(interval, timeout) {
    setTimeout(() => {
      clearInterval(interval);
    }, timeout);
  }
}
