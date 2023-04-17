// Chess 
// Elijah Zhao
// 2023-04-16
//
// Extra for Experts:
// use of iteration for up to 6 nested loops to compare multiple 2d arrays to check for checkates and legal moves
// string and list manipulation
//
// controls:
// click on a piece to select it and move by clicking on its legal moves
// click on the same peice to unslect it
//
// BOARD PRESET 1 IS THE REGULAR BOARD
// to change the board preset, scroll to set up function, and the first line under it is "grid = startingGrid(1);""
// change the number in startingGrid to anything from 2-4 for forced checkmate puzzels for white
// example :  grid = grid = startingGrid(1);  startingGrid(2);   grid = startingGrid(3);   grid = startingGrid(4);

//define grid based variables
const ROWS = 8;
let cellsize;
let chessboardheightcontroller;
let grid = [];

//define checkmate based variables
let checkmatemoves;
let checkmate = false;

//define piece information based variables
let pieceSlected = false;
let pieceStorer;
let piecelocationstorerX;
let piecelocationstorerY;
let Whiteturn = true;

//define legal moves based variables
let returnlist = [];
let legalmoves = [];
let legalmovecheckerlist = [];
let knightValues = [-2,2];
let firstlegalmovecheck = false;

//define king and castling based variables
let WhiteKingMoved = false;
let WhiteLongMoved = false;
let WhiteShortMoved = false;
let BlackKingMoved = false;
let BlackLongMoved = false;
let BlackShortMoved = false;
let CastleStatus;
let wKingY = 7;
let wKingX = 4;
let bKingY = 0;
let bKingX = 4;

// define pieces 
let bBishop_png, bKing_png, bPawn_png, bKnight_png, bQueen_png, bRook_png, wBishop_png, wKing_png, wKnight_png, wPawn_png, wQueen_png, wRook_png;



// load images
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
  
  // load up starting chess board, i have preset 2, 3, 4 as forced checkmate puzzles for white
  grid = startingGrid(1);
  createCanvas(windowWidth, windowHeight);

  // varible for sizing
  chessboardheightcontroller = height - 100;
  cellsize = chessboardheightcontroller/ROWS;
}

function draw() {
  background(200);
  drawGrid();  //draw the chess board
  showHighlight(); //highlight slected pieces
  highlightMoves(); //hightlight legal moves
  drawBoard();  //draw all the pieces
  checkCastleMove(); // check if castling is legal
  lookForCheckmate(); // constantly look for checkmate
}

