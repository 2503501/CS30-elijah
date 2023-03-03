// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  everyBox(100, 100);
}

function draw() {

}

function diagonalLine(x, y, spacing){
  if (random(100) > 50){
    //positive slope
    line(x - spacing/2, y + spacing/2, x + spacing/2, y - spacing/2);
  }
  else{
    //negative slope
    line(x - spacing/2, y - spacing/2, x + spacing/2, y + spacing/2);
  }
}

function everyBox(cols, rows){
  for (let x = 0; x < cols; x++){
    for (let y = 0; y < rows; y++){
      let spaceAmount = width/cols;
      diagonalLine(x * spaceAmount, y*spaceAmount, spaceAmount);
    }
  }

}