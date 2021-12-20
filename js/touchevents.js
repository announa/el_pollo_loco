let lastTouchY;
let lastTouchX;
let touchTimer;

/**
 * Adds touche events to the body
 */
function addTouchEvents() {
  let body = document.body;
  body.addEventListener('touchstart', initiateMovements);
  body.addEventListener('touchmove', moveCharacter, { passive: false });
  body.addEventListener('touchend', stopCharacter);
}

/**
 * Starts registrating the touch movement.
 * @param {Object} event - The touch event
 */
function initiateMovements(event) {
  touchTimer = Date.now();
  if (!event.target.id.includes('btn')) {
    lastTouchX = event.touches[0].clientX;
    lastTouchY = event.touches[0].clientY;
    event.preventDefault();
  }
}

/**
 * Moves the character on touchmove after a delay of 10ms. Prevents default events (scrolling to address bar) only if the game is not paused.
 * @param {Object} event - The touch event.
 */
function moveCharacter(event) {
  if (!pause) {
    event.preventDefault();
    if (touchTimer - Date.now() < -10) {
      if (event.touches[0].clientY - lastTouchY < -2) {
        jumpEvent(event);
      } else {
        keyboard.UP = false;
        walkEvents(event)
      }
      lastTouchX = event.touches[0].clientX;
      lastTouchY = event.touches[0].clientY;
      world.lastKeyEvent = Date.now();
    }
  }
}

/**
 * Lets the character jump and move to the right or to the left..
 * @param {Object} event - The touch event.
 */
function jumpEvent(event){
  keyboard.UP = true;
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  if (event.touches[0].clientX - lastTouchX < -5) {
    keyboard.LEFT = true;
    keyboard.RIGHT = false;
  } else if (event.touches[0].clientX - lastTouchX > 5) {
    keyboard.RIGHT = true;
    keyboard.LEFT = false;
  }
}

/**
 * Detects if the touch moves to the right or to the left and moves the character respectively.
 * @param {Object} event - The touch event
 */
function walkEvents(event){
  if (event.touches[0].clientX - lastTouchX < -1) {
    keyboard.LEFT = true;
    keyboard.RIGHT = false;
  } else if (event.touches[0].clientX - lastTouchX > 1) {
    keyboard.RIGHT = true;
    keyboard.LEFT = false;
  }
}

/**
 * Stops the character movements on touchend.
 */
function stopCharacter() {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
}

