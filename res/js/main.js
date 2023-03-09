const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

const speed = 0.7;

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  ctx.fillStyle = "green";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function acceleration(){
  if (player.y + player.height + player.velocityY < canvas.height) {
    player.velocityY += speed;
  } else {
    player.velocityY = 0;
  }
}

function movement(){
  if (keys.a.pressed) player.velocityX = -4;
  else if (keys.d.pressed) player.velocityX = 4;
  player.x += player.velocityX;

}

class Player {
  constructor() {
    this.x = 800;  //pozice na ose X
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

const player = new Player();  //vytvoření hráče

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
       if(player.velocityY === 0) player.velocityY = -15;
        console.log("jump");
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
  
  movement();

  clearCanvas();

  draw();

  acceleration();
  
  player.gravity();
}

window.onload = () => {
  window.requestAnimationFrame(gameLoop);
};
