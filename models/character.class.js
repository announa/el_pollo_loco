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

  IMAGES_JUMPING = [
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-33.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-34.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-35.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-36.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-37.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-38.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/3.Secuencia_salto/J-39.png',
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
  IMAGES_LONG_IDLE = [
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-11.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-12.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-13.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-14.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-15.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-16.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-17.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-18.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-19.png',
    './img/2.Secuencias_Personaje-Pepe-correccion/1.IDLE/LONG_IDLE/I-20.png',
  ];
  lifeBar;
  bottleBar;
  coinBar;
  collectedBottles = 0;
  collectedCoins = 0;
  thrownBottles = [];
  sound_walking = new Audio('./audio/walking.mp3');
  world;
  gameOverTime;

  constructor(worldCanvas) {
    super(worldCanvas);
    this.setDimensions();
    super.loadImage(this.IMAGES_IDLE[0]);
    super.loadAllImages(this.IMAGES_WALKING);
    super.loadAllImages(this.IMAGES_JUMPING);
    super.loadAllImages(this.IMAGES_DEAD);
    super.loadAllImages(this.IMAGES_HURT);
    super.loadAllImages(this.IMAGES_IDLE);
    super.loadAllImages(this.IMAGES_LONG_IDLE);
    this.lifeBar = new LifeBar(worldCanvas);
    this.bottleBar = new BottleBar(worldCanvas);
    this.coinBar = new CoinBar(worldCanvas);
    /*     this.lifeBar = new StatusBar(worldCanvas, 'life');
    this.bottleBar = new StatusBar(worldCanvas, 'bottles');
    this.coinBar = new StatusBar(worldCanvas, 'coins'); */
    this.sound_walking.volume = 0.5;

    this.applyGravity(200);
    this.animate();
  }

  /**
   * Sets the characters dimensions which depend in the canvas size.
   */
  setDimensions() {
    this.x = 0.2 * this.worldCanvas.width;
    /* this.y = -0.1 * this.worldCanvas.height; */
    this.y = 0.31 * this.worldCanvas.height;
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
      0.4 * this.height,
      0.95 * this.height,
      this.changeDirection
    );
  }

  /**
   * animates the character
   */
  animate() {
    let characterInterval = setInterval(() => {
      if (!pause) {
        this.animateMovements();
      }
    }, 1000 / 60);
    intervals.push(characterInterval);
  }

  animateMovements() {
    this.sound_walking.pause();
    if (this.isDead()) {
      this.dyingAnimation();
    } else if (this.world.gameOver == 'won' && this.x + 0.75 * this.worldCanvas.width < this.world.level.endboss.x) {
      this.won();
    } else {
      this.checkForIdle();
      this.checkIfWalking();
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT, 6);
      }
      this.checkIfJumping();
      /* this.checkIf10Coins(); */
    }
  }

  won() {
    if (!this.isAboveGround(this.y_landing)) {
      this.moveUp(20);
    }
    if (this.isAboveGround(this.y_landing)) {
      if (this.changeDirection) {
        this.walkLeft();
      } else {
        this.walkRight();
      }
    }
    this.jumpingAnimation();
  }

  checkForIdle() {
    this.playAnimation([this.IMAGES_IDLE[0]], 30);
    if (Date.now() - this.world.lastKeyEvent > 1000) {
      this.playAnimation(this.IMAGES_IDLE, 30);
    }
    if (!this.world.lastKeyEvent || Date.now() - this.world.lastKeyEvent > 5000) {
      this.playAnimation(this.IMAGES_LONG_IDLE, 30);
    }
  }

  checkIfWalking() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.walkRight();
    }
    if (this.world.keyboard.LEFT && this.x > 0.2 * this.worldCanvas.width) {
      this.walkLeft();
    }
  }

  checkIfJumping() {
    if (this.world.keyboard.UP && !this.isAboveGround(this.y_landing)) {
      this.moveUp(20);
      this.jumpingAnimation();
    }
    if (this.isAboveGround(this.y_landing)) {
      this.jumpingAnimation();
    }
  }

  walkRight() {
    this.changeDirection = false;
    this.moveRight();
    if (!this.isAboveGround(this.y_landing)) {
      this.playAnimation(this.IMAGES_WALKING, 3);
      this.sound_walking.play();
    }
  }

  walkLeft() {
    this.changeDirection = true;
    this.moveLeft();
    if (!this.isAboveGround(this.y_landing)) {
      this.playAnimation(this.IMAGES_WALKING, 3);
      this.sound_walking.play();
    }
  }

  jumpingAnimation() {
    if (!this.isHurt()) {
      if (this.moveY == this.worldCanvas.height / 20) {
        this.currentImage = 0;
      }
      if (this.currentImage > 7) {
        this.currentImage = 7;
      }
      this.playAnimation(this.IMAGES_JUMPING, 11);
    }
  }

  dyingAnimation() {
    if (!this.img.src.includes('Muerte')) {
      this.gameOverTime = Date.now();
      this.world.gameOver = 'lost';
      this.y_landing = this.worldCanvas.height;
      this.currentImage = 0;
      this.moveUp(20);
    }
    if (this.currentImage > 5) {
      this.currentImage = 5;
    }
    this.moveRight();
    this.playAnimation(this.IMAGES_DEAD, 5);
  }

  collectObject(collisionObject, index, arr) {
    if (collisionObject instanceof BottleOnTheGround) {
      this.collectedBottles += 1;
      this.bottleBar.updateStatusBar(this.percentageBottleBar());
    } else if (collisionObject instanceof Coin) {
      this.collectedCoins += 1;
      this.coinBar.updateStatusBar(this.percentageCoinBar());
      clearInterval(collisionObject.coinInterval);
    }
    arr.splice(index, 1);
  }

  throwBottle() {
    if (this.collectedBottles > 0) {
      this.thrownBottles.push(this.createThrownBottle());
      this.collectedBottles -= 1;
      this.bottleBar.updateStatusBar(this.percentageBottleBar());
    }
  }

  percentageBottleBar() {
    return (this.collectedBottles / this.world.bottlesAmount) * 100;
  }

  percentageCoinBar() {
    return (this.collectedCoins / this.world.coinsAmount) * 100;
  }

  createThrownBottle() {
    let bottle_x = this.x + 0.4 * this.width;
    let bottle_y = this.y + 0.5 * this.height;
    let bottle_startspeed_x = this.detectCharacterSpeed();
    let bottle = new ThrownBottle(this.worldCanvas, bottle_x, bottle_y, bottle_startspeed_x, this.changeDirection);
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

  has10Coins() {
    this.energy += 20;
    this.collectedCoins = 0;
    this.lifeBar.highlightStatusBar(this.energy, 'life');
    this.coinBar.highlightStatusBar(this.percentageCoinBar(), 'coin');
    /*     this.lifeBar.updateStatusBar(this.energy);
    this.coinBar.updateStatusBar(this.percentageCoinBar()); */
  }
}
