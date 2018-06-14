var galaxyCats = galaxyCats || {};

//Game over screen
galaxyCats.Gameover = {
    init: function() {
        this.game.stage.backgroundColor = '#000000';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
      },

    create: function() {
        var planet2 = this.game.add.sprite(100,600, "planet2");
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

        var complete = this.game.add.sprite(200,400, "complete");

        var arrow = this.game.add.sprite(200,600,"arrow");
        arrow.anchor.set(0.5);
        arrow.scale.setTo(0.8);

    }
}