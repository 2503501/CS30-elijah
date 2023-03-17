// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  window.setInterval(spawnBubble, 500);
}


function mousePressed(){
  spawnBubble();

}



function draw() {
  // background(255);


  for (let bubble of theBubbles) {

    bubble.x = noise(bubble.time) * width;
    bubble.y = noise(bubble.time + 300) * height;

    noStroke();
    fill(bubble.color);
    circle(bubble.x, bubble.y, bubble.size);

    bubble.time += 0.01;
  }


  // for (let i = 0; i < theBubbles.length; i++){
  //   fill(theBubbles[i].color);
  //   circle(theBubbles[i].x, theBubbles[i].y, theBubbles[i].size);
  // }




}



function spawnBubble(){
  let bubble = {
    x:random(width),
    y: random(height),
    size: random(15,50),
    color: color(random(255), random(255), random(255), random(255)),
    time: random(1000000),
  };
  theBubbles.push(bubble);
}
