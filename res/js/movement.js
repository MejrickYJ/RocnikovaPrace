import { player, enemy, enemy2, enemy3, transformed } from "./main.js";
import { turned, dead } from "./collisions.js";

export function movement() {
  if (keys.a.pressed) player.velocityX = -5;
  else if (keys.d.pressed) player.velocityX = 5;
  player.x += player.velocityX;
}

let m = 6;
let move = true;

export function enemyMovement() {
  if (enemy.y == 124) move = true;
  if (enemy.y == 550) move = false;
  if (move) {
    enemy.y += m;
  } else {
    enemy.y -= m;
  }

  if (move) {
    enemy2.y -= m;
  } else {
    enemy2.y += m;
  }

  if (move) {
    enemy3.x += m * 1.5;
  } else {
    enemy3.x -= m * 1.5;
  }

  if (dead || turned || transformed) m = 0;
}

export const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      if (player.velocityY == 0) player.velocityY = -14.55;
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
