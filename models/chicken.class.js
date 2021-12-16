class Chicken extends MovableObject {
  name = 'Pollo Loco';
  IMAGES_WALKING = [
    './img/3.Secuencias_Enemy_basico/Version_Gallinita/1.Ga_paso_derecho.png',
    './img/3.Secuencias_Enemy_basico/Version_Gallinita/2-Ga_centro.png',
    './img/3.Secuencias_Enemy_basico/Version_Gallinita/3.Ga_paso izquierdo.png',
  ];
  IMAGE_DEAD = ['./img/3.Secuencias_Enemy_basico/Version_Gallinita/4.G_muerte.png'];
  levelNo;
  alive = true;
  turnAroundTimeout;
  chickenInterval;

  constructor(worldCanvas, worldSize, currentLevel) {
    super(worldCanvas);
    this.levelNo = currentLevel;
    this.setDimensions(worldSize);
    super.loadImage('./img/3.Secuencias_Enemy_basico/Version_Gallinita/1.Ga_paso_derecho.png');
    super.loadAllImages(this.IMAGES_WALKING);
    super.loadAllImages(this.IMAGE_DEAD);
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
          this.playAnimation(this.IMAGES_WALKING);
          this.walk();
          this.turnAround();
        } else {
          this.img = this.imageCache[this.IMAGE_DEAD[0]];
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
