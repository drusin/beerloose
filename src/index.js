import Phaser from 'phaser';

import GameScene from './GameScene';
import MenuScene from './MenuScene'

const config = {
	type: Phaser.AUTO,
	pixelArt: true,
	parent: 'canvas-parent',
	scale: {
		parent: 'phaser',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 640,
		height: 480,
		max: {
			width: 1280,
			height: 800
		}
	},
	physics: {
		default: 'arcade',
		arcade: { debug: false }
	},
	scene: [MenuScene, GameScene]
};

const GAME = new Phaser.Game(config);
GAME.globals = { };

export default GAME;
