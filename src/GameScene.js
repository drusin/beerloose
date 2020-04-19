import { Scene } from 'phaser';
import BeerBar from './beer_bar';
import { discoDancer, squaredancer, metalDancer, preloadAllSprites, createAnimationsForAllSprites } from './sprites';
import beerbearerbob from './assets/music/beerbearerbop.ogg';
import { createPlayer } from './entities/player.js';

export default class GameScene extends Scene {
	constructor() {
		super({ key: GameScene.KEY });
		this.keys = undefined;
		this.player = createPlayer();
		this._count = 0;
	}
	
	static get KEY() {
		return 'game-scene'
	}

	preload() {
		preloadAllSprites({ scene: this });
		this.load.audio('beerbearerbob', beerbearerbob);
	}

	create() {
		createAnimationsForAllSprites({ scene: this });
		this.keys = this.input.keyboard.addKeys("W,A,S,D,LEFT,UP,RIGHT,DOWN,SPACE,ENTER");
		const { width, height } = this.sys.game.canvas;

		this.player.create({ scene: this, x: 300, y: 100 });

		this._exampleDrops = this.physics.add.group();
		this._examplePlayer = this.physics.add.image(500, 600);
		this._examplePlayer.setInteractive();
		
		const discoDude = discoDancer.create({ scene: this, x: 100, y: 100 });
		discoDude.anims.play('disco-dancer-up-down', true);
		const squareGal = squaredancer.create({ scene: this, x: 150, y: 100 });
		squareGal.anims.play('squaredancer-left-right', true);
		const metaller = metalDancer.create({ scene: this, x: 200, y: 100 });
		metaller.anims.play('metal-dancer-headbang', true);


		const music = this.sound.add('beerbearerbob');
		music.play();

		this.physics.add.overlap(this._examplePlayer, this._exampleDrops,
			(...args) => args.filter(arg => arg !== this._examplePlayer).forEach(arg => arg.destroy())
		);
		
		
		this.input.setDraggable(this._examplePlayer);
		this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
			gameObject.x = dragX;
			gameObject.y = dragY;
		});

		this.beer = new BeerBar(this, width - 64, 48);		// position on top right corner.
	}
	
	update(time, delta) {
		this._count += delta;
		if (this._count > 800) {
			this._exampleDrops.create(Math.floor(Math.random() * 800) + 100, 50).setVelocityY(300);
			this.beer.decrease(1);
			this._count -= 800;
		}

		this.player.updateMovement({ keys: this.keys });
	}
}