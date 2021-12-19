class World {
  lastKeyEvent;
  character;
  bottlesAmount;
  coinsAmount;
  lastThrownBottle;
  level;
  ctx;
  keyboard;
  camera_X = 0;
  gameOver = false;
  gameOverTime = 0;
  coin_10;
  animationFrame;
  sound_theme;

  constructor(worldCanvas, keyboard, createdLevel, worldSize, IMAGES, IMAGES2, AUDIOS) {
    this.worldCanvas = worldCanvas;
    this.character = new Character(worldCanvas, IMAGES, AUDIOS);
    this.level = createdLevel;
    this.keyboard = keyboard;
    this.character.world = this;
    this.level.endboss.world = this;
    this.level.enemies.forEach((e) => (e.world = this));
    this.bottlesAmount = this.level.bottlesOnTheGround.length;
    this.coinsAmount = this.level.coins.length;
    this.coin_10 = new Coin(worldCanvas, worldSize, IMAGES2, AUDIOS.COINS, true);
    this.coin_10.hide = true;
    this.ctx = canvas.getContext('2d');
    this.checkEvents();
    this.setSounds(AUDIOS.BACKGROUND);
    this.sound_theme.play();
  }

  setSounds(AUDIO) {
    this.sound_theme = new Audio(AUDIO.THEME.AUDIO);
    this.sound_theme.volume = AUDIO.THEME.VOLUME;
  }

  /**
   * Initiates the drawing of the canvas-objects. First clears the canvas before drawing.
   */
  draw() {
    if (playing) {
      this.ctx.clearRect(0, 0, this.worldCanvas.width, this.worldCanvas.height);
      this.initObjectRendering();
      this.drawInformation();
      let self = this;
      this.animationFrame = requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * Renders the world objects which will be drawn to the canvas. Sets the drawing-translation by means of the camera_X variable which depends on the character-position.
   */
  initObjectRendering() {
    if (!this.gameOver) {
      this.camera_X = -this.character.x + 0.07 * this.worldCanvas.width;
      if (this.camera_X < -(this.level.level_end_x - 0.8 * this.worldCanvas.width)) {
        this.camera_X = -(this.level.level_end_x - 0.8 * this.worldCanvas.width);
      }
    }
    this.ctx.translate(this.camera_X, 0);
    this.renderFlexibleObjects();
    this.ctx.translate(-this.camera_X, 0);
    this.renderStaticObjects();
  }

  /**
   * Renders the moving objects in the necessary order.
   */
  renderFlexibleObjects() {
    [this.level.backgroundObjects, this.level.clouds].forEach((e) => this.addObjectToWorld(e));
    [this.level.endboss, this.coin_10, this.character].forEach((e) => this.renderObjects(e));
    [this.level.enemies, this.level.bottlesOnTheGround, this.level.coins, this.character.thrownBottles].forEach((e) =>
      this.addObjectToWorld(e)
    );
    if (!this.level.endboss.isDead()) {
      this.renderObjects(this.level.endboss.lifeBar);
    }
  }

  renderStaticObjects() {
    [this.character.lifeBar, this.character.bottleBar, this.character.coinBar].forEach((e) => this.renderObjects(e));
  }

  addObjectToWorld(object) {
    object.forEach((obj) => {
      this.renderObjects(obj);
    });
  }

  /**
   * Checks the object direction and initiates the drawing of the object.
   * @param {object} object - The object to be painted to the canvas
   */
  renderObjects(object) {
    if (object.changeDirection) {
      this.flipImage(object);
    }
    this.drawImage(object);
    /* this.drawBorder(object); */
    if (object.changeDirection) {
      this.flipImageBack(object);
    }
  }

  /**
   * Draws the current object to the canvas. Checks if the object is visible and not destroyed.
   * @param {object} obj - The current object that will be drawn.
   */
  drawImage(obj) {
    if (!obj.hide && ((!obj.destroyed && this.isVisible(obj)) || obj instanceof StatusBar)) {
      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }
  }

  /**
   * Draws the life-, bottle- and coin numbers next to the corresponding bar.
   */
  drawInformation() {
    let fontSize = this.worldCanvas.height / 250;
    this.ctx.font = `${fontSize}rem Alegreya Sans`;
    this.ctx.fillStyle = '#a0220a';
    let lifeBar = this.character.lifeBar;
    let bottleBar = this.character.bottleBar;
    let coinBar = this.character.coinBar;
    this.ctx.fillText(this.character.energy, lifeBar.x + 1.05 * lifeBar.width, 1.4 * lifeBar.height);
    this.ctx.fillText(this.character.collectedBottles, bottleBar.x + 1.05 * bottleBar.width, 1.4 * bottleBar.height);
    this.ctx.fillText(this.character.collectedCoins, coinBar.x + 1.05 * coinBar.width, 1.4 * coinBar.height);
  }

  /**
   * Checks if the current object coordinates are within the visible section.
   * @param {object} obj - The current object that shall be rendered.
   * @returns {boolean}
   */
  isVisible(obj) {
    return !(
      (!obj.changeDirection &&
        (-this.camera_X > obj.x + obj.width || -this.camera_X + this.worldCanvas.width < obj.x)) ||
      (obj.changeDirection && (this.camera_X < obj.x - obj.width || this.camera_X - this.worldCanvas.width > obj.x))
    );
  }

  /*     drawBorder(obj) {
    if (obj instanceof MovableObject || obj instanceof BottleOnTheGround || obj instanceof Coin) {
      this.ctx.beginPath();
      this.ctx.lineWidth = '2px';
      this.ctx.strokeStyle = 'blue';
      if (obj instanceof Chick) {
        this.ctx.rect(obj.x + 0.1 * obj.width, obj.y + 0.1 * obj.height, 0.8 * obj.width, 0.8 * obj.height);
      } else if (obj instanceof Endboss) {
        this.ctx.rect(obj.x + 0.05 * obj.width, obj.y + 0.2 * obj.height, 0.85 * obj.width, 0.7 * obj.height);
      } else if (obj instanceof Character) {
        this.ctx.rect(obj.x + 0.18 * obj.width, obj.y + 0.4 * obj.height, 0.55 * obj.width, 0.55 * obj.height);
      } else if (obj instanceof BottleOnTheGround) {
        this.ctx.rect(obj.x + 0.35 * obj.width, obj.y + 0.2 * obj.height, 0.4 * obj.width, 0.7 * obj.height);
      } else if (obj instanceof Coin) {
        this.ctx.rect(obj.x + 0.35 * obj.width, obj.y + 0.35 * obj.height, 0.3 * obj.width, 0.3 * obj.height);
      } else if (obj instanceof ThrownBottle) {
        this.ctx.rect(obj.x + 0.25 * obj.width, obj.y + 0.25 * obj.height, 0.5 * obj.width, 0.5 * obj.height);
      }
      this.ctx.stroke();
    }
  } */

  /**
   * Flips the image --> when objects change their direction.
   * @param {object} obj - The current object that shall be rendered.
   */
  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x *= -1;
  }

  flipImageBack(obj) {
    obj.x *= -1;
    this.ctx.restore();
  }

  /* ------------  EVENT CHECK  ------------ */

  checkEvents() {
    let worldInterval = setInterval(() => {
      if (playing && pause) {
        this.sound_theme.pause();
      }
      if (!pause) {
        this.sound_theme.play();
        this.checkForThrownBottle();
        this.checkForCollisions();
        this.checkIf10Coins();
        this.checkIfGameOver();
      }
    }, 1000 / 25);
    intervals.push(worldInterval);
  }

  /**
   * Checks if the character throws a bottle (on user keypress D) and initiates throwing if the timespan since the last thrown bottle amount to at least 200ms. If so, creates a new ThrownBottle instance and initiates the deletion of the same instance.
   */
  checkForThrownBottle() {
    if (this.keyboard.D) {
      if ((!this.lastThrownBottle || this.timeSinceLastThrownBottle() > 200) && this.character.collectedBottles > 0) {
        this.lastThrownBottle = new Date().getTime();
        this.character.throwBottle();
        this.deleteThrownBottles();
      }
    }
  }

  timeSinceLastThrownBottle() {
    return new Date().getTime() - this.lastThrownBottle;
  }

  checkIfGameOver() {
    if (this.gameOver) {
      this.sound_theme.pause();
    }
    if (this.character.gameOverTime - Date.now() < -1500 && !world.character.isAboveGround(world.character.y_landing)) {
      if (this.gameOver == 'won') {
        this.character.playSound(this.character.SOUNDS.WON);
      } else {
        this.character.playSound(this.character.SOUNDS.LOST);
      }
      gameOver();
    }
  }

  /* COLLISION CHECKS */

  checkForCollisions() {
    if (!this.gameOver) {
      this.checkChickenCollisions();
      this.characterCollidesWith(this.level.endboss);
      this.checkThrownBottleCollision(this.level.endboss);
      this.checkBottleOnTheGroundCollisions();
      this.checkCoinCollisions();
    }
  }

  /**
   * Initiates the check of collisions of chicken or chicks with the character or a thrown bottle.
   */
  checkChickenCollisions() {
    this.level.enemies.forEach((enemy, index, arr) => {
      this.characterCollidesWith(enemy, index, arr);
      this.checkThrownBottleCollision(enemy, index, arr);
    });
  }

  /**
   * Checks all the possible collisions of the character with other world objects.
   * @param {object} collisionObject - The current object that has to be checked for a collision with the character.
   * @param {number} index - The collisionObject index in its array.
   * @param {array} arr - The array that contains the collisionObject
   */
  characterCollidesWith(collisionObject, index, arr) {
    let characterIsColliding = this.character.isColliding(collisionObject);

    if (characterIsColliding && (collisionObject instanceof BottleOnTheGround || collisionObject instanceof Coin)) {
      this.character.collectObject(collisionObject, index, arr);
    } else if (characterIsColliding == 'hurt' && collisionObject instanceof Chick) {
      this.character.getHurt(1);
    } else if (
      (characterIsColliding == 'hurt' && collisionObject instanceof Chicken) ||
      (characterIsColliding == 'hurt' && collisionObject instanceof Endboss)
    ) {
      this.character.getHurt(3);
    } else if (characterIsColliding == 'beat enemy' && collisionObject instanceof Chicken) {
      this.character.moveUp(20);
      this.enemyDies(collisionObject, index, arr);
    }
  }

  /**
   * Checks if a thrown bottle collides with an enemy (Chicken||Chick||Endboss)
   * @param {Chicken||Chick||Endboss} enemy - The enemy-object that has to be checked for a collision with a thrown bottle.
   * @param {number} index - The enemys index in its array.
   * @param {array} arr - The array that contains the enemy-object.
   */
  checkThrownBottleCollision(enemy, index, arr) {
    this.character.thrownBottles.forEach((bottle) => {
      if (!bottle.explode) {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Chicken) {
            this.enemyDies(enemy, index, arr);
          } else {
            this.level.endboss.getHurt(20 - 5 * (this.level.levelNo - 1));
          }
          bottle.explode = true;
        }
      }
    });
  }

  /**
   * Initiates the check for the collision between the character an a bottle on the ground.
   */
  checkBottleOnTheGroundCollisions() {
    this.level.bottlesOnTheGround.forEach((bottle, index, arr) => {
      this.characterCollidesWith(bottle, index, arr);
    });
  }

  /**
   * Initiates the check for the collision between the character an a coin.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index, arr) => {
      this.characterCollidesWith(coin, index, arr);
    });
  }

  /**
   * Checks if the character has collected 10 coins. If so, runs the coin animation and initiates the recalculation of the life- and coinbar in the character-object.
   */
  checkIf10Coins() {
    if (this.character.collectedCoins == 10) {
      this.coin_10.hide = false;
      this.coin_10.play10CoinsSound();
      this.showCoinAnimation();
      this.character.has10Coins();
      if (this.coin_10.y + this.coin_10.height < 0) {
        this.coin_10.hide = true;
        this.coin_10.y = 0.5 * this.worldCanvas.height;
      }
    }
  }

  /**
   * Shows an animation of a moving coin.
   */
  showCoinAnimation() {
    this.coin_10.x = this.character.x;
    this.coin_10.y -= 0.03 * this.worldCanvas.height;
  }

  /* DELETE OBJECTS */

  /**
   * Removes the thrown bottles a after 2s from the thrown bottle-array.
   */
  deleteThrownBottles() {
    setTimeout(() => {
      this.character.thrownBottles.splice(0, 1);
    }, 2000);
  }

  /**
   * Removes a beaten enemy-object from its array and clears its animation-interval.
   * @param {Chicken||Chick} enemy - The enemy object that has been beaten by the character.
   * @param {number} index - The enemys index in its array.
   * @param {array} arr - The array that contains the enemy-object.
   */
  enemyDies(enemy, index, enemiesArray) {
    enemy.alive = false;
    enemy.playSound(enemy.SOUNDS.HURT);
    setTimeout(() => {
      clearInterval(enemy.chickenInterval);
      enemiesArray.splice(index, 1);
    }, 500);
  }
}
