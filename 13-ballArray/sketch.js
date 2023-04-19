// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class Ball{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = random(5,20);
    this.r = random (255);
    this.g = random(255);
    this.b = random(255);
    this,alpha = random(100, 255);
  }
  
  display(){
    noStroke;
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.radius *2);
  }

  moveBall(){
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > width ){
      this.x = width -1 - this.radius;
      this.dx = this.dx * -1;
    }
    if (this.x - this.radius< 0){
      this.x = 1 + this.radius;
      this.dx = this.dx * -1;
    }
    if (this.y + this.radius > height){
      this.y = height -1 - this.radius;
      this.dy = this.dy * -1;
    }
    if ( this.y - this.radius < 0){
      this.y = 1 + this.radius;
      this.dy = this.dy * -1;
    }
  }

  collisionCheck(otherball){
    let distanceApart = dist(this.x, this.y, otherball.x, otherball.y);
    let radiiSum = this.radius + otherball.radius;

    if (distanceApart < radiiSum){
      let tempx = this.dx;
      let tempy = this.dy;
      this.dx = otherball.dx;
      this.dy = otherball.dy;
      otherball.dx = tempx;
      otherball.dy = tempy;
    }

  }


}

let ballArray = [];


function mousePressed() {
  // for (let i = 0; i < 10; i++){
  //   let theBall = new Ball(mouseX, mouseY);
  //   ballArray.push(theBall);
  // }
  let theBall = new Ball(mouseX, mouseY);
  ballArray.push(theBall);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let someball of ballArray){
    someball.moveBall();
    for (let otherBall of ballArray){
      if (someball !== otherBall){
        someball.collisionCheck(otherBall);
      }
    }
    someball.display();
  }
}

