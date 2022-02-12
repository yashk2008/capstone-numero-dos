var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climberGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group()
  climberGroup = new Group()
  ghost = createSprite(200,200)
  ghost.addImage(ghostImg)
  ghost.scale = 0.40
  invisibleBlockGroup = new Group()
}

function draw() {
  background(200);
  if (gameState == "play") {
    
  if(tower.y > 400){
      tower.y = 300
  }
    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x-3
    }
    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x+3
    }
    if (keyDown("SPACE")) {
      ghost.velocityY =-5
    }
    ghost.velocityY = ghost.velocityY+0.8
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY=0
    }
    if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
    ghost.destroy();
    gameState = "end"

    }
  spawnDoors();
  drawSprites()
  } else {
  background("green")
  fill("red")
  text("GAME OVER",275,300)
 }
}
function spawnDoors() {
if (frameCount%240 == 0) {
  door = createSprite(42,-50)
  door.addImage(doorImg)
  door.x = Math.round(random(120,400))
  door.velocityY = 1
  door.lifetime = 800
  doorsGroup.add(door)
  climber = createSprite(99,10)
  climber.addImage(climberImg)
  climber.x = door.x
  climber.velocityY = 1
  climber.lifetime = 800
  climberGroup.add(climber)
  ghost.depth = door.depth
  ghost.depth+=1
  invisibleBlock = createSprite(200,15)
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
  invisibleBlock.x = door.x
  invisibleBlock.velocityY = 1
  invisibleBlock.lifetime = 800
  invisibleBlockGroup.add(invisibleBlock)
  invisibleBlock.debug = true
}
}
