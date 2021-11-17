class Chicken extends MovableObject {
  IMAGES_WALKING = [
    './img/3.Secuencias_Enemy_basico/Version_Gallinita/1.Ga_paso_derecho.png',
    './img/3.Secuencias_Enemy_basico/Version_Gallinita/2-Ga_centro.png',
    './img/3.Secuencias_Enemy_basico/Version_Gallinita/3.Ga_paso izquierdo.png',
  ];

  constructor(worldCanvas) {
    super(worldCanvas);
    this.setDimensions(worldCanvas);

    super.loadImage('./img/3.Secuencias_Enemy_basico/Version_Gallinita/1.Ga_paso_derecho.png');
    super.loadAllImages(this.IMAGES_WALKING);
    this.animate();
  }

  setDimensions(worldCanvas) {
    this.x = 0.5 * worldCanvas.width + Math.random() * (0.5 * worldCanvas.width);
    this.y = 0.74 * worldCanvas.height;
    this.height = 0.15 * worldCanvas.height;
    this.width = 0.15 * worldCanvas.height;
    this.moveX = worldCanvas.width / 10000 + Math.random() * (worldCanvas.width / 5000);
  }
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
