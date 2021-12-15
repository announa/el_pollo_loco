class Level {
  enemies;
  bottlesOnTheGround;
  coins;
  clouds;
  backgroundObjects;
  endboss;
  level_end_x;

  constructor(worldCanvas, worldSize, enemies, bottlesOnTheGround, coins, clouds, backgroundObjects, endboss) {
    this.enemies = enemies;
    this.bottlesOnTheGround = bottlesOnTheGround;
    this.coins = coins;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.endboss = endboss;
    this.level_end_x = worldSize * worldCanvas.width - 0.2 * worldCanvas.width;
  }
}
