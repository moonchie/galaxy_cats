var galaxyCats = galaxyCats || {};

// Board function to populate grid randomly
galaxyCats.Board = function(state, rows, cols, blockVariations) {

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

  this.RESERVE_ROW = rows;

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

galaxyCats.Board.prototype.populateGrid = function(){
  var i,j,variation;    //add in a random variation when we populate our grid
  for(i = 0; i < this.rows; i++) {
    for(j = 0; j < this.cols; j++) {
      variation = Math.floor(Math.random() * this.blockVariations) + 1;
      this.grid[i][j] = variation;
    }
  }

  // to avoid to have chains at the beginning
  var chains = this.findAllChains();
  if (chains.length > 0) {
    this.populateGrid();
    console.log("Grid starts without chains!");
  }
};

galaxyCats.Board.prototype.populateReserveGrid = function(){
  var i,j,variation;
  for(i = 0; i < this.RESERVE_ROW; i++) {
    for(j = 0; j < this.cols; j++) {
      variation = Math.floor(Math.random() * this.blockVariations) + 1;
      this.reserveGrid[i][j] = variation;
    }
  }
};

//------------ VISUALIZATION IN CONSOLE--------------------
galaxyCats.Board.prototype.consoleLog = function(){
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
galaxyCats.Board.prototype.swap = function(source, target){
  var tempLoc = this.grid[target.row][target.col];
  //Exchange their row and col
  this.grid[target.row][target.col] = this.grid[source.row][source.col];
  this.grid[source.row][source.col] = tempLoc;

  //最后一步是要把block1和block2在swap后的位置给定
  var temPos = {row: source.row, col: source.col}; //use temporary position to guide
  source.row = target.row;
  source.col = target.col;
  target.row = temPos.row;
  target.col = temPos.col;
};
//in console: galaxyCats.GameState.board.swap({row:0,col:0},{row:0,col:1})
//galaxyCats.GameState.board.consoleLog()

// ----------------CHECK ADJACENT-------------------
galaxyCats.Board.prototype.checkAdjacent = function(source, target){
// position difference can only be on row or col, and difference = 1;
  var diffRow = Math.abs(source.row - target.row);
  var diffCol = Math.abs(source.col - target.col);

  var isAdjacent = (diffRow === 1 && diffCol === 0) || (diffCol === 1 && diffRow === 0);
  return isAdjacent;
};
//check: galaxyCats.GameState.board.checkAdjacent({row:0,col:0},{row:0,col:3})


//------------------- CHECK CHAIN >3 ------------------------
/* Identify 1 cell is part of chain, then later will be destroyed
Total 6 cases*/
galaxyCats.Board.prototype.isChained = function(cell) {
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
//check: galaxyCats.GameState.board.isChained({row:0,col:3})


//------------ FIND ALL CHAINED FOR CLEAR --------------

galaxyCats.Board.prototype.findAllChains = function(){
var allChained = [];
var i, j;

  for(i = 0; i < this.rows; i++) {
    for(j = 0; j < this.cols; j++) {
      if(this.isChained({row: i, col: j})) {   //use isChained to check if true/false
        allChained.push({row: i, col: j});    //push to allChained array
      };
    };
  };
console.log(allChained);
return allChained;
};


galaxyCats.Board.prototype.clearAll = function(){
  var chainedBlocks = this.findAllChains();
  //set them to zero
  chainedBlocks.forEach(function(block){
    this.grid[block.row][block.col] = 0;
    //kill them
    this.state.getBlockPosition(block).kill();
  }, this);
};


// -------------- DROP BLOCK TO A CERTAIN LOCATION -----------
//drop a block from old row to new row, set the old location value to 0
galaxyCats.Board.prototype.dropBlock = function(sourceRow, targetRow, col){
  this.grid[targetRow][col] = this.grid[sourceRow][col];
  this.grid[sourceRow][col] = 0;
  //insert animation
  this.state.dropBlock(sourceRow, targetRow, col);
};
//galaxyCats.GameState.board.dropBlock(0,4,7)
galaxyCats.Board.prototype.dropReserveBlock = function(sourceRow, targetRow, col){
  this.grid[targetRow][col] = this.reserveGrid[sourceRow][col];
  this.reserveGrid[sourceRow][col] = 0;
  //insert animation
 this.state.dropReserveBlock(sourceRow, targetRow, col);
};

//------------------UPDATE THE GRID -------------------------
galaxyCats.Board.prototype.updateGrid = function(){
  var i, j, k, foundBlock;

  //From the bottom row, loop through all blocks
  for(i = this.rows - 1; i >= 0; i--){
    for(j = 0; j < this.cols; j++) {
      //if the block is zero, then we look upwards for an non zero one
      if(this.grid[i][j] === 0) {
        foundBlock = false;

        //Look upwards
        for(k = i - 1; k >= 0; k--) {
          if(this.grid[k][j] > 0) {
            this.dropBlock(k, i, j);
            foundBlock = true;
            break;
          }
        }

        if(!foundBlock) {
          //climb up in the reserve grid
          for(k = this.RESERVE_ROW - 1; k >= 0; k--) {
            if(this.reserveGrid[k][j] > 0) {
              this.dropReserveBlock(k, i, j);
              break;
            }
          }
        }
      }
    }
  }

  //repopulate the reserve
  this.populateReserveGrid();
};



