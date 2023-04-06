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

let pieceSlected = false;
let pieceStorer;
let piecelocationstorerX;
let piecelocationstorerY;
let Whiteturn = true;

let legalmoves = [];
let knightValues = [-2,2];

let WhiteKingMoved = false;
let WhiteLongMoved = false;
let WhiteShortMoved = false;
let BlackKingMoved = false;
let BlackLongMoved = false;
let BlackShortMoved = false;
let CastleStatus;

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
  showHighlight();
  highlightMoves();
  drawBoard();
  checkCastleMove();
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

function checkCastleMove(){
  if (grid[7][0] !== "wRook"){
    WhiteLongMoved = true;
  }
  if (grid[7][7] !== "wRook"){
    WhiteShortMoved = true;
  }
  if (grid[7][4] !== "wKing"){
    WhiteKingMoved = true;
  }
  if (grid[0][0] !== "bRook"){
    BlackLongMoved = true;
  }
  if (grid[0][7] !== "bRook"){
    BlackShortMoved = true;
  }
  if (grid[0][4] !== "bKing"){
    BlackKingMoved = true;
  }
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

function showHighlight(){
  if (pieceSlected){
    fill("red");
    rect(piecelocationstorerX * cellsize + width/2 - cellsize *4, piecelocationstorerY * cellsize + height/2 - cellsize *4, cellsize, cellsize);
  }
}

function highlightMoves(){
  if (legalmoves[0] !== undefined){
    for (let i =0; i < legalmoves.length; i++){
      fill("red");
      rect(legalmoves[i][1] * cellsize + width/2 - cellsize *4, legalmoves[i][0] * cellsize + height/2 - cellsize *4, cellsize, cellsize);
    }
  }
}


function mousePressed() {
  if (!pieceSlected){
    let x = Math.floor(mouseX/cellsize - (width/2 - cellsize *4 )/cellsize);
    let y = Math.floor(mouseY/cellsize - (height/2 - cellsize *4 )/cellsize);
    if (grid[y][x] !== "0" && grid[y][x] !== undefined ) {
      if (Whiteturn &&  grid[y][x][0] === "w"){
        pieceStorer = grid[y][x];
        piecelocationstorerX = x;
        piecelocationstorerY = y;
        console.log(piecelocationstorerX);
        console.log(piecelocationstorerY);
        pieceSlected = true;
        createLegalMoveList(pieceStorer, piecelocationstorerX, piecelocationstorerY);
      }
      else if (!Whiteturn &&  grid[y][x][0] === "b"){
        pieceStorer = grid[y][x];
        piecelocationstorerX = x;
        piecelocationstorerY = y;
        console.log(piecelocationstorerX);
        console.log(piecelocationstorerY);
        pieceSlected = true;
        createLegalMoveList(pieceStorer, piecelocationstorerX, piecelocationstorerY);
      }
    }
    else{
      pieceSlected = false;
    }
  }
  else if (pieceSlected){
    let x = Math.floor(mouseX/cellsize - (width/2 - cellsize *4 )/cellsize);
    let y = Math.floor(mouseY/cellsize - (height/2 - cellsize *4 )/cellsize);
    if(x >= 0 && x < ROWS && y >= 0 && y < ROWS && !(x === piecelocationstorerX && y === piecelocationstorerY)){
      if(legalMovechecker(pieceStorer, x, y, piecelocationstorerX, piecelocationstorerY)  ){
        grid[piecelocationstorerY][piecelocationstorerX] = "0";
        grid[y][x] = pieceStorer;
        displayCastle();
        pieceSlected = false;
        legalmoves = [];
        Whiteturn = !Whiteturn;
      }
    }
    // if you click again on the piece you slected, it will unselect it
    else if (x === piecelocationstorerX && y === piecelocationstorerY){
      pieceSlected = false;
      legalmoves = [];
    }

  }
}


function legalMovechecker(piece, newX, newY){
  for (let i = 0; i < legalmoves.length; i++){
    if (newY === legalmoves[i][0] && newX === legalmoves[i][1]){
      return true;
    }
  }
  return false;


}

function createLegalMoveList(piece, oldX, oldY){
  legalmoves = [];
  if (piece === "wPawn"){
    if (grid[oldY -1][oldX] === "0"){
      legalmoves.push([oldY -1, oldX]);
    }
    if (grid[oldY -1][oldX+1] !== "0" && oldX + 1 !== 8 && grid[oldY - 1][oldX +1][0] !== "w"){
      legalmoves.push([oldY -1, oldX+1]);
    }
    if (grid[oldY -1][oldX-1] !== "0" && oldX-1 !== -1 && grid[oldY - 1][oldX -1][0] !== "w"){
      legalmoves.push([oldY -1, oldX-1]);
    }
    if (grid[oldY - 2][oldX] === "0" && grid[oldY - 1][oldX] === "0" && oldY === 6){
      legalmoves.push([oldY - 2, oldX]);
    }
  }
  if (piece === "bPawn"){
    if (grid[oldY +1][oldX] === "0"){
      legalmoves.push([oldY +1, oldX]);
    }
    if (grid[oldY + 1][oldX +1] !== "0" && oldX+ 1 !== 8 && grid[oldY + 1][oldX +1][0] !== "b"){
      legalmoves.push([oldY +1,oldX + 1]);
    }
    if (grid[oldY + 1][oldX -1] !== "0" && oldX - 1 !==0 && grid[oldY + 1][oldX -1][0] !== "b"){
      legalmoves.push([oldY +1,oldX - 1]);
    }
    if (grid[oldY + 2][oldX] === "0" && grid[oldY + 1][oldX] === "0" && oldY === 1){
      legalmoves.push([oldY + 2, oldX]);
    }

  }
  if (piece[1] === "K" &&piece[2] === "n" ){
    for (let x = 0; x < knightValues.length; x++){
      for (let y = -1; y <2; y++){
        if (y !== 0){
          if (oldY + y >= 0 && oldY + y <= 7 && oldX + knightValues[x] >= 0 &&  oldX + knightValues[x] <=7){
            if (piece[0] === "w" && grid[oldY + y][oldX + knightValues[x]][0] !== "w" || piece[0] === "b" && grid[oldY + y][oldX + knightValues[x]][0] !== "b" ){
              legalmoves.push([oldY + y, oldX + knightValues[x]]);
            }
          }
        }
      }
    }
    for (let y = 0; y < knightValues.length; y++){
      for (let x = -1; x <2; x++){
        if (x !== 0){
          if (oldY + knightValues[y] >= 0 && oldY + knightValues[y] <= 7 && oldX + x >= 0 &&  oldX + x <=7){
            if (piece[0] === "w" && grid[oldY + knightValues[y]][oldX + x][0] !== "w" || piece[0] === "b" && grid[oldY + knightValues[y]][oldX + x][0] !== "b" ){
              legalmoves.push([oldY + knightValues[y], oldX + x]);
            }
          }
        }
      }
    }
  }
  if (piece[1] === "B" || piece[1] === "Q"){
    for (let x = 0; x< 8 -oldX; x++){
      if (oldY + x <8){
        if (grid[oldY][oldX][0] === "w" && grid[oldY + x] [oldX + x][0] === "b" ||grid[oldY][oldX][0] === "b" && grid[oldY + x] [oldX + x][0] === "w"){
          legalmoves.push([oldY + x , oldX + x]);
          x = 999;
        }
        else if (x !== 0 && grid[oldY][oldX][0] === "w" && grid[oldY + x] [oldX + x][0] === "w" ||x !== 0 && grid[oldY][oldX][0] === "b" && grid[oldY + x] [oldX + x][0] === "b"){
          x = 999;
        }
        else{
          legalmoves.push([oldY + x , oldX + x]);
        }
      }
    }
    for (let x = 0; x< 8 -oldX; x++){
      if (oldY - x >= 0){
        console.log("hi");
        if (grid[oldY][oldX][0] === "w" && grid[oldY - x] [oldX + x][0] === "b" ||grid[oldY][oldX][0] === "b" && grid[oldY - x] [oldX + x][0] === "w"){
          legalmoves.push([oldY - x , oldX + x]);
          x = 999;
        }
        else if (x !== 0 && grid[oldY][oldX][0] === "w" && grid[oldY - x] [oldX + x][0] === "w" ||x !== 0 && grid[oldY][oldX][0] === "b" && grid[oldY - x] [oldX + x][0] === "b"){
          x = 999;
        }
        else{
          legalmoves.push([oldY - x , oldX + x]);
        }
      }
    }
    for (let x = 0; x<= 8 - (8 -oldX); x++){
      if (oldY + x <8){
        if (grid[oldY][oldX][0] === "w" && grid[oldY + x] [oldX - x][0] === "b" ||grid[oldY][oldX][0] === "b" && grid[oldY + x] [oldX - x][0] === "w"){
          legalmoves.push([oldY + x , oldX - x]);
          x = 999;
        }
        else if (x !== 0 && grid[oldY][oldX][0] === "w" && grid[oldY + x] [oldX - x][0] === "w" ||x !== 0 && grid[oldY][oldX][0] === "b" && grid[oldY + x] [oldX - x][0] === "b"){
          x = 999;
        }
        else{
          legalmoves.push([oldY + x , oldX - x]);
        }
      }
    }
    for (let x = 0; x<= 8 - (8 -oldX); x++){
      if (oldY - x >= 0){
        if (grid[oldY][oldX][0] === "w" && grid[oldY - x] [oldX - x][0] === "b" ||grid[oldY][oldX][0] === "b" && grid[oldY - x] [oldX - x][0] === "w"){
          legalmoves.push([oldY - x , oldX - x]);
          x = 999;
        }
        else if (x !== 0 && grid[oldY][oldX][0] === "w" && grid[oldY - x] [oldX - x][0] === "w" ||x !== 0 && grid[oldY][oldX][0] === "b" && grid[oldY - x] [oldX - x][0] === "b"){
          x = 999;
        }
        else{
          legalmoves.push([oldY - x , oldX - x]);
        }
      }
    }
  }
  if (piece[1] === "R" || piece[1] === "Q"){
    for (let x = 0; x< 8 -oldX; x++){
      if (grid[oldY][oldX][0] === "w" && grid[oldY] [oldX + x][0] === "b" ||grid[oldY][oldX][0] === "b" && grid[oldY] [oldX + x][0] === "w"){
        legalmoves.push([oldY, oldX + x]);
        x = 999;
      }
      else if (x !== 0 && grid[oldY][oldX][0] === "w" && grid[oldY] [oldX + x][0] === "w" ||x !== 0 && grid[oldY][oldX][0] === "b" && grid[oldY] [oldX + x][0] === "b"){
        x = 999;
      }
      else{
        legalmoves.push([oldY , oldX + x]);
      }
    }
    for (let y = 0; y<= 8 -(8 - oldY); y++){
      if (grid[oldY][oldX][0] === "w" && grid[oldY - y] [oldX ][0] === "b" ||grid[oldY][oldX][0] === "b" && grid[oldY - y] [oldX][0] === "w"){
        legalmoves.push([oldY - y , oldX]);
        y = 999;
      }
      else if (y !== 0 && grid[oldY][oldX][0] === "w" && grid[oldY - y] [oldX][0] === "w" ||y !== 0 && grid[oldY][oldX][0] === "b" && grid[oldY - y] [oldX][0] === "b"){
        y = 999;
      }
      else{
        legalmoves.push([oldY - y , oldX]);
      }
    }
    for (let x = 0; x<= 8 - (8 -oldX); x++){
      if (grid[oldY][oldX][0] === "w" && grid[oldY] [oldX - x][0] === "b" ||grid[oldY][oldX][0] === "b" && grid[oldY] [oldX - x][0] === "w"){
        legalmoves.push([oldY, oldX - x]);
        x = 999;
      }
      else if (x !== 0 && grid[oldY][oldX][0] === "w" && grid[oldY] [oldX - x][0] === "w" ||x !== 0 && grid[oldY][oldX][0] === "b" && grid[oldY][oldX - x][0] === "b"){
        x = 999;
      }
      else{
        legalmoves.push([oldY, oldX - x]);
      }
    }
    for (let y = 0; y<= 8 -oldY; y++){
      if (grid[oldY][oldX][0] === "w" && grid[oldY + y] [oldX ][0] === "b" ||grid[oldY][oldX][0] === "b" && grid[oldY + y] [oldX][0] === "w"){
        legalmoves.push([oldY + y , oldX]);
        y = 999;
      }
      else if (y !== 0 && grid[oldY][oldX][0] === "w" && grid[oldY + y] [oldX][0] === "w" ||y !== 0 && grid[oldY][oldX][0] === "b" && grid[oldY + y] [oldX][0] === "b"){
        y = 999;
      }
      else{
        legalmoves.push([oldY + y , oldX]);
      }
    }
  }
  if (piece[1] === "K" && piece[2] === "i"){
    for (let y = -1; y<2; y++){
      for (let x= -1; x<2; x++){
        if (oldX + x >= 0 && oldX + x < 8 && oldY + y >=0 && oldY + y < 8){
          if (piece[0] === "w" && grid[oldY + y][oldX + x][0] === "b" || piece[0] === "b" && grid[oldY + y][oldX + x][0] === "w"||  grid[oldY + y][oldX + x] === "0"){
            legalmoves.push([oldY +y, oldX + x]);
          }
        }
      }
    }
  }
  if (piece[1] === "K" && piece[2] === "i"){
    pushCastle(piece[0]);
  }
}

function pushCastle(color){
  if (color === "w"){
    if (!WhiteKingMoved && !WhiteShortMoved && grid[7][5] === "0" && grid[7][6] === "0"){
      legalmoves.push([7, 6]);
      CastleStatus = "wShort";
    }
    if (!WhiteKingMoved && !WhiteLongMoved && grid[7][1] === "0" && grid[7][2] === "0" && grid[7][3] === "0"){
      legalmoves.push([7, 2])
      CastleStatus = "wLong";
    }
  }
  else{
    if (!BlackKingMoved && !BlackShortMoved && grid[0][5] === "0" && grid[0][6] === "0"){
      legalmoves.push([0, 6])
      CastleStatus = "bShort";
    }
    if (!BlackKingMoved && !BlackLongMoved && grid[0][1] === "0" && grid[0][2] === "0" && grid[0][3] === "0"){
      legalmoves.push([0, 2])
      CastleStatus = "bLong";
    }
  }
}

function displayCastle(){
  if (CastleStatus === "wShort"){
    grid[7][7] = "0";
    grid[7][5] = "wRook";
    CastleStatus = "none";
  }
  if (CastleStatus === "wLong"){
    grid[7][0] = "0";
    grid[7][3] = "wRook";
    CastleStatus = "none";
  }
  if (CastleStatus === "bShort"){
    grid[0][7] = "0";
    grid[0][5] = "bRook";
    CastleStatus = "none";
  }
  if (CastleStatus === "bLong"){
    grid[0][0] = "0";
    grid[0][3] = "bRook";
    CastleStatus = "none";
  }
}