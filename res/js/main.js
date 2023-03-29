const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let speed = 0.5;

canvas.width = 1600;
canvas.height = 800;

class Player {
  constructor() {
    this.x = 775;  //pozice na ose X
    this.y = 25;  //pozice na ose Y
    this.width = 50;  //šířka hráče
    this.height = 50; //výška hráče
    this.velocityX = 0; //rychlost na ose X po které se hráč bude posouvat
    this.velocityY = 1;  //rychlost na ose Y po které se hráč bude posouvat
  }
  gravity() {
    player.y += player.velocityY;  //do hráčovy pozice na ose Y se přičíta rychlost na ose Y, způsobuje padání dolů
  }
}

class Platform {
  constructor() {
    this.x = 725;
    this.y = 75;  
    this.width = 150;
    this.height = 50;
  }

}

class Spike{
  constructor() {
    this.x = 1000;
    this.y = 750;  
    this.width = 20;
    this.height = 50;
  }
}

const player = new Player();  //vytvoření hráče
const platform = new Platform();
const spike =  new Spike();




function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  ctx.fillStyle = "green";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "black";
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

  ctx.fillStyle = "orange";
  ctx.fillRect(spike.x, spike.y, spike.width, spike.height);
}

function acceleration(){
  if (player.y + player.height + player.velocityY < canvas.height) {
    player.velocityY += speed;
  } else {
    player.velocityY = 0;
  }
}

//Collision
function collision(){
  
  if(player.y + player.height + player.velocityY >= platform.y && player.x + player.width >= platform.x &&
     player.y <= platform.y + platform.height && player.x <= platform.x + platform.width){
    
    player.velocityY = 0;
    speed = 0;

  }
  else{
    speed = 0.5;
  }


/////POZN. Kolize se spikem na leve strane - dodelat kolizi se zbytkem stran

  if(player.x + player.width + player.height  == spike.x + spike.height && player.y + player.height >= spike.y) console.log("jsi skoncil")


  if(player.x + player.width == platform.x && player.y <= platform.y + platform.height) keys.d.pressed = false;
  if(player.x == platform.x + platform.width && player.y <= platform.y + platform.height) keys.a.pressed = false;
}
//////


function movement(){
  if (keys.a.pressed) player.velocityX = -5;
  else if (keys.d.pressed) player.velocityX = 5;
  player.x += player.velocityX;

}



const keys = { 

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
       if(player.velocityY == 0) player.velocityY = -15;
      break;
      

    case "a":
      keys.a.pressed = true;
      break;

    case "d":
      keys.d.pressed = true;
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
  }
});

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  player.velocityX = 0; 
  if(player.x <= 0) keys.a.pressed = false;
  else if(player.x >= 1549) keys.d.pressed = false;
  else if(player.y <= 0) player.velocityY = 0;

  collision();

  movement();

  

  clearCanvas();

  draw();

  acceleration();
  
  player.gravity();
}

window.onload = () => {
  window.requestAnimationFrame(gameLoop);
};
