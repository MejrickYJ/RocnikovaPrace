import { player, platforms, keys } from "./main.js";

//Kolize s platformou
export function platformCollision(){
    platforms.forEach((platforms) => { 
    //Kolize s horní stranou platformy
    if(player.y + player.height + player.velocityY >= platforms.y && player.y < platforms.y && player.x + player.width > platforms.x && player.x < platforms.x + platforms.width){
      player.y = platforms.y - player.height;
      player.velocityY = 0;
     
    }
    //Kolize s dolní stranou platformy
    if (player.y <= platforms.y + platforms.height && player.y + player.height > platforms.y + platforms.height && player.x + player.width > platforms.x && player.x < platforms.x + platforms.width) {
      player.y = platforms.y + platforms.height;
      player.velocityY *= -0.5;
    }
  
    //Kolize s levou stranou platformy
    if(player.x + player.width == platforms.x && (player.y <= platforms.y + platforms.height && player.y >= platforms.y) || player.x + player.width == platforms.x && (player.y + player.height <= platforms.y + platforms.height && player.y + player.height >= platforms.y)) keys.d.pressed = false;
    //Kolize s pravou stranou platformy
    if(player.x == platforms.x + platforms.width && (player.y <= platforms.y + platforms.height && player.y >= platforms.y) || player.x == platforms.x + platforms.width && (player.y + player.height <= platforms.y + platforms.height && player.y + player.height >= platforms.y)) keys.a.pressed = false;
  
    });
  };

