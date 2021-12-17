class CoinBar extends StatusBar {

  constructor(worldCanvas, IMAGES) {
    super(worldCanvas);
    super.setImages(IMAGES, IMAGES.BAR);
    this.percentage = 0;
    super.updateStatusBar(this.percentage);
    this.setDimensions();
  }

   /**
   * Sets the coinbars dimensions which depend on the canvas size.
   */
  setDimensions() {
    this.x = 0.7 * this.worldCanvas.width;
    this.y = 0.05 * this.worldCanvas.height;
    this.width = 0.2 * this.worldCanvas.width;
    this.height = 0.05 * this.worldCanvas.width;
  }
}
