class GameComponents {
  worldCanvas;
  x;
  y;
  width;
  height;
  img;
  imageCache = {};
  currentImage = 0;
  resizePosition;
  cc = {    // collision coordinates
    x_1: 0,
    x_2: 0,
    y_1: 0,
    y_2: 0
  }

  constructor(worldCanvas){
  this.setCanvas(worldCanvas)
  }

  setCanvas(worldCanvas){
    this.worldCanvas = worldCanvas;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadAllImages(imgArray) {
    imgArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  setCollisionCoordinates(x1r_offset, x2r_offset, x1l_offset, x2l_offset, y1_offset, y2_offset, changeDirection){
    this.cc.y_1 = this.y + y1_offset;
    this.cc.y_2 = this.y + y2_offset;
    if(changeDirection){
      this.cc.x_1 = this.x + x1l_offset;
      this.cc.x_2 = this.x + x2l_offset;
    } else{
      this.cc.x_1 = this.x + x1r_offset;
      this.cc.x_2 = this.x + x2r_offset;
    }
  }
}