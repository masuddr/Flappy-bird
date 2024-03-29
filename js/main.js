let cvs = document.querySelector('#canvas');
let ctx = cvs.getContext("2d");




// load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();
let score = 0;

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


//some letiables

let gap = 85;
let constant = pipeNorth.height + gap;
let bX = 10;
let bY = 150;
let gravity = 1.5;

// draw images

document.addEventListener('keydown',moveUp);

function moveUp() {
    bY -= 25;
}

// pipe coordinates
pipe = [];

pipe[0] = {
  x :cvs.width,
  y: 0
};

//draw images
function draw(){

    ctx.drawImage(bg,0,0);
    for(let i =0; i < pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;

        if ( pipe[i].x == 125){
            pipe.push({
                x:cvs.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        //detect collision
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) ||  bY + bird.height >=
            cvs.height - fg.height){
            location.reload(); //reload the page
        }


        if ( pipe[i].x == 5){
            score++;

        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY);

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score,10,450);

    bY += gravity;


    requestAnimationFrame(draw);

}

draw();
























