/**
 * Sets the current level. Creates the objects which change depending on the level.
 */
function setLevel() {
  let amount = getObjectAmount();
  worldSize = amount[0];
  level = new Level(
    currentLevel,
    canvas,
    worldSize,
    createEnemies(amount[1], amount[2]),
    createBottlesOnTheGround(amount[3]),
    createCoins(amount[4]),
    createClouds(),
    createBgObjects(),
    new Endboss(canvas, worldSize, IMAGES)
  );
}

/**
 * Sets the amount of the respective objects depednind on the current level.
 * @returns {Array}
 */
function getObjectAmount() {
  let amount = [];
  if (currentLevel == 1) {
    amount = [4, 6, 0, 10, 10];
  }
  if (currentLevel == 2) {
    amount = [4, 6, 6, 10, 7];
  }
  if (currentLevel == 3) {
    amount = [5, 10, 6, 15, 10];
  }
  return amount;
}

function createEnemies(amount1, amount2) {
  let enemies = [];
  for (let i = 0; i < amount1; i++) {
    let chicken = new Chicken(canvas, worldSize, currentLevel, IMAGES.CHICKEN);
    enemies.push(chicken);
  }
  for (let i = 0; i < amount2; i++) {
    let chick = new Chick(canvas, worldSize, currentLevel, IMAGES.CHICK);
    enemies.push(chick);
  }
  return enemies;
}

function createBottlesOnTheGround(amount) {
  let bottles = [];
  for (let i = 0; i < amount; i++) {
    let bottle = new BottleOnTheGround(canvas, worldSize, IMAGES.BOTTLES.GROUND, AUDIOS.BOTTLE.PLOPP);
    bottles.push(bottle);
  }
  return bottles;
}

function createCoins(amount) {
  let coins = [];
  for (let i = 0; i < amount; i++) {
    let coin = new Coin(canvas, worldSize, IMAGES.COINS, AUDIOS.COINS);
    coins.push(coin);
  }
  return coins;
}

function createClouds() {
  let clouds = [];
  for (let i = 0; i < worldSize; i++) {
    i % 2 == 0 ? (j = 0) : (j = 1);
    clouds.push(new Cloud(IMAGES.BACKGROUND.CLOUDS[j], canvas, i));
    return clouds;
  }
}

function createBgObjects() {
  let backgroundObjects = [];
  for (let i = 0; i < worldSize; i++) {
    for (let j = 0; j < 3; j++) {
      let k;
      i % 2 == 0 ? (k = 1) : (k = 2);
      backgroundObjects.push(new BackgroundObject(IMAGES.BACKGROUND.GROUND[`G_${k}`][j], canvas, i));
    }
  }
  return backgroundObjects;
}
