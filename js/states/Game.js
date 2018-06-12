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

    //board model
    this.board = new galaxyCats.Board(this, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS);  //Prototypal inheritance
    this.board.consoleLog();
  }

};
