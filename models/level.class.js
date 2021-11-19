class Level {
  enemies;
  bottlesOnTheGround;
  clouds;
  backgroundObjects;
  endboss;
  level_end_x;

  constructor(worldCanvas, bgImgAmount, enemies, bottlesOnTheGround, clouds, backgroundObjects, endboss) {
    this.enemies = enemies;
    this.bottlesOnTheGround = bottlesOnTheGround;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.endboss = endboss;
    this.level_end_x = (bgImgAmount - 1) * worldCanvas.width + 0.06 * worldCanvas.width;
  }
}
