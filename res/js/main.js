const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let speed = 0.5;

canvas.width = 1600;
canvas.height = 800;

class Player {
  constructor() {
    this.x = 775;  //pozice na ose X
    this.y = 50;  //pozice na ose Y
    this.width = 50;  //šířka hráče
    this.height = 50; //výška hráče
    this.velocityX = 0; //rychlost na ose X po které se hráč bude posouvat
    this.velocityY = 1;  //rychlost na ose Y po které se hráč bude posouvat
  }
  gravity() {
    player.y += player.velocityY;  //do hráčovy pozice na ose Y se přičíta rychlost na ose Y, způsobuje padání dolů
  }
}

class Estus {
  constructor(){
    this.x = 115;
    this.y = 275;
    this.width = 30;
    this.height = 50;
  }
}

class Platform {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;  
    this.width = w;
    this.height = h;
  }
  
}

class Spike{
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y; 
    this.width = w;
    this.height = h;
  }
}

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

const spikes =  [new Spike(1325,750,25,50),
                 new Spike(250,750,25,50), 
                 new Spike(788,300,25,50),
                 new Spike(788,750,25,50),
                 new Spike(462,150,25,50),
                 new Spike(1112,150,25,50)
                ];  
const estus = new Estus();



function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  ctx.fillStyle = "green";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "yellow";
  ctx.fillRect(estus.x, estus.y, estus.width, estus.height);

  ctx.fillStyle = "orange";
  
  
  ctx.fillStyle = "black";
}

function acceleration(){
  if (player.y + player.height + player.velocityY < canvas.height) {
    player.velocityY += speed;
  } else {
    player.velocityY = 0;
  }
}

//Collision
function platformCollision(){
  platforms.forEach((platforms) => { 
  //Kolize s horní a dolní stranou platformy
  if(player.y + player.height + player.velocityY >= platforms.y && player.x + player.width >= platforms.x &&
     player.y <= platforms.y + platforms.height && player.x <= platforms.x + platforms.width){
    
    player.velocityY = 0;
    speed = 0;

  }
  else{
    speed = 0.5;
  }

  //Kolize s levou stranou platformy
  if(player.x + player.width == platforms.x && (player.y <= platforms.y + platforms.height && player.y >= platforms.y) || player.x + player.width == platforms.x && (player.y + player.height <= platforms.y + platforms.height && player.y + player.height >= platforms.y)) keys.d.pressed = false;
  //Kolize s pravou stranou platformy
  if(player.x == platforms.x + platforms.width && (player.y <= platforms.y + platforms.height && player.y >= platforms.y) || player.x == platforms.x + platforms.width && (player.y + player.height <= platforms.y + platforms.height && player.y + player.height >= platforms.y)) keys.a.pressed = false;

  });
};

function spikeCollision(){
  spikes.forEach((spikes) => {
  //Kolize se spikem
  if(player.y + player.height + player.velocityY >= spikes.y && player.x + player.width >= spikes.x &&
    player.y <= spikes.y + spikes.height && player.x <= spikes.x + spikes.width) console.log("jsi skoncil") 

  });
};

function estusPosition(){
  let i = Math.floor(Math.random() * 5 + 1);
  switch(i){
    case 1:
      estus.height = 50;
      estus.width = 30;
      estus.x = 115;
      estus.y = 275;
      break;
    case 2:
      estus.height = 50;
      estus.width = 30;
      estus.x = 70;
      estus.y = 680;
      break;
    case 3:
      estus.height = 50;
      estus.width = 30;
      estus.x = 1445;
      estus.y = 275;
      break;
    case 4:  
      estus.height = 50;
      estus.width = 30;
      estus.x = 1500;
      estus.y = 680;
      break;
    case 5:
      estus.height = 50;
      estus.width = 30;
      estus.x = 785;
      estus.y = 30;
      break;    
  }
console.log(i);
}; 

function estusCollision(){
  if(player.y + player.height + player.velocityY >= estus.y && player.x + player.width >= estus.x &&
    player.y <= estus.y + estus.height && player.x <= estus.x + estus.width) estusPosition()

};

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
      if(player.velocityY == 0) player.velocityY = -13.55;
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


ctx.fillStyle = "black";
function gameLoop() {
  window.requestAnimationFrame(gameLoop);

  if(player.x <= 0) keys.a.pressed = false;
  else if(player.x >= 1549) keys.d.pressed = false;
  else if(player.y <= 0) player.velocityY = 0;

  clearCanvas();
  movement();
  draw();

  platforms.forEach((platforms) => {
      ctx.fillRect(platforms.x, platforms.y, platforms.width, platforms.height);
    });
   
  spikes.forEach((spikes) => {
      ctx.fillStyle = "orange";
      ctx.fillRect(spikes.x, spikes.y, spikes.width, spikes.height);
  });
    
  acceleration();
  platformCollision();
  estusCollision();
  spikeCollision();
  player.velocityX = 0; 
  player.gravity();
  
}


window.onload = () => {
  window.requestAnimationFrame(gameLoop);
};
