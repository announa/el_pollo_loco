class StatusBar extends GameComponents {
  percentage;
  statusbarInterval;
  hide = false;

  constructor(worldCanvas) {
    super(worldCanvas);
  }

  updateStatusBar(percentage) {
    this.percentage = percentage;
    let path = this.images[this.imageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Calculates the index of the current image depending on the current percentage that is represented by the statusbar.
   * @returns {Number}
   */
  imageIndex() {
    let percentage = this.percentage;
    if(percentage > 100){
      percentage = 100
    }
    return Math.floor(percentage / 20);
  }

  /**
   * Shows the highlightin-animation of the statusbar. Sets IMAGES_BLUE as the current shown images with a timeout of 1,5s and updates the statusbar. Calls toggleStatusbar()
   * @param {Number} value - The value represented by the statusbar
   */
  highlightStatusBar(value) {
    this.images = this.IMAGES.BAR_BLUE;
    this.updateStatusBar(value);
    this.toggleStatusBar();
    setTimeout(() => {
      this.images = this.IMAGES.BAR;
      this.updateStatusBar(value);
      clearInterval(this.statusbarInterval);
    }, 1500);
  }

  /**
   * Shows and hides the statusbar with an interval 0f 200ms.
   */
  toggleStatusBar() {
    this.statusbarInterval = setInterval(() => {
      this.hide = true;
      setTimeout(() => {
        this.hide = false;
      }, 100);
    }, 200);
    intervals.push(this.statusbarInterval);
  }
}
