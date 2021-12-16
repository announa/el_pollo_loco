class BackgroundObject extends MovableObject {
  name = 'background object';
  y = 0;
  position;

  constructor(path, worldCanvas, position) {
    super(worldCanvas).loadImage(path);
    this.setDimensions(position);
  }

  setDimensions(position){
    this.position = position;
    this.width = this.worldCanvas.width;
    this.height = this.worldCanvas.height;
    this.x = this.worldCanvas.width * this.position;
  }
}
