// Color Game
// Dan Schellenberg
// March 21, 2023

const ROWS = 40;
const COLS = 40;
let grid;
let cellSize;
let AUTOUPDATE = true;
let gosperGun;

function preload(){
  gosperGun = loadJSON("gosper.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandom2dArray(ROWS, COLS);

  //fill the largest square area possible...
  if (width < height) {
    cellSize = width/COLS;
  }
  else {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayGrid(grid);
  if (AUTOUPDATE && frameCount % 10 === 0){
    grid = updateGrid();
  }
}

function keyTyped() {
  if (key === "j"){
    grid = gosperGun;
  }
  if (key === "r") {
    grid = createRandom2dArray(ROWS, COLS);
  }
  else if (key === "e") {
    grid = createEmpty2dArray(ROWS, COLS);
  }
  else if (key === " "){
    grid = updateGrid();
  }
  else if (key === "w"){
    AUTOUPDATE = !AUTOUPDATE;
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
}

function updateGrid(){
  let nextTurn = createEmpty2dArray(ROWS, COLS);

  for (let y = 0; y < ROWS; y++){
    for (let x = 0; x < COLS; x++){
      let neighbours = 0;

      for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
          if (y+ i >= 0 && y + i <ROWS && x +j >= 0 && x+j < COLS){
            neighbours += grid[y+i][x+j];
          }
        }
      }

      neighbours -= grid[y][x];

      //apply rules

      if (grid[y][x]===1){
        if (neighbours === 2|| neighbours ===3){
          nextTurn[y][x] = 1;//stay alive
        }
        else {
          nextTurn[y][x] = 0;//die from being lonely
        }
      }

      if (grid[y][x] ===0){
        if (neighbours ===3){
          nextTurn[y][x] = 1; //newbirth
        }
      }


    }
    
  }


  return nextTurn;


}


function toggleCell(x, y) {
  //sanity check
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid(grid) {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 0) {
        fill("orange");
      }
      if (grid[y][x] === 1) {
        fill("blue");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function createEmpty2dArray(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function createRandom2dArray(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      if (random(100) > 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}