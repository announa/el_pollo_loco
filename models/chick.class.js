class Chick extends Chicken {
  name = 'Pollito';

  constructor(worldCanvas, worldSize, IMAGES) {
    super(worldCanvas, worldSize);
    this.IMAGES = IMAGES;
    for(const key in IMAGES){
      super.loadAllImages(this.IMAGES[key]);      
    }
    super.loadImage('./img/3.Secuencias_Enemy_basico/Version_pollito/1.Paso_derecho.png');
/*     super.loadAllImages(this.IMAGES_WALKING);
    super.loadAllImages(this.IMAGE_DEAD); */
  }

  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.1 * this.width,
      0.9 * this.width,
      0.1 * this.width,
      0.9 * this.width,
      0.1 * this.width,
      0.9 * this.width,
      this.changeDirection
    );
  }
}
