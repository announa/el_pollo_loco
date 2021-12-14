class Chick extends Chicken{
 name = 'Pollito';
 IMAGES_WALKING = [
   './img/3.Secuencias_Enemy_basico/Version_pollito/1.Ga_paso_derecho.png',
   './img/3.Secuencias_Enemy_basico/Version_pollito/2-Ga_centro.png',
   './img/3.Secuencias_Enemy_basico/Version_pollito/3.Ga_paso izquierdo.png',
 ];
 IMAGE_DEAD = ['./img/3.Secuencias_Enemy_basico/Version_pollito/4.G_muerte.png'];

 constructor(worldCanvas, worldSize){
  super(worldCanvas, worldSize);
 }
}