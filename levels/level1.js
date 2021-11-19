/* const level1 = {[...],[...],[...}]} */

let level1;
let worldSize_l1 = 4;

function setLevel1() {
  level1 = new Level(
    canvas,
    worldSize_l1,
    createEnemies(),
    createBottlesOnTheGround(),
    createClouds(),
    createBgObjects(),
    new Endboss(canvas, worldSize_l1),
  );
}

function createEnemies() {
  let enemies = [];
  for (let i = 0; i < 10; i++) {
    let chicken = new Chicken(canvas, worldSize_l1);
    enemies.push(chicken);
  }
  return enemies;
}

function createBottlesOnTheGround() {
  let bottles = [];
  for (let i = 0; i < 10; i++) {
    let bottle = new BottleOnTheGround(canvas, worldSize_l1);
    bottles.push(bottle);
  }
  return bottles;
}

function createClouds() {
  let clouds = [];
  for (let i = 0; i < worldSize_l1; i++) {
    i % 2 == 0 ? (j = 1) : (j = 2);
    clouds.push(new Cloud(`./img/5.Fondo/Capas/4.nubes/${j}.png`, canvas, i));
  }
  return clouds;
}

function createBgObjects() {
  let backgroundObjects = [];
  for (let i = 0; i < worldSize_l1; i++) {
    i % 2 == 0 ? (j = 1) : (j = 2);
    backgroundObjects.push(
      /* new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', canvas, i), */
      new BackgroundObject(`./img/5.Fondo/Capas/3.Fondo3/${j}.png`, canvas, i),
      new BackgroundObject(`./img/5.Fondo/Capas/2.Fondo2/${j}.png`, canvas, i),
      new BackgroundObject(`./img/5.Fondo/Capas/1.suelo-fondo1/${j}.png`, canvas, i)
    );
  }
  return backgroundObjects;
}
