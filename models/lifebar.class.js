class LifeBar extends StatusBar {

  constructor(worldCanvas, IMAGES, referenceObject) {
    super(worldCanvas);
    super.setImages(IMAGES, IMAGES.BAR);
    this.percentage = 100;
    super.updateStatusBar(this.percentage);
    this.setDimensions(referenceObject);
  }

  setDimensions(referenceObject) {
    this.x = 0.05 * this.worldCanvas.width;
    this.y = 0.05 * this.worldCanvas.height;
    if (referenceObject) {
      this.x = referenceObject.x + 0.15 * referenceObject.width;
      this.y = referenceObject.y;
    }
    this.width = 0.2 * this.worldCanvas.width;
    this.height = 0.05 * this.worldCanvas.width;
  }
}
