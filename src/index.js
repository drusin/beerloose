import Phaser from 'phaser';

import GameScene from './GameScene';

const config = {
	type: Phaser.AUTO,
	pixelArt: true,
	parent: 'canvas-parent',
	physics: {
		default: 'arcade',
		arcade: { debug: true }
	},
	width: 640,
	height: 480,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [GameScene]
};

const GAME = new Phaser.Game(config);
GAME.globals = { };

export default GAME;
