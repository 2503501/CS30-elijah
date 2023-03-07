let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayShapes();
  moveShapes();
}

function moveShapes(){
  for (let i=0; i<shapes.length; i++){
    shapes[i].x += shapes[i].dx;
    shapes[i].y += shapes[i].dy;
    if (shapes[i].x < 0 + shapes[i].diameter/2  || shapes[i].x > windowWidth - shapes[i].diameter/2  ){
      shapes[i].dx =shapes[i].dx * -1;
    }
    if (shapes[i].y < 0 + shapes[i].diameter/2  || shapes[i].y > windowHeight - shapes[i].diameter/2  ){
      shapes[i].dy =shapes[i].dy * -1;
    }
  }
}

function mousePressed(){
  createBall(mouseX, mouseY);
}

function displayShapes(){
  for (let i=0; i < shapes.length; i++){
    fill(shapes[i].thecolor);
    circle(shapes[i].x,shapes[i].y, shapes[i].diameter);
  }
}


function createBall(tempx, tempy){
  let newball = {
    x: tempx,
    y: tempy,
    dx: random(-5, 5),
    dy: random(-5, 5),
    diameter: random(25,100),
    thecolor: color(random(255), random(255), random(255))
  };
  shapes.push(newball);
}