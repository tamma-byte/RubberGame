var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
var eraser = new Image();
var bg = new Image();
var upsideDown = new Image();
var pencilHead = new Image();
eraser.src = "images/eraser.png";
bg.src = "images/background.png";
upsideDown.src = "images/upsidedownpencil.png";
pencilHead.src = "images/pencil.png";

// audio files

var scor = new Audio();
scor.src = "sounds/scor.mp3";

// some variables
var gap = 120;
var constant;
var eraserX = 10;
var eraserY = 150;
var gravity = 1;
var score = 0;

//http://www.lessmilk.com/tutorial/flappy-eraser-phaser-1

// touch screen event

document.addEventListener("touchstart", startTouch);
document.addEventListener("touchend", startTouch);

//https://www.youtube.com/watch?v=ga_SLzsUdTY
function startTouch(e) {
  e.preventDefault();
  var eraser = e.target;
  var touch = e.touches[0];
  console.log(e.touches);
  eraserY -= 25;
}

// pencil coordinates
var pencil = [];
pencil[0] = {
  x: cvs.width,
  y: 0
};

// draw images
function draw() {
  ctx.drawImage(bg, 0, 0);
  for (var i = 0; i < pencil.length; i++) {
    constant = upsideDown.height + gap;
    ctx.drawImage(upsideDown, pencil[i].x, pencil[i].y);
    ctx.drawImage(pencilHead, pencil[i].x, pencil[i].y + constant);
    pencil[i].x--;

    if (pencil[i].x == 25) {
      pencil.push({
        x: cvs.width,
        y: Math.floor(Math.random() * upsideDown.height) - upsideDown.height
      });
    }

    // detect collision
    if (eraserX + eraser.width >= pencil[i].x && eraserX <= pencil[i].x + upsideDown.width && eraserY <= pencil[i].y + upsideDown.height || eraserY + eraser.height >= pencil[i].y + constant && eraserY + eraser.height >= cvs.height - 40) {
      alert("Oh no! You\'ve crashed! Start again?")
      //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_confirm2
       if (confirm('Are you ready?')) {
        // Save it!
        location.reload();

      } else {
        // Do nothing!
        ctx.fillStyle = "#0ea8da";
        ctx.font = "36px Arial";
        ctx.fillText("Thanks for playing! " + "\n" + "You got " + score + " points!!", 10, cvs.height - 100);
        reset();
      }
    }

    if (pencil[i].x == 125) {
      score++;
    }
  }
  ctx.drawImage(eraser, eraserX, eraserY);
  eraserY += gravity;
  ctx.fillStyle = "#0ea8da";
  ctx.font = "20px Arial";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}

draw();