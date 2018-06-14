var galaxyCats = galaxyCats || {};

var planet2;
//Game over screen
galaxyCats.Gameover = {
    init: function() {
        this.game.stage.backgroundColor = '#000000';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
      },

    create: function() {
        this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height,'background');
        this.background.autoScroll(0, 15);

        this.blocks = this.add.group();


        planet2 = this.game.add.sprite(100,600, "planet2");
        planet2.anchor.setTo(0.5);
        planet2.scale.setTo(-1.5);

        //TEXT
        var text = this.add.text(this.world.centerX, this.world.centerY-100, "Good job! \n You dominated \n the Universe!",{ font: "Audiowide"} );
        text.anchor.set(0.5);
        text.fontSize = 30;
        grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#fffacd');
        grd.addColorStop(1, '#e9967a');
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(3, 3, '#000000', 5);
        text.fill = grd;

        /*var complete = this.game.add.sprite(200,400, "complete");
        planet2.anchor.setTo(0.5); */

        //Restart the game

        var textAgain = this.add.text(this.world.centerX,550,"Refresh Page To Play Again",{ font: "Audiowide"});
        textAgain.anchor.set(0.5);
        textAgain.fontSize = 15;
        textAgain.addColor("#000000", 0);

    },

    update: function(){
        planet2.angle -= 0.08;
      },
}