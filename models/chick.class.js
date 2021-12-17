class Chick extends Chicken {
  name = 'Pollito';

  constructor(worldCanvas, worldSize, currentLevel, IMAGES) {
    super(worldCanvas, worldSize, currentLevel, IMAGES);
    super.loadImage(this.IMAGES.WALKING[0]);
  }

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
