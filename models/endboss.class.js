class Endboss extends MovableObject {
  name = 'Senora Gallina';
  sound_walking = new Audio('./audio/walking.mp3');
  startedWalking = 0;
  lifeBar;
  gameCharacter;
  animationInterval;

  constructor(worldCanvas, bgImgAmount, IMAGES) {
    super(worldCanvas);
    super.setImages(IMAGES.ENDBOSS);
    super.loadImage(this.IMAGES.WALKING[0]);
    this.setDimensions(bgImgAmount);
    this.lifeBar = new StatusBar(this.worldCanvas, IMAGES.STATUSBARS.LIFEBAR, 100, null, this);
    /* this.lifeBar = new LifeBar(this.worldCanvas, IMAGES.STATUSBARS.LIFEBAR, this); */
    this.images = this.IMAGES.WALKING;
    this.sound_walking.volume = 0.5;

    this.applyGravity(200);
    this.animate();
  }

  /**
   * Sets the endbosses dimensions which depend on the canvas size.
   */
  setDimensions(bgImgAmount) {
    this.height = 0.8 * this.worldCanvas.height;
    this.width = 0.85 * 0.8 * this.worldCanvas.height;
    this.x = bgImgAmount * this.worldCanvas.width - 0.5 * this.worldCanvas.width;
    this.y = 0.14 * this.worldCanvas.height;
    this.y_landing = 0.14 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 100;
  }

  /**
   * Hands the parameters for calculating the endbosses collision coordinates to setCollisionCoordinates().
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

  /**
   * Initiates the endboss animation when the game is not paused and when the character is close to the endboss. Pushes the animation-interval to the intervals-array.
   */
  animate() {
    let endbossInterval = setInterval(() => {
      if (this.nearCharacter() && !pause) {
        this.startAnimation();
      }
    }, 100);
    intervals.push(endbossInterval);
  }

  /**
   * checks the different endboss events and changes the animation depending on them.
   */
  startAnimation() {
    this.sound_walking.pause();
    if (this.isDead()) {
      this.dyingAnimation();
    } else {
      if (this.startedWalking == 0) {
        this.startedWalking = new Date().getTime();
      }
      this.checkEndbossMovements();
      this.switchAnimations();
      this.turnAround();
      this.moveEndbossBar();
      this.playAnimation(this.images, 2);
    }
  }

  /**
   * Checks if the endboss has to move to the right, to the left, move up or attack the character.
   */
  checkEndbossMovements() {
    if ((this.images == this.IMAGES.WALKING || this.isAboveGround(this.y_landing)) && !this.changeDirection) {
      this.walkLeft();
    }
    if ((this.images == this.IMAGES.WALKING || this.isAboveGround(this.y_landing)) && this.changeDirection) {
      this.walkRight();
    }
    if (this.img.src.includes('G15')) {
      this.moveUp(30);
    }
    if (this.nextToCharacter()) {
      this.attack();
    } else {
      if (this.images == this.IMAGES.ATTACK) {
        this.images = this.IMAGES.WALKING;
      }
    }
  }

  walkLeft() {
    this.moveLeft();
    this.sound_walking.play();
  }

  walkRight() {
    this.moveRight();
    this.sound_walking.play();
  }

  /**
   * Switches between the walking and the flying animation of the endboss.
   */
  switchAnimations() {
    if (this.images == this.IMAGES.WALKING && new Date().getTime() - this.startedWalking > 1500) {
      this.currentImage = 0;
      this.images = this.IMAGES.ATTENTION;
    }
    if (this.img.src.includes('G12') && this.imageRepetitions == 2) {
      this.currentImage = 0;
      this.startedWalking = new Date().getTime();
      this.images = this.IMAGES.WALKING;
    }
  }

  /**
   * Turns the endboss around so that it is always watching the character.
   */
  turnAround() {
    if (this.notWatchingCharacter()) {
      if (this.changeDirection) {
        this.changeDirection = false;
      } else {
        this.changeDirection = true;
      }
    }
  }

  /**
   * Checks if the endboss is not watching the character.
   * @returns {Boolean}
   */
  notWatchingCharacter() {
    return (
      (this.x + 0.5 * this.width < this.gameCharacter.x && !this.changeDirection) ||
      (this.x + 0.5 * this.width > this.gameCharacter.x + this.gameCharacter.width && this.changeDirection)
    );
  }

  /**
   * Moves the enbosses lifebar depending on the endbosses position.
   */
  moveEndbossBar() {
    this.lifeBar.setDimensions(this);
  }

  /**
   * Checks if the character is close to the endboss.
   * @returns {Boolean}
   */
  nearCharacter() {
    return (
      this.gameCharacter.x + this.gameCharacter.width > this.x - this.worldCanvas.width &&
      this.gameCharacter.x < this.x + this.width + this.worldCanvas.width
    );
  }

  /**
   * Checks if the character ist next to the endboss.
   * @returns {Boolean}
   */
  nextToCharacter() {
    return (
      this.x - (this.gameCharacter.x + this.gameCharacter.width) < 0.2 * this.worldCanvas.width &&
      -(this.x + this.width - this.gameCharacter.x) < 0.2 * this.worldCanvas.width
    );
  }

  attack() {
    if (this.images != this.IMAGES.ATTACK) {
      this.currentImage = 0;
    }
    this.images = this.IMAGES.ATTACK;
  }

  dyingAnimation() {
    let enbossInterval_2 = setInterval(() => {
      this.moveRight();
    }, 80);
    intervals.push(enbossInterval_2);
    if (!this.img.src.includes('Muerte')) {
      this.gameCharacter.gameOverTime = Date.now();
      this.gameCharacter.world.gameOver = 'won';
      this.currentImage = 0;
    }
    this.playAnimation(this.IMAGES.DEAD);
    if (this.currentImage > 2) {
      this.currentImage = 2;
    }
  }
}
