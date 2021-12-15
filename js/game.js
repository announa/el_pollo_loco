let canvas;
let world;
let keyboard = new Keyboard();
let playing = false;
let pause = true;
let intervals = [];
let currentLevel = 1;
let level;

function init() {
  world = null;
  level = null;
  setCanvasSize();
  setLevel()
  world = new World(canvas, keyboard, level);
}

function setLevel(){
  if(currentLevel == 1){
    setLevel1();
  } else if(currentLevel == 2){
    setLevel2();  // level 2 not yet implemented
  }
}

function startGame() {
  prepareCanvas();
  playing = true;
  pause = false;
  world.draw();
}

function prepareCanvas() {
  hideScreens();
  setButtons();
  if (!document.getElementById('help-modal').classList.contains('d-none')) {
    closeHelp();
  }
}

function setCanvasSize() {
  canvas = document.getElementById('canvas');
  canvasContainer = document.getElementById('canvas-container');
  canvas.height = canvasContainer.clientHeight;
  canvas.width = canvasContainer.clientWidth;
}

function hideScreens() {
  let screens = Array.from(document.querySelectorAll('.screen'));
  screens.forEach((screen) => {
    screen.classList.add('hide-startscreen');
    setTimeout(() => {
      screen.classList.add('d-none');
      screen.classList.remove('hide-startscreen');
    }, 500);
  });
}

function setButtons() {
  Array.from(document.querySelectorAll('button')).forEach((button) => button.classList.remove('button--foreground'));
  setRestartBtn();
  setPauseBtn();
}

function setRestartBtn() {
  let startBtn = document.getElementById('start-btn');
  startBtn.innerHTML = 'Restart Level';
  startBtn.setAttribute('onclick', 'restart()');
}

function setPauseBtn() {
  let pauseBtn = document.getElementById('pause-btn');
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

async function restart() {
  playing = false;
  pause = true;
  await clearAllIntervals();
  init();
  startGame();
}

function clearAllIntervals() {
  return new Promise((resolve, reject) => {
    let length = intervals.length;
    for (let i = 0; i < length; i++) {
      clearInterval(intervals[0]);
      intervals.shift();
      console.log(intervals);
    }
    resolve();
  });
}

function gameOver() {
    playing = false;
    pause = true;
    document.getElementById(`${world.gameOver}screen`).classList.remove('d-none');
    if(world.gameOver == 'won'){
      currentLevel++;
    }
    resetButtons();
}

function resetButtons() {
  Array.from(document.querySelectorAll('button')).forEach((button) => button.classList.add('button--foreground'));
  if(world.gameOver == 'won'){
    document.getElementById('start-btn').innerHTML = 'Next Level';
  }
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
