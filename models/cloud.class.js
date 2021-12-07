class Cloud extends BackgroundObject {
  name = 'clouds';
  moveX = 0.15;
  interval = 1000 / 60;

  constructor(path, worldCanvas, position) {
    super(path, worldCanvas, position);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!pause) {
        this.moveLeft(this.moveX);
      }
    }, 1000 / 60);
  }
}
