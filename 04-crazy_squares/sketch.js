// cubic disarray

let boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

//   for (let i = 0; i <15; i++){
//   }
// }

for (let y = 0; y <height; y += 50){
  for (let x = 0; x < width; x += 50){
    
    spawnBox(random(width), random(height), 50, 45);
  }
 }

function draw() {
  background(220);

  for (let i = 0; i < boxes.length, i ++) {
    displayBox(boxes[i]);
  
  }
}

function spawnBox(theX, theY, theSize, howRotated){
  let someBox = {
    x: theX,
    y: theY,
    size: theSize,
    rotation: howRotated,
  };
  boxes.push(someBox);
}


function displayBox(myBox){
  push(); // save the state
  translate(myBox.x, myBox.y);
  rotate(myBox.rotation);
  square(0, 0, myBox.size);
  pop(); //reset  the state
}}