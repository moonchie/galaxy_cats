var galaxyCat = galaxyCat || {};

galaxyCat.game = new Phaser.Game(360, 640, Phaser.AUTO);

galaxyCat.game.state.add('Boot', galaxyCat.BootState);
galaxyCat.game.state.add('Preload', galaxyCat.PreloadState);
galaxyCat.game.state.add('Game', galaxyCat.GameState);

galaxyCat.game.state.start('Boot');
