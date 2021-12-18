class BottleOnTheGround extends GameComponents {
  name = 'bottle on the ground';
  plopp_sound;

  constructor(worldCanvas, worldSize, IMAGES, AUDIOS) {
    super(worldCanvas);
    this.IMAGES = IMAGES;
    super.loadImage(this.IMAGES[Math.round(Math.random())]);
    this.setAudios(AUDIOS);
    this.setDimensions(worldSize);
  }

  /**
   * Sets the chickens dimensions which depend on the canvas- and worldsize.
   * @param {Object} worldSize
   */
  setDimensions(worldSize) {
    this.x = 0.3 * this.worldCanvas.width + Math.random() * this.worldCanvas.width * (worldSize - 1.25);
    this.y = 0.8 * this.worldCanvas.height;
    this.height = 0.13 * this.worldCanvas.height;
    this.width = 0.13 * this.worldCanvas.height;
  }

  /**
   * Hands the parameters for calculating the bottles collision coordinates to setCollisionCoordinates().
   */
  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.3 * this.width,
      0.7 * this.width,
      0.4 * this.width,
      0.8 * this.width,
      0.2 * this.height,
      0.9 * this.height,
      this.directionLeft()
    );
  }

  setAudios(AUDIOS){
    this.SOUNDS = AUDIOS;
    this.plopp_sound = new Audio(this.SOUNDS.AUDIO);
    this.plopp_sound.volume = this.SOUNDS.VOLUME;
  }
  /**
   * Checks if the current bottle is orientated to the left.
   * @returns {Boolean}
   */
  directionLeft() {
    let directionLeft = false;
    if (this.img.src.includes(this.IMAGES[1].substring(3))) {
      directionLeft = true;
    }
    return directionLeft;
  }

  playcollidingSound(){
    this.plopp_sound.play();
  }
}
