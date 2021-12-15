class Chick extends Chicken {
  name = 'Pollito';
  IMAGES_WALKING = [
    './img/3.Secuencias_Enemy_basico/Version_pollito/1.Paso_derecho.png',
    './img/3.Secuencias_Enemy_basico/Version_pollito/2.Centro.png',
    './img/3.Secuencias_Enemy_basico/Version_pollito/3.Paso_izquierdo.png',
  ];
  IMAGE_DEAD = ['./img/3.Secuencias_Enemy_basico/Version_pollito/4.Muerte.png'];

  constructor(worldCanvas, worldSize) {
    super(worldCanvas, worldSize);
    super.loadImage('./img/3.Secuencias_Enemy_basico/Version_pollito/1.Paso_derecho.png');
    super.loadAllImages(this.IMAGES_WALKING);
    super.loadAllImages(this.IMAGE_DEAD);
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
