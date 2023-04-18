export class Player {
    constructor() {
      this.x = 775;  //pozice na ose X
      this.y = 50;  //pozice na ose Y
      this.width = 50;  //šířka hráče
      this.height = 50; //výška hráče
      this.velocityX = 0; //rychlost na ose X po které se hráč bude posouvat
      this.velocityY = 1;  //rychlost na ose Y po které se hráč bude posouvat
    }
    gravity() {
      this.y += this.velocityY;  //do hráčovy pozice na ose Y se přičíta rychlost na ose Y, způsobuje padání dolů
    }
  }
  
export  class Estus {
    constructor(){
      this.x = 95;
      this.y = 275;
      this.width = 70;
      this.height = 70;
    }
  }
  
export  class Platform {
    constructor(x,y,w,h) {
      this.x = x;
      this.y = y;  
      this.width = w;
      this.height = h;
    }
    
  }
  
export  class Spike{
    constructor(x,y,w,h) {
      this.x = x;
      this.y = y; 
      this.width = w;
      this.height = h;
    }
  }
  
export  class Enemy{
    constructor(x,y,w,h) {
      this.x = x;
      this.y = y; 
      this.width = w;
      this.height = h;
      this.velocityX = 0;
      this.velocityY = 1;
    }
  }