# What's next:


## Thoughts
1. drop a block in the main grid from a position to another. the source is set to zero. It's a horizontal drop so only row data needs to be updated.

2. drop a block in the reserve grid from a position to another. the source is set to zero

3. move down blocks to fill in empty slots. Look for an empty place with 0, and replace it with a block on the same col.

4. Make cells in block.js. The cells have 4 properties: game, state, row, col.
Use Phaser.Sprite.call(this, state.game, x, y, data.asset);

5. Now load all the sprites, and make a function call reset to do that.Use Phaser.Sprite.prototype.reset.call in this function.



## Functions in Board.js
function dropBlock (done)
function dropBlockReserve  (done)
functinon updateGrid (done)
function reset(x,y,data) (done)


## Functions in Game.js
createBlock: to create a block (done)
drawBoard: draw bitmap and populate squares relevant to the size of the block (done)





