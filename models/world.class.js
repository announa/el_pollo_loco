class World {
  worldCanvas;
  character;
  lifeBar;
  bottlesOnTheGround = [];
  collectedBottles = [];
  thrownBottles = [];
  lastThrownBottle = 0;
  level = level1;
  ctx;
  keyboard;
  camera_X = 0;

  constructor(canvasParam, keyboard) {
    this.keyboard = keyboard;
    this.worldCanvas = canvasParam;
    this.character = new Character(canvasParam);
    this.character.world = this;
    this.lifeBar = new StatusBar(canvasParam);
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
    if (object.turnLeft) {
      this.flipImage(object);
    }
    this.drawImage(object);
    this.drawBorder(object);
    if (object.turnLeft) {
      this.flipImageBack(object);
    }
  }

  drawImage(obj) {
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
  }

  drawBorder(obj) {
    if (obj instanceof Character || obj instanceof Chicken) {
      this.ctx.beginPath();
      this.ctx.lineWidth = '2px';
      this.ctx.strokeStyle = 'blue';
      if (obj instanceof Chicken) {
        this.ctx.rect(obj.x, obj.y, obj.width, obj.height);
      }
      if (obj instanceof Character) {
        this.ctx.rect(obj.x + 0.18 * obj.width, obj.y, 0.55 * obj.width, 0.95 * obj.height);
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
    }, 100);
  }

  checkForCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.checkCharacterCollision(enemy);
      /* this.checkBottleCollision(enemy); */
    });
  }

  checkCharacterCollision(enemy) {
    if (this.character.isColliding(enemy)) {
      this.character.looseEnergy();
      this.lifeBar.updateStatusBar(this.character.energy);
    }
  }

  checkBottleCollision() {
    console.log('Checking for collision with bottle');
  }

  checkForThrownBottle() {
    if (this.keyboard.D) {
      if (this.timeSinceLastThrownBottle() > 200) {
        this.lastThrownBottle = new Date().getTime();
        this.throwBottle();
      }
    }
  }
  timeSinceLastThrownBottle() {
    return new Date().getTime() - this.lastThrownBottle;
  }

  throwBottle() {
    let bottle_x = this.character.x + 0.4 * this.character.width;
    let bottle_y = this.character.y + 0.5 * this.character.height;
    let bottle_startspeed_x = this.character.detectCharacterSpeed();
    let bottle = new ThrownBottle(this.worldCanvas, bottle_x, bottle_y, bottle_startspeed_x, this.character.turnLeft);
    this.thrownBottles.push(bottle);
  }
}
