var galaxyCat = galaxyCat || {};


// Board function to populate grid randomly
galaxyCat.Board = function(state, rows, cols, blockVariations) {

  this.state = state;
  this.rows = rows;
  this.cols = cols;
  this.blockVariations = blockVariations;

  //main grid
  this.grid = [];

  var i,j;
  for(i = 0; i < rows; i++) {
    this.grid.push([]);

    for(j = 0; j < cols; j++) {
      this.grid[i].push(0);
    }
  }

  //reserve grid on the top, for when new blocks are needed
  this.reserveGrid = [];

  this.RESERVE_ROW = 5;

  for(i = 0; i < this.RESERVE_ROW; i++) {
    this.reserveGrid.push([]);

    for(j = 0; j < cols; j++) {
      this.reserveGrid[i].push(0);
    }
  }

  //populate grids
  this.populateGrid();
  this.populateReserveGrid();

};

galaxyCat.Board.prototype.populateGrid = function(){
  var i,j,variation;    //add in a random variation when we populate our grid
  for(i = 0; i < this.rows; i++) {
    for(j = 0; j < this.cols; j++) {
      variation = Math.floor(Math.random() * this.blockVariations) + 1;
      this.grid[i][j] = variation;
    }
  }
};

galaxyCat.Board.prototype.populateReserveGrid = function(){
  var i,j,variation;
  for(i = 0; i < this.RESERVE_ROW; i++) {
    for(j = 0; j < this.cols; j++) {
      variation = Math.floor(Math.random() * this.blockVariations) + 1;
      this.reserveGrid[i][j] = variation;
    }
  }
};

//------------ VISUALIZATION IN CONSOLE--------------------
galaxyCat.Board.prototype.consoleLog = function(){
  var i,j,variation;
  var prettyString = ""; //a string to seperate the row

  //populate reserveGrid
  for(i = 0; i < this.RESERVE_ROW; i++) {
    prettyString += "\n";       //\n 元字符用于查找换行符。
    for(j = 0; j < this.cols; j++) {
      prettyString += " " + this.reserveGrid[i][j];
    }
  }
   prettyString += "\n";

  for(i = 0; i < this.rows; i++) {
    prettyString += "\n";
    for(j = 0; j < this.cols; j++) {
      prettyString += " " + this.grid[i][j];
    }
  }
  console.log(prettyString);
};


// ------------------SWAPPING BLOCKS----------------
galaxyCat.Board.prototype.swap = function(source, target){
  var tempLoc = this.grid[target.row][target.col];
  //Exchange their row and col
  this.grid[target.row][target.col] = this.grid[source.row][source.col];
  this.grid[source.row][source.col] = tempLoc;
};
//in console: galaxyCat.GameState.board.swap({row:0,col:0},{row:0,col:1})
//galaxyCat.GameState.board.consoleLog()

// ----------------CHECK ADJACENT-------------------
galaxyCat.Board.prototype.checkAdjacent = function(source, target){
// position difference can only be on row or col, and difference = 1;
  var diffRow = Math.abs(source.row - target.row);
  var diffCol = Math.abs(source.col - target.col);

  var isAdjacent = (diffRow === 1 && diffCol === 0) || (diffCol === 1 && diffRow === 0);
  return isAdjacent;
};
//check: galaxyCat.GameState.board.checkAdjacent({row:0,col:0},{row:0,col:3})


//------------------- CHECK CHAIN >3 ------------------------
/* Identify 1 cell is part of chain, then later will be destroyed
Total 6 cases*/
galaxyCat.Board.prototype.isChained = function(cell) {
  var isChained = false;
  var variation = this.grid[cell.row][cell.col];  //value that needs to be compared with 2 adjacent cells
  var row = cell.row;
  var col = cell.col;

  //1st case: left
  if(variation === this.grid[row][col - 1] && variation === this.grid[row][col - 2]) {
    isChained = true;
  };

  //2nd case: right
  if(variation === this.grid[row][col + 1] && variation === this.grid[row][col + 2]) {
    isChained = true;
  };

  //3rd case: top
  if (this.grid[row - 2]) {    //need to make sure it's not at the top row
    if(variation === this.grid[row - 1][col] && variation === this.grid[row - 2][col]) {
      isChained = true;
    };
  };


  //4th case: down
  if (this.grid[row + 2]) {    //need to make sure it's not at the top row
    if(variation === this.grid[row + 1][col] && variation === this.grid[row + 2][col]) {
      isChained = true;
  };
};

  //5th case:horizontal center
  if(variation === this.grid[row][col + 1] && variation === this.grid[row][col - 1]) {
    isChained = true;
  };

  //6th case: vertical center
  if (this.grid[row+1] && this.grid[row-1]) {    //need to make sure it's not at the top row
    if(variation === this.grid[row + 1][col] && variation === this.grid[row - 1][col]) {
      isChained = true;
  };
};
  return isChained;
}
//check: galaxyCat.GameState.board.isChained({row:0,col:3})


//------------ FIND ALL CHAINED FOR CLEAR --------------
galaxyCat.Board.prototype.findAllChains = function(){
var allChained = [];
var i, j;

for(i = 0; i < this.rows; i++) {
  for(j = 0; j < this.cols; j++) {
    if(this.isChained({row: i, col: j})) {   //use isChained to check if true/false
      allChained.push({row: i, col: j});    //push to allChained array
    }
  }
}
console.log(allChained);
return allChained;

//------------------CLEAR ALL CHAINS -------------------
galaxyCat.Board.prototype.clearChains = function(){
  var chainedBlocks = this.findAllChains();

  //set them to zero
  chainedBlocks.forEach(function(block){
    this.grid[block.row][block.col] = 0;
  }, this);
};

}