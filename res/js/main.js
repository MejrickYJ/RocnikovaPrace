const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

const speed = 0.4;

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  ctx.fillStyle = "green";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function cooldown() {
  setTimeout;
}

class Player {
  constructor() {
    this.x = 800;
    this.y = 25;
    this.width = 50;
    this.height = 50;
    this.velocityX = 10;
    this.velocityY = 1;
  }
  gravity() {
    player.y += player.velocityY;
    player.velocityY += speed;
  }
}

const player = new Player();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      player.velocityY = -15;
      console.log("jump");
      break;

    case "a":
      ////////////////////////////////
      break;

    case "d":
      ////////////////////////////////
      break;
  }
});

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  clearCanvas();
  draw();
  if (player.y + player.height + player.velocityY < canvas.height) {
    player.velocityY += speed;
  } else {
    player.velocityY = 0;
  }
  player.gravity();
}

window.onload = () => {
  window.requestAnimationFrame(gameLoop);
};
