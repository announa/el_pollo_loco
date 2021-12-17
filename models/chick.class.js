class Chick extends Chicken {
  name = 'Pollito';

  constructor(worldCanvas, worldSize, currentLevel, IMAGES) {
    super(worldCanvas, worldSize, currentLevel, IMAGES);
    super.loadImage(this.IMAGES.WALKING[0]);
  }

    /**
   * Hands the parameters for calculating the chicks collision coordinates to setCollisionCoordinates().
   */
  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.1 * this.width,
      0.9 * this.width,
      0.1 * this.width,
      0.9 * this.width,
      0.1 * this.width,
      0.9 * this.width,
      this.changeDirection
    );
  }
}
