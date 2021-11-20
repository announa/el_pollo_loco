class Character extends MovableObject {
  IMAGES_WALKING = [
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-21.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-22.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-23.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-24.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-25.png',
    'img/2.Secuencias_Personaje-Pepe-correccion/2.Secuencia_caminata/W-26.png',
  ];

  IMAGES_JUMPING = [
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-31.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-32.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-33.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-34.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-34.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-34.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-34.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-35.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-35.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-35.png',
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
  sound_walking = new Audio('./audio/walking.mp3');
  world;

  constructor(worldCanvas) {
    super(worldCanvas);
    this.setDimensions(worldCanvas);
    super.loadImage(this.IMAGES_WALKING[0]);
    super.loadAllImages(this.IMAGES_WALKING);
    super.loadAllImages(this.IMAGES_JUMPING);
    super.loadAllImages(this.IMAGES_DEAD);
    super.loadAllImages(this.IMAGES_HURT);
    this.sound_walking.volume = 0.5;

    this.fallingAnimation(worldCanvas);

    this.animate(worldCanvas);
  }

  /**
   * Sets the characters dimensions which depend in the canvas size.
   * @param {DOM object} worldCanvas - The Canvas
   */
  setDimensions(worldCanvas) {
    this.x = 0.2 * worldCanvas.width;
    this.y = -0.1 * worldCanvas.height;
    /* this.y = 0.31 * worldCanvas.height; */
    this.height = 0.6 * worldCanvas.height;
    this.width = 0.3 * worldCanvas.height;
    this.y_landing = 0.31 * worldCanvas.height;
    this.moveX = worldCanvas.width / 100;
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
   * @param {DOM object} worldCanvas - The Canvas
   */
  animate(worldCanvas) {
    this.animateMovements(worldCanvas);
    this.animateImages(worldCanvas);
  }

  animateMovements(worldCanvas) {
    setInterval(() => {
      this.sound_walking.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.walkRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0.2 * worldCanvas.width) {
        this.walkLeft();
      }
      if (this.world.keyboard.UP && !this.isAboveGround(this.y_landing)) {
        this.jump(worldCanvas);
      }
      this.world.camera_X = -this.x + 0.07 * canvas.width;
    }, 1000 / 60);
  }

  walkRight() {
    this.changeDirection = false;
    this.moveRight();
    this.sound_walking.play();
  }
  walkLeft() {
    this.changeDirection = true;
    this.moveLeft();
    this.sound_walking.play();
  }

  animateImages(worldCanvas) {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround(worldCanvas)) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

  /**
   * Checks if Pepe Peligroso is moving and if so, returns his speed for adding it to the speed of the bottle.
   * @returns number - The actual speed of Pepe Peligroso.
   */
  detectCharacterSpeed() {
    if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
      return this.moveX;
    } else {
      return 0;
    }
  }
}
