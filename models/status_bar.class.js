class StatusBar extends GameComponents {
  IMAGES_LIFE_BAR = [
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/0_.png',
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/20_.png',
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/40_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/60_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/80_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/100_.png',
  ];
  IMAGES_BOTTLE_BAR = [
    './img/7.Marcadores/Barra/Marcador_botella/Naranja/0_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Naranja/20_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Naranja/40_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Verde/60_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Verde/80_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Verde/100_.png',
  ];
  images;
  percentage

  constructor(worldCanvas, statusType) {
    super();
    if (statusType == 'life') {
      this.images = this.IMAGES_LIFE_BAR;
      this.percentage = 100;
    } else if (statusType == 'bottles') {
      this.images = this.IMAGES_BOTTLE_BAR;
      this.percentage = 0;
    }
    super.loadAllImages(this.images);
    this.setDimensions(worldCanvas, statusType);
    this.updateStatusBar(this.percentage);
  }

  setDimensions(worldCanvas, statusType) {
    this.x = 0.05 * worldCanvas.width;
    if (statusType == 'bottles') {
      this.x = 0.4 * worldCanvas.width;
    }
    this.y = 0.05 * worldCanvas.height;
    this.width = 0.25 * worldCanvas.width;
    this.height = 0.05 * worldCanvas.width;
  }

  updateStatusBar(percentage, statusType) {
    this.percentage = percentage;
    let path = this.images[this.imageIndex()];
    this.img = this.imageCache[path];
  }

  imageIndex() {
    return Math.floor(this.percentage / 20);
  }
}
