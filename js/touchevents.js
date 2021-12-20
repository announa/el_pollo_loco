let lastTouchY;
let lastTouchX;

function addTouchEvents() {
  let body = document.body;
  body.addEventListener('touchstart', walkCharacter);
  body.addEventListener('touchend', stopCharacter);
  body.addEventListener('touchmove', moveCharacter, { passive: false });
}

function walkCharacter(event) {
 world.lastKeyEvent = Date.now();
 if(!event.target.id.includes('btn')){
 lastTouchX = event.touches[0].clientX;
 lastTouchY = event.touches[0].clientY;

  if (event.touches[0].clientX < window.innerWidth / 2) {
    keyboard.LEFT = true;
  } else {
    keyboard.RIGHT = true;
  }
  event.preventDefault();
 }
}

function stopCharacter() {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
}

function moveCharacter(event) {
  if (Math.abs(event.touches[0].clientY - lastTouchY) < 20) {
    event.preventDefault();
  }
  if (event.touches[0].clientX - lastTouchX < -5) {
    keyboard.LEFT = true;
    keyboard.RIGHT = false;
  } else if (event.touches[0].clientX - lastTouchX > 5) {
    keyboard.RIGHT = true;
    keyboard.LEFT = false;
  }
  if (event.touches[0].clientY - lastTouchY < -5) {
    keyboard.UP = true;
  } else {
    keyboard.UP = false;
  }
  lastTouchX = event.touches[0].clientX;
  lastTouchY = event.touches[0].clientY;
  world.lastKeyEvent = Date.now();
}
