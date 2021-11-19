class StatusBar extends GameComponents {
  IMAGES_LIFE_BAR = [
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/0_.png',
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/20_.png',
    './img/7.Marcadores/Barra/Marcador_vida/Naranja/40_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/60_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/80_.png',
    './img/7.Marcadores/Barra/Marcador_vida/verde/100_.png',
  ];
  percentage_life = 100;

  constructor(worldCanvas) {
    super().loadAllImages(this.IMAGES_LIFE_BAR);
    this.setDimensions(worldCanvas);
    this.updateStatusBar(100);
  }

  setDimensions(worldCanvas){
    this.x = 0.05 * worldCanvas.width;
    this.y = 0.05 * worldCanvas.height;
    this.width = 0.3 * worldCanvas.width;
    this.height = 0.07 * worldCanvas.width;
  }

  updateStatusBar(percentage) {
    this.percentage_life = percentage;
    let path = this.IMAGES_LIFE_BAR[this.imageIndex()]
    this.img = this.imageCache[path];

  }

  imageIndex(){
  return Math.floor(this.percentage_life / 20)
  }
}
