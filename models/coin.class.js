class Coin extends MovableObject {
  name = 'coin';
  IMAGES = ['./img/8.Coin/Moneda1.png', './img/8.Coin/Moneda2.png'];
  coinInterval;

  constructor(worldCanvas, worldSize) {
    super(worldCanvas).loadImage(this.IMAGES[0]);
    super.loadAllImages(this.IMAGES);
    this.setDimensions(worldSize);
    this.animate();
  }

  setDimensions(worldSize) {
    this.x = 0.3 * this.worldCanvas.width + Math.random() * this.worldCanvas.width * (worldSize - 1.25);
    this.y = 0.22 * this.worldCanvas.height + Math.random() * 0.1 * this.worldCanvas.height;
    this.height = 0.25 * this.worldCanvas.height;
    this.width = 0.25 * this.worldCanvas.height;
  }

  animate(){
    setTimeout(() => {
      let imgRepetition = Math.random() * 3;
      this.coinInterval = setInterval(() => {
        this.playAnimation(this.IMAGES, imgRepetition)
      }, 500);
    }, Math.random() * 3);
    intervals.push(this.coinInterval);
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
