class Chicken extends MovableObject {
  name = 'Pollo Loco';
  levelNo;
  alive = true;
  turnAroundTimeout;
  chickenInterval;
  sound_talking;
  sound_talking_short;
  sound_cry;

  constructor(worldCanvas, worldSize, currentLevel, IMAGES, AUDIOS) {
    super(worldCanvas);
    super.setImages(IMAGES);
    super.loadImage(this.IMAGES.WALKING[0]);
    this.setSounds(AUDIOS);
    this.levelNo = currentLevel;
    this.setDimensions(worldSize);
    this.setDirection();
    this.turnedAround = Date.now();
    this.setTurnArounTimer();
    this.animate();
  }

  /**
   * Sets the chickens dimensions which depend on the canvas- and worldsize.
   * @param {Object} worldSize
   */
  setDimensions(worldSize) {
    this.x = 0.5 * this.worldCanvas.width + Math.random() * this.worldCanvas.width * (worldSize - 1);
    this.y = 0.74 * this.worldCanvas.height;
    this.height = 0.15 * this.worldCanvas.height;
    this.width = 0.15 * this.worldCanvas.height;
    this.moveX = this.worldCanvas.width / 1000 + Math.random() * (this.worldCanvas.width / 300);
  }

  /**
   * Sets the start-walking direction ob the Chicken-instance. From level 3 on.
   */
  setDirection() {
    if (this.levelNo > 2) {
      let random = Math.round(Math.random());
      if (random == 1) {
        this.changeDirection = true;
      }
    }
  }

  /**
   * Sets a random timeout for the Chicken-instance for changing its direction.
   */
  setTurnArounTimer() {
    this.turnAroundTimeout = Math.floor(5000 + Math.random() * 10000 + Date.now());
  }

  /**
   * Hands the parameters for calculating the chickens collision coordinates to setCollisionCoordinates().
   */
  getCollisionCoordinates() {
    this.setCollisionCoordinates(0, this.width, 0, this.width, 0, this.height, this.changeDirection);
  }

  setSounds(AUDIOS){
    this.SOUNDS = AUDIOS;
    this.sound_talking = new Audio(this.SOUNDS.TALKING.AUDIO);
    this.sound_talking.volume = this.SOUNDS.TALKING.VOLUME;
    this.sound_talking_short = new Audio(this.SOUNDS.TALKING_SHORT.AUDIO);
    this.sound_talking_short.volume = this.SOUNDS.TALKING_SHORT.VOLUME;
    this.sound_cry = new Audio(this.SOUNDS.CRY.AUDIO);
    this.sound_cry.volume = this.SOUNDS.CRY.VOLUME;
  }

  /**
   * Initiates the chickens animation when the game is not paused and pushes the animation-interval to the intervals-array.
   */
  animate() {
    this.chickenInterval = setInterval(() => {
      if (!pause) {
        if (this.alive) {
          this.playAnimation(this.IMAGES.WALKING);
          this.walk();
          this.turnAround();
        } else {
          this.img = this.imageCache[this.IMAGES.DEAD[0]];
        }
      }
    }, 100);
    intervals.push(this.chickenInterval);
  }

  walk() {
    if (this.changeDirection) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
  }

  /**
   * Changes the chickens walking direction after turnAroundTimeout has elapsed.
   */
  turnAround() {
    if (this.levelNo > 2 && this.turnAroundTimeout < Date.now()) {
      if (this.changeDirection) {
        this.changeDirection = false;
      } else {
        this.changeDirection = true;
      }
      this.setTurnArounTimer();
    }
  }

  playTalkingSound(){
    this.sound_talking.play();
  }

  playTalkingShortSound(){
    this.sound_talking.play();
  }
  playCryingShortSound(){
    this.sound_cry.play();
  }
}
