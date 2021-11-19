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

  constructor(worldCanvas, x, y, startspeed_x, toTheLeft) {
    super(worldCanvas).loadImage(this.IMAGES_ROTATING[0]);
    super.loadAllImages(this.IMAGES_ROTATING);
    super.loadAllImages(this.IMAGES_SALSA);
    this.setDimensions(worldCanvas, x, y, startspeed_x);
 
    this.animate(worldCanvas, toTheLeft);
  }

  setDimensions(worldCanvas, x, y, startspeed_x) {
    this.x = x;
    this.y = y;
    this.height = 0.1 * worldCanvas.height;
    this.width = 0.1 * worldCanvas.height;
    this.moveX = worldCanvas.width / 60 + startspeed_x;
    this.y_landing = 0.74 * worldCanvas.height;
  }

  animate(worldCanvas, toTheLeft) {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATING);
      this.bottleUp(worldCanvas);
      this.fallingAnimation(worldCanvas);
      if (toTheLeft) {
        this.moveLeft();
      } else {
        this.moveRight();
      }
    }, 1000 / 25);
  }

  bottleUp(worldCanvas) {
    this.moveY = worldCanvas.height / 80;
  }
}
