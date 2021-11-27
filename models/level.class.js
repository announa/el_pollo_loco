class Level {
  enemies;
  bottlesOnTheGround;
  coins;
  clouds;
  backgroundObjects;
  endboss;
  level_end_x;

  constructor(worldCanvas, bgImgAmount, enemies, bottlesOnTheGround, coins, clouds, backgroundObjects, endboss) {
    this.enemies = enemies;
    this.bottlesOnTheGround = bottlesOnTheGround;
    this.coins = coins;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.endboss = endboss;
    this.level_end_x = (bgImgAmount - 1) * worldCanvas.width;
  }
}
