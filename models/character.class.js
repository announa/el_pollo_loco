class Character extends MovableObject {
  name = 'Pepe Peligroso';
  IMAGES_WALKING = [
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-21.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-22.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-23.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-24.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-25.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-26.png',
  ];
  /* 
  IMAGES_JUMPING = [
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-31.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-32.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-33.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-34.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-34.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-35.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-35.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-36.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-36.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-37.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-37.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-38.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-38.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-39.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-39.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-40.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-40.png',
  ]; */

  IMAGES_JUMPING = [
    /* './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-31.png', */
    /* './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-32.png', */
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-33.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-34.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-35.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-36.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-37.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-38.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-39.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-40.png',
  ];

  IMAGES_HURT = [
    './img/2.Secuencias_Personaje-Pepe-correccion/4.Herido/H-41.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/4.Herido/H-42.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/4.Herido/H-43.png',
  ];
  IMAGES_DEAD = [
    './img/2.Secuencias_Personaje-Pepe-correccion/5.Muerte/D-51.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/5.Muerte/D-52.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/5.Muerte/D-53.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/5.Muerte/D-54.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/5.Muerte/D-55.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/5.Muerte/D-56.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/5.Muerte/D-57.png',
  ];

  IMAGES_IDLE = [
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-1.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-2.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-3.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-4.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-5.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-6.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-7.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-8.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-9.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/IDLE/I-10.png',
  ];
  lifeBar;
  bottleBar;
  collectedBottles = 0;
  thrownBottles = [];
  sound_walking = new Audio('./audio/walking.mp3');
  world;
  movementsInterval;

  constructor(worldCanvas) {
    super(worldCanvas);
    this.setDimensions();
    super.loadImage(this.IMAGES_WALKING[0]);
    super.loadAllImages(this.IMAGES_WALKING);
    super.loadAllImages(this.IMAGES_JUMPING);
    super.loadAllImages(this.IMAGES_DEAD);
    super.loadAllImages(this.IMAGES_HURT);
    super.loadAllImages(this.IMAGES_IDLE);
    this.lifeBar = new StatusBar(worldCanvas, 'life');
    this.bottleBar = new StatusBar(worldCanvas, 'bottles');
    this.sound_walking.volume = 0.5;

    this.fallingAnimation();

    this.animate();
  }

  /**
   * Sets the characters dimensions which depend in the canvas size.
   */
  setDimensions() {
    this.x = 0.2 * this.worldCanvas.width;
    this.y = -0.1 * this.worldCanvas.height;
    /* this.y = 0.31 * this.worldCanvas.height; */
    this.height = 0.6 * this.worldCanvas.height;
    this.width = 0.3 * this.worldCanvas.height;
    this.y_landing = 0.31 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 100;
  }

  /**
   * Hands the parameters for calculating the collision coordinates of the character to setCollisionCoordinates().
   */
  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.18 * this.width,
      0.73 * this.width,
      0.27 * this.width,
      0.82 * this.width,
      0,
      0.95 * this.height,
      this.changeDirection
    );
  }

  /**
   * animates the character
   */
  animate() {
    this.animateMovements();
    this.animateImages();
  }

  animateMovements() {
    this.movementsInterval = setInterval(() => {
      this.sound_walking.pause();
      if (this.isDead()) {
        this.gameOver();
      } else {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
          this.changeDirection = false;
          this.walkRight();
        }
        if (this.world.keyboard.LEFT && this.x > 0.2 * this.worldCanvas.width) {
          this.changeDirection = true;
          this.walkLeft();
        }
        if (this.world.keyboard.UP && !this.isAboveGround(this.y_landing)) {
          this.jump(20);
        }
      }
      this.world.camera_X = -this.x + 0.07 * canvas.width;
    }, 1000 / 60);
  }

  animateImages() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.moveY == this.worldCanvas.height / 20) {
        this.currentImage = 0;
        this.playAnimation(this.IMAGES_JUMPING, 3);
      } else if (this.isAboveGround(this.y_landing)) {
        this.playAnimation(this.IMAGES_JUMPING, 3);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_IDLE, 10);
      }
    }, 50);
  }

  gameOver() {
    setTimeout(() => {
      return true;
    }, 2000);
    this.jump(20);
    this.y_landing = this.worldCanvas.height;
    clearInterval(this.movementsInterval);
    setInterval(() => {
      this.moveRight();
    }, 1000 / 60);
  }

  collectBottle(index) {
    this.collectedBottles += 1;
    this.world.level.bottlesOnTheGround.splice(index, 1);
    this.bottleBar.updateStatusBar(this.percentageBottleBar(), 'bottles');
  }

  throwBottle() {
    if (this.collectedBottles > 0) {
      this.thrownBottles.push(this.createThrownBottle());
      this.collectedBottles -= 1;
      this.bottleBar.updateStatusBar(this.percentageBottleBar(), 'bottles');
    }
  }

  percentageBottleBar() {
    return (this.collectedBottles / this.world.bottlesAmount) * 100;
  }

  createThrownBottle() {
    let bottle_x = this.x + 0.4 * this.width;
    let bottle_y = this.y + 0.5 * this.height;
    let bottle_startspeed_x = this.detectCharacterSpeed();
    let bottle = new ThrownBottle(
      this.worldCanvas,
      bottle_x,
      bottle_y,
      bottle_startspeed_x,
      this.changeDirection
    );
    return bottle;
  }

  /**
   * Checks if character is moving and if so, returns his speed for adding it to the speed of the bottle.
   * @returns number - The actual speed of character.
   */
  detectCharacterSpeed() {
    if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
      return this.moveX;
    } else {
      return 0;
    }
  }
}
