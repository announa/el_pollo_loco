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
  cc = {
    // collision coordinates
    x_1: 0,
    x_2: 0,
    y_1: 0,
    y_2: 0,
  };
  IMAGES;
  images;

  constructor(worldCanvas) {
    this.setCanvas(worldCanvas);
  }

  /**
   * Sets the GameComponents-instances IMAGES-variable, initiates the loading of the images-cache and sets the images that shall first be played after the creation of the instance.
   * @param {Object} IMAGES - The images which correspond to the current instance of GameComponents.
   * @param {Array} currentImageSet - The images that shall first be played after the creation of the GameComponents-instance.
   */
  setImages(IMAGES, currentImageSet) {
    this.IMAGES = IMAGES;
    if (IMAGES.constructor == Array) {
      this.loadAllImages(this.IMAGES);
    } else {
      for (let key in this.IMAGES) {
        this.loadAllImages(this.IMAGES[key]);
      }
    }
    if (currentImageSet) {
      this.images = currentImageSet;
    }
  }

  /**
   * Sets the GameComponents canvas-variable.
   * @param {Object} worldCanvas - the canvas
   */
  setCanvas(worldCanvas) {
    this.worldCanvas = worldCanvas;
  }

  /**
   * Sets the first loaded images path
   * @param {String} path - The images path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Creates a new Images-instances, sets its path and inserts it to the imageCache-object.
   * @param {Array} imgArray - The array with the images that shall be loaded.
   */
  loadAllImages(imgArray) {
    imgArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Calculates the collision coordinates of the current GameComponents-instance.
   * @param {Number} x1r_offset - The left x-collosion-offset of the current GameComponents-instances x-coordinate when instances changeDirection == false.
   * @param {Number} x2r_offset - The right x-collosion-offset of the current GameComponents-instances x-coordinate when instances changeDirection == false.
   * @param {Number} x1l_offset - The left x-collosion-offset of the current GameComponents-instances x-coordinate when instances changeDirection == true.
   * @param {Number} x2l_offset - The right x-collosion-offset of the current GameComponents-instances x-coordinate when instances changeDirection == true.
   * @param {Number} y1_offset - The upper y-collosion-offset of the current GameComponents-instances y-coordinate.
   * @param {Number} y2_offset - The lower y-collosion-offset of the current GameComponents-instances y-coordinate.
   * @param {Boolean} changeDirection - The objects direction (true == left, false == right).
   */
  setCollisionCoordinates(x1r_offset, x2r_offset, x1l_offset, x2l_offset, y1_offset, y2_offset, changeDirection) {
    this.cc.y_1 = this.y + y1_offset;
    this.cc.y_2 = this.y + y2_offset;
    if (changeDirection) {
      this.cc.x_1 = this.x + x1l_offset;
      this.cc.x_2 = this.x + x2l_offset;
    } else {
      this.cc.x_1 = this.x + x1r_offset;
      this.cc.x_2 = this.x + x2r_offset;
    }
  }
}
