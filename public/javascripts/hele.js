noStroke();
// 25
var wallTimer = 0;
var player = {x:150, y:250, size:50};
var coins = [];
var gap = {height: 300, y: 250};          
var gravity = 0;
var goUp = false;
var crashed = false;
var score = 0;
var walls = [];

var draw = function() {

  background(0,0,0);
  drawPlayer();
  drawWalls();
  drawScore();
 
 
  if (!crashed) {
    movePlayer();
    doCoin();
    moveWalls();
  } else {
    youLoseScreen();
  }
};

var moveWalls = function() {
  for(var wall of walls) {
    wall.x-=3;
  if (player.y - player.size/2 < wall.y + wall.h &&
      player.y + player.size/2 > wall.y) {
      crashed = true;
    }
  }
  
  };
  
  
  if (wallTimer <= 0) {
    wallTimer = 16;
    gap.y += 25 * floor(random(2.99) - 1);
   if (gap.y < 150) {
     gap.y = 150;
   }
   if (gap.y > 350) {
     gap.y = 350;
   }
   
   var newWall = {x: 500, y:0, w:50, h: gap.y - gap.height / 2};
    walls.push(newWall);
   var bottomwall = {x:500,y:400,w:50,h: 500};
    walls.push(bottomwall);
  }
  wallTimer -= 1;



 var doCoin = function() {
  
  var filteredCoins = coins.filter((coin) => {return coin.x > 0 && !coin.collected});
  coins = filteredCoins;
  
  
  if (random(0,100) < 3) {
    var newCoin = {x: 600, y: random(0,500), size: 20, collected: false};
    coins.push(newCoin);
  }

  
  for (var coin of coins) {
  
   
   fill(250,250,0);
   ellipse (coin.x,coin.y,coin.size,coin.size);

  coin.x -= 3;
   
 var playerRadius = player.size / 2;
 var coinRadius = coin.size / 2;
 var touchDistance = playerRadius + coinRadius;
 
 if (dist(player.x,player.y,coin.x,coin.y) < touchDistance){
  coin.collected = true; 
  score += 1;
    }
  }
};

var drawPlayer = function(){
  fill(0,0,225);
  ellipse(player.x,player.y,player.size,player.size);
};

var movePlayer = function() {
  if (goUp) {
  gravity -= 0.2;
  } else {
  gravity += 0.2;
  }
  
  if (gravity > 8) {
    gravity = 8;
  }
  if (gravity < -6) {
    gravity = -6;
  }
  player.y += gravity;

  if (player.y > 500 || player.y < 0) {
    crashed = true;
  }
};

var mousePressed = function() {
  if (mouseButton === LEFT) {
    goUp = true;
    if (crashed) {
    crashed = false;
     player.y = 250;
     gravity = 0;
    
     score = 0;
     coins = [];
    }
  }
};

var mouseReleased = function() {
  if (mouseButton === LEFT) {
    goUp = false;
  }
};
var drawWalls = function() {
  for(var wall of walls) {
    rect(wall.x,wall.y,wall.w,wall.h);
  }
};
var youLoseScreen = function() {
  fill(225);
  
  textSize(24);
  
  text("Game Over",200,200);
  
  text ("Click to Restart", 180,350);
  
};
var drawScore = function() {
  fill(255,255,0);
  textSize(24);
  text(score,50,450);
};