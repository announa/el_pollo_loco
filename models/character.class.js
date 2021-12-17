class Character extends MovableObject {
  name = 'Pepe Peligroso';
  lifeBar;
  bottleBar;
  coinBar;
  collectedBottles = 0;
  collectedCoins = 0;
  thrownBottles = [];
  sound_walking = new Audio('./audio/walking.mp3');
  world;
  gameOverTime;

  constructor(worldCanvas, IMAGES) {
    super(worldCanvas);
    super.setImages(IMAGES.CHARACTER);
    super.loadImage(this.IMAGES.IDLE[0]);
    this.setDimensions();
    this.lifeBar = new LifeBar(worldCanvas, IMAGES.STATUSBARS.LIFEBAR);
    this.bottleBar = new BottleBar(worldCanvas, IMAGES.STATUSBARS.BOTTLEBAR);
    this.coinBar = new CoinBar(worldCanvas, IMAGES.STATUSBARS.COINBAR);
    this.sound_walking.volume = 0.5;

    this.applyGravity(200);
    this.animate();
  }

  /**
   * Sets the characters dimensions which depend on the canvas size.
   */
  setDimensions() {
    this.x = 0.2 * this.worldCanvas.width;
    this.y = 0.31 * this.worldCanvas.height;
    this.height = 0.6 * this.worldCanvas.height;
    this.width = 0.3 * this.worldCanvas.height;
    this.y_landing = 0.31 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 100;
  }

  /**
   * Hands the parameters for calculating the characters collision coordinates to setCollisionCoordinates().
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
   * Initiates the character animation when the game is not paused and pushes the animation-interval to the intervals-array.
   */
  animate() {
    let characterInterval = setInterval(() => {
      if (!pause) {
        this.startAnimation();
      }
    }, 1000 / 60);
    intervals.push(characterInterval);
  }

  /**
   * checks the different character events and changes the animation depending on them.
   */
  startAnimation() {
    this.sound_walking.pause();
    if (this.isDead()) {
      this.dyingAnimation();
    } else if (this.world.gameOver == 'won' && this.x + 0.75 * this.worldCanvas.width < this.world.level.endboss.x) {
      this.won();
    } else {
      this.checkForIdle();
      this.checkIfWalking();
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES.HURT, 6);
      }
      this.checkIfJumping();
    }
  }

  /**
   * Checks if the character won the game and shows the winning-animation.
   */
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

  /**
   * Checks if for at leat 1s (idle )or 5s (long idle) there has been no user input and changes the animation.
   */
  checkForIdle() {
    this.playAnimation([this.IMAGES.IDLE[0]], 30);
    if (Date.now() - this.world.lastKeyEvent > 1000) {
      this.playAnimation(this.IMAGES.IDLE, 30);
    }
    if (!this.world.lastKeyEvent || Date.now() - this.world.lastKeyEvent > 5000) {
      this.playAnimation(this.IMAGES.LONG_IDLE, 30);
    }
  }

  /**
   * Checks if the character is walking and in which direction and if the character is within its movment limits.
   */
  checkIfWalking() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.walkRight();
    }
    if (this.world.keyboard.LEFT && this.x > 0.2 * this.worldCanvas.width) {
      this.walkLeft();
    }
  }

  /**
   * Checks if the character shall jump (on keypress arrow up) and shows the jumping-animation.
   */
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
      this.playAnimation(this.IMAGES.WALKING, 3);
      this.sound_walking.play();
    }
  }

  walkLeft() {
    this.changeDirection = true;
    this.moveLeft();
    if (!this.isAboveGround(this.y_landing)) {
      this.playAnimation(this.IMAGES.WALKING, 3);
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
      this.playAnimation(this.IMAGES.JUMPING, 11);
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
    this.playAnimation(this.IMAGES.DEAD, 5);
  }

  /**
   * Checks if the collision object is a Coin or a BottleOnTheGround, reduces its amount and removes it from its array.Updates the corresponding characters statusbar.
   * @param {Coin||BottleOnTheGround} collisionObject - The current object the character collects
   * @param {number} index - The objects index in its array.
   * @param {array} arr - The array that contains the object.
   */
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

  /**
   * Initiates the creation of a new ThrownBottle-instance, reduces the amount of collected bottles and updates the characters bottlebar.
   */
  throwBottle() {
    if (this.collectedBottles > 0) {
      this.thrownBottles.push(this.createThrownBottle());
      this.collectedBottles -= 1;
      this.bottleBar.updateStatusBar(this.percentageBottleBar());
    }
  }

  /**
   * Creates a new ThrownBottle-instance and returns it.
   * @returns {ThrownBottle}
   */
  createThrownBottle() {
    let bottle_x = this.x + 0.4 * this.width;
    let bottle_y = this.y + 0.5 * this.height;
    let bottle_startspeed_x = this.detectCharacterSpeed();
    let bottle = new ThrownBottle(
      this.worldCanvas,
      bottle_x,
      bottle_y,
      bottle_startspeed_x,
      this.changeDirection,
      IMAGES.BOTTLES.THROWN
    );
    return bottle;
  }

  percentageBottleBar() {
    return (this.collectedBottles / this.world.bottlesAmount) * 100;
  }

  percentageCoinBar() {
    return (this.collectedCoins / this.world.coinsAmount) * 100;
  }

  /**
   * Checks if character is moving and if so, returns his speed for adding it to the speed of the ThrownBottle.
   * @returns number - The actual speed of character.
   */
  detectCharacterSpeed() {
    if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
      return this.moveX;
    } else {
      return 0;
    }
  }

  /**
   * Is called when the character collects 10 coins. Adds 20% to the characters nergy and sets his collectedCoins to 0. Calls the highlighting-animation of lifebar and coinbar.
   */
  has10Coins() {
    this.energy += 20;
    this.collectedCoins = 0;
    this.lifeBar.highlightStatusBar(this.energy);
    this.coinBar.highlightStatusBar(this.percentageCoinBar());
  }
}
