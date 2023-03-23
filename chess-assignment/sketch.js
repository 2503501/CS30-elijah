// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellsize;
let constantRemover = 200;
let chessboardheightcontroller;

function setup() {
  createCanvas(windowWidth, windowHeight);
  chessboardheightcontroller = height -constantRemover;
  cellsize = chessboardheightcontroller/8;
}

function draw() {
  background(200);
  drawGrid();
}


// function drawBoard(){
//   for (let x = 0; x < 8; x++){
//     for (let y = 0; y < 9; x++){
//       w
//     }
//   }
// }

function drawGrid() {
  // draws a grid of rectangles of alternating colour
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      fill((x+y+1)%2 * 255);
      rect(x * cellsize + width/2 - cellsize, y * cellsize + constantRemover/2, cellsize, cellsize);
    }
  }
}