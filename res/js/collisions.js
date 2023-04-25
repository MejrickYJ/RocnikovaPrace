import {
  player,
  platforms,
  spikes,
  estus,
  estusPosition,
  enemy,
  enemy2,
  enemy3,
} from "./main.js";
import { keys } from "./movement.js";
let turned = false;
let dead = false;
let pickUp = false;
let score = 0;

export { turned, dead, score, pickUp };

export function platformCollision() {
  platforms.forEach((platforms) => {
    if (
      player.y + player.height + player.velocityY >= platforms.y &&
      player.y < platforms.y &&
      player.x + player.width > platforms.x &&
      player.x < platforms.x + platforms.width
    ) {
      player.y = platforms.y - player.height;
      player.velocityY = 0;
    }

    if (
      player.y <= platforms.y + platforms.height &&
      player.y + player.height > platforms.y + platforms.height &&
      player.x + player.width > platforms.x &&
      player.x < platforms.x + platforms.width
    ) {
      player.y = platforms.y + platforms.height;
      player.velocityY *= -0.5;
    }

    if (
      (player.x + player.width == platforms.x &&
        player.y <= platforms.y + platforms.height &&
        player.y >= platforms.y) ||
      (player.x + player.width == platforms.x &&
        player.y + player.height <= platforms.y + platforms.height &&
        player.y + player.height >= platforms.y)
    )
      keys.d.pressed = false;
    if (
      (player.x == platforms.x + platforms.width &&
        player.y <= platforms.y + platforms.height &&
        player.y >= platforms.y) ||
      (player.x == platforms.x + platforms.width &&
        player.y + player.height <= platforms.y + platforms.height &&
        player.y + player.height >= platforms.y)
    )
      keys.a.pressed = false;
  });
}

export function enemyCollision() {
  if (
    player.y + player.height + player.velocityY >= enemy.y &&
    player.x + player.width >= enemy.x &&
    player.y <= enemy.y + enemy.height &&
    player.x <= enemy.x + enemy.width
  )
    (turned = true),
      (document.querySelector("#gameover").innerHTML = "YOU TURNED");

  if (
    player.y + player.height + player.velocityY >= enemy2.y &&
    player.x + player.width >= enemy2.x &&
    player.y <= enemy2.y + enemy2.height &&
    player.x <= enemy2.x + enemy2.width
  )
    (turned = true),
      (document.querySelector("#gameover").innerHTML = "YOU TURNED");

  if (
    player.y + player.height + player.velocityY >= enemy3.y &&
    player.x + player.width >= enemy3.x &&
    player.y <= enemy3.y + enemy3.height &&
    player.x <= enemy3.x + enemy3.width
  )
    (turned = true),
      (document.querySelector("#gameover").innerHTML = "YOU TURNED");
}

export function spikeCollision() {
  spikes.forEach((spikes) => {
    if (
      player.y + player.height + player.velocityY >= spikes.y &&
      player.x + player.width >= spikes.x &&
      player.y <= spikes.y + spikes.height &&
      player.x <= spikes.x + spikes.width
    ) {
      document.querySelector("#death").innerHTML = "YOU DIED";
      dead = true;
    }
  });
}

export function estusCollision() {
  if (
    player.y + player.height + player.velocityY >= estus.y &&
    player.x + player.width >= estus.x &&
    player.y <= estus.y + estus.height &&
    player.x <= estus.x + estus.width
  )
    estusPosition(), score++, (pickUp = true);
  else pickUp = false;
}
