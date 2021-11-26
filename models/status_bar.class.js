class StatusBar extends GameComponents {
  name = 'status bar';
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
  percentage;

  constructor(worldCanvas, statusType, referenceObject) {
    super(worldCanvas);
    if (statusType == 'life') {
      this.images = this.IMAGES_LIFE_BAR;
      this.percentage = 100;
    } else if (statusType == 'bottles') {
      this.images = this.IMAGES_BOTTLE_BAR;
      this.percentage = 0;
    }
    super.loadAllImages(this.images);
    this.setDimensions(statusType, referenceObject);
    this.updateStatusBar(this.percentage);
  }

  setDimensions(statusType, referenceObject) {
    if (referenceObject) {
      this.x = referenceObject.x + 0.15 * referenceObject.width;
      this.y = referenceObject.y;
    } else {
      this.x = 0.05 * this.worldCanvas.width;
      this.y = 0.05 * this.worldCanvas.height;
    }
    if (statusType == 'bottles') {
      this.x = 0.4 * this.worldCanvas.width;
    }
    this.width = 0.25 * this.worldCanvas.width;
    this.height = 0.05 * this.worldCanvas.width;
  }

  updateStatusBar(percentage) {
    this.percentage = percentage;
    let path = this.images[this.imageIndex()];
    this.img = this.imageCache[path];
  }

  imageIndex() {
    return Math.floor(this.percentage / 20);
  }
}
