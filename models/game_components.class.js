class GameComponents {
  x;
  y;
  width;
  height;
  img;
  imageCache = {};
  currentImage = 0;
  resizePosition;

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
}
