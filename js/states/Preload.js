var galaxyCats = galaxyCats || {};

var filter;
var sprite;
var fragmentSrc;
//loading the game assets
galaxyCats.PreloadState = {
  preload: function() {

    //load game assets
    this.load.image('block1', 'assets/images/cat1.png');
    this.load.image('block2', 'assets/images/cat2.png');
    this.load.image('block3', 'assets/images/cat3.png');
    this.load.image('block4', 'assets/images/cat4.png');
    this.load.image('block5', 'assets/images/cat5.png');
    this.load.image('block6', 'assets/images/cat6.png');
    this.load.image('block7', 'assets/images/cat7.png');
    this.load.image('block8', 'assets/images/cat8.png');
    this.load.image('deadBlock', 'assets/images/bean_dead.png');
    this.load.image('background', 'assets/images/starshine.gif');
    this.load.image('planet1', 'assets/images/planet1.png');

    //load font
    this.game.load.bitmapFont('myfont', 'assets/font.png', 'assets/font.fnt');

  },

  create: function() {
  this.state.start('Game');}


};