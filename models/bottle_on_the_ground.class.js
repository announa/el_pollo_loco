class BottleOnTheGround extends GameComponents {
  name = 'bottle on the ground';

  constructor(worldCanvas, worldSize, IMAGES) {
    super(worldCanvas)
    this.IMAGES = IMAGES;
    super.loadImage(this.IMAGES[Math.round(Math.random())]);
    this.setDimensions(worldSize);
  }

  setDimensions(worldSize) {
    this.x = 0.3 * this.worldCanvas.width + Math.random() * this.worldCanvas.width * (worldSize - 1.25);
    this.y = 0.8 * this.worldCanvas.height;
    this.height = 0.13 * this.worldCanvas.height;
    this.width = 0.13 * this.worldCanvas.height;
  }

  getCollisionCoordinates() {
    let directionLeft = false;
    if (this.img.src.includes(this.IMAGES[1].substring(3))) {
      directionLeft = true;
    }
    this.setCollisionCoordinates(
      0.3 * this.width,
      0.7 * this.width,
      0.4 * this.width,
      0.8 * this.width,
      0.2 * this.height,
      0.9 * this.height,
      directionLeft
    );
  }
}
