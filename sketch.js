var bg, bgImg
var earth, earthImg
var ufo, ufoImg1, ufoImg2, ufoImg3, ufoImg4 , ufoGrp
var earthShip, earthShipImg
var laser, laserImg, laserGrp
var gameOver, gameOverImg
var restart, restartImg
var life, lifeImg
var death, deathImg
var gameState = "play"
var score = 0;

function preload(){
  bgImg = loadImage("images/bg1.jpg");
  earthImg = loadImage("images/earth.png");
  ufoImg1 = loadImage("images/ss1.png");
  ufoImg2 = loadImage("images/ss2.png");
  ufoImg3 = loadImage("images/ss3.png");
  ufoImg4 = loadImage("images/ss4.png");
  earthShipImg = loadImage("images/earthufo.png");
  gameOverImg = loadImage("images/gameover.png");
  restartImg = loadImage("images/restart.png");
  lifeImg = loadImage("images/lives.png");
  deathImg = loadImage("images/deaths.png");
  laserImg = loadAnimation("images/l1.png","images/l2.png","images/l3.png","images/l4.png","images/l5.png","images/l6.png","images/l7.png","images/l8.png","images/l9.png");

}

function setup() {
  createCanvas(1700,800);
  bg = createSprite(900,500,1700,800);
  bg.addImage(bgImg);
  
  earth = createSprite(-400,500);
  earth.addImage(earthImg);
  earth.scale =5;
  earth.debug = true;
  earth.setCollider("circle",0,0,125)

  earthufo = createSprite(150,500);
  earthufo.addImage(earthShipImg);
  earthufo.scale =-0.3;

  ufoGrp = new Group();

  laserGrp = new Group();
}

function draw() {
  background(0); 
  drawSprites();
  fill("white");
  stroke("white");
  textSize(30);
  text("score: "+score, 150,50)
  if(gameState === "play"){
    if(keyDown(UP_ARROW)){
      earthufo.y -= 5;
    }
    if(keyDown(DOWN_ARROW)){
      earthufo.y += 5;
    }
    if(keyDown("space")){
      releaselaser();
    }
    spawnufo();
   laserGrp.isTouching(ufoGrp,destroyufo)
   if(ufoGrp.isTouching(earth)){
     gameState = "end";
   }
  }
  if(gameState === "end"){
    stroke("white");
    fill("white");
    textSize(50);
    text("game over",800,500);
  }
}

function spawnufo(){
  if(frameCount % 150==0){
    var rand = Math.round(random(10,1200));
    ufo = createSprite(1700,rand,10,10);
    ufo.velocityX = -4;
    var randImg = Math.round(random(1,4));
    switch(randImg){
      case 1: ufo.addImage(ufoImg1)
      ufo.scale = 0.3;
      break
      case 2: ufo.addImage(ufoImg2)
      ufo.scale = 0.5;
      break
      case 3: ufo.addImage(ufoImg3)
      ufo.scale = 0.3;
      break
      case 4: ufo.addImage(ufoImg4)
      ufo.scale = 0.3;
      break 
    }
    ufo.lifetime = 426;
    ufoGrp.add(ufo);
  }
}

function releaselaser(){
  var laser = createSprite(150,100,60,5);
  laser.shapeColor = "red";
  laser.y = earthufo.y;
  laser.x = 150;
  laser.velocityX = 4;
  laser.lifetime = 425;
  laserGrp.add(laser)
}

function destroyufo(laser,ufo){
  ufo.destroy();
  laser.lifetime = 0;
  score++;
}




