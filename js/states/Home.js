var galaxyCats = galaxyCats || {};

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
        //assets we'll use in the loading screen
        this.load.image("galaxy", "assets/images/galaxy3.jpg");
        this.load.image("button", "assets/images/button_classic.png");
        //this.load.bitmapFont('myfont', 'assets/images/font.png', 'assets/images/font.fnt');

        //google font
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    create: function() {
        var background = this.game.add.sprite(0,0,"galaxy");
        var button = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+150, "button");
        button.anchor.setTo(0.5);
        button.scale.setTo(0.3);
        var style = { font: "40px Bauhaus93", fill: "#ff0044", align: "center" };
        var text = this.add.text(this.world.centerX, this.world.centerY-150, "GALAXY CATS", style);
        text.anchor.set(0.5);



        button.inputEnabled = true;
        button.events.onInputDown.add(function(){
            this.state.start('Boot');
        },this)

    }
  };
