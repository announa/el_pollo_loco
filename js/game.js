let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  setCanvasSize();
  setLevel1();
  world = new World(canvas, keyboard);
}

function setCanvasSize() {
  canvas = document.getElementById('canvas');
  canvasContainer = document.getElementById('canvas-container');
  canvas.height = canvasContainer.clientHeight;
  canvas.width = canvasContainer.clientWidth;
  console.log(canvasContainer.clientHeight);
  console.log(canvas.height);
}

window.addEventListener('keydown', (event) => checkKeyDown(event));
window.addEventListener('keyup', (event) => checkKeyUp(event));

function checkKeyDown(event) {
  if (event.key === ' ') {
    keyboard.SPACE = true;
  }
  if (event.key === 'ArrowLeft') {
    keyboard.LEFT = true;
    world.lastKeyEvent = Date.now();
  }
  if (event.key === 'ArrowUp') {
    keyboard.UP = true;
    world.lastKeyEvent = Date.now();
  }
  if (event.key === 'ArrowRight') {
    keyboard.RIGHT = true;
    world.lastKeyEvent = Date.now();
  }
  if (event.key === 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if (event.key === 'd') {
    keyboard.D = true;
    world.lastKeyEvent = Date.now();
  }
}
function checkKeyUp(event) {
  if (event.key === ' ') {
    keyboard.SPACE = false;
    /* world.lastKeyEvent = Date.now(); */
  }
  if (event.key === 'ArrowLeft') {
    keyboard.LEFT = false;
    world.lastKeyEvent = Date.now();
  }
  if (event.key === 'ArrowUp') {
    keyboard.UP = false;
    world.lastKeyEvent = Date.now();
  }
  if (event.key === 'ArrowRight') {
    keyboard.RIGHT = false;
    world.lastKeyEvent = Date.now();
  }
  if (event.key === 'ArrowDown') {
    keyboard.DOWN = false;
    /* world.lastKeyEvent = Date.now(); */
  }
  if (event.key === 'd') {
    keyboard.D = false;
    world.lastKeyEvent = Date.now();
  }
}
