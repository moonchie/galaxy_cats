var galaxyCats = galaxyCats || {};

//LOADING SCREEN
galaxyCats.BootState = {
  init: function() {
    this.game.stage.backgroundColor = '#000000';
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
    this.load.image('bar', 'assets/images/preloader-bar.png');

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);

  },
  create: function() {

    this.state.start('Preload');
  }
};