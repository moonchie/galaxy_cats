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

  this.RESERVE_ROW = 7;

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
galaxyCats.Board.prototype.dropBlock = function(sourceLoc,targetLoc,col){
  this.grid[targetLoc][col] = this.grid[sourceLoc][col];
  this.grid[sourceLoc][col] = 0;
};
//galaxyCats.GameState.board.dropBlock(0,4,7)
galaxyCats.Board.prototype.dropBlockReserve = function(sourceLoc,targetLoc,col){
  this.grid[targetLoc][col] = this.reserveGrid[sourceLoc][col];
  this.reserveGrid[sourceLoc][col] = 0;
};


//------------------UPDATE THE GRID -------------------------
galaxyCats.Board.prototype.updateGrid = function(){
  var i,j,k,search;

  //botom up to scan all the col
  for (i = this.rows - 1; i >= 0; i--){
    for (j = 0; j < this.cols; j++){
      //get the first non zero
      if(this.grid[i][j] === 0) {
        search = false;
        //use k as a new col to go up and look for a block
        for(k = i-1; k >=0; k--){
          if(this.grid[k][j] > 0) {this.dropBlock(k, i, j)};   //call dropBlock to replace the row
          search = true;
          break;
        };

        if(!search) {
          //Need to go to the reserve grid
          for(k = this.RESERVE_ROW - 1; k >=0; k--){
            if(this.reserveGrid[k][j] > 0) {this.dropBlockReserve(k, i, j)};
            break;
          };
        }
      }
    }

    //should repopulate the reserve grid
    this.populateReserveGrid();
  };

}