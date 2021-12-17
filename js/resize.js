let resizeTimer1 = 0;
let resizeTimer2;
let canvasSize;

window.onresize = () => {
  if (resizeTimer1 == 0) {
    getCurrentCanvasSize();
    getCurrentPositions();
    resizeTimer1 = Date.now();
  }
  resizeWorld();
  resizeEndbossBar();
};

/**
 * Gets the current canvas-size for later calculations for restoring the worlds objects-positions.
 */
function getCurrentCanvasSize() {
  canvasSize = { x: canvas.width, y: canvas.height };
}

/**
 * Gets the current object positions for later calculation for restoring the positions.
 */
function getCurrentPositions() {
  getNonArrayObjectPositions();
  getArrayObjectPositions();
}

function getNonArrayObjectPositions() {
  world.character.resizePosition = { x: world.character.x, y: world.character.y };
  world.level.endboss.resizePosition = { x: world.level.endboss.x, y: world.level.endboss.y };
}

function getArrayObjectPositions() {
  [world.level.enemies, world.level.bottlesOnTheGround, world.level.coins, world.level.clouds].forEach((array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].resizePosition = { x: array[i].x, y: array[i].y };
    }
  });
}

/**
 * Resizes the world with a timeout-function. Only executes the resizing after 300ms of not changing the window size.
 */
function resizeWorld() {
  clearTimeout(resizeTimer2);
  resizeTimer2 = setTimeout(() => {
    setNewCanvasSize();
    resizeObjects();
    restoreObjectPositions();
    world.level.level_end_x = worldSize * canvas.width - 0.2 * canvas.width;
    resizeTimer1 = 0;
  }, 200);
}

function setNewCanvasSize() {
  setCanvasSize();
  resizeCanvasInObjects();
}

function resizeCanvasInObjects() {
  world.worldCanvas = canvas;
  resizeCanvasInNonArrayObjects();
  world.level.enemies.forEach((chicken) => chicken.setCanvas(canvas));
  world.level.bottlesOnTheGround.forEach((bottle) => bottle.setCanvas(canvas));
  world.level.coins.forEach((coin) => coin.setCanvas(canvas));
  world.level.backgroundObjects.forEach((object) => object.setCanvas(canvas));
  world.level.clouds.forEach((cloud) => cloud.setCanvas(canvas));
}

function resizeCanvasInNonArrayObjects() {
  let char = world.character;
  [char, char.lifeBar, char.bottleBar, char.coinBar, world.level.endboss, world.level.endboss.lifeBar].forEach(
    (obj) => {
      obj.setCanvas(canvas);
    }
  );
}

/**
 * Sets the new canvas and object-dimensions.
 */
function resizeObjects() {
  resizeNonArrayObjects();
  resizeArrayObjects();
}

function resizeNonArrayObjects(){
  let char = world.character;
  [char, char.lifeBar, char.bottleBar, char.coinBar].forEach(obj => obj.setDimensions());
  world.level.endboss.setDimensions(worldSize);
}

function resizeArrayObjects(){
  world.level.enemies.forEach((chicken) => chicken.setDimensions());
  world.level.bottlesOnTheGround.forEach((bottle) => bottle.setDimensions());
  world.level.coins.forEach((coin) => coin.setDimensions());
  world.level.backgroundObjects.forEach((object) => object.setDimensions(object.position));
  world.level.clouds.forEach((cloud) => cloud.setDimensions(cloud.position));
}

/**
 * Restores the positions of the objects in the canvas in relation to the new canvas-size.
 */
function restoreObjectPositions() {
  restoreArrayObjects();
  restoreNonArrayObjects();
}

function restoreNonArrayObjects() {
  [world.character, world.level.endboss].forEach((object) => {
    object.y = (object.resizePosition.y / canvasSize.y) * canvas.height;
    object.x = (object.resizePosition.x / canvasSize.x) * canvas.width;
  });
}

function restoreArrayObjects() {
  [world.level.enemies, world.level.bottlesOnTheGround, world.level.coins, world.level.clouds].forEach((array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].x = (array[i].resizePosition.x / canvasSize.x) * canvas.width;
      array[i].y = (array[i].resizePosition.y / canvasSize.y) * canvas.height;
    }
  });
}

function resizeEndbossBar() {
  world.level.endboss.lifeBar.setDimensions(world.level.endboss);
}
