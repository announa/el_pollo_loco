class World {
  worldCanvas;
  character;
  bottlesAmount;
  coinsAmount;
  lastThrownBottle = 0;
  level = level1;
  ctx;
  keyboard;
  camera_X = 0;

  constructor(worldCanvas, keyboard) {
    this.worldCanvas = worldCanvas;
    this.keyboard = keyboard;
    this.character = new Character(worldCanvas);
    this.character.world = this;
    this.level.endboss.gameCharacter = this.character;
    this.bottlesAmount = this.level.bottlesOnTheGround.length;
    this.coinsAmount = this.level.coins.length;
    this.ctx = canvas.getContext('2d');
    this.draw();
    this.checkEvents();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.worldCanvas.width, this.worldCanvas.height);
    this.initObjectRendering();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  initObjectRendering() {
    this.ctx.translate(this.camera_X, 0);
    this.renderFlexibleObjects();
    this.ctx.translate(-this.camera_X, 0);
    this.renderStaticObjects();
  }

  renderFlexibleObjects() {
    [this.level.backgroundObjects, this.level.clouds].forEach((e) => this.addObjectToWorld(e));
    [this.character, this.level.endboss].forEach((e) => this.renderObjects(e));
    [this.level.enemies, this.level.bottlesOnTheGround, this.level.coins, this.character.thrownBottles].forEach((e) => this.addObjectToWorld(e));
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

  renderObjects(object) {
    if (object.changeDirection) {
      this.flipImage(object);
    }
    this.drawImage(object);
/*     this.drawBorder(object); */
    if (object.changeDirection) {
      this.flipImageBack(object);
    }
  }

  drawImage(obj) {
    if ((!obj.destroyed && this.isVisible(obj)) || obj instanceof StatusBar || obj instanceof Character) {
      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }
  }

  isVisible(obj) {
    return !(-this.camera_X > obj.x + obj.width || -this.camera_X + this.worldCanvas.width < obj.x);
  }

/*   drawBorder(obj) {
    if (obj instanceof MovableObject || obj instanceof BottleOnTheGround || obj instanceof Coin) {
      this.ctx.beginPath();
      this.ctx.lineWidth = '2px';
      this.ctx.strokeStyle = 'blue';
      if (obj instanceof Chicken) {
        this.ctx.rect(obj.x, obj.y, obj.width, obj.height);
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

  checkEvents() {
    setInterval(() => {
      this.checkForCollisions();
      this.checkForThrownBottle();
    }, 1000 / 25);
  }

  checkForThrownBottle() {
    if (this.keyboard.D) {
      if (this.timeSinceLastThrownBottle() > 200 && this.character.collectedBottles > 0) {
        this.lastThrownBottle = new Date().getTime();
        this.character.throwBottle();
        this.deleteThrownBottles();
      }
    }
  }

  timeSinceLastThrownBottle() {
    return new Date().getTime() - this.lastThrownBottle;
  }

  /* COLLISION CHECKS */

  checkForCollisions() {
    this.checkChickenCollisions();
    this.characterCollidesWith(this.level.endboss);
    this.checkThrownBottleCollision(this.level.endboss);
    this.checkBottleOnTheGroundCollisions();
    this.checkCoinCollisions();
  }

  checkChickenCollisions() {
    this.level.enemies.forEach((enemy, index, arr) => {
      if (!this.character.isDead()) {
        this.characterCollidesWith(enemy, index, arr);
      }
      this.checkThrownBottleCollision(enemy, index, arr);
    });
  }

  characterCollidesWith(collisionObject, index, arr) {
    let characterIsColliding = this.character.isColliding(collisionObject);

    if (characterIsColliding && (collisionObject instanceof BottleOnTheGround || collisionObject instanceof Coin)) {
      this.character.collectObject(collisionObject, index, arr);
    } else if (
      (characterIsColliding == 'hurt' && collisionObject instanceof Chicken) ||
      (characterIsColliding == 'hurt' && collisionObject instanceof Endboss)
    ) {
      this.character.getHurt(2.5, 'life');
    } else if (characterIsColliding == 'beat enemy' && collisionObject instanceof Chicken) {
      this.character.jump(20);
      this.enemyDies(collisionObject, index, arr);
    }
  }

  checkThrownBottleCollision(enemy, index, arr) {
    this.character.thrownBottles.forEach((bottle) => {
      if (!bottle.explode) {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Chicken) {
            this.enemyDies(enemy, index, arr);
          } else {
            this.level.endboss.getHurt(20, 'life');
          }
          bottle.explode = true;
        }
      }
    });
  }

  checkBottleOnTheGroundCollisions() {
    this.level.bottlesOnTheGround.forEach((bottle, index, arr) => {
      this.characterCollidesWith(bottle, index, arr);
    });
  }

  checkCoinCollisions(){
    this.level.coins.forEach((coin, index, arr) => {
      this.characterCollidesWith(coin, index, arr);
    })
  }

  /* DELETE OBJECTS */

  deleteThrownBottles() {
    setTimeout(() => {
      this.character.thrownBottles.splice(0, 1);
    }, 2000);
  }

  enemyDies(enemy, index, enemiesArray) {
    enemy.alive = false;
    setTimeout(() => {
      enemiesArray.splice(index, 1);
    }, 500);
  }
}
