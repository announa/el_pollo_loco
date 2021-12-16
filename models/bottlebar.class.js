class BottleBar extends StatusBar {
  IMAGES = [
    './img/7.Marcadores/Barra/Marcador_botella/Naranja/0_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Naranja/20_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Naranja/40_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Verde/60_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Verde/80_.png',
    './img/7.Marcadores/Barra/Marcador_botella/Verde/100_.png',
  ];

  constructor(worldCanvas) {
    super(worldCanvas);
    this.percentage = 0;
    this.images = this.IMAGES;
    super.loadAllImages(this.IMAGES);
    super.updateStatusBar(this.percentage);
    this.setDimensions();
  }

  setDimensions() {
    this.x = 0.375 * this.worldCanvas.width;
    this.y = 0.05 * this.worldCanvas.height;
    this.width = 0.2 * this.worldCanvas.width;
    this.height = 0.05 * this.worldCanvas.width;
  }
}
