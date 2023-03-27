// 2D Array Demo -- Drawing a Grid
// Schellenberg
// March 20, 2023

// let grid = [[0, 0, 1, 1],
//             [1, 1, 0, 0],
//             [0, 1, 0, 1],
//             [1, 1, 1, 1]];

let grid;

const ROWS = 10;
const COLS = 10;
let cellSize;
let characterX = 0;
let characterY = 0;
let wall;
let grass;

function preload(){
  wall = loadImage("brick_brown0.png");
  grass = loadImage("slot_eq.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandomGrid(ROWS, COLS);

  grid[characterY][characterX] = 9;

  if (width < height) {
    cellSize = width/ROWS;
  }
  else {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayGrid();
}

function keyTyped() {
  if (key === "r") {
    grid = createRandomGrid(ROWS, COLS);
  }
  if (key === "w"){
    moveCharacter(0, -1);
  }
  if (key === "s"){
    moveCharacter(0, 1);
  }
  if (key === "a"){
    moveCharacter(-1, 0);
  }
  if (key === "d"){
    moveCharacter(1, 0);
  }
}



function moveCharacter(x, y){
  if (characterX + x >= 0 && characterX + x < COLS && characterY + y >= 0 && characterY + y < ROWS) {

    if (grid[characterY +y][characterX + x]===0){

      let tempX = characterX;
      let tempY = characterY;

      characterX += x;
      characterY += y;

      grid[tempY][tempX] = 0;
      grid[characterY][characterX] = 9;
    }
  }
}


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }

  else if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 1) {
        image(wall, x * cellSize, y * cellSize, cellSize, cellSize );
      }
      else if (grid[y][x] === 0) {
        image(grass, x * cellSize, y * cellSize, cellSize, cellSize );
      }
      else if (grid[y][x] ===9){
        fill("red");
        rect(x * cellSize, y * cellSize, cellSize, cellSize );
      }
    }
  }
}

function createRandomGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

