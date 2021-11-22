class Endboss extends MovableObject {
  name = 'Senora Gallina';

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
  IMAGES_ATTACK = [
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/2.Ataque/G13.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/2.Ataque/G14.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/2.Ataque/G15.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/2.Ataque/G16.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/2.Ataque/G17.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/2.Ataque/G18.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/2.Ataque/G19.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/2.Ataque/G20.png',
  ];
  IMAGES_DEAD = [
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/4.Muerte/G24.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/4.Muerte/G25.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/4.Muerte/G26.png',
  ];
  images;
  sound_walking = new Audio('./audio/walking.mp3');
  startedWalking = 0;
  lifeBar = 0;
  gameCharacter;

  animationInterval;

  constructor(worldCanvas, bgImgAmount) {
    super(worldCanvas).loadImage('./img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/1.Caminata/G1.png');
    super.loadAllImages(this.IMAGES_WALKING);
    super.loadAllImages(this.IMAGES_ATTENTION);
    super.loadAllImages(this.IMAGES_ATTACK);
    super.loadAllImages(this.IMAGES_DEAD);
    this.setDimensions(bgImgAmount);
    this.images = this.IMAGES_WALKING;

    this.fallingAnimation();
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
    this.animateImages();
  }

  animateMovements() {
    setInterval(() => {
      this.sound_walking.pause();
      if (this.isDead()) {
        setInterval(() => {
        this.moveRight();
                }, 80);
      } else {
        if ((this.images == this.IMAGES_WALKING || this.isAboveGround(this.y_landing)) && !this.changeDirection) {
          this.walkLeft();
        }
        if ((this.images == this.IMAGES_WALKING || this.isAboveGround(this.y_landing)) && this.changeDirection) {
          this.walkRight();
        }
        if (this.img.src.includes('G15')) {
          this.jump(30);
        }
        this.turnAround();
        this.moveEndbossBar();
      }
    }, 100);
  }

  turnAround() {
    if (this.nearCanvasLimits()) {
      if (this.changeDirection) {
        this.changeDirection = false;
      } else {
        this.changeDirection = true;
      }
    }
  }

  nearCanvasLimits() {
    return (
      ((this.x < 0.25 * this.worldCanvas.width && !this.changeDirection) ||
        (this.x + this.width > this.worldCanvas.width && this.changeDirection)) &&
      (this.images == this.IMAGES_WALKING || /G12|G20/.test(this.img.src))
    );
  }


  moveEndbossBar() {
    this.lifeBar.setDimensions('endboss', this);
  }

  animateImages() {
    let endbossDeadImg = 0;
    this.startedWalking = new Date().getTime();
    this.animationInterval = setInterval(() => {
      if (this.isDead()) {
        endbossDeadImg = this.endbossDies(endbossDeadImg);
      } else {
        this.checkEndbossEvents();
        this.playAnimation(this.images, 2);
      }
    }, 100);
  }

  checkEndbossEvents() {
    if (this.nearCharacter()) {
      this.attack();
    } else {
      if (this.images == this.IMAGES_ATTACK) {
        this.images = this.IMAGES_WALKING;
      }
      this.switchAnimations();
    }
  }

  switchAnimations() {
    if (this.images == this.IMAGES_WALKING && new Date().getTime() - this.startedWalking > 1500) {
      this.currentImage = 0;
      this.images = this.IMAGES_ATTENTION;
    }
    if (this.img.src.includes('G12') && this.imageRepetitions == 2) {
      this.currentImage = 0;
      this.startedWalking = new Date().getTime();
      this.images = this.IMAGES_WALKING;
    }
  }

  nearCharacter() {
    return (
      this.x - (this.gameCharacter.x + this.gameCharacter.width) < 0.2 * this.worldCanvas.width &&
      -(this.x + this.width - this.gameCharacter.x) < 0.2 * this.worldCanvas.width
    );
  }


  attack() {
    if (this.images != this.IMAGES_ATTACK) {
      this.currentImage = 0;
    }
    this.images = this.IMAGES_ATTACK;
  }

  endbossDies(endbossDeadImg) {
    if (endbossDeadImg == 0) {
      this.currentImage = 0;
    }
    this.playAnimation(this.IMAGES_DEAD);
    endbossDeadImg++;
    if (endbossDeadImg == 3) {
      clearInterval(this.animationInterval);
    }
    return endbossDeadImg;
  }
}
