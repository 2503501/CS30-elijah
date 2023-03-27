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
let blackBishop;
let blackKing;
let blackKnight;
let blackPawn;
let blackQueen;
let blackRook;
let whiteBishop;
let whiteKing;
let whiteKnight;
let whitePawn;
let whiteQueen;
let whiteRook;

function preload(){
  blackBishop = loadImage("blackbishop.png");
  blackKing = loadImage("blackking.png");
  blackKnight = loadImage("blackknight.png");
  blackPawn = loadImage("blackpawn.png");
  blackQueen = loadImage("blackqueen.png");
  blackRook = loadImage("blackrook.png");
  whiteBishop = loadImage("whitebishop.png");
  whiteKing = loadImage("whiteking.png");
  whiteKnight = loadImage("whiteknight.png");
  whitePawn = loadImage("whitepawn.png");
  whiteQueen = loadImage("whitequeen.png");
  whiteRook = loadImage("whiterook.png");
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
      if (grid[y][x] === "bPawn"){
        image(blackPawn, x * cellsize + width/2 - cellsize *4, y * cellsize + height/2 - cellsize *4, cellsize, cellsize );
      }
    }

  }
}