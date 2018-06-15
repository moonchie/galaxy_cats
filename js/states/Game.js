var galaxyCats = galaxyCats || {};


var target = 10;
var score = target;
var text1;
var scoreDisplay;
var planet1;

//audios
var swapAudio, clickAudio, matchAudio, victoryAudio;

galaxyCats.GameState = {

  init: function() {
    this.NUM_ROWS = 8;
    this.NUM_COLS = 6;
    this.NUM_VARIATIONS = 7;
    this.BLOCK_SIZE = 35;
    this.ANIMATION_TIME = 200;
  },
  create: function() {

    //game background
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height,'background');
    this.background.autoScroll(0, 15);

    this.blocks = this.add.group();

    planet1 = this.game.add.sprite(20,600, "planet1");
    planet1.anchor.setTo(0.5);
    planet1.scale.setTo(-1.5);
    planet1.alpha = 0.7;

    //-----------CREATE BOARD---------------
    this.board = new galaxyCats.Board(this, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS);  //Prototypal inheritance
    this.board.consoleLog();

    //-------------------DRAW BOARD-------------------
    this.drawBoard();

    //--------------DECORATIONS-----------------------
    text1 = this.add.text(175,500, "TARGET: ",{ font: "30px Audiowide"} );
    text1.anchor.set(0.5);
    text1.fontSize = 20;
    text1.addColor('#fffacd',0);

    scoreDisplay = this.add.text(175,528, score,{ font: "30px Audiowide"} );
        scoreDisplay.anchor.set(0.5);
        scoreDisplay.fontSize = 20;
        scoreDisplay.addColor('#fffacd',0);

    // -------------------EXPLOSION ------------------------
    /*var fire = this.game.add.sprite(200, 360, 'fire', 5);
    fire.scale.set(4);
    fire.smoothed = false;
    var anim = fire.animations.add("walk");
    anim.onstart.add(animationStarted, fire);
    anim.onComplete.add(animationLooped, fire);
    anim.play(10, true);*/

  },

  update: function(){
    planet1.angle += 0.08;
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
    squareBitmap.ctx.fillyStyle = "#800080";
    squareBitmap.ctx.fillRect(0, 0, this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);

    //to create
    for (i = 0; i < this.NUM_ROWS; i ++){
      for (j = 0; j < this.NUM_COLS; j ++) {
        mapR = 80 + j * (this.BLOCK_SIZE + 6);
        mapC = 150 + i * (this.BLOCK_SIZE + 6);

        square = this.add.sprite(mapR, mapC, squareBitmap);
        square.anchor.setTo(0.5);
        square.alpha = 0.1;

        this.createBlock(mapR, mapC, {
          asset: "block" + this.board.grid[i][j],  //use the board object to get dynamic grid
          row: i,
          col: j
        })
      }
    }

    this.game.world.bringToTop(this.blocks);      //Bring the blocks before the bitmap
  },

//get location of a certain block
  getBlockPosition: function(position) {
    var foundBlock;

    this.blocks.forEachAlive(function(block){
      if(block.row === position.row && block.col === position.col){
        foundBlock = block;
      }
    }, this);
    return foundBlock;
  },

//Animation: drop block
dropBlock: function(sourceRow, targetRow, col){
  var block = this.getBlockPosition({row: sourceRow, col: col});
  var targetY = 150 + targetRow * (this.BLOCK_SIZE + 6);

  block.row = targetRow;
  var blockMovement = this.game.add.tween(block);
  blockMovement.to({y: targetY}, this.ANIMATION_TIME);
  blockMovement.start();
},
dropReserveBlock: function(sourceRow, targetRow, col){
  var x = 80 + col * (this.BLOCK_SIZE + 6);
  var y = -(this.BLOCK_SIZE + 6) * this.board.RESERVE_ROW + sourceRow *(this.BLOCK_SIZE + 6);
  //in reserve need to create a new block
  var block = this.createBlock(x, y , {asset:"block" + this.board.grid[targetRow][col], row: targetRow, col: col});
  var targetY = 150 + targetRow * (this.BLOCK_SIZE + 6);

  block.row = targetRow;
  var blockMovement = this.game.add.tween(block);
  blockMovement.to({y: targetY}, this.ANIMATION_TIME);
  blockMovement.start();
},
//galaxyCats.GameState.board.clearAll()
//galaxyCats.GameState.board.updateGrid()

//Animation to swap blocks
swapBlocks: function(block1, block2) {
  var block1Move = this.game.add.tween(block1);
  block1Move.to({x: block2.x, y: block2.y},this.ANIMATION_TIME);
  block1Move.onComplete.add(function(){
    //到达移动位置后
    this.board.swap(block1, block2);

    //看有没有配对成功

    if(!this.isReversingSwap){   //查看是否已经有reverse的
      var chains = this.board.findAllChains(); //有就消除chains

      if (chains.length > 0){
        this.updateEverything();
        matchAudio = this.add.audio('matchAudio');
        matchAudio.play();
        score --;
        scoreDisplay.text = score;
        if (score === 8){
          var iplaytowin = this.add.audio('iplaytowin');
          iplaytowin.play();
          matchAudio.stop();
        } else if (score === 5){
          var nerfthis = this.add.audio("nerfthis");
          matchAudio.stop();
          nerfthis.play();
        };
      }
      else {
        this.isReversingSwap = true;    //没有就还原block1block2的原位置
        this.swapBlocks(block1, block2);
        ouch = this.add.audio('ouch');
        ouch.play();
      }
    }
    else {
      this.isReversingSwap = false;
      this.clearEverything();
    }
  },this);
  block1Move.start();
  console.log("hey we have swapped! But you didn't see!");


  var block2Move = this.game.add.tween(block2);
    block2Move.to({x: block1.x, y: block1.y}, this.ANIMATION_TIME);
    block2Move.start();
},
//------------------ALLOW USER TO SWAP!! -------------------------
actionSwap: function(block) {
  //only swap if the UI is not blocked
  if(this.isBoardBlocked) {
    return;
  }

  //if there is nothing selected
  if(!this.selectedBlock) {
    //highlight the first block
    block.scale.setTo(1.5);

    this.selectedBlock = block;
  }
  else {
    //second block you are selecting is target block
    this.targetBlock = block;

    //only adjacent blocks can swap
    if(this.board.checkAdjacent(this.selectedBlock, this.targetBlock)) {
      //block the UI
      this.isBoardBlocked = true;

      //swap blocks
      this.swapBlocks(this.selectedBlock, this.targetBlock);
      score = score + 1 -1;
      console.log(score);
      if (score === 1) {
          victoryAudio = this.add.audio("victoryAudio");
          victoryAudio.play();
          this.state.start('Gameover');
          console.log(score);
      }
    }
    else {
      this.clearEverything();
    }
  }

},
  //---------------CLEAR EVERYTHING-------------------

  clearEverything: function(){
    this.isBoardBlocked = false;
    this.selectedBlock = null;
    this.blocks.setAll("scale.x", 1);  //resize the blocks to original size
    this.blocks.setAll("scale.y", 1);
  },

  //------------------UPDATE EVERYTHING------------------
  updateEverything: function(){
    this.board.clearAll();
    this.board.updateGrid();

    //set a time event after dropping
    this.game.time.events.add(this.ANIMATION_TIME, function(){
      //see if new chains
      var chains = this.board.findAllChains();
      if (chains.length > 0 ) {
        this.updateEverything();
      } else {
        this.clearEverything();
      }
    }, this);
  },




}

