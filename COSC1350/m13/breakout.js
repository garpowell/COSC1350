/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Gar Powell
 * Date: 12/6/24
 * Project for COSC 1350
 *
 */


// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

// detect the arrow keys being pressed
document.addEventListener("keydown", function(event) {
  event.preventDefault();
  const key = event.key; // "ArrowRight", "ArrowLeft"
  switch (key) { // change to event.key to key to use the above variable
    case "ArrowLeft":
      // Left pressed
      moveLeft = true;
      break;
    case "ArrowRight":
      // Right pressed
      moveRight = true;
      break;
  }
});

// detect the arrow keys being relised
document.addEventListener("keyup", function(event) {
  event.preventDefault();
  const key = event.key; // "ArrowRight", "ArrowLeft"
  switch (key) { // change to event.key to key to use the above variable
    case "ArrowLeft":
      // Left up
      moveLeft = false;
      break;
    case "ArrowRight":
      // Right up
      moveRight = false;
      break;
  }
});

const ctx = canvas.getContext("2d");

//drawing a ball requires the x position, y position, and radius
let ballRadius = 15, xPos = canvas.width / 2, yPos = canvas.height / 2;

//xy move distance. These values are used to move the ball around.
let plusOrMinus = Math.random() * 2 - 1;
let xMoveDist = 4 * plusOrMinus;
let yMoveDist = 3;

// declare variables
let xPaddle = 250;
let moveLeft = false;
let moveRight = false;
let bricks = [];
let score = 0;
let hitCount = 0;

// Find the brick x and y placment
bricksXY=()=>{
  for(let r = 0; r < 4; r++){
    bricks[r] = [];
      for(let c = 0; c < 6; c++){
        bricks[r][c] = {
        x : c * 100 + 5,
        y : r * 30 + 40,
        // set hit status for each brick
        status : true 
      }
    }
  }
}
bricksXY();
//console.log(bricks);

// draw the bricks
drawBricks=()=>{
  for(let r = 0; r < 4; r++){
    for(let c = 0; c < 6; c++){
      let brick = bricks[r][c];
        // check hit status of each brick and drawing the needed bricks
        if(brick.status == true){
          ctx.fillStyle = 'purple';
          ctx.fillRect(brick.x, brick.y, 90, 25);
          ctx.stroke();

        }
    }
  }
}

// check for collision
collision=()=>{
  for(let r = 0; r < 4; r++){
    for(let c = 0; c < 6; c++){
      let brick = bricks[r][c];
      // check status of each brick
       if(brick.status == true){
        // checks to see if the ball hits a brick
        
        if(xPos + ballRadius > brick.x && xPos - ballRadius < brick.x + 90 && 
            yPos + ballRadius > brick.y && yPos - ballRadius < brick.y + 25){
            yMoveDist = -yMoveDist * 1.02; // speeds up ball oncontact
            // if brick is hit change hit status to false
            brick.status = false; 
            score = score + (100 + 25*hitCount); // score gets higher as more blocks get hit
            hitCount = hitCount + 1; // count the number of bricks hit
            } 
        }
      }
    }
  }


//function that draws the ball on the canvas
ballRender=()=>{
  ctx.beginPath();
  //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}
//function that graws the rectangle
recPaddle=()=>{
  ctx.fillStyle = 'darkblue';
  ctx.fillRect(xPaddle, 385, 100, 15);
  ctx.stroke();
} 

endGame=()=>{
  alert("Garme Over!");
  clearInterval(intervalID);
  //console.log(bricks);
}

winGame=()=>{
  clearInterval(intervalID);
  alert("You Win!");
}

/*
* draw() can be thought of as our main function.
* We execute draw every few milliseconds to give our
* canvas the appearance of being animated. Notice how in the draw function
* the first thing done is ctx.clearRect(), which clears the whole canvas
* before drawing the next frame of animation.
*/
draw=()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //console.log(hitCount);
  //console.log(score);
  // draw ball 
  ballRender();

  // draw paddle
  recPaddle();

  // draw the bricks
  drawBricks();

  // check to see if ball hits bricks
  collision();

  // x and y ball corridanits
  xPos += xMoveDist;
  yPos += yMoveDist;

  // bounce ball off walls
  if ((xPos > canvas.width - ballRadius) || (xPos < 0 + ballRadius)){
    xMoveDist = -xMoveDist;
  }
  
  if (yPos < 0 + ballRadius){
    yMoveDist = -yMoveDist;
  }

  // Bounce the ball of the paddle
  if (yPos >= canvas.height - ballRadius - 15 && xPos >= xPaddle && xPos <=xPaddle + 100){
    yMoveDist = -yMoveDist * 1.05; // speeds up ball oncontact
  } 

  // move the paddle left and stop at the edge
  if (moveLeft === true && xPaddle >= 0) {
     xPaddle = xPaddle - 4;
  }

  // move the paddle right and stop at the edge
  if (moveRight === true && xPaddle <= 500) {
    xPaddle += 4;
  }

  if (yPos > canvas.height + 2*ballRadius) {
    endGame();
  }

  if (hitCount == 24) {
    winGame();
  }
  document.getElementById("yourScore").textContent = score;
  
}

/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID. We won't really use intervalID
 * so don't worry to much about that for now.
 *
 * Try playing around with the refreshRate value. Higher number slows it down.
 */

const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
