let lastTouchY

function addTouchEvents(){
 let body = document.body;
 body.addEventListener('touchstart', walkCharacter)
 body.addEventListener('touchend', stopCharacter)
 body.addEventListener('touchmove', moveCharacter)
}

function walkCharacter(event){
 if(event.touches[0].clientX < window.innerWidth / 2){
  keyboard.LEFT = true;
 } else{
  keyboard.RIGHT = true;
 }
 console.log(event.touches[0].clientX)
}

function stopCharacter(){
 keyboard.LEFT = false;
 keyboard.RIGHT = false;
 keyboard.UP = false;
}

function moveCharacter(event){
 if(event.touches[0].clientX < window.innerWidth / 2){
  keyboard.LEFT = true;
  keyboard.RIGHT = false;
 } else{
  keyboard.RIGHT = true;
  keyboard.LEFT = false;
 }
 if(event.touches[0].clientY - lastTouchY < -20){
  keyboard.UP = true;
 }
 else{
  keyboard.UP = false;
 }
 lastTouchY = event.touches[0].clientY;
}