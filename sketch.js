var play= 1;
var end= 0;
var gameState= play;

var koya, koyaImage;
var pillow ,pillowImage, obstacle, obstacleImage;
var ground, invisibleGround, groundImage;
var gameOver, gameOverImg;
var pillowGroup, obstacleGroup;
var score;

function preload(){
  
  koyaImage= loadImage("koya.png");
  pillowImage = loadImage("pillow.png");
  obstacleImage = loadImage("fireball.png");
  groundImage= loadImage("forestImg.jpg");
  gameOverImg= loadImage("gameover.jpg");
}

function setup() {
  
  createCanvas(600,600);
  
  koya = createSprite(80,315,20,20);
  koya.addImage(koyaImage);
  koya.scale = 0.09;

  ground=createSprite(500,300,600,600);
  ground.addImage(groundImage);
  ground.scale=1.5;
  ground.x=ground.width/2;
  ground.velocityX=-4;
  
  invisibleGround= createSprite(300,590,600,10);
  invisibleGround.velocityX=-4;
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible= false;

  //gameOver= createSprite(400,100,1,1);
  //gameOver.addImage(gameOverImg);
  //gameOver.scale= 0.9;

  obstacleGroup = createGroup();
  pillowGroup = createGroup();

  score= 0;
}


function draw() {
  background(225);
    
  if (gameState=== play){
   // gameOver.visible= false;
     if (invisibleGround.x < 0){
   invisibleGround.x= invisibleGround.width/2;
  }
    
     if(ground.x<100){
    ground.x=ground.width/2;
  }
    
    if (koya.isTouching(pillowGroup)){
     pillowGroup.destroyEach();
     score = score+1;
  }
    switch(score){
      case 4: koya.scale= 0.10;
              break;
      case 10: koya.scale= 0.11;
              break;
      case 14: koya.scale= 0.12;
              break;
      case 18: koya.scale= 0.13;
              break;    
      case 26: koya.scale= 0.14;
              break;          
      case 36: koya.scale= 0.15;
              break;
        default: break;
    }
  
    if (keyDown("space")&& koya.y>= 200){
      koya.velocityY= -12;
    }
    koya.velocityY = koya.velocityY + 0.5;
    
    koya.collide(invisibleGround);
    
    if (koya.isTouching(obstacleGroup)){
      gameState= end;
    }
}
  
  else {
    (gameState=== end)
    background("black");
    reset();
  }  
    
  cushion();
  obstacles();
  drawSprites();
  
  
  stroke("black");
  textSize(30);
  fill("yellow");
  text ("Score:" + score, 400,50);
}

function cushion(){
  
  if (frameCount % 80=== 0){
    var pillow = createSprite(400,40,10,10);
    pillow.y = Math.round(random(90,200));
    pillow.addImage(pillowImage);
    pillow.velocityX = -3
    pillow.lifetime = 150;
    pillow.scale = 0.2;
    koya.depth = pillow.depth + 1;
    
    pillowGroup.add(pillow);

  }
}

function obstacles(){
  
  if (frameCount % 300=== 0){
    var fireBall= createSprite(500,550,40,40);
    fireBall.velocityX= -3;
    fireBall.addImage(obstacleImage);
    fireBall.setCollider("circle",0,0,180);
    fireBall.scale= 0.2;
    fireBall.lifetime= 150;
    obstacleGroup.add(fireBall);
  }
}
function reset(){
 // background("black");
 //gameOver.visible= true;

  ground.velocityX = 0;
  koya.velocityY = 0;
  
  obstacleGroup.setVelocityXEach(0);
  pillowGroup.setVelocityXEach(0);

  pillowImage.visible= false;
  obstacleImage.visible= false;
  
  fill("white")
  text("GAME OVER!", 300,300);
}
