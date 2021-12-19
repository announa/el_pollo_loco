class Coin extends MovableObject {
  name = 'coin';
  coinInterval;
  sound_coin;
  sound_bling;

  constructor(worldCanvas, worldSize, IMAGES, AUDIOS, big) {
    super(worldCanvas);
    super.setImages(IMAGES)
    super.loadImage(this.IMAGES[0]);
    super.setSounds(AUDIOS);
    this.setDimensions(worldSize, big);
    this.animate();
  }

  setDimensions(worldSize, big) {
    this.x = 0.3 * this.worldCanvas.width + Math.random() * this.worldCanvas.width * (worldSize - 1.25);
    this.y = 0.22 * this.worldCanvas.height + Math.random() * 0.1 * this.worldCanvas.height;
    this.height = 0.25 * this.worldCanvas.height;
    this.width = 0.25 * this.worldCanvas.height;
    if(big){
      this.y = 0.5 * this.worldCanvas.height;
      this.width = 0.3 * this.worldCanvas.height;
      this.height= 0.3 * this.worldCanvas.height;
    }
  }

  getCollisionCoordinates() {
    this.setCollisionCoordinates(
      0.35 * this.width,
      0.65 * this.width,
      0.35 * this.width,
      0.65 * this.width,
      0.35 * this.height,
      0.65 * this.height,
      false
    );
    }

  setSounds(AUDIOS){
    this.SOUNDS = AUDIOS;
    this.sound_coin = new Audio(this.SOUNDS.COIN.AUDIO);
    this.sound_coin.volume = this.SOUNDS.COIN.VOLUME;
    this.sound_bling = new Audio(this.SOUNDS.BLING.AUDIO);
    this.sound_bling.volume = this.SOUNDS.BLING.VOLUME;
  }

  animate(){
    let coinTimeout = setTimeout(() => {
      let imgRepetition = Math.random() * 3;
      this.coinInterval = setInterval(() => {
        this.playAnimation(this.IMAGES, imgRepetition)
      }, 500);
      intervals.push(this.coinInterval);
    }, Math.random() * 3);
  }

  playcollidingSound(){
    this.playSound(this.SOUNDS.COIN)
  }
  play10CoinsSound(){
    this.playSound(this.SOUNDS.BLING)
  }
}
