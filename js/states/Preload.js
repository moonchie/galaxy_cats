var galaxyCats = galaxyCats || {};

var filter;
var sprite;
var fragmentSrc;
//loading the game assets
galaxyCats.PreloadState = {
  preload: function() {

    //load game assets
    this.load.image('block1', 'assets/images/cat11.png');
    this.load.image('block2', 'assets/images/cat9.png');
    this.load.image('block3', 'assets/images/cat3.png');
    this.load.image('block4', 'assets/images/cat4.png');
    this.load.image('block5', 'assets/images/cat5.png');
    this.load.image('block6', 'assets/images/cat6.png');
    this.load.image('block7', 'assets/images/cat7.png');
    this.load.image('block8', 'assets/images/cat8.png');
    this.load.image('deadBlock', 'assets/images/bean_dead.png');
    this.load.image('background', 'assets/images/starshine.gif');
    this.load.image('planet1', 'assets/images/planet1.png');
    this.load.image('planet2', 'assets/images/planet2.png');
    this.load.image('complete', 'assets/images/complete.png');
    this.load.image("arrow", "assets/images/sysimg_arrow_l.png");

    //load scoar board
    this.load.image("board", "assets/images/sysimg_takara_list_base.png");

    //sprite
    this.load.spritesheet("fire","assets/images/explosion.png");


  },

  create: function() {
  this.state.start('Game');}


};