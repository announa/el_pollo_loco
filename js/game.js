let canvas;
let world;
let keyboard = new Keyboard();
let playing = false;
let pause = true;

function init() {
  setCanvasSize();
  setLevel1();
  world = new World(canvas, keyboard);
}

function startGame() {
  prepareCanvas();
  playing = true;
  pause = false;
  world.draw();
}

function prepareCanvas(){
  hideStartscreen();
  setButtons();
  if(!document.getElementById('help-modal').classList.contains('d-none')){
    closeHelp();
  }
}

function setCanvasSize() {
  canvas = document.getElementById('canvas');
  canvasContainer = document.getElementById('canvas-container');
  canvas.height = canvasContainer.clientHeight;
  canvas.width = canvasContainer.clientWidth;
}


function hideStartscreen() {
  let startscreen = document.getElementById('startscreen');
  startscreen.classList.add('hide-startscreen');
  setTimeout(() => {
    startscreen.classList.add('d-none');
    startscreen.classList.remove('hide-startscreen');
  }, 500);
}

function setButtons(){
  setRestartBtn();
  setPauseBtn();
}

function setRestartBtn(){
  let restartBtn = document.getElementById('start-btn');
  restartBtn.innerHTML = 'Restart Level';
  restartBtn.setAttribute('onclick', 'restartLevel()')
}

function setPauseBtn(){
  let pauseBtn = document.getElementById('pause-btn')
  pauseBtn.disabled = false;
  pauseBtn.innerHTML = 'Pause';
}

function openHelp() {
  if (playing) {
    pause = true;
  }
  document.getElementById('help-modal').classList.remove('d-none');
}

function closeHelp() {
  document.getElementById('help-modal').classList.add('d-none');
  if (playing && document.getElementById('pause-btn').innerHTML == 'Pause') {
    pause = false;
  }
}

function pauseGame() {
  if (playing) {
    let pauseBtn = document.getElementById('pause-btn');
    if (!pause) {
      pause = true;
      pauseBtn.innerHTML = 'Go on!';
    } else {
      pause = false;
      pauseBtn.innerHTML = 'Pause';
    }
  }
}

function restartLevel(){
init();
startGame();
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
