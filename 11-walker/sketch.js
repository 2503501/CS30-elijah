// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = 5;
    this.size = 5;
  }
  
  display(){
    noStroke;
    fill(this.color);
    circle(this.x,this.y,this.size);

  }

  move(){
    let choice = random(100);
    if (choice < 25){
      this.y -= this.speed;
    }
    else if (choice < 50){
      this.y += this.speed;
    }
    else if (choice < 75){
      this.x += this.speed;
    }
    else{
      this.x -= this.speed;
    }
  }
}

let listofwalkers = [];
let kevin;


function setup() {
  createCanvas(windowWidth, windowHeight);
  kevin = new Walker(width/2, height/2, "red");
  listofwalkers.push(kevin);
}

function draw() {
  for (let i = 0; i < listofwalkers.length; i++){
    listofwalkers[i].move();
    listofwalkers[i].display();
  }
}

function mousePressed() {
  let someWalker = new Walker(mouseX, mouseY, (random(255),random(255),random(255)));
  listofwalkers.push(someWalker);
}