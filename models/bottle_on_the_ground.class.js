class BottleOnTheGround extends GameComponents {
  IMAGES = ['/.img/6.botella/2.Botella_enterrada1.png', '/.img/6.botella/2.Botella_enterrada2.png'];

  constructor(worldCanvas) {
    super().loadImage(this.IMAGES[Math.round(Math.random())]);
    this.setDimensions(worldCanvas);
  }

  setDimensions(worldCanvas, worldSize) {
   this.x = Math.random() * worldCanvas.width * 0.7 * worldSize;
   this.y = 0.7 * worldCanvas.height;
   this.height = 0.1 * worldCanvas.height;
   this.width = 0.1 * worldCanvas.height;
  }
 }
