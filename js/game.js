let canvas;
let world;
let keyboard = new Keyboard();
world;

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
  console.log(canvasContainer.clientHeight)
  console.log(canvas.height)
}

window.addEventListener('keydown', (event) => checkKeyDown(event));
window.addEventListener('keyup', (event) => checkKeyUp(event));

function checkKeyDown(event) {
  if (event.key === ' ') {
    keyboard.SPACE = true;
  }
  if (event.key === 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (event.key === 'ArrowUp') {
    keyboard.UP = true;
  }
  if (event.key === 'ArrowRight') {
    keyboard.RIGHT = true;
  }
  if (event.key === 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if (event.key === 'd') {
    keyboard.D = true;
  }
}
function checkKeyUp(event) {
  if (event.key === ' ') {
    keyboard.SPACE = false;
  }
  if (event.key === 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (event.key === 'ArrowUp') {
    keyboard.UP = false;
  }
  if (event.key === 'ArrowRight') {
    keyboard.RIGHT = false;
  }
  if (event.key === 'ArrowDown') {
    keyboard.DOWN = false;
  }
  if (event.key === 'd') {
    keyboard.D = false;
  }
}
