// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [[0, 0, 0, 1], [1, 0, 0, 0], [0, 1, 0, 1], [1, 1, 1, 1]];

let gridWidth = 4;
let gridHeight = 4;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  randomGrid();
  displayGrid();
}


function KeyTyped(){
  if (key === "r"){
    randomGrid();
  }
}


function displayGrid(){
  for (let i =0; i < grid.length; i++){
    for (let x =0; x < grid[0].length; x++){
      if (grid[i][x] < 5){
        fill("black");
      }
      else if (grid[i][x] >= 5){
        fill("white");
      }
      rect(i * (width/grid.length), x * (height/grid[i].length), grid.length * (width/grid.length),  grid.length * (height/grid[i].length) );

    }

  }
}

function randomGrid(){
  for (let i = 0; i < gridWidth; i ++){
    grid.pop();
  }
  for (let i = 0; i < gridWidth; i ++){
    grid.push([random(10), random(10), random(10),random(10)]);
  }

}