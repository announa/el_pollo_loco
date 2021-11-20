class Endboss extends MovableObject {
  IMAGES_WALKING = [
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G5.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G6.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G7.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G8.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G9.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G10.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G11.png',
    './img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G12.png',
  ];

  constructor(worldCanvas, bgImgAmount) {
    super(worldCanvas).loadImage('./img/4.Secuencias_Enemy_giganton-Dona_Gallinota-/2.Atecion-ataque/1.Alerta/G5.png');
    super.loadAllImages(this.IMAGES_WALKING);
    this.setDimensions(bgImgAmount);

    this.animate();
  }

  setDimensions(bgImgAmount){
    this.height = 0.8 * this.worldCanvas.height;
    this.width = 0.85 * 0.8 * this.worldCanvas.height;
    this.x = bgImgAmount * this.worldCanvas.width - 0.5 * this.worldCanvas.width;
    this.y = 0.14 * this.worldCanvas.height;
  }

  animate(){
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
