var galaxyCats = galaxyCats || {};
var filter;
var sprite;
var bmd;
var text;

// HOME SCREEN
galaxyCats.HomeState = {

    init: function() {
        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
      },

    preload: function() {
    },
    create: function() {

        var background = this.game.add.sprite(0,0,"galaxy");

        var text = this.add.text(this.world.centerX, this.world.centerY-100, "GALAXY \n CATS",{ font: "30px Audiowide"} );
        text.anchor.set(0.5);
        text.fontSize = 45;
        grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grd.addColorStop(0, '#fffacd');
        grd.addColorStop(1, '#e9967a');
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(3, 3, '#adadb2', 5);
        text.fill = grd;


        //-------BUTTON------------
        var button = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+200, "button");
        button.anchor.setTo(0.5);
        button.scale.setTo(0.5);
        button.inputEnabled = true;
        button.events.onInputDown.add(function(){
            var clickAudio = this.add.audio("clickAudio");
            clickAudio.play();
            this.state.start('Game');
        },this)
    },

  };
