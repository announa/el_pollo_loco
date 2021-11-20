class World {
  worldCanvas;
  character;
  lifeBar;
  bottleBar;
  bottlesAmount;
  collectedBottles = 0;
  thrownBottles = [];
  lastThrownBottle = 0;
  level = level1;
  ctx;
  keyboard;
  camera_X = 0;

  constructor(worldCanvas, keyboard) {
    this.keyboard = keyboard;
    this.worldCanvas = worldCanvas;
    this.character = new Character(worldCanvas);
    this.character.world = this;
    this.lifeBar = new StatusBar(worldCanvas, 'life');
    this.bottleBar = new StatusBar(worldCanvas, 'bottles');
    this.bottlesAmount = this.level.bottlesOnTheGround.length;
    this.ctx = canvas.getContext('2d');
    this.draw();
    this.checkEvents();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.worldCanvas.width, this.worldCanvas.height);

    this.ctx.translate(this.camera_X, 0);
    this.addObjectToWorld(this.level.backgroundObjects);
    this.addObjectToWorld(this.level.clouds);

    this.ctx.translate(-this.camera_X, 0);
    this.renderObjects(this.lifeBar);
    this.renderObjects(this.bottleBar);
    this.ctx.translate(this.camera_X, 0);

    this.renderObjects(this.character);
    this.addObjectToWorld(this.level.enemies);
    this.addObjectToWorld(this.level.bottlesOnTheGround);
    this.renderObjects(this.level.endboss);
    if (this.thrownBottles) {
      this.addObjectToWorld(this.thrownBottles);
    }
    this.ctx.translate(-this.camera_X, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
  }

  drawBorder(obj) {
    if (obj instanceof Character || obj instanceof Chicken || obj instanceof BottleOnTheGround) {
      this.ctx.beginPath();
      this.ctx.lineWidth = '2px';
      this.ctx.strokeStyle = 'blue';
      if (obj instanceof Chicken) {
        this.ctx.rect(obj.x, obj.y, obj.width, obj.height);
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

  checkForCollisions() {
    this.level.enemies.forEach((enemy, index, arr) => {
      this.checkCharacterCollision(enemy, index, arr);
      this.checkBottleCollision(enemy, index, arr);
    });
    this.level.bottlesOnTheGround.forEach((bottle, index) => {
      this.checkCharacterCollision(bottle, index);
    });
  }

  checkCharacterCollision(collisionObject, index, arr) {
    let collisionCheck = this.character.isColliding(collisionObject);
    if (collisionCheck && collisionObject instanceof BottleOnTheGround) {
      this.collectedBottles += 1;
      this.level.bottlesOnTheGround.splice(index, 1);
      this.bottleBar.updateStatusBar(this.percentageBottlBar(), 'bottles');
    } else if (collisionCheck == 'hurt' && collisionObject instanceof Chicken) {
      console.log('collsion - hurt!');
      this.character.looseEnergy();
      this.lifeBar.updateStatusBar(this.character.energy, 'life');
    } else if (collisionCheck == 'beat enemy' && collisionObject instanceof Chicken) {
      this.character.jump(this.worldCanvas);
      this.beatEnemy(collisionObject, index, arr);
    }
  }

  percentageBottlBar() {
    return (this.collectedBottles / this.bottlesAmount) * 100;
  }

  checkBottleCollision(enemy, index, arr) {
    this.thrownBottles.forEach((bottle) => {
      if (bottle.isColliding(enemy)) {
        console.log('bottle colliding enemy')
        this.beatEnemy(enemy, index, arr);
        bottle.explode = true;
      }
    });
  }

  checkforCollectedBottle() {
    if (this.character.isColliding(this.level.bottlesOnTheGround)) {
      this.collectedBottle();
    }
  }

  checkForThrownBottle() {
    if (this.keyboard.D) {
      if (this.timeSinceLastThrownBottle() > 200 && this.collectedBottles > 0) {
        this.lastThrownBottle = new Date().getTime();
        this.throwBottle();
        /* let bottleIndex = this.thrownBottles.length - 1;
        console.log(bottleIndex); */
        console.log(this.thrownBottles);
        this.deleteThrownBottles();
      }
    }
  }

  timeSinceLastThrownBottle() {
    return new Date().getTime() - this.lastThrownBottle;
  }

  throwBottle() {
    if (this.collectedBottles > 0) {
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
      this.thrownBottles.push(bottle);
      this.collectedBottles -= 1;
      this.bottleBar.updateStatusBar(this.percentageBottlBar(), 'bottles');
    }
  }

  deleteThrownBottles(){
    setTimeout(() => {
        this.thrownBottles.splice(0, 1);
    }, 2000);
  }

  beatEnemy(enemy, index, enemiesArray) {
    enemy.alive = false;
    setTimeout(() => {
      enemiesArray.splice(index, 1);
    }, 500);
  }
}
