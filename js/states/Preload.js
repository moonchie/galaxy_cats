var galaxyCats = galaxyCats || {};

var filter;
var sprite;
var fragmentSrc;
//loading the game assets
galaxyCats.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);

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
    this.load.image('background', 'assets/images/galaxy3.jpg');
  },

  create: function() {
  this.state.start('Game');}


};