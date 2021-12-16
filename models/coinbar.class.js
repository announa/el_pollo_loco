class CoinBar extends StatusBar {
  IMAGES = [
    './img/7.Marcadores/Barra/Marcador moneda/Naranja/0_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Naranja/20_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Naranja/40_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Verde/60_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Verde/80_.png',
    './img/7.Marcadores/Barra/Marcador moneda/Verde/100_.png',
  ];
  IMAGES_BLUE = [
    './img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
    './img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
    './img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
    './img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
    './img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
    './img/7.Marcadores/Barra/Marcador moneda/azul/100_.png',
  ];

  constructor(worldCanvas) {
    super(worldCanvas);
    this.percentage = 0;
    this.images = this.IMAGES;
    super.loadAllImages(this.IMAGES);
    super.loadAllImages(this.IMAGES_BLUE);
    super.updateStatusBar(this.percentage);
    this.setDimensions();
  }

  setDimensions() {
    this.x = 0.7 * this.worldCanvas.width;
    this.y = 0.05 * this.worldCanvas.height;
    this.width = 0.2 * this.worldCanvas.width;
    this.height = 0.05 * this.worldCanvas.width;
  }

/*   updateStatusBar(percentage) {
    this.percentage = percentage;
    let path = this.images[this.imageIndex()];
    this.img = this.imageCache[path];
  } */

/*   highlightStatusBar(value) {
    console.log('highlight coinbar');
    this.images = this.IMAGES_BLUE;
    this.updateStatusBar(value);
    setTimeout(() => {
      this.images = this.IMAGES;
      this.updateStatusBar(value);
    }, 1000);
  } */
}
