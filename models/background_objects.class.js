class BackgroundObject extends MovableObject {
  name = 'background object';
  y = 0;
  position;

  constructor(path, worldCanvas, position) {
    super(worldCanvas).loadImage(path);
    this.setDimensions(position);
/*     if(position > 0){
      this.x = (this.worldCanvas.width) * position - 1;
    } */
  }

  setDimensions(position){
    this.position = position;
    this.width = this.worldCanvas.width;
    this.height = this.worldCanvas.height;
    this.x = this.worldCanvas.width * this.position;
  }
}
