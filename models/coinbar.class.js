class CoinBar extends StatusBar {

  constructor(worldCanvas, IMAGES) {
    super(worldCanvas);
    this.IMAGES = IMAGES;
    for (let key in this.IMAGES){
      super.loadAllImages(this.IMAGES[key]);
    }
    this.images = this.IMAGES.BAR;
    this.percentage = 0;
    super.updateStatusBar(this.percentage);
    this.setDimensions();
  }

  setDimensions() {
    this.x = 0.7 * this.worldCanvas.width;
    this.y = 0.05 * this.worldCanvas.height;
    this.width = 0.2 * this.worldCanvas.width;
    this.height = 0.05 * this.worldCanvas.width;
  }
}
