/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Gar Powell
 * Date: 11/12/24
 * Project for COSC 1350
 *
 */


// declare variables
var xPaddle = 250;
var moveLeft = false;
var moveRight = false;

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
let xMoveDist = 3, yMoveDist = 3;

//function that draws the ball on the canvas
ballRender=()=>{
  ctx.beginPath();
  //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  ctx.closePath();
}
//function that graws the rectangle
recPaddle=()=>{
  ctx.rect(xPaddle, 385, 100, 15);
  ctx.stroke();
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
  // draw a red ball
  ctx.fill();
  ctx.fillStyle = 'red';
  ballRender();
  // draw a blue paddle
  ctx.fill();
	ctx.fillStyle = 'darkblue';
  recPaddle();

  // x and y ball corridanits
  xPos += xMoveDist;
  yPos += yMoveDist;

  // bounce ball off walls
  if (xPos > canvas.width - ballRadius){
    xMoveDist = -xMoveDist
  }
  if (xPos < 0 + ballRadius){
    xMoveDist = -xMoveDist
  }
  if (yPos > canvas.height - ballRadius){
    yMoveDist = -yMoveDist
  }
  if (yPos < 0 + ballRadius){
    yMoveDist = -yMoveDist
  };
  // move the paddle left
  if (moveLeft === true) {
     xPaddle = xPaddle - 3
  }
  // stop the paddle at the edge of the page
  if (xPaddle < 0) {
    xPaddle = 0
  }
  // move the paddle right
  if (moveRight === true) {
    xPaddle += 3
  }
  // stop the paddle at the edge of the page
  if (xPaddle > 500) {
    xPaddle = 500
 }
  
}
/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID. We won't really use intervalID
 * so don't worry to much about that for now.
 *
 * Try playing around with the refreshRate value. Higher number slows it down.
 */
const refreshRate = 20;
const intervalID = setInterval(draw, refreshRate);
