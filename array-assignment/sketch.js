// Array and Object Noatation Assignment
// Elijah Zhao
// March 8th 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boxes = [];
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

for (let i = 0; i < width; i += 50){
  spawnBox(i, height/2, 0);
  // rect(i, height/2, 50, 200);
}


function draw() {
  background(220);
  angle = angle + 0.1;

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].boxheight = map(sin(angle), -1, 1, 0, 100);
    // spawnBox(i, height/2, map(sin(angle), -1, 1, 0, 100));
  }

  for (let i = 0; i < boxes.length; i++) {
    displayBox(boxes[i]);
  }
}


function spawnBox(theX, theY, heightsize) {
  let someBox = {
    x: theX,
    y: theY,
    boxheight: heightsize,
  };
  boxes.push(someBox);
}

function displayBox(myBox) {
  push(); //saving the transformation matrix
  rectMode(CENTER);
  translate(myBox.x, myBox.y);
  rect(0 + 25, 0, 50, myBox.boxheight);
  pop(); //resetting the transformation matrix
}
