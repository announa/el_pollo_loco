class BottleBar extends StatusBar {

  constructor(worldCanvas, IMAGES) {
    super(worldCanvas);
    this.IMAGES = IMAGES.BAR;
    super.loadAllImages(this.IMAGES);
    this.images = this.IMAGES;
    this.percentage = 0;
    super.updateStatusBar(this.percentage);
    this.setDimensions();
  }

  setDimensions() {
    this.x = 0.375 * this.worldCanvas.width;
    this.y = 0.05 * this.worldCanvas.height;
    this.width = 0.2 * this.worldCanvas.width;
    this.height = 0.05 * this.worldCanvas.width;
  }
}
