/* const level1 = {[...],[...],[...}]} */

let level1;
let bgImgAmount = 4;

function setLevel1() {
  level1 = new Level(
    [new Chicken(canvas), new Chicken(canvas), new Chicken(canvas)],
    new Endboss(canvas, bgImgAmount),
    getClouds(),
    getBgObjects(),
    canvas,
    bgImgAmount
  );
}

function getClouds(){
  let clouds = [];
  for (let i = 0; i < bgImgAmount; i++) {
    i % 2 == 0 ? (j = 1) : (j = 2);
    clouds.push(
      new Cloud(`./img/5.Fondo/Capas/4.nubes/${j}.png`, canvas, i)
    );
  }
  return clouds;
}

function getBgObjects() {
  let backgroundObjects = [];
  for (let i = 0; i < bgImgAmount; i++) {
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






/*       new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', canvas, 0),
      new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/1.png', canvas, 0),
      new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/1.png', canvas, 0),
      new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/1.png', canvas, 0),
      new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', canvas, 1),
      new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/2.png', canvas, 1),
      new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/2.png', canvas, 1),
      new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/2.png', canvas, 1),
      new BackgroundObject('./img/5.Fondo/Capas/5.cielo_1920-1080px.png', canvas, 2),
      new BackgroundObject('./img/5.Fondo/Capas/3.Fondo3/1.png', canvas, 2),
      new BackgroundObject('./img/5.Fondo/Capas/2.Fondo2/1.png', canvas, 2),
      new BackgroundObject('./img/5.Fondo/Capas/1.suelo-fondo1/1.png', canvas, 2),
    ], */
