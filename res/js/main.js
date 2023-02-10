const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = 1600;
canvas.height = 800;

    class Player{
        constructor(x,y,width,height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

    }
 
ctx.fillStyle = 'green';
ctx.fillRect(500,550,50,50);    

