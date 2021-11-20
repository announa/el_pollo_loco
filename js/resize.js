let resizeTimer;
let canvasSize;

window.onresize = () => {
  getCurrentCanvasSize();
  getCurrentPositions();
  resizeWorld();
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
  [world.level.enemies, world.level.bottlesOnTheGround, world.level.clouds].forEach((array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].resizePosition = { x: array[i].x, y: array[i].y };
    }
  });
}

/**
 * Resizes the world with a timeout-function. Only executes the resizing after 300ms of not changing the window size.
 */
function resizeWorld() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    setNewCanvasSize();
    resizeWorldObjects();
    restoreObjectPositions();
    world.level.level_end_x = (worldSize_l1 - 1) * world.worldCanvas.width + 0.06 * world.worldCanvas.width;
  }, 300);
}

function setNewCanvasSize() {
  setCanvasSize();
  resizeCanvasInObjects();
}


function resizeCanvasInObjects(){
  world.worldCanvas = canvas;
  world.character.setCanvas(canvas);
  world.lifeBar.setCanvas(canvas);
  world.bottleBar.setCanvas(canvas);
  world.level.endboss.setCanvas(canvas);
  world.level.enemies.forEach((chicken) => chicken.setCanvas(canvas));
  world.level.bottlesOnTheGround.forEach((bottle) => bottle.setCanvas(canvas));
  world.level.backgroundObjects.forEach((object) => object.setCanvas(canvas));
  world.level.clouds.forEach((cloud) => cloud.setCanvas(canvas));
}

/**
 * Sets the new canvas and object-dimensions.
 */
function resizeWorldObjects() {
  world.character.setDimensions();
  world.lifeBar.setDimensions();
  world.bottleBar.setDimensions('bottles');
  world.level.endboss.setDimensions(worldSize_l1);
  world.level.enemies.forEach((chicken) => chicken.setDimensions());
  world.level.bottlesOnTheGround.forEach((bottle) => bottle.setDimensions());
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
  [world.level.enemies, world.level.bottlesOnTheGround, world.level.clouds].forEach((array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].x = (array[i].resizePosition.x / canvasSize.x) * canvas.width;
      array[i].y = (array[i].resizePosition.y / canvasSize.y) * canvas.height;
    }
  });
}
