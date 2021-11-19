class BottleOnTheGround extends GameComponents {
  IMAGES = ['./img/6.botella/2.Botella_enterrada1.png', './img/6.botella/2.Botella_enterrada2.png'];

  constructor(worldCanvas, worldSize) {
    super().loadImage(this.IMAGES[Math.round(Math.random())]);
    this.setDimensions(worldCanvas, worldSize);
  }

  setDimensions(worldCanvas, worldSize) {
   this.x = 0.3* worldCanvas.width + Math.random() * worldCanvas.width * (worldSize - 1);
   this.y = 0.8 * worldCanvas.height;
   this.height = 0.13 * worldCanvas.height;
   this.width = 0.13 * worldCanvas.height;
  }
 }