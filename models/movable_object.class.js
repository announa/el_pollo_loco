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
        if(this.y > this.y_landing){
          this.y = this.y_landing;
        }
/*         console.log('y-landing: ', this.y_landing)
        console.log('this.y: ', this.y) */
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
      console.log('beat enemy')
      return 'beat enemy';
    } else if (a.x_2 > b.x_1 && a.x_1 < b.x_2 && a.y_2 >= b.y_1 && a.y_1 < b.y_2 ) {
      console.log('hurt')
      return 'hurt';
    } else {
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
