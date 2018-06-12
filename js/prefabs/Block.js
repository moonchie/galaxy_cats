var galaxyCats = galaxyCats || {};

galaxyCats.Block = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  this.game = state.game;
  this.state = state;

  this.anchor.setTo(0.5);

};

galaxyCatss.Block.prototype = Object.create(Phaser.Sprite.prototype);
galaxyCatss.Block.prototype.constructor = galaxyCats.Block;

