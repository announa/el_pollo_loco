let canvas;
let world;
let worldSize;
let keyboard = new Keyboard();
let playing = false;
let pause = true;
let intervals = [];
let currentLevel = 1;
let level;
let loading;

/**
 * Loads the world objects.
 */
async function init() {
  loading = Date.now();
  addTouchEvents();
  setCanvasSize();
  setLevel();
  world = new World(canvas, keyboard, level, worldSize, IMAGES, IMAGES.COINS, AUDIOS);
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
  showLoadingScreen();
  disableButtons();
  showCanvas();
}

function showLoadingScreen() {
  if (loading - Date.now() > -2700) {
    document.getElementById('loading-screen').classList.remove('d-none');
  }
}

/**
 * Disables all the buttons while loading the game.
 */
function disableButtons() {
  Array.from(document.querySelectorAll('.control-btn')).forEach((button) => (button.disabled = true));
  document.getElementById('bottle-btn').style = '';
}

function showCanvas() {
  let loadingInterval = setInterval(() => {
    if (loading - Date.now() < -3000) {
      hideStartscreen();
      enableButtons();
      setGameButtons();
      playing = true;
      pause = false;
      world.draw();
      clearInterval(loadingInterval);
    }
  }, 25);
}

/**
 * Hides the startscreen with an animation and the help-modal if it's open.
 */
function hideStartscreen() {
  let startscreen = document.getElementById('startscreen');
  startscreen.classList.add('hide-startscreen');
  setTimeout(() => {
    startscreen.classList.add('d-none');
    startscreen.classList.remove('hide-startscreen');
  }, 500);
  document.getElementById('loading-screen').classList.add('d-none');
  if (!document.getElementById('help-modal').classList.contains('d-none')) {
    closeHelp();
  }
}

function enableButtons() {
  Array.from(document.querySelectorAll('.control-btn')).forEach((button) => {
    button.classList.remove('button--foreground');
    button.disabled = false;
  });
}

function setGameButtons() {
  document.getElementById('next-btn').classList.add('d-none');
  document.getElementById('bottle-btn').style.visibility = 'visible';
  document.getElementById('pause-btn').classList.remove('d-none');
  document.getElementById('pause-btn').innerHTML = 'Pause';
  setRestartBtn('level');
}

function setRestartBtn(type) {
  let startBtn = document.getElementById('start-btn');
  startBtn.setAttribute('onclick', 'restart()');
  if (type == 'level') {
    startBtn.innerHTML = 'Restart Level';
  } else {
    startBtn.innerHTML = 'Restart Game';
  }
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

function gameOver() {
  playing = false;
  pause = true;
  showGameOverScreen();
  resetButtons();
  if (currentLevel == 3 && world.gameOver == 'won') {
    showEndScreen();
    currentLevel = 1;
  }
}

function showGameOverScreen() {
  document.getElementById(`${world.gameOver}screen`).classList.remove('d-none');
  if (currentLevel == 3 && world.gameOver == 'won') {
    showEndScreen();
  }
}

/**
 * Resets the buttons after game over. Shows Next Level-Button if character won.
 */
function resetButtons() {
  Array.from(document.querySelectorAll('button')).forEach((button) => button.classList.add('button--foreground'));
  document.getElementById('pause-btn').disabled = true;
  document.getElementById('bottle-btn').style = '';
  if (world.gameOver == 'won') {
    if (currentLevel < 3) {
      document.getElementById('next-btn').classList.remove('d-none');
      document.getElementById('pause-btn').classList.add('d-none');
    } else {
      setRestartBtn('game');
    }
  }
}

function showEndScreen() {
  setTimeout(() => {
    document.getElementById('wonscreen').classList.add('d-none');
    document.getElementById('gameover-screen').classList.remove('d-none');
  }, 1500);
}

function nextLevel() {
  document.getElementById('next-btn').disabled = true;
  stopRunningSounds();
  currentLevel++;
  restart();
}

/**
 * Restarts the game.
 */
async function restart() {
  stopRunningSounds();
  playing = false;
  pause = true;
  window.cancelAnimationFrame(world.animationFrame);
  await clearAllIntervals();
  showStartscreen();
  init();
  startGame();
}

/**
 * Stops the running lost or win sound.
 */
function stopRunningSounds() {
  let char = world.character;
  let sounds = world.character.SOUNDS;
  [sounds.WON, sounds.LOST].forEach((s) => char.stopSound(s));
  world.sound_theme.pause();
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

function showStartscreen() {
  Array.from(document.querySelectorAll('.screen')).forEach(s => s.classList.add('d-none'));
/*   if (world.gameOver) {
    document.getElementById(`${world.gameOver}screen`).classList.add('d-none');
    if
  } */
  document.getElementById('startscreen').classList.remove('d-none');
}
