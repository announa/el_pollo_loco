class MovableObject extends GameComponents {
  speed;
  moveX;
  changeDirection = false;
  moveY = 0;
  gravAcceleration;
  y_landing;
  energy = 100;
  timeWhenHurt = 0;
  imageRepetitions = 0;
  beatEnemy = false;

  constructor(worldCanvas) {
    super(worldCanvas);
    this.gravAcceleration = canvas.height / 200;
  }

  // HIER WEITERMACHEN!!!

  playAnimation(images, repetitions) {
    if (!repetitions) {
      repetitions = 1;
    }

    let mod = this.currentImage % images.length;
    let path = images[mod];
    this.img = this.imageCache[path];
    if(this.imageRepetitions < repetitions){
      this.imageRepetitions++;
    } else{
    this.currentImage++;
    this.imageRepetitions = 0;
  }}

  moveLeft() {
    this.x -= this.moveX;
  }

  moveRight() {
    this.x += this.moveX;
  }

  fallingAnimation() {
    setInterval(() => {
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

  jump() {
    this.moveY = this.worldCanvas.height / 20;
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
