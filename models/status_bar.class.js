class StatusBar extends GameComponents {
  images;
  percentage;

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
    console.log('highlight bar');
    this.images = this.IMAGES_BLUE;
    this.updateStatusBar(value);
    setTimeout(() => {
      this.images = this.IMAGES;
      this.updateStatusBar(value);
    }, 1000);
  }
  /*     if (statusType == 'life') {
      console.log('highlight lifebar')
      this.images = this.IMAGES_LIFE_BAR_BLUE;
      console.log(this.images)
      this.updateStatusBar(value);
      console.log(this.img)
      setTimeout(() => {
        this.images = this.IMAGES_LIFE_BAR;
        console.log(this.images)
        this.updateStatusBar(value);
        console.log(this.img)
      }, 1000);
    }
    if (statusType == 'coin') {
      console.log('highlight coinbar')
      this.images = this.IMAGES_COIN_BAR_BLUE;
      this.updateStatusBar(value);
      setTimeout(() => {
        this.images = this.IMAGES_COIN_BAR;
        this.updateStatusBar(value);
      }, 1000);
    } */
}
