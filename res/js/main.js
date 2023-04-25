import { Player, Estus, Platform, Spike, Enemy } from "./classes.js";
import { platformCollision, enemyCollision, estusCollision, spikeCollision, turned, dead, score, pickUp } from "./collisions.js";
import { movement, enemyMovement, keys } from "./movement.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let speed = 0.5;

canvas.width = 1600;
canvas.height = 800;

const player = new Player();
const platforms = [
  new Platform(725, 100, 150, 50),
  new Platform(1050, 200, 150, 50),
  new Platform(400, 200, 150, 50),
  new Platform(700, 350, 200, 50),
  new Platform(650, 650, 300, 50),
  new Platform(400, 500, 150, 50),
  new Platform(1050, 500, 150, 50),
  new Platform(70, 350, 120, 50),
  new Platform(1400, 352, 120, 50),
];

const spikes = [
  new Spike(1318, 750, 40, 50),
  new Spike(242, 750, 40, 50),
  new Spike(780, 300, 40, 50),
  new Spike(455, 150, 40, 50),
  new Spike(1105, 150, 40, 50),
];

const enemy = new Enemy(600, 124, 50, 50);
const enemy2 = new Enemy(950, 550, 50, 50);
const enemy3 = new Enemy(450, 750, 50, 50);

const estus = new Estus();
export { player, platforms, spikes, enemy, enemy2, enemy3, estus };

function draw() {
  let background = new Image();
  let estusI = new Image();
  let spikeI = new Image();

  estusI.src = "./res/img/estus.png";
  background.src = "./res/img/backgroundI.jpg";
  spikeI.src = "./res/img/spike.png";
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(estusI, estus.x, estus.y, estus.width, estus.height);

  spikes.forEach((spikes) => {
    ctx.drawImage(spikeI, spikes.x, spikes.y, spikes.width, spikes.height);
  });

  ctx.fillStyle = "purple";
  platforms.forEach((platforms) => {
    ctx.fillRect(platforms.x, platforms.y, platforms.width, platforms.height);
  });

  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "green";
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);
  ctx.fillRect(enemy3.x, enemy3.y, enemy3.width, enemy3.height);
}

function acceleration() {
  if (player.y + player.height + player.velocityY < canvas.height) {
    player.velocityY += speed;
  } else {
    player.velocityY = 0;
  }
}

let r = 0;
export function estusPosition() {
  let i = Math.floor(Math.random() * 5 + 1);
  while (r == i) i = Math.floor(Math.random() * 5 + 1);

  switch (i) {
    case 1:
      estus.x = 95;
      estus.y = 275;
      break;
    case 2:
      estus.x = 50;
      estus.y = 700;
      break;
    case 3:
      estus.x = 1425;
      estus.y = 275;
      break;
    case 4:
      estus.x = 1480;
      estus.y = 700;
      break;
    case 5:
      estus.x = 765;
      estus.y = 30;
      break;
  }
  r = i;
}

let time = 7;
export let transformed = false;

function transformation() {
  if (time > 0) {
    time = time - 1;
    setTimeout(transformation, 1000);
    document.querySelector("#time").innerHTML = "TIME: " + time;
  }
  if (time == 0) {
    document.querySelector("#gameover").innerHTML = "YOU TURNED";
    transformed = true;
  }
}

transformation();

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  document.querySelector("#score").innerHTML = "SCORE: " + score;
  player.velocityX = 0;
  if (player.x <= 0) keys.a.pressed = false;
  else if (player.x >= 1549) keys.d.pressed = false;
  else if (player.y <= 0) player.velocityY = 0;

  draw();

  if (turned || transformed) {
    ctx.fillStyle = "green";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    keys.a.pressed = false;
    keys.d.pressed = false;
    player.velocityY = 0;
    speed = 0;
    time -= 1;
  }

  if (dead) {
    keys.d.pressed = false;
    keys.a.pressed = false;
    player.velocityX = 0;
    player.velocityY = 0;
    speed = 0;
    time -= 1;
  }

  if (pickUp) {
    time = 7;
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
