class Level {
  levelNo;
  enemies;
  bottlesOnTheGround;
  coins;
  clouds;
  backgroundObjects;
  endboss;
  level_end_x;

  constructor(currentLevel, worldCanvas, worldSize, enemies, bottlesOnTheGround, coins, clouds, backgroundObjects, endboss) {
    this.levelNo = currentLevel;
    this.enemies = enemies;
    this.bottlesOnTheGround = bottlesOnTheGround;
    this.coins = coins;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.endboss = endboss;
    this.level_end_x = worldSize * worldCanvas.width - 0.2 * worldCanvas.width;
  }
}
