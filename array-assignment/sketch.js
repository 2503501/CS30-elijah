// Array and Object Noatation Assignment
// Elijah Zhao
// March 8th 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boxes = [];
let angle = 0;
let maxD;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  maxD = dist(0,0, 200, 200); //increases follwing distance 

  for (let z = 0; z < height + 200; z += 50){
    for (let i = 350; i < width - 350 ; i += 50){
      spawnBox(i, 0, z - 200, 200);
    }
  }
}


function draw() {
  background(220);
  angle = angle - 0.1; //increases speed from -1 to 1
  let offset = 0;
  rotateX(-PI/4);
  

  for (let i = 0; i < boxes.length; i++) {
    let d = dist(boxes[i].x, boxes[i].z, width/2, height/3);
    offset = map(d, 0, maxD, -1, 1);
    let a = angle + offset;
    boxes[i].boxheight = map(sin(a), -1, 1, 0, 300);
  }

  for (let i = 0; i < boxes.length; i++) {
    displayBox(boxes[i]);
  }
}


function spawnBox(theX, theY, theZ, heightsize) {
  let someBox = {
    x: theX,
    y: theY,
    z: theZ,
    boxheight: heightsize,
  };
  boxes.push(someBox);
}

function displayBox(myBox) {
  push(); //saving the transformation matrix
  rectMode(CENTER);
  translate(myBox.x - width/2, 100, myBox.z  - width/3 );
  box(50, myBox.boxheight, 50, 0);
  pop(); //resetting the transformation matrix
}
