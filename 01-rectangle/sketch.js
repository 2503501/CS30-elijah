// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  rectMode(CENTER);
  rect(mouseX, 100, 100, 15);
  checkInside();
}

function checkInside(){
  if (mouseX < 0 + 50){
    mouseX = 50;
  }
}