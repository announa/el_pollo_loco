let canvas;
let world;
let worldSize;
let keyboard = new Keyboard();
let playing = false;
let pause = true;
let intervals = [];
let currentLevel = 1;
let level;

/**
 * Loads the world objects.
 */
function init() {
  setCanvasSize();
  setLevel(currentLevel);
  world = new World(canvas, keyboard, level, worldSize, IMAGES, IMAGES.COINS);
}

/**
 * Sets the canvas pixel size dependint on the canvas-container-size.
 */
function setCanvasSize() {
  canvas = document.getElementById('canvas');
  canvasContainer = document.getElementById('canvas-container');
  canvas.height = canvasContainer.clientHeight;
  canvas.width = canvasContainer.clientWidth;
}

function startGame() {
  prepareCanvas();
  playing = true;
  pause = false;
  world.draw();
}

/**
 * Hides the startscreen or endscreen and changes the appearence of the buttons. If help is open, it will be closed.
 */
function prepareCanvas() {
  hideScreens();
  setButtons();
  if (!document.getElementById('help-modal').classList.contains('d-none')) {
    closeHelp();
  }
}

/**
 * Hides the startscreen and the game over-screens.
 */
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
  document.getElementById('next-btn').classList.add('d-none');
  document.getElementById('pause-btn').classList.remove('d-none');
  document.getElementById('pause-btn').disabled = false;
  setRestartBtn();
}

function setRestartBtn() {
  let startBtn = document.getElementById('start-btn');
  startBtn.innerHTML = 'Restart Level';
  startBtn.setAttribute('onclick', 'restart()');
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

/**
 * Clears all the intervals that hav been set in the world objects.
 */
function clearAllIntervals() {
  return new Promise((resolve, reject) => {
    let intervalAmount = intervals.length;
    for (let i = 0; i < intervalAmount; i++) {
      clearInterval(intervals[0]);
      intervals.shift();
    }
    resolve();
  });
}

function gameOver() {
  playing = false;
  pause = true;
  document.getElementById(`${world.gameOver}screen`).classList.remove('d-none');
  resetButtons();
}

/**
 * Resets the buttons after game over. Shows Next Level-Button if character won.
 */
function resetButtons() {
  Array.from(document.querySelectorAll('button')).forEach((button) => button.classList.add('button--foreground'));
  document.getElementById('pause-btn').disabled = true;
  if (world.gameOver == 'won') {
    document.getElementById('next-btn').classList.remove('d-none');
    document.getElementById('pause-btn').classList.add('d-none');
  }
}


function nextLevel() {
  currentLevel++;
  restart();
}

/**
 * Restarts the game.
 */
 async function restart() {
  playing = false;
  pause = true;
  window.cancelAnimationFrame(world.animationFrame);
  await clearAllIntervals();
  init();
  startGame();
}


