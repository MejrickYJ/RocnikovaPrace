export class Player {
  constructor() {
    this.x = 775;
    this.y = 50;
    this.width = 50;
    this.height = 50;
    this.velocityX = 0;
    this.velocityY = 1;
  }
  gravity() {
    this.y += this.velocityY;
  }
}

export class Medkit {
  constructor() {
    this.x = 105;
    this.y = 290;
    this.width = 40;
    this.height = 40;
  }
}

export class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
}

export class Spike {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
}

export class Enemy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.velocityX = 0;
    this.velocityY = 1;
  }
}
