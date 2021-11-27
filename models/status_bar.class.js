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
  IMAGES_COIN_BAR = [
    './img/7.Marcadores/Barra/Marcador moneda/Naranja/0_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Naranja/20_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Naranja/40_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Verde/60_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Verde/80_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Verde/100_.png',
  ];

  images;
  percentage;

  constructor(worldCanvas, barType, referenceObject) {
    super(worldCanvas);
    if (barType == 'life') {
      this.images = this.IMAGES_LIFE_BAR;
      this.percentage = 100;
    } else if (barType == 'bottles') {
      this.images = this.IMAGES_BOTTLE_BAR;
      this.percentage = 0;
    } else if(barType == 'coins'){
      this.images = this.IMAGES_COIN_BAR;
      this.percentage = 0;
    }
    super.loadAllImages(this.images);
    this.setDimensions(barType, referenceObject);
    this.updateStatusBar(this.percentage);
  }

  setDimensions(barType, referenceObject) {
    if (referenceObject) {
      this.x = referenceObject.x + 0.15 * referenceObject.width;
      this.y = referenceObject.y;
    } else {
      this.x = 0.05 * this.worldCanvas.width;
      this.y = 0.05 * this.worldCanvas.height;
    }
    if (barType == 'bottles') {
      this.x = 0.4 * this.worldCanvas.width;
    }
    if(barType == 'coins'){
      this.x = 0.75 * this.worldCanvas.width;
    }
    this.width = 0.2 * this.worldCanvas.width;
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
