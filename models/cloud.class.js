class Cloud extends BackgroundObject {
  name = 'clouds';
  moveX = 0.15;
  interval = 1000 / 60;

  constructor(path, worldCanvas, position) {
    super(path, worldCanvas, position);
    this.animate();
  }

  animate() {
  let cloudInterval = setInterval(() => {
      if (!pause) {
        console.log(cloudInterval)
        this.moveLeft(this.moveX);
      }
    }, 1000 / 60);
    intervals.push(cloudInterval)
  }
}
