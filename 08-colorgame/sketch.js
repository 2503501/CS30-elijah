// Color game


const ROW = 8;
const COLS = 8;
let grid;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2dArray(ROW, COLS);

  if (width < height){
    cellSize = width / COLS;
  }
  else{
    cellSize = height/ ROW;
  }
}

function draw() {
  background(220);
  displayGrid(grid);
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x + 1,y);
  toggleCell(x - 1,y);
  toggleCell(x,y + 1);
  toggleCell(x,y - 1);
  toggleCell(x,y);

}

function toggleCell(x, y) {
  if (x >= 0 && x <ROW  && y >= 0 && y< COLS ){
    if (grid[x][y] ===0){
      grid[x][y] =1;
    }
    else if (grid[x][y] ===1){
      grid[x][y] =0;
    }
  }
}


function displayGrid(grid){
  for (let x = 0; x < ROW; x++) {
    for (let y = 0; y < COLS; y++) {
      if (grid[x][y] === 0){
        fill("yellow");
      }
      if (grid[x][y] === 1){
        fill("blue");
      }
      rect(x * cellSize, y *cellSize, cellSize, cellSize);
    }
  }

}


function createEmpty2dArray(ROWS, COLS){
  let fillerArray = [];

  for (let x = 0; x < ROWS; x++) {
    fillerArray.push([]);
    for (let y = 0; y < COLS; y++) {
      fillerArray[x].push(0); 


    }

  }
  return fillerArray;
}