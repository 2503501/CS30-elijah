// Array and Object Noatation Assignment
// Elijah Zhao
// March 8th 2023
//
// Extra for Experts:
// used WEBGL to make a 3d scene
//
//controls:
//click anywhere to make the waves go in relation to where you clicked
//press enter to switch from color more to blank mode, and vise versa

let boxes = [];
let angle = 0;
let maxD;
let offsetX;
let offsetY;
let PosOrNegWave = 0.1;

let colors = [60,124,123];
let colorsStatus = [true,true,true];
let colorornot = true;
let colorchange = 3;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  maxD = dist(0,0, 200, 200); //increases follwing distance 
  offsetX = width/2;
  offsetY = height/3; 

  for (let z = 0; z < height + 200; z += 50){
    for (let i = 200; i < width - 200 ; i += 50){
      spawnBox(i, 0, z - 200, 200);
    }
  }
}


function draw() {
  background(220);
  angle = angle + PosOrNegWave; //increases speed from -1 to 1
  let offset;
  rotateX(-PI/4);
  colorChange();
  

  for (let i = 0; i < boxes.length; i++) {
    let d = dist(boxes[i].x, boxes[i].z, offsetX, offsetY);
    offset = map(d, 0, maxD, -1, 1);
    let a = angle + offset;
    boxes[i].boxheight = map(sin(a), -1, 1, 0, 300);
  }

  for (let i = 0; i < boxes.length; i++) {
    displayBox(boxes[i]);
  }
}

function mousePressed(){
  if (colorornot){
    for (let i =0; i <colors.length;i++){
      colors[i] = random(26,224);
    }
  }
  
  colorchange = random(10);
  offsetX = mouseX;
  offsetY = mouseY;
  PosOrNegWave = PosOrNegWave *-1;
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
  translate(myBox.x - width/2, 125, myBox.z  - width/3 );
  stroke("black");

  fill(colors[0], colors[1], colors[2]);
  box(50, myBox.boxheight, 50, 0);
  pop(); //resetting the transformation matrix
}

function colorChange(){
  if (colorornot){
    for (let i =0; i <colors.length;i++){
      if (colorsStatus[i]){
        colors[i] += colorchange;
      }
      else{
        colors[i] -= colorchange;
      }

      if (colors[i] >=225|| colors[i] <=25){
        colorsStatus[i] = !colorsStatus[i];
      }
    }
  }
}

function keyTyped(){
  if (keyIsDown(ENTER)){
    colorornot = !colorornot;
    if (colorornot){
      for (let i =0; i <colors.length;i++){
        colors[i] = random(26,224);
      }
    }
    else{
      for (let i =0; i <colors.length;i++){
        colors[i] = 255;
      }
    }
  }

}
