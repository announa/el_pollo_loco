class ThrownBottle extends MovableObject {
  IMAGES_ROTATING = [
    './img/6.botella/Rotacion/Mesa de trabajo 1 copia 3.png',
    './img/6.botella/Rotacion/Mesa de trabajo 1 copia 4.png',
    './img/6.botella/Rotacion/Mesa de trabajo 1 copia 5.png',
    './img/6.botella/Rotacion/Mesa de trabajo 1 copia 6.png',
  ];
  IMAGES_SALSA = [
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 7.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 8.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 9.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 10.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 11.png',
    './img/6.botella/Rotacion/Splash de salsa/Mesa de trabajo 1 copia 12.png',
  ];
  explode = false;

  constructor(worldCanvas, x, y, startspeed_x, toTheLeft) {
    super(worldCanvas).loadImage(this.IMAGES_ROTATING[0]);
    super.loadAllImages(this.IMAGES_ROTATING);
    super.loadAllImages(this.IMAGES_SALSA);
    this.setDimensions(x, y, startspeed_x);

    this.animate(toTheLeft);
  }

  setDimensions(x, y, startspeed_x) {
    this.x = x;
    this.y = y;
    this.height = 0.1 * this.worldCanvas.height;
    this.width = 0.1 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 40 + startspeed_x;
    this.y_landing = 1 * this.worldCanvas.height;
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

  animate(toTheLeft) {
    setInterval(() => {
      if (this.explode == false) {
        this.playAnimation(this.IMAGES_ROTATING);
        this.bottleUp(this.worldCanvas);
        this.fallingAnimation(this.worldCanvas);
        if (toTheLeft) {
          this.moveLeft();
        } else {
          this.moveRight();
        }
      } else {
        this.playAnimation(this.IMAGES_SALSA);
      }
    }, 1000 / 25);
  }

  bottleUp() {
    this.moveY = this.worldCanvas.height / 40;
  }
}
