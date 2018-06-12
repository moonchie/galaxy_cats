var galaxyCats = galaxyCats || {};

galaxyCats.GameState = {

  init: function() {
    this.NUM_ROWS = 8;
    this.NUM_COLS = 8;
    this.NUM_VARIATIONS = 7;
    this.BLOCK_SIZE = 35;
    this.ANIMATION_TIME = 200;
  },
  create: function() {
    //game background
    this.background = this.add.sprite(0, 0, 'background');
    this.blocks = this.add.group();

    //-----------CREATE BOARD---------------
    this.board = new galaxyCats.Board(this, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS);  //Prototypal inheritance
    this.board.consoleLog();


    //-------------------DRAW BOARD-------------------
    this.drawBoard();

  },


  // -----------------CREATE A BLOCK----------------------
  //a pull function to create a block on board
  createBlock: function(x, y, data) {
    var block = this.blocks.getFirstExists(false);  //to check if dead block

    if(!block) {
      block = new galaxyCats.Block(this, x, y, data);
      this.blocks.add(block);
    }
    else {                             //when a block exists
      block.reset(x, y, data);        //reset function
    };

    return block;
  },
//example: galaxyCats.GameState.createBlock(100,50,{asset:"block4",row:1,col:1});


  //-----------------DRAW & BITMAP---------------------------
  drawBoard: function(){
    var i, i,  block, square, mapR, mapC, data;
      //bitmap parameters
    var squareBitmap = this.add.bitmapData(this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);
    squareBitmap.ctx.fillyStyle = "white";
    squareBitmap.ctx.fillRect(0, 0, this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);

    //to create
    for (i = 0; i < this.NUM_ROWS; i ++){
      for (j = 0; j < this.NUM_COLS; j ++) {
        mapR = 36 + j * (this.BLOCK_SIZE + 6);
        mapC = 80 + i * (this.BLOCK_SIZE + 6);

        square = this.add.sprite(mapR, mapC, squareBitmap);
        square.anchor.setTo(0.5);
        square.alpha = 0.3;

        this.createBlock(mapR, mapC, {
          asset: "block" + this.board.grid[i][j],  //use the board object to get dynamic grid
          row: i,
          col: j
        })
      }
    }

    this.game.world.bringToTop(this.blocks);      //Bring the blocks before the bitmap
  }




}

