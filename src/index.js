import Phaser from 'phaser';

import GameScene from './GameScene';
import PartyShaderTestScene from './PartyShaderTestScene';

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
		arcade: { debug: true }
	},
	scene: [GameScene, PartyShaderTestScene]
};

const GAME = new Phaser.Game(config);
GAME.globals = { };

export default GAME;
