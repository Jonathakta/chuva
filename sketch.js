  
var towerImg, tower;
var chuvaImg, chuva, chuvasGroup;
var climberImg, climber, climbersGroup;
var aranha, aranhaImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  chuvaImg = loadImage("chuva.png");
  climberImg = loadImage("climber.png");
  aranhaImg = loadImage("aranha.gif");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  chuvasGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  aranha = createSprite(200,200,50,50);
  aranha.scale = 0.3;
  aranha.addImage("aranha", aranhaImg);
}


function draw() {
  background(255);
 
  
  if (gameState === "play") {
    
    if(keyDown("LEFT_ARROW")){
        aranha.x = aranha.x - 3;

      // escreva o código para mover para a esquerda quando a tecla para a esquerda for pressionada
    }
    if(keyDown("RIGHT_ARROW")){
  
          aranha.x = aranha.x + 3;

      // escreva o código para mover para a direita quando a tecla para a direita for pressionada
      
    }
    if(keyDown("SPACE")){
  
         aranha.velocityY = -10;

      // escreva o código para mover para cima quando a tecla espaço for pressionada
      
    }
  
  aranha.velocityY = aranha.velocityY + 0.8;
  
  
      //escreva uma condição para a torre de rolagem infinita
      if(tower.y > 400 ){
        tower.y = 300
      } 

      spawnDoors();


     
//escreva um código para fazer invisibleBlockGroup (grupo de bloco invisível) colidir com o fantasma, destruir o fantasma e mudar o estado do jogo para end.
     if(climbersGroup.isTouching(aranha)){
      aranha.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(aranha) || aranha.y > 600){
      aranha.destroy();
      gameState = "end";
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  
  }
}

function spawnDoors()
 {
  //escreva o código aqui para gerar as portas
  if (frameCount % 240 === 0) {
    var chuva = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;

    invisibleBlock.height = 2;

    chuva.scale=0.1
    //adicione a função aleatória
    chuva.x = Math.round(random(120,400));
    climber.x = chuva.x;
    chuva.addImage(chuvaImg);
    climber.addImage(climberImg);
    
    chuva.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //mude a profundidade do fantasma e da porta
    invisibleBlock.x = chuva.x;
     
    aranha.depth = chuva.depth;
    aranha.depth =1;
    
    //atribuir tempo de vida para a porta, escalador e bloco invisível

    chuvasGroup.lifetime = 800;
    climbersGroup.lifetime = 800;
    invisibleBlockGroup.lifetime = 800;
    //adicione cada obstáculo ao grupo obstaclesGroup.add(obstacle); aqui os obstáculos são as portas, o escalador e o bloco invisível
    
    chuvasGroup.add(chuva);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

