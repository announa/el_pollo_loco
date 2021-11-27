class Coin extends GameComponents {
  name = 'coin';
  IMAGE = './img/8.Coin/Moneda1.png';

  constructor(worldCanvas, worldSize) {
    super(worldCanvas).loadImage(this.IMAGE);
    this.setDimensions(worldSize);
  }

  setDimensions(worldSize) {
    this.x = 0.3 * this.worldCanvas.width + Math.random() * this.worldCanvas.width * (worldSize - 1.25);
    this.y = 0.22 * this.worldCanvas.height + Math.random() * 0.1 * this.worldCanvas.height;
    this.height = 0.25 * this.worldCanvas.height;
    this.width = 0.25 * this.worldCanvas.height;
  }

  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.35 * this.width,
      0.65 * this.width,
      0.35 * this.width,
      0.65 * this.width,
      0.35 * this.height,
      0.65 * this.height,
      false
    );
  }
}