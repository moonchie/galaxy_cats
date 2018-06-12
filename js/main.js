var galaxyCats = galaxyCats || {};

galaxyCats.game = new Phaser.Game(360, 640, Phaser.AUTO);

galaxyCats.game.state.add('Boot', galaxyCats.BootState);
galaxyCats.game.state.add('Preload', galaxyCats.PreloadState);
galaxyCats.game.state.add('Game', galaxyCats.GameState);

galaxyCats.game.state.start('Boot');
