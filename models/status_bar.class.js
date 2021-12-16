class StatusBar extends GameComponents {
  images;
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

  imageIndex() {
    return Math.floor(this.percentage / 20);
  }

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

  toggleStatusBar(){
    this.statusbarInterval = setInterval(() => {
      this.hide = true;
      setTimeout(() => {
        this.hide = false;
      }, 100);
    }, 200);
    intervals.push(this.statusbarInterval);
  }
}
