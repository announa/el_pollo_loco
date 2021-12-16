class LifeBar extends StatusBar {
  IMAGES = [
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/0_.png',
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/20_.png',
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/40_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/60_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/80_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/100_.png',
  ];
  IMAGES_BLUE = [
    './img/7.Marcadores/Barra/Marcador_vida/azul/0_.png',
    './img/7.Marcadores/Barra/Marcador_vida/azul/20_.png',
    './img/7.Marcadores/Barra/Marcador_vida/azul/40_.png',
    './img/7.Marcadores/Barra/Marcador_vida/azul/60_.png',
    './img/7.Marcadores/Barra/Marcador_vida/azul/80_.png',
    './img/7.Marcadores/Barra/Marcador_vida/azul/100_.png',
  ];

  constructor(worldCanvas, referenceObject) {
    super(worldCanvas);
    this.percentage = 100;
    this.images = this.IMAGES;
    super.loadAllImages(this.IMAGES);
    super.loadAllImages(this.IMAGES_BLUE);
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

  /*   updateStatusBar(percentage) {
    this.percentage = percentage;
    let path = this.images[this.imageIndex()];
    this.img = this.imageCache[path];
  }

/*   highlightStatusBar(value, statusType) {
    console.log('highlight lifebar');
    this.images = this.IMAGES_BLUE;
    console.log(this.images);
    this.updateStatusBar(value);
    console.log(this.img);
    setTimeout(() => {
      this.images = this.IMAGES;
      console.log(this.images);
      this.updateStatusBar(value);
      console.log(this.img);
    }, 1000);
  } */
}
