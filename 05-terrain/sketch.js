// Terrain generation with perlin noise



let terrain = [];
let Xoffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangle();
}

function draw() {
  background(220);
  for (let i = Xoffset; i < Xoffset + width; i++){
    rect(terrain[i].x - Xoffset, height - terrain[i].height, 1,terrain[i].height);

  
  }
  if (keyIsDown(RIGHT_ARROW)){
    Xoffset += 5;
  }
  if (keyIsDown(LEFT_ARROW)){
    if (Xoffset > 5){
      Xoffset -= 5;
    }
  }
}


function spawnRectangle(){
  let time = 0;
  for (let x= 0; x < 10000; x++){
    let h = noise(time) * height;

    let thisRect = {
      x: x,
      height: h
    };
    terrain.push(thisRect);
    time +=0.005;
  }

}