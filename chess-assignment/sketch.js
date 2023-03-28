// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 8;
let cellsize;
let chessboardheightcontroller;
let grid = [];


// define pieces 
let bBishop_png, bKing_png, bPawn_png, bKnight_png, bQueen_png, bRook_png, wBishop_png, wKing_png, wKnight_png, wPawn_png, wQueen_png, wRook_png;

function preload(){
  bBishop_png = loadImage("blackbishop.png");
  bKing_png = loadImage("blackking.png");
  bKnight_png = loadImage("blackknight.png");
  bPawn_png = loadImage("blackpawn.png");
  bQueen_png = loadImage("blackqueen.png");
  bRook_png = loadImage("blackrook.png");
  wBishop_png = loadImage("whitebishop.png");
  wKing_png = loadImage("whiteking.png");
  wKnight_png = loadImage("whiteknight.png");
  wPawn_png = loadImage("whitepawn.png");
  wQueen_png = loadImage("whitequeen.png");
  wRook_png = loadImage("whiterook.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  chessboardheightcontroller = height - 100;
  cellsize = chessboardheightcontroller/ROWS;
  grid = startingGrid();
}

function draw() {
  background(200);
  drawGrid();
  drawBoard();
}


function drawGrid() {
  // draws a grid of rectangles of alternating colour
  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if ((x+y+1 ) % 2){
        fill(238,238,210);
      }
      else{
        fill(118,150,86);
      }
      rect(x * cellsize + width/2 - cellsize *4 , y * cellsize + height/2 - cellsize *4, cellsize, cellsize);
    }
  }
}

function startingGrid(){
  let tempGrid = [
    ["bRook","bKnight","bBishop","bQueen", "bKing","bBishop", "bKnight", "bRook"],
    ["bPawn", "bPawn", "bPawn", "bPawn", "bPawn", "bPawn", "bPawn", "bPawn",],
    ["0", "0", "0", "0", "0", "0", "0", "0",],
    ["0", "0", "0", "0", "0", "0", "0", "0",],
    ["0", "0", "0", "0", "0", "0", "0", "0",],
    ["0", "0", "0", "0", "0", "0", "0", "0",],
    ["wPawn", "wPawn", "wPawn", "wPawn", "wPawn", "wPawn", "wPawn", "wPawn",],
    ["wRook","wKnight","wBishop","wQueen", "wKing","wBishop", "wKnight", "wRook"],
  ];
  return tempGrid;
}

function drawBoard(){
  for (let y = 0; y < ROWS; y++){
    for (let x = 0; x < ROWS; x++){
      if (grid[y][x] !== "0"){
        image(eval(PNG_converter(grid[y][x])), x * cellsize + width/2 - cellsize *4, y * cellsize + height/2 - cellsize *4, cellsize, cellsize );
      }
    }

  }
}

function PNG_converter(picname){
  let returner = picname;
  returner = returner + "_png";
  return returner;

}

function mousePressed() {
  let x = Math.floor(mouseX/cellsize - (width/2 - cellsize *4 )/cellsize);
  let y = Math.floor(mouseY/cellsize - (height/2 - cellsize *4 )/cellsize);
  console.log(x);
  console.log(y);
}