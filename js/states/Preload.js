var galaxyCats = galaxyCats || {};

var filter;
var sprite;
var fragmentSrc;
//loading the game assets
galaxyCats.PreloadState = {
  init: function() {
    this.game.stage.backgroundColor = '#000000';
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

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

    //load scoar board
    this.load.image("scoreBoard", "assets/images/sysimg_takara_list_base.png");
    this.load.image("targetBoard", "assets/images/sysimg_kaimono_window_kakin_nedan.png");

    //sprite
    this.load.spritesheet("fire","assets/images/explosion.png");

    //audio
    this.load.audio("victoryAudio","assets/sounds/victory_final.wav");
    this.load.audio("clickAudio","assets/sounds/pressButton.wav");
    this.load.audio("matchAudio","assets/sounds/itsamatch.wav");
    this.load.audio("galaxyAudio","assets/sounds/galaxyBackground.wav");
    this.load.audio("swapAudio","assets/sounds/swap.wav");
    this.load.audio("nerfthis","assets/sounds/D.Va_-_Nerf_this!.ogg");
    this.load.audio("iplaytowin","assets/sounds/D.Va_-_I_play_to_win!.ogg");
    this.load.audio("ouch","assets/sounds/D.Va_-_Ouch.ogg");
    this.load.audio("magica","assets/sounds/magica.mp3");


    //HomePage
    this.load.image("galaxy", "assets/images/galaxy_pretty.png");
    this.load.image("button", "assets/images/yes_button.png");
    this.load.image("cat", "assets/images/catgalaxy.png");

    //google font
    this.load.script('Audiowide', 'https://fonts.googleapis.com/css?family=Audiowide');
  },

  create: function() {
  this.state.start('Home');}


};