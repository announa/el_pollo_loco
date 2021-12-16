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
    new Endboss(canvas, worldSize),
  );
}

function getObjectAmount() {
  let amount = [];
  if(currentLevel == 1){
    amount = [4, 6, 0, 10, 10]
  }
  if(currentLevel == 2){
    amount = [4, 6, 6, 10, 7]
  }
  if(currentLevel == 3){
    amount = [5, 10, 6, 15, 10]
  }
  return amount;
}


function createEnemies(amount1, amount2) {
  let enemies = [];
  for (let i = 0; i < amount1; i++) {
    let chicken = new Chicken(canvas, worldSize, currentLevel);
    enemies.push(chicken);
  }
  for (let i = 0; i < amount2; i++) {
    let chick = new Chick(canvas, worldSize, currentLevel);
    enemies.push(chick);
  }
  return enemies;
}

function createBottlesOnTheGround(amount) {
  let bottles = [];
  for (let i = 0; i < amount; i++) {
    let bottle = new BottleOnTheGround(canvas, worldSize);
    bottles.push(bottle);
  }
  return bottles;
}

function createCoins(amount){
  let coins = [];
  for(let i = 0; i < amount; i++){
    let coin = new Coin(canvas, worldSize);
    coins.push(coin);
  }
  return coins;
}

function createClouds() {
  let clouds = [];
  for (let i = 0; i < worldSize; i++) {
    i % 2 == 0 ? (j = 1) : (j = 2);
    clouds.push(new Cloud(`./img/5.Fondo/Capas/4.nubes/${j}.png`, canvas, i));
  }
  return clouds;
}

function createBgObjects() {
  let backgroundObjects = [];
  for (let i = 0; i < worldSize; i++) {
    i % 2 == 0 ? (j = 1) : (j = 2);
    backgroundObjects.push(
      new BackgroundObject(`./img/5.Fondo/Capas/3.Fondo3/${j}.png`, canvas, i),
      new BackgroundObject(`./img/5.Fondo/Capas/2.Fondo2/${j}.png`, canvas, i),
      new BackgroundObject(`./img/5.Fondo/Capas/1.suelo-fondo1/${j}.png`, canvas, i)
    );
  }
  return backgroundObjects;
}
