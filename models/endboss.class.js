class Endboss extends MovableObject {
  a_name = 'Senora Gallina';

  IMAGES_WALKING = [
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/1.Caminata/G1.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/1.Caminata/G2.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/1.Caminata/G3.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/1.Caminata/G4.png',
  ];
  IMAGES_ATTENTION = [
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G5.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G6.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G7.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G8.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G9.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G10.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G11.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G12.png',
  ];

  IMAGES_DEAD = [
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/4.Muerte/G24.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/4.Muerte/G25.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/4.Muerte/G26.png',
  ];
  sound_walking = new Audio('./audio/walking.mp3');

  endbossInterval;

  constructor(worldCanvas, bgImgAmount) {
    super(worldCanvas).loadImage('./img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/1.Caminata/G1.png');
    super.loadAllImages(this.IMAGES_WALKING);
    super.loadAllImages(this.IMAGES_ATTENTION);
    super.loadAllImages(this.IMAGES_DEAD);
    this.setDimensions(bgImgAmount);

    this.animate();
  }

  setDimensions(bgImgAmount) {
    this.height = 0.8 * this.worldCanvas.height;
    this.width = 0.85 * 0.8 * this.worldCanvas.height;
    this.x = this.worldCanvas.width;
    /* this.x = bgImgAmount * this.worldCanvas.width - 0.5 * this.worldCanvas.width; */
    this.y = 0.14 * this.worldCanvas.height;
    this.y_landing = 0.14 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 100;
  }

  /**
   * Hands the parameters for calculating the collision coordinates of the character to setCollisionCoordinates().
   */
  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.05 * this.width,
      0.9 * this.width,
      0.05 * this.width,
      0.9 * this.width,
      0.2 * this.height,
      0.9 * this.height,
      this.changeDirection
    );
  }

  animate() {
    this.animateMovements();
    this.animatImages();
  }

  animateMovements() {
    setInterval(() => {
      if (this.isDead()) {
        this.moveRight();
      } /* else {
        this.walkLeft(false);
      } */
    }, 1000 / 60);
  }

  animatImages() {
    let images = this.IMAGES_WALKING;
    let deadCounter = 0;
    this.endbossInterval = setInterval(() => {
      if (this.isDead()) {
        if (deadCounter == 0) {
          this.currentImage = 0;
        }
        this.playAnimation(this.IMAGES_DEAD);
        deadCounter++;
        if (deadCounter == 3) {
          clearInterval(this.endbossInterval);
        }
      } else {
        /* console.log(this.img.src.includes(this.IMAGES_ATTENTION[7].substring(3))) */
        console.log(this.img.src.includes(this.IMAGES_WALKING[3].substring(3)) && this.imageRepetitions == 4)
        if (this.img.src.includes(this.IMAGES_WALKING[3].substring(3))) {
          images = this.IMAGES_ATTENTION;
          console.log('IMAGES_ATTENTION')
        }
        if (this.img.src.includes(this.IMAGES_ATTENTION[7].substring(3)) && this.imageRepetitions == 4) {
          images = this.IMAGES_WALKING;
          console.log('IMAGES_WALKING')
        }
        this.playAnimation(images, 4);
      }
    }, 100);
  }
}
