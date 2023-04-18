// Fireworks OOP
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Spark {
  constructor(x, y, dx, dy, mass){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 255;
    this.r = random(255);
    this.b = random(255);
    this.g = random(255);
    this.size = 5;
    this.mass = mass;
    this.velocity = -3;
    this.acell = mass * 0.05;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.size);
  }

  update(){
    this.x += this.dx;
    this.velocity += this.acell;
    this.y += this.velocity;
    this.y += this.dy;
  }
  
}

let sparkArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let i = sparkArray.length - 1; i > 0; i--){
    sparkArray[i].update();
    sparkArray[i].display();
    sparkArray[i].alpha --;

    if (sparkArray[i].alpha < 0){
      sparkArray.splice(i, 1);
    }
  }
}

function mousePressed(){
  for (let i = 0; i < 100; i++){
    spawnSpark();
  }
}

function spawnSpark() {
  let theSpark = new Spark(mouseX, mouseY, random(-5, 5), random(-5, 5), 3);
  sparkArray.push(theSpark);
}
