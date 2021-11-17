class BackgroundObject extends MovableObject {
  y = 0;
  position;

  constructor(path, worldCanvas, position) {
    super(worldCanvas).loadImage(path);
    this.setDimensions(worldCanvas, position);
/*     if(position > 0){
      this.x = (worldCanvas.width) * position - 1;
    } */
  }

  setDimensions(worldCanvas, position){
    this.position = position;
    this.width = worldCanvas.width;
    this.height = worldCanvas.height;
    this.x = worldCanvas.width * this.position;
  }
}
