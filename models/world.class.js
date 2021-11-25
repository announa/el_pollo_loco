class World {
  worldCanvas;
  character;
  lifeBar;
  bottleBar;
  endbossBar;
  bottlesAmount;
  collectedBottles = 5;
  thrownBottles = [];
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
    this.lifeBar = new StatusBar(worldCanvas, 'life');
    this.bottleBar = new StatusBar(worldCanvas, 'bottles');
    this.endbossBar = new StatusBar(worldCanvas, 'endboss', this.level.endboss);
    this.level.endboss.lifeBar = this.endbossBar;
    this.level.endboss.gameCharacter = this.character;
    this.bottlesAmount = this.level.bottlesOnTheGround.length;
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
    this.addObjectToWorld(this.level.backgroundObjects);
    /* this.addObjectToWorld(this.level.clouds); */
    this.renderObjects(this.character);
    this.addObjectToWorld(this.level.enemies);
    this.addObjectToWorld(this.level.bottlesOnTheGround);
    if (!this.level.endboss.isDead()) {
      this.renderObjects(this.endbossBar);
    }
    this.renderObjects(this.level.endboss);
    this.addObjectToWorld(this.thrownBottles);
    this.ctx.translate(-this.camera_X, 0);
    this.renderObjects(this.lifeBar);
    this.renderObjects(this.bottleBar);
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
    this.drawBorder(object);
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

  drawBorder(obj) {
    if (obj instanceof MovableObject || obj instanceof BottleOnTheGround) {
      this.ctx.beginPath();
      this.ctx.lineWidth = '2px';
      this.ctx.strokeStyle = 'blue';
      if (obj instanceof Chicken) {
        this.ctx.rect(obj.x, obj.y, obj.width, obj.height);
      } else if (obj instanceof Endboss) {
        this.ctx.rect(obj.x + 0.05 * obj.width, obj.y + 0.2 * obj.height, 0.85 * obj.width, 0.7 * obj.height);
      } else if (obj instanceof Character) {
        this.ctx.rect(obj.x + 0.18 * obj.width, obj.y, 0.55 * obj.width, 0.95 * obj.height);
      } else if (obj instanceof BottleOnTheGround) {
        this.ctx.rect(obj.x + 0.35 * obj.width, obj.y + 0.2 * obj.height, 0.4 * obj.width, 0.7 * obj.height);
      } else if (obj instanceof ThrownBottle) {
        this.ctx.rect(obj.x + 0.25 * obj.width, obj.y + 0.25 * obj.height, 0.5 * obj.width, 0.5 * obj.height);
      }
      this.ctx.stroke();
    }
  }

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
      if (this.timeSinceLastThrownBottle() > 200 && this.collectedBottles > 0) {
        this.lastThrownBottle = new Date().getTime();
        this.throwBottle();
        this.deleteThrownBottles();
      }
    }
  }

  /* COLLISION CHECKS */

  checkForCollisions() {
    this.checkChickenCollisions();
    this.checkBottleOnTheGroundCollisions();
    this.characterCollidesWith(this.level.endboss);
    this.checkThrownBottleCollision(this.level.endboss);
  }

  checkChickenCollisions() {
    this.level.enemies.forEach((enemy, index, arr) => {
      if (!this.character.isDead()) {
        this.characterCollidesWith(enemy, index, arr);
      }
      this.checkThrownBottleCollision(enemy, index, arr);
    });
  }

  checkBottleOnTheGroundCollisions() {
    this.level.bottlesOnTheGround.forEach((bottle, index) => {
      this.characterCollidesWith(bottle, index);
    });
  }

  characterCollidesWith(collisionObject, index, arr) {
    let characterIsColliding = this.character.isColliding(collisionObject);

    if (characterIsColliding && collisionObject instanceof BottleOnTheGround) {
      this.collectBottle(index);
    } else if (
      (characterIsColliding == 'hurt' && collisionObject instanceof Chicken) ||
      (characterIsColliding == 'hurt' && collisionObject instanceof Endboss)
    ) {
      this.characterGetsHurt();
    } else if (characterIsColliding == 'beat enemy' && collisionObject instanceof Chicken) {
      this.characterKillsChicken(collisionObject, index, arr);
    }
  }

  checkThrownBottleCollision(enemy, index, arr) {
    this.thrownBottles.forEach((bottle) => {
      if (bottle.isColliding(enemy)) {
        if (enemy instanceof Chicken) {
          this.beatEnemy(enemy, index, arr);
        } else {
          this.hurtEndboss();
        }
        bottle.explode = true;
      }
    });
  }

  /* CHARACTER ACTIONS */

  collectBottle(index) {
    this.collectedBottles += 1;
    this.level.bottlesOnTheGround.splice(index, 1);
    this.bottleBar.updateStatusBar(this.percentageBottleBar(), 'bottles');
  }

  characterGetsHurt() {
    this.character.looseEnergy(2.5);
    this.lifeBar.updateStatusBar(this.character.energy, 'life');
  }

  characterKillsChicken(collisionObject, index, arr) {
    this.character.jump(20);
    this.beatEnemy(collisionObject, index, arr);
  }

  /* THROW BOTTLE */

  timeSinceLastThrownBottle() {
    return new Date().getTime() - this.lastThrownBottle;
  }

  throwBottle() {
    if (this.collectedBottles > 0) {
      this.thrownBottles.push(this.createThrownBottle());
      this.collectedBottles -= 1;
      this.bottleBar.updateStatusBar(this.percentageBottleBar(), 'bottles');
    }
  }

  createThrownBottle() {
    let bottle_x = this.character.x + 0.4 * this.character.width;
    let bottle_y = this.character.y + 0.5 * this.character.height;
    let bottle_startspeed_x = this.character.detectCharacterSpeed();
    let bottle = new ThrownBottle(
      this.worldCanvas,
      bottle_x,
      bottle_y,
      bottle_startspeed_x,
      this.character.changeDirection
    );
    return bottle;
  }

  deleteThrownBottles() {
    setTimeout(() => {
      this.thrownBottles.splice(0, 1);
    }, 2000);
  }

  percentageBottleBar() {
    return (this.collectedBottles / this.bottlesAmount) * 100;
  }

  /* BEAT ENEMIES */

  beatEnemy(enemy, index, enemiesArray) {
    enemy.alive = false;
    setTimeout(() => {
      enemiesArray.splice(index, 1);
    }, 500);
  }

  hurtEndboss() {
    this.level.endboss.looseEnergy(20);
    this.endbossBar.updateStatusBar(this.level.endboss.energy, 'life');
  }
}
