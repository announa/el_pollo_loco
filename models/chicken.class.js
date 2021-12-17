class Chicken extends MovableObject {
  name = 'Pollo Loco';
  levelNo;
  alive = true;
  turnAroundTimeout;
  chickenInterval;

  constructor(worldCanvas, worldSize, currentLevel, IMAGES) {
    super(worldCanvas);
    super.setImages(IMAGES);
    super.loadImage(this.IMAGES.WALKING[0]);
    this.levelNo = currentLevel;
    this.setDimensions(worldSize);
    this.setDirection();
    this.turnedAround = Date.now();
    this.setTurnArounTimer();
    this.animate();
  }

  setDimensions(worldSize) {
    this.x = 0.5 * this.worldCanvas.width + Math.random() * this.worldCanvas.width * (worldSize - 1);
    this.y = 0.74 * this.worldCanvas.height;
    this.height = 0.15 * this.worldCanvas.height;
    this.width = 0.15 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 1000 + Math.random() * (this.worldCanvas.width / 300);
  }

  setDirection() {
    if (this.levelNo > 2) {
      let random = Math.round(Math.random());
      console.log(random);
      if (random == 1) {
        this.changeDirection = true;
      }
    }
  }

  setTurnArounTimer() {
    this.turnAroundTimeout = Math.floor(5000 + Math.random() * 10000 + Date.now());
  }

  getCollisionCoordinates() {
    this.setCollisionCoordinates(0, this.width, 0, this.width, 0, this.height, this.changeDirection);
  }

  animate() {
    this.chickenInterval = setInterval(() => {
      if (!pause) {
        if (this.alive) {
          this.playAnimation(this.IMAGES.WALKING);
          this.walk();
          this.turnAround();
        } else {
          this.img = this.imageCache[this.IMAGES.DEAD[0]];
        }
      }
    }, 100);
    intervals.push(this.chickenInterval);
  }

  walk() {
    if (this.changeDirection) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
  }

  turnAround() {
    if (this.levelNo > 2 && this.turnAroundTimeout < Date.now()) {
      if (this.changeDirection) {
        this.changeDirection = false;
      } else {
        this.changeDirection = true;
      }
      this.setTurnArounTimer();
    }
  }
}