function mousePressed() {

  // if there is not slected piece

  if (!pieceSlected){

    //takes a spot you clicked on the board and gives a value 0-7 on the y and x
    let x = Math.floor(mouseX/cellsize - (width/2 - cellsize *4 )/cellsize);
    let y = Math.floor(mouseY/cellsize - (height/2 - cellsize *4 )/cellsize);

    // selects a white piece
    if (grid[y][x] !== "0" && grid[y][x] !== undefined ) {
      if (Whiteturn &&  grid[y][x][0] === "w"){
        pieceStorer = grid[y][x];
        piecelocationstorerX = x;
        piecelocationstorerY = y;
        pieceSlected = true;
        firstlegalmovecheck = true;

        //creates a list of legal moves 
        legalmoves = createLegalMoveList(pieceStorer, piecelocationstorerX, piecelocationstorerY, grid);
        firstlegalmovecheck = false;
        
        //updates them to make sure the move doesn't put the king in check
        updateLegalmoveswithchecks(legalmoves, pieceStorer, piecelocationstorerY, piecelocationstorerX);
      }

      // selects a black piece
      else if (!Whiteturn &&  grid[y][x][0] === "b"){
        pieceStorer = grid[y][x];
        piecelocationstorerX = x;
        piecelocationstorerY = y;
        pieceSlected = true;
        firstlegalmovecheck = true;

        //creates a list of legal moves
        legalmoves = createLegalMoveList(pieceStorer, piecelocationstorerX, piecelocationstorerY, grid);
        firstlegalmovecheck = false;

        //updates them to make sure the move doesn't put the king in check
        updateLegalmoveswithchecks(legalmoves, pieceStorer, piecelocationstorerY, piecelocationstorerX);
      }
    }
    else{

      // if you click off the board or not on a piece, it will not select anything
      pieceSlected = false;
    }
  }

  // once you have a piece selected
  else if (pieceSlected){

    //takes a spot you clicked on the board and gives a value 0-7 on the y and x
    let x = Math.floor(mouseX/cellsize - (width/2 - cellsize *4 )/cellsize);
    let y = Math.floor(mouseY/cellsize - (height/2 - cellsize *4 )/cellsize);

    // checks if that spot is on the board
    if(x >= 0 && x < ROWS && y >= 0 && y < ROWS && !(x === piecelocationstorerX && y === piecelocationstorerY)){

      // checks if spot you clicked is on the list of legal moves
      if(legalMovechecker(x, y, piecelocationstorerX, piecelocationstorerY)  ){
        grid[piecelocationstorerY][piecelocationstorerX] = "0";
        grid[y][x] = pieceStorer;

        //stores black and white kings position
        if (pieceStorer === "wKing"){
          wKingY = y;
          wKingX = x;
        }
        if (pieceStorer === "bKing"){
          bKingY = y;
          bKingX = x;
        }

        //moves the rook for castle
        displayCastle();

        //promotes pawns to queens 
        pawnpromote();

        //checks if there is any legal moves
        checkformate();

        //unselects the piece and changes the turn
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

//promotes pawn if to queen if they are on the 0 or 7 rank
function pawnpromote(){
  for (let x = 0; x < ROWS; x++){
    if (grid[0][x] === "wPawn"){
      grid[0][x] = "wQueen"
    }
  }
  for (let x = 0; x < ROWS; x++){
    if (grid[7][x] === "bPawn"){
      grid[7][x] = "bQueen"
    }
  }
}

// will stop game if there is no more legal moves for a side
function lookForCheckmate(){
  if (checkmate){
    pieceSlected = "checkmate"
    textSize(200);
    fill("black");
    textAlign(CENTER, CENTER);
    textFont('Helvetica');
    text('CheckMate', width/2, height/2);
  }
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

function startingGrid(number){

  // set up for the default 
  if (number === 1){
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
  // presets 2,3,4 are all puzzles for white
  else if (number === 2){
    let tempGrid = [
      ["0","0","0","0", "bKing","bBishop", "0", "bRook"],
      ["bPawn", "0", "0", "bKnight", "0", "bPawn", "bPawn", "bPawn",],
      ["0", "0", "0", "0", "bQueen", "0", "0", "0",],
      ["0", "0", "0", "0", "bPawn", "0", "wBishop", "0",],
      ["0", "0", "0", "0", "wPawn", "0", "0", "0",],
      ["0", "wQueen", "0", "0", "0", "0", "0", "0",],
      ["wPawn", "wPawn", "wPawn", "0", "0", "wPawn", "wPawn", "wPawn",],
      ["0","0","wKing","wRook", "wKing","0", "0", "0"],
    ];
    wKingY = 7;
    wKingX = 4;
    bKingY = 0;
    bKingX = 4;
    return tempGrid;
  }
  else if (number === 3){
    let tempGrid = [
      ["bRook","0","bKing","0", "0","0", "0", "bRook"],
      ["bPawn", "bPawn", "bPawn", "0", "bBishop", "bQueen", "0", "bPawn",],
      ["0", "0", "bKnight", "0", "wKnight", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "wBishop", "0",],
      ["0", "0", "0", "bPawn", "0", "0", "wQueen", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0",],
      ["wPawn", "wPawn", "wPawn", "0", "0", "wPawn", "wPawn", "wPawn",],
      ["wRook","0","0","0", "0","0", "wKing", "0"],
    ];
    wKingY = 7;
    wKingX = 6;
    bKingY = 0;
    bKingX = 2;
    return tempGrid;
  }
  else if (number === 4){
    let tempGrid = [
      ["bKing","bBishop","wKing","0", "0","0", "0", "0"],
      ["bPawn", "bPawn", "0", "0", "0", "0", "0", "0",],
      ["0", "wPawn", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0",],
      ["wRook","0","0","0", "0","0", "0", "0"],
    ];
    wKingY = 0;
    wKingX = 2;
    bKingY = 0;
    bKingX = 0;
    return tempGrid;
  }
}

// checks if pieces have moved (to see if castling is legal)
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

// goes through every spot and checks if there is a piece there
function drawBoard(){
  for (let y = 0; y < ROWS; y++){
    for (let x = 0; x < ROWS; x++){
      if (grid[y][x] !== "0"){

        // adds "_png" at the end and draws the piece
        image(eval(PNG_converter(grid[y][x])), x * cellsize + width/2 - cellsize *4, y * cellsize + height/2 - cellsize *4, cellsize, cellsize );
      }
    }

  }
}

// takes the name of the piece and adds "_png" to access the photo
function PNG_converter(picname){
  let returner = picname;
  returner = returner + "_png";
  return returner;
}

// highlights the selected piece
function showHighlight(){
  if (pieceSlected){
    fill("red");
    rect(piecelocationstorerX * cellsize + width/2 - cellsize *4, piecelocationstorerY * cellsize + height/2 - cellsize *4, cellsize, cellsize);
  }
}

//goes through all the legal moves and highlights them
function highlightMoves(){
  if (legalmoves[0] !== undefined){
    for (let i =0; i < legalmoves.length; i++){
      fill("red");
      rect(legalmoves[i][1] * cellsize + width/2 - cellsize *4, legalmoves[i][0] * cellsize + height/2 - cellsize *4, cellsize, cellsize);
    }
  }
}

//checks if there is no legal moves 
function checkformate(){
  let value = 0;
  checkmatemoves = [];

  //at the end of white
  if (Whiteturn){

    // goes through every black piece
    for (let y = 0; y < ROWS; y++){
      for (let x = 0; x < ROWS; x++){
        if (grid[y][x][0] === "b"){

          //creates a list of there legal moves
          checkmatemoves = createLegalMoveList(grid[y][x], x, y, grid);
          updateLegalmoveswithchecks(checkmatemoves, grid[y][x], y, x);

          //if there is a move, it will track is
          if (IsThereMove(checkmatemoves, y, x)){
            value++;
          }
        }
      }
    }
  }

  //at the end of black 
  else{

    // goes through every black piece
    for (let y = 0; y < ROWS; y++){
      for (let x = 0; x < ROWS; x++){
        if (grid[y][x][0] === "w"){

          //creates a list of there legal moves
          checkmatemoves = createLegalMoveList(grid[y][x], x, y, grid);
          updateLegalmoveswithchecks(checkmatemoves, grid[y][x], y, x);

          //if there is a move, it will track is
          if (IsThereMove(checkmatemoves, y, x)){
            value++;
          }
        }
      }
    }
  }
  // if it didn't track any moves, meaning there is no legal moves, it will return checkmate
  if (value === 0){
    checkmate = true;
    console.log("checkmate");
  }
}

//goes through a list of moves and checks if they are legal
function IsThereMove(moves, theY, theX){
  for (let i = 0; i < moves.length; i++){
    if (moves[i][0] !== theY || moves[i][1] !== theX){
      return true // there is a move
    }
  }
  return false; // there is no move
}


//make a new grid with a specfic case
//interate the new grid for every legal move
// for that specfic legal move, if no black pieces hit the kings x and y, push that move to a new grid
// after all moves, make legal moves equal to the list of pushed moves that evade check
function updateLegalmoveswithchecks(themoves, thepiece, pieceY, pieceX){
  let tempgrid = [];
  let Wkingchecked = false;
  let bkingchecked = false;

  //creates the new temp grid
  for (let a = 0 ; a  < themoves.length; a++){
    tempgrid = [];
    for (let y = 0; y<ROWS; y++){
      tempgrid.push([...grid[y]]);
    }

    // checks if it is a piece and will skip the the iteration if there is no peice
    tempgrid[pieceY][pieceX] = "0";
    if (a === -1){
      a = 0;
    }
    if (themoves.length === 0){ continue;}

    // if there is a piece it places it on the temp grid and will go through every move from the other color. if none of the moves from the other color hit the the kings y and x, then the move is legal
    tempgrid[themoves[a][0]][themoves[a][1]] = thepiece;
    for (let y = 0; y < ROWS; y++){
      for (let x = 0; x < ROWS; x++){

        //checks move for white king
        if (thepiece[1] === "K" && thepiece[2] === "i" && thepiece[0] === "w" && tempgrid[y][x][0] === "b"){
          legalmovecheckerlist = createLegalMoveList(tempgrid[y][x], x, y, tempgrid);

          //compares moves of black move to check if it hits white king x and y
          for (let i = 0; i < legalmovecheckerlist.length; i++){

            //if it does it white king y and x, removes that white move from the legalmoves list and exits the loop
            if (themoves[a][0] === legalmovecheckerlist[i][0] && themoves[a][1] === legalmovecheckerlist[i][1] ){
              themoves.splice(a, 1);
              console.log("illegal")
              Wkingchecked = true
              a--; 
              i = 100000;
            }
          }
        }

        //checks move for black king
        else if (thepiece[1] === "K" && thepiece[2] === "i" && thepiece[0] === "b" && tempgrid[y][x][0] === "w"){
          legalmovecheckerlist = createLegalMoveList(tempgrid[y][x], x, y, tempgrid);

          //compares white move to check if it hits black king x and y
          for (let i = 0; i < legalmovecheckerlist.length; i++){

            //if it does it black king y and x, removes that king move from the legalmoves list and exits the loop
            if (themoves[a][0] === legalmovecheckerlist[i][0] && themoves[a][1] === legalmovecheckerlist[i][1] ){
              themoves.splice(a, 1);
              console.log("illegal")
              bkingchecked = true
              a--;
              i = 100000;
            }
          }
        }

        // if the piece is white and not the king
        else if (thepiece[0] === "w" && tempgrid[y][x][0] === "b"){
          legalmovecheckerlist = createLegalMoveList(tempgrid[y][x], x, y, tempgrid);

          //compares black moves to check if it hits white king x and y
          for (let i = 0; i < legalmovecheckerlist.length; i++){

            // if a black piece can hit the white king x and y, that move is not legal and removes it from the legalmoves list
            if (legalmovecheckerlist[i][0] === wKingY && legalmovecheckerlist[i][1] === wKingX ){
              themoves.splice(a, 1);
              a--;
              i - 100000;
            }
          }
        }
        // if the piece is black and not the king
        else if (thepiece[0] === "b" && tempgrid[y][x][0] === "w"){
          legalmovecheckerlist = createLegalMoveList(tempgrid[y][x], x, y, tempgrid);

          //compares white moves to check if it hits black king x and y
          for (let i = 0; i < legalmovecheckerlist.length; i++){

            // if a white piece can hit the black king x and y, that move is not legal and removes it from the legalmoves list
            if (legalmovecheckerlist[i][0] === bKingY && legalmovecheckerlist[i][1] === bKingX ){
              themoves.splice(a, 1);
              a--;
              i = 1000000;
            }
          }
        }

        //exits the loop if the move is not legal
        if (Wkingchecked || bkingchecked){
          x = 99;
        }
      }

      //exits the loop if the move is not legal
      if (Wkingchecked || bkingchecked){
        y = 99;
        Wkingchecked = false;
        bkingchecked = false;
      }
    }
  }
}

// checks to see if the spot you clicked is on the list of legal moves
function legalMovechecker( newX, newY){
  console.log(newY)
  console.log(newX)
  for (let i = 0; i < legalmoves.length; i++){
    if (newY === legalmoves[i][0] && newX === legalmoves[i][1]){
      console.log("true")
      return true;
    }
  }
  console.log("false")
  return false;
}


// checks the piece you clicked and makes a list of moves
function createLegalMoveList(piece, oldX, oldY, layout){
  returnlist = [];

  // if the piece is a pawn, lets the pawn move forward if there is no pieces in front
  // allows a diagonal take if the piece is of different color
  // allows a double push if the pawn hasn't moved
  if (piece === "wPawn"){
    if (layout[oldY -1][oldX] === "0"){
      returnlist.push([oldY -1, oldX]);
    }
    if (layout[oldY -1][oldX+1] !== "0" && oldX + 1 !== 8 && layout[oldY - 1][oldX +1][0] !== "w"){
      returnlist.push([oldY -1, oldX+1]);
    }
    if (layout[oldY -1][oldX-1] !== "0" && oldX-1 !== -1 && layout[oldY - 1][oldX -1][0] !== "w"){
      returnlist.push([oldY -1, oldX-1]);
    }
    if (oldY === 6 && layout[oldY - 2][oldX] === "0" && layout[oldY - 1][oldX] === "0"){
      returnlist.push([oldY - 2, oldX]);
    }
  }
  if (piece === "bPawn"){
    if (layout[oldY +1][oldX] === "0"){
      returnlist.push([oldY +1, oldX]);
    }
    if (layout[oldY + 1][oldX +1] !== "0" && oldX+ 1 !== 8 && layout[oldY + 1][oldX +1][0] !== "b"){
      returnlist.push([oldY +1,oldX + 1]);
    }
    if (layout[oldY + 1][oldX -1] !== "0" && oldX - 1 >= 0 && layout[oldY + 1][oldX -1][0] !== "b"){
      returnlist.push([oldY +1,oldX - 1]);
    }
    if (oldY === 1 && layout[oldY + 2][oldX] === "0" && layout[oldY + 1][oldX] === "0"){
      returnlist.push([oldY + 2, oldX]);
    }
  }

  // if the piece is a knight, iterates through all moves that go 2 across and 1 in height, or 2 in height and 1 across.
  if (piece[1] === "K" &&piece[2] === "n" ){
    for (let x = 0; x < knightValues.length; x++){
      for (let y = -1; y <2; y++){

        // proceeds only when y is 1 or -1, becasue horses can't move in a straight line, and if the move stays on the board
        if (y !== 0){
          if (oldY + y >= 0 && oldY + y <= 7 && oldX + knightValues[x] >= 0 &&  oldX + knightValues[x] <=7){

            // makes sure the knight is not moving onto a piece of the same color
            if (piece[0] === "w" && layout[oldY + y][oldX + knightValues[x]][0] !== "w" || piece[0] === "b" && layout[oldY + y][oldX + knightValues[x]][0] !== "b" ){
              returnlist.push([oldY + y, oldX + knightValues[x]]);
            }
          }
        }
      }
    }
    for (let y = 0; y < knightValues.length; y++){
      for (let x = -1; x <2; x++){

        // proceeds only when x is 1 or -1, becasue horses can't move in a straight line, and if the move stays on the board
        if (x !== 0){
          if (oldY + knightValues[y] >= 0 && oldY + knightValues[y] <= 7 && oldX + x >= 0 &&  oldX + x <=7){

            // makes sure the knight is not moving onto a piece of the same color
            if (piece[0] === "w" && layout[oldY + knightValues[y]][oldX + x][0] !== "w" || piece[0] === "b" && layout[oldY + knightValues[y]][oldX + x][0] !== "b" ){
              returnlist.push([oldY + knightValues[y], oldX + x]);
            }
          }
        }
      }
    }
  }

  //if the peice is a queen or bishop
  if (piece[1] === "B" || piece[1] === "Q"){

    // checks for moves travleing to the bottom right corner, and makes sure it doesn't go out of bonds on the y and x 
    for (let x = 0; x< 8 -oldX; x++){
      if (oldY + x <8){

        // if the move hits a piece of another color, it allows it take it and ends the loop
        if (layout[oldY][oldX][0] === "w" && layout[oldY + x] [oldX + x][0] === "b" ||layout[oldY][oldX][0] === "b" && layout[oldY + x] [oldX + x][0] === "w"){
          returnlist.push([oldY + x , oldX + x]);
          x = 999;  
        }

        // if the move hits a piece of same color, it ends the loop
        else if (x !== 0 && layout[oldY][oldX][0] === "w" && layout[oldY + x] [oldX + x][0] === "w" ||x !== 0 && layout[oldY][oldX][0] === "b" && layout[oldY + x] [oldX + x][0] === "b"){
          x = 999;
        }

        // allows the move into a empty square
        else{
          returnlist.push([oldY + x , oldX + x]);
        }
      }
    }

    // checks for moves travleing to the top right corner, and makes sure it doesn't go out of bonds on the y and x 
    for (let x = 0; x< 8 -oldX; x++){
      if (oldY - x >= 0){

        // if the move hits a piece of another color, it allows it take it and ends the loop
        if (layout[oldY][oldX][0] === "w" && layout[oldY - x] [oldX + x][0] === "b" ||layout[oldY][oldX][0] === "b" && layout[oldY - x] [oldX + x][0] === "w"){
          returnlist.push([oldY - x , oldX + x]);
          x = 999;
        }

        // if the move hits a piece of same color, it ends the loop
        else if (x !== 0 && layout[oldY][oldX][0] === "w" && layout[oldY - x] [oldX + x][0] === "w" ||x !== 0 && layout[oldY][oldX][0] === "b" && layout[oldY - x] [oldX + x][0] === "b"){
          x = 999;
        }

        // allows the move into a empty square
        else{
          returnlist.push([oldY - x , oldX + x]);
        }
      }
    }

    // checks for moves travleing to the bottom left corner, and makes sure it doesn't go out of bonds on the y and x 
    for (let x = 0; x<= 8 - (8 -oldX); x++){
      if (oldY + x <8){

        // if the move hits a piece of another color, it allows it take it and ends the loop
        if (layout[oldY][oldX][0] === "w" && layout[oldY + x] [oldX - x][0] === "b" ||layout[oldY][oldX][0] === "b" && layout[oldY + x] [oldX - x][0] === "w"){
          returnlist.push([oldY + x , oldX - x]);
          x = 999;
        }

        // if the move hits a piece of same color, it ends the loop
        else if (x !== 0 && layout[oldY][oldX][0] === "w" && layout[oldY + x] [oldX - x][0] === "w" ||x !== 0 && layout[oldY][oldX][0] === "b" && layout[oldY + x] [oldX - x][0] === "b"){
          x = 999;
        }

        // allows the move into a empty square
        else{
          returnlist.push([oldY + x , oldX - x]);
        }
      }
    }

    // checks for moves travleing to the top left corner, and makes sure it doesn't go out of bonds on the y and x 
    for (let x = 0; x<= 8 - (8 -oldX); x++){
      if (oldY - x >= 0){

        // if the move hits a piece of another color, it allows it take it and ends the loop
        if (layout[oldY][oldX][0] === "w" && layout[oldY - x] [oldX - x][0] === "b" ||layout[oldY][oldX][0] === "b" && layout[oldY - x] [oldX - x][0] === "w"){
          returnlist.push([oldY - x , oldX - x]);
          x = 999;
        }

        // if the move hits a piece of same color, it ends the loop
        else if (x !== 0 && layout[oldY][oldX][0] === "w" && layout[oldY - x] [oldX - x][0] === "w" ||x !== 0 && layout[oldY][oldX][0] === "b" && layout[oldY - x] [oldX - x][0] === "b"){
          x = 999;
        }

        // allows the move into a empty square
        else{
          returnlist.push([oldY - x , oldX - x]);
        }
      }
    }
  }

  // if the piece is a rook or queen
  if (piece[1] === "R" || piece[1] === "Q"){

    // checks for moves travleing to the right
    for (let x = 0; x< 8 -oldX; x++){

      // if the move hits a piece of another color, it allows it take it and ends the loop
      if (layout[oldY][oldX][0] === "w" && layout[oldY] [oldX + x][0] === "b" ||layout[oldY][oldX][0] === "b" && layout[oldY] [oldX + x][0] === "w"){
        returnlist.push([oldY, oldX + x]);
        x = 999;
      }

       // if the move hits a piece of same color, it ends the loop
      else if (x !== 0 && layout[oldY][oldX][0] === "w" && layout[oldY] [oldX + x][0] === "w" ||x !== 0 && layout[oldY][oldX][0] === "b" && layout[oldY] [oldX + x][0] === "b"){
        x = 999;
      }

      // allows the move into a empty square
      else{
        returnlist.push([oldY , oldX + x]);
      }
    }

    // checks for moves travleing up
    for (let y = 0; y<= 8 -(8 - oldY); y++){

      // if the move hits a piece of another color, it allows it take it and ends the loop
      if (layout[oldY][oldX][0] === "w" && layout[oldY - y] [oldX ][0] === "b" ||layout[oldY][oldX][0] === "b" && layout[oldY - y] [oldX][0] === "w"){
        returnlist.push([oldY - y , oldX]);
        y = 999;
      }

      // if the move hits a piece of same color, it ends the loop
      else if (y !== 0 && layout[oldY][oldX][0] === "w" && layout[oldY - y] [oldX][0] === "w" ||y !== 0 && layout[oldY][oldX][0] === "b" && layout[oldY - y] [oldX][0] === "b"){
        y = 999;
      }

      // allows the move into a empty square
      else{
        returnlist.push([oldY - y , oldX]);
      }
    }

    // checks for moves travleing to the left
    for (let x = 0; x<= 8 - (8 -oldX); x++){

      // if the move hits a piece of another color, it allows it take it and ends the loop
      if (layout[oldY][oldX][0] === "w" && layout[oldY][oldX - x][0] === "b" ||layout[oldY][oldX][0] === "b" && layout[oldY][oldX - x][0] === "w"){
        returnlist.push([oldY, oldX - x]);
        x = 999;
      }

      // if the move hits a piece of same color, it ends the loop
      else if (x !== 0 && layout[oldY][oldX][0] === "w" && layout[oldY] [oldX - x][0] === "w" ||x !== 0 && layout[oldY][oldX][0] === "b" && layout[oldY][oldX - x][0] === "b"){
        x = 999;
      }

      // allows the move into a empty square
      else{
        returnlist.push([oldY, oldX - x]);
      }
    }

    // checks for moves travleing down
    for (let y = 0; y< 8 -oldY; y++){

      // if the move hits a piece of another color, it allows it take it and ends the loop
      if (layout[oldY][oldX][0] === "w" && layout[oldY + y][oldX ][0] === "b" ||layout[oldY][oldX][0] === "b" && layout[oldY + y][oldX][0] === "w"){
        returnlist.push([oldY + y , oldX]);
        y = 999;
      }

      // if the move hits a piece of same color, it ends the loop
      else if (y !== 0 && layout[oldY][oldX][0] === "w" && layout[oldY + y] [oldX][0] === "w" ||y !== 0 && layout[oldY][oldX][0] === "b" && layout[oldY + y] [oldX][0] === "b"){
        y = 999;
      }

      // allows the move into a empty square
      else{
        returnlist.push([oldY + y , oldX]);
      }
    }
  }

  // if the piece is the king, iterates through square around it
  // allows the move if its into an empty square, or a piece of the opposite color
  if (piece[1] === "K" && piece[2] === "i"){
    for (let y = -1; y<2; y++){
      for (let x= -1; x<2; x++){
        if (oldX + x >= 0 && oldX + x < 8 && oldY + y >=0 && oldY + y < 8){
          if (piece[0] === "w" && layout[oldY + y][oldX + x][0] === "b" || piece[0] === "b" && layout[oldY + y][oldX + x][0] === "w"||  layout[oldY + y][oldX + x] === "0"){
            returnlist.push([oldY +y, oldX + x]);
          }
        }
      }
    }
  }
  // checks for the possibility of castleing
  if (piece[1] === "K" && piece[2] === "i"){
    pushCastle(piece[0]);
  }

  // returns the list of legal moves
  return returnlist;
}

//checks for castleing
// if the rook and king hasn't moved, and the squares in between are empty
function pushCastle(color){
  if (color === "w"){
    if (!WhiteKingMoved && !WhiteShortMoved && grid[7][5] === "0" && grid[7][6] === "0"){
      returnlist.push([7, 6]);
      if (firstlegalmovecheck){
       CastleStatus = "wShort";
      }
    }
    if (!WhiteKingMoved && !WhiteLongMoved && grid[7][1] === "0" && grid[7][2] === "0" && grid[7][3] === "0"){
      returnlist.push([7, 2]);
      if (firstlegalmovecheck){
        CastleStatus = "wLong";
      }
    }
  }
  if (color === "b"){
    if (!BlackKingMoved && !BlackShortMoved && grid[0][5] === "0" && grid[0][6] === "0"){
      returnlist.push([0, 6]);
      if (firstlegalmovecheck){
       CastleStatus = "bShort";
      }
    }
    if (!BlackKingMoved && !BlackLongMoved && grid[0][1] === "0" && grid[0][2] === "0" && grid[0][3] === "0"){
      returnlist.push([0, 2]);
      if (firstlegalmovecheck){
        CastleStatus = "bLong";
      }
    }
  }
}


//if a castle move is played, it will move the rook to the right place
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