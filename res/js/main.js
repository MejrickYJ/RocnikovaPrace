import { Player, Estus, Platform, Spike, Enemy } from "./classes.js";
import { platformCollision } from "./collision.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let speed = 0.5;
let score = 0;
let turned = false;
let dead = false;

canvas.width = 1600;
canvas.height = 800;



const player = new Player();  //vytvoření hráče
const platforms = [new Platform(725,100,150,50),
                   new Platform(1050,200,150,50),
                   new Platform(400,200,150,50),
                   new Platform(700,350,200,50),
                   new Platform(650,650,300,50),
                   new Platform(400,500,150,50),
                   new Platform(1050,500,150,50),
                   new Platform(70,350,120,50),
                   new Platform(1400,352,120,50)
                  ];

const spikes =  [new Spike(1318,750,40,50),
                 new Spike(242,750,40,50), 
                 new Spike(780,300,40,50),
                 new Spike(455,150,40,50),
                 new Spike(1105,150,40,50)
                ]; 

const enemy = new Enemy(600,124,50,50);
const enemy2 = new Enemy(950,550,50,50);
const enemy3 = new Enemy(450,750,50,50);

const estus = new Estus();
export { player, platforms, spikes, enemy, enemy2, enemy3, estus };

function draw() {

  let background = new Image();
  let estusI = new Image();
  let spikeI = new Image();

  estusI.src = "./res/img/estus.png";
  background.src = "./res/img/backgroundI.jpg";
  spikeI.src = "./res/img/spike.png";
  ctx.drawImage(background,0,0,canvas.width,canvas.height);
  ctx.drawImage(estusI,estus.x,estus.y,estus.width,estus.height);
  
  spikes.forEach((spikes) => {
      ctx.drawImage(spikeI,spikes.x, spikes.y, spikes.width, spikes.height);
  });

  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "green";
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);
  ctx.fillRect(enemy3.x, enemy3.y, enemy3.width, enemy3.height);


  ctx.fillStyle = "orangered";
}

function acceleration(){
  if (player.y + player.height + player.velocityY < canvas.height) {
    player.velocityY += speed;
  } else {
    player.velocityY = 0;
  }
}


function spikeCollision(){
  spikes.forEach((spikes) => {
  //Kolize se spikem
  if(player.y + player.height + player.velocityY >= spikes.y && player.x + player.width >= spikes.x &&
    player.y <= spikes.y + spikes.height && player.x <= spikes.x + spikes.width){
      document.querySelector('#death').innerHTML='YOU DIED';
      t=0;
      dead = true;
      
    } 

  });
};

let r = 0;
function estusPosition(){
  let i = Math.floor(Math.random() * 5 + 1);
  while(r==i) i = Math.floor(Math.random() * 5 + 1);
  
  switch(i){
    case 1:
      estus.x = 95;
      estus.y = 275;
      break;
    case 2:
      estus.x = 50;
      estus.y = 680;
      break;
    case 3:
      estus.x = 1425;
      estus.y = 275;
      break;
    case 4:
      estus.x = 1480;
      estus.y = 680;
      break;
    case 5:
      estus.x = 765;
      estus.y = 30;
      break;    
  }
  r = i;
}; 

function enemyCollision(){
  if(player.y + player.height + player.velocityY >= enemy.y && player.x + player.width >= enemy.x &&
    player.y <= enemy.y + enemy.height && player.x <= enemy.x + enemy.width) turned = true, document.querySelector('#gameover').innerHTML='YOU TURNED';

  if(player.y + player.height + player.velocityY >= enemy2.y && player.x + player.width >= enemy2.x &&
    player.y <= enemy2.y + enemy2.height && player.x <= enemy2.x + enemy2.width) turned = true, document.querySelector('#gameover').innerHTML='YOU TURNED';
    
  if(player.y + player.height + player.velocityY >= enemy3.y && player.x + player.width >= enemy3.x &&
    player.y <= enemy3.y + enemy3.height && player.x <= enemy3.x + enemy3.width) turned = true, document.querySelector('#gameover').innerHTML='YOU TURNED';

}

let m = 6;
let move = true;

function enemyMovement(){
  if(enemy.y == 124) move = true; 
  if(enemy.y == 550) move = false;
  if(move) {enemy.y += m;}
  else {enemy.y -= m;}

  
  
  if(move) {enemy2.y -= m;}
  else {enemy2.y += m;}
  

  if(move) {enemy3.x += m*1.5;}
  else {enemy3.x -= m*1.5;}

}

let time = 7;
let t = 1;
function transformation(){   
    if(time>0){
      time = time - t;
      setTimeout(transformation, 1000);  
      document.querySelector('#time').innerHTML='TIME: ' + time;
    }
    if(time == 0){
      document.querySelector('#gameover').innerHTML='YOU TURNED';
      turned = true;
    }
  }
  
transformation();


function estusCollision(){
  if(player.y + player.height + player.velocityY >= estus.y && player.x + player.width >= estus.x &&
    player.y <= estus.y + estus.height && player.x <= estus.x + estus.width) estusPosition(), score++, time = 7;

};

function movement(){
  if (keys.a.pressed) player.velocityX = -5;
  else if (keys.d.pressed) player.velocityX = 5;
  player.x += player.velocityX;

}


export const keys = { 

  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}


window.addEventListener("keydown", (event) => {
  
  switch (event.key) {
    case " ":
      if(player.velocityY == 0) player.velocityY = -14.55;
      break;
      
    case "a":
      keys.a.pressed = true;
      break;

    case "d":
      keys.d.pressed = true;
      break;

    case "A":
      keys.a.pressed = true;
      break;
  
    case "D":
      keys.d.pressed = true;
      break;  
    
    case "r":
      location.reload();
      break;

    case "R":
      location.reload();
      break;        
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {

    case "a":
      keys.a.pressed = false;
      break;

    case "d":
      keys.d.pressed = false;
      break;

    case "A":
      keys.a.pressed = false;
      break;
  
    case "D":
      keys.d.pressed = false;
      break;  
  }
});

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  document.querySelector('#score').innerHTML='SCORE: '  + score;
  player.velocityX = 0;

  if(player.x <= 0) keys.a.pressed = false;
  else if(player.x >= 1549) keys.d.pressed = false;
  else if(player.y <= 0) player.velocityY = 0;

  draw();

  platforms.forEach((platforms) => {
      ctx.fillRect(platforms.x, platforms.y, platforms.width, platforms.height);
    });

  if(turned){
    ctx.fillStyle = "green";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    keys.a.pressed = false;
    keys.d.pressed = false;
    player.velocityY = 0;
    speed = 0;
    t = 0;
    m = 0;
  }
  
  if(dead){
      keys.d.pressed = false;
      keys.a.pressed= false;
      player.velocityX = 0;
      player.velocityY = 0;
      speed = 0;
      m = 0;
  }

  movement();
  acceleration();
  platformCollision();
  estusCollision();
  enemyCollision();
  spikeCollision();
  enemyMovement();
  player.gravity();
  
}


window.onload = () => {
  window.requestAnimationFrame(gameLoop);
};
