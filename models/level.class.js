class Level {
  enemies;
  endboss;
  clouds;
  backgroundObjects;
  level_end_x;

  constructor(enemies, endboss, clouds, backgroundObjects, worldCanvas, bgImgAmount) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.level_end_x = (bgImgAmount - 1) * worldCanvas.width + 0.06 * worldCanvas.width;
    console.log(this.endboss);
  }
}
