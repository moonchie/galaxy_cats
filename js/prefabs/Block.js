var galaxyCats = galaxyCats || {};

galaxyCats.Block = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  this.game = state.game;
  this.state = state;
  this.row = data.row;
  this.col = data.col;

  this.anchor.setTo(0.5);

};

galaxyCats.Block.prototype = Object.create(Phaser.Sprite.prototype);
galaxyCats.Block.prototype.constructor = galaxyCats.Block;


//a modified the reset function to modify the parameters
galaxyCats.Block.prototype.reset = function(x, y, data) {
  Phaser.Sprite.prototype.reset.call(this, x, y);           //normal reset button
  this.loadTexture(data.asset);                             //data object, it has asset, row and col
  this.row = data.row;
  this.col = data.col;
};
