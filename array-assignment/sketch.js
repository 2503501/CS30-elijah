// Array and Object Noatation Assignment
// Elijah Zhao
// March 8th 2023
//
// Extra for Experts:
// used WEBGL to make a 3d scene
// used map and distance function (not shown in class)
//
//controls:
//click anywhere to make the waves go in relation to where you clicked
//press enter to switch from color more to blank mode, and vise versa


// variables
let boxes = [];
let angle = 0;
let maxD;
let offsetX;
let offsetY;

// how much the wave is increasing by 
let PosOrNegWave = 0.1;

//color variables
let colors = [60,124,123];
let colorsStatus = [true,true,true];
let colorornot = true;
let colorchange = 3;


function setup() {
  
  //create screen
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // a value that is used as a max point for calculating offset, increasing it will make the wave less wavy
  maxD = dist(0,0, 200, 200); 
  
  // start the offset value x and y in the middle of the cubes
  offsetX = width/2;
  offsetY = height/3; 

  // produce the info for boxes and stores it in a list called boxes
  for (let z = 0; z < height + 200; z += 50){
    for (let i = 200; i < width - 200 ; i += 50){
      spawnBox(i, 0, z - 200, 200);
    }
  }
}


function draw() {
  background(220);
  
  // a value that will constantly increase by 0.1 . every cycle the cube height will change 0.1
  angle = angle + PosOrNegWave; 
  
  // rotate for better visibility
  rotateX(-PI/4);
  
  //changes colors of the cube
  colorChange();
  
  let offset;

  //the for loop will, for everything single box, adjust the boxheight according how far away it is from the center (offsetX, offsetY)
  
  for (let i = 0; i < boxes.length; i++) {
    
    //calculate distance from specific box to center
    let d = dist(boxes[i].x, boxes[i].z, offsetX, offsetY);
    
    // using the distance of the box (d) to remap the value from a range between -1 to 1 based on the distance of maxD
    offset = map(d, 0, maxD, -1, 1);
    
    //apply that offset to that specfic box
    let a = angle + offset;
    
    //the box height will be based on the offset put in the sin funtion(becaue sin max value is 1, and sin lowest value is -1), and then remaping that value from a range between 0 to 300 
    boxes[i].boxheight = map(sin(a), -1, 1, 0, 300);
  }

  
  //display the box
  for (let i = 0; i < boxes.length; i++) {
    displayBox(boxes[i]);
  }
}

function mousePressed(){
  
  if (colorornot){
    
    //changes colors of cubes, which is stored in the list colors
    for (let i =0; i <colors.length;i++){
      colors[i] = random(26,224);
    }
  }
  
  //increase speed of color change
  colorchange = random(10);
  
  // will set the center of the offset based on mouse click and change direction of wave
  offsetX = mouseX;
  offsetY = mouseY;
  PosOrNegWave = PosOrNegWave *-1;
}

//function that stores information of box
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
  
  //saving the transformation matrix
  push(); 
  
  // makes 0,0 the cords of the boxes x and y
  rectMode(CENTER);
  translate(myBox.x - width/2, 125, myBox.z  - width/3 );
  stroke("black");
  fill(colors[0], colors[1], colors[2]);
  
  // displays the box with a width and length of 50, and the boxheight specfic to the offset
  box(50, myBox.boxheight, 50, 0);
  
  //resetting the transformation matrix
  pop(); 
}

function colorChange(){ 
  
  // if colormode is on, it will slowly change the color to have a rbg affect
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

  // pressing enter to change in and out of color mode
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