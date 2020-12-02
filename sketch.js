var dog, happyDog, database, foodS, foodStock
var d, hd

function preload()
{
  d = loadImage("Dog.png");
  hd = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 250, 20, 20);
  dog.addImage(d);
  dog.scale=0.2

  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock)
  
}


function draw() {  
  background(color(179, 241, 242))
  drawSprites();
  text("Up Arrow to feed the puppy!", 100, 100);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(hd);
  }
  text("Food Left: " + foodS, 200, 150)

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
  if(x<=0){
  x=0
  }

  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}