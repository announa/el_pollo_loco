class Cloud extends BackgroundObject {
  moveX = 0.15;
  interval = 1000 / 60;

  constructor(path, worldCanvas, position) {
    super(path, worldCanvas, position);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.moveX);
    }, 1000/60);
  }
}
