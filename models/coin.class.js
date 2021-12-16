class Coin extends MovableObject {
  name = 'coin';
  coinInterval;

  constructor(worldCanvas, worldSize, IMAGES, big) {
    super(worldCanvas);
    this.IMAGES = IMAGES;
    super.loadImage(this.IMAGES[0]);
    super.loadAllImages(this.IMAGES);
    this.setDimensions(worldSize, big);
    this.animate();
  }

  setDimensions(worldSize, big) {
    this.x = 0.3 * this.worldCanvas.width + Math.random() * this.worldCanvas.width * (worldSize - 1.25);
    this.y = 0.22 * this.worldCanvas.height + Math.random() * 0.1 * this.worldCanvas.height;
    this.height = 0.25 * this.worldCanvas.height;
    this.width = 0.25 * this.worldCanvas.height;
    if(big){
      this.y = 0.5 * this.worldCanvas.height;
      this.width = 0.3 * this.worldCanvas.height;
      this.height= 0.3 * this.worldCanvas.height;
    }
  }

  animate(){
    let coinTimeout = setTimeout(() => {
      let imgRepetition = Math.random() * 3;
      this.coinInterval = setInterval(() => {
        this.playAnimation(this.IMAGES, imgRepetition)
      }, 500);
      intervals.push(this.coinInterval);
    }, Math.random() * 3);
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
