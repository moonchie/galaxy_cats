var galaxyCat = galaxyCat || {};

galaxyCat.Block = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  this.game = state.game;
  this.state = state;

  this.anchor.setTo(0.5);

};

galaxyCat.Block.prototype = Object.create(Phaser.Sprite.prototype);
galaxyCat.Block.prototype.constructor = galaxyCat.Block;

