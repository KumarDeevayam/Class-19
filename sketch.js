var tower,towerimage;
var door,doorimage,doorgroup;
var climber,climberimage,climbergroup;
var ghost,ghostimage;
var ivblock,ivblockgroup;
var gameState="play";
function preload(){
  towerimage=loadImage("tower.png");
  doorimage=loadImage("door.png");
  climberimage=loadImage("climber.png");
  ghostimage=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerimage);
  doorgroup= new Group();
  climbergroup= new Group();
  ghost=createSprite(200,200);
  ghost.addImage(ghostimage);
  ghost.scale=0.4;
  ivblockgroup= new Group ();
sound.loop();
}
function draw(){
  background("black");
  if(gameState==="play"){
    
  
  tower.velocityY=3;
  if (tower.y>600){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-3;
  }
 
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY+=0.8;
  if (climbergroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(ivblockgroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  spawndoors();
  drawSprites();
  }
  if(gameState==="end"){
    stroke("yellow"); 
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
    
    
    
  }
}
function spawndoors(){
  if (frameCount%200===0){
    door=createSprite(200,0);
    door.addImage(doorimage);
    door.velocityY=3;
    door.x=Math.round(random(120,400));
    door.lifetime=200;
    doorgroup.add(door);
    door.depth=ghost.depth;
    ghost.depth+=1;
    
    climber=createSprite(200,50);
    climber.addImage(climberimage);
    climber.velocityY=3;
    climber.x=door.x
    climber.lifetime=200;
    climbergroup.add(climber); 
    
   ivblock=createSprite(200,50,climber.width,2);
   ivblock.velocityY=3;
   ivblock.x=door.x
   ivblock.lifetime=200;
    ivblock.debug=true;
   ivblockgroup.add(ivblock); 
  }
  
}