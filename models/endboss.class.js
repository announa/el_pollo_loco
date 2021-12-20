class Endboss extends MovableObject {
  name = 'Senora Gallina';
  startedWalking = 0;
  lifeBar;
  world;
  animationInterval;

  constructor(worldCanvas, bgImgAmount, IMAGES, AUDIOS) {
    super(worldCanvas);
    super.setImages(IMAGES.ENDBOSS, IMAGES.ENDBOSS.WALKING);
    super.loadImage(this.IMAGES.WALKING[0]);
    super.setSounds(AUDIOS)
    this.setDimensions(bgImgAmount);
    this.lifeBar = new StatusBar(this.worldCanvas, IMAGES.STATUSBARS.LIFEBAR, 100, null, this);
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
        this.stopSound(this.SOUNDS.WALKING);
        this.startAnimation();
      }
    }, 100);
    intervals.push(endbossInterval);
  }

  /**
   * checks the different endboss events and changes the animation depending on them.
   */
  startAnimation() {

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
    this.playSound(this.SOUNDS.WALKING);
  }

  walkRight() {
    this.moveRight();
    this.playSound(this.SOUNDS.WALKING);
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
      (this.x + 0.5 * this.width < this.world.character.x && !this.changeDirection) ||
      (this.x + 0.5 * this.width > this.world.character.x + this.world.character.width && this.changeDirection)
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
      this.world.character.x + this.world.character.width > this.x - this.worldCanvas.width &&
      this.world.character.x < this.x + this.width + this.worldCanvas.width
    );
  }

  /**
   * Checks if the character ist next to the endboss.
   * @returns {Boolean}
   */
  nextToCharacter() {
    return (
      this.x - (this.world.character.x + this.world.character.width) < 0.2 * this.worldCanvas.width &&
      -(this.x + this.width - this.world.character.x) < 0.2 * this.worldCanvas.width
    );
  }

  attack() {
    if (this.images != this.IMAGES.ATTACK) {
      this.currentImage = 0;
    }
    this.images = this.IMAGES.ATTACK;
    if(this.img.src.includes('G13')){
      this.playSound(this.SOUNDS.ANGRY)
      this.playSound(this.SOUNDS.FLY)
    }
  }

  dyingAnimation() {
    let enbossInterval_2 = setInterval(() => {
      this.moveRight();
    }, 80);
    intervals.push(enbossInterval_2);
    if (!this.img.src.includes('Muerte')) {
      this.world.gameOver = 'won';
      this.world.character.gameOverTime = Date.now();
      this.currentImage = 0;
      this.playSound(this.SOUNDS.HURT);
    }
    this.playAnimation(this.IMAGES.DEAD);
    if (this.currentImage > 2) {
      this.currentImage = 2;
    }
  }
}
