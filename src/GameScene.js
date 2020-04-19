import { Scene } from 'phaser';
import BeerBar from './beer_bar';
import { gal, bartender, discoDancer, squaredancer, metalDancer, preloadAllSprites, createAnimationsForAllSprites } from './sprites';
import beerbearerbob from './assets/music/beerbearerbop.ogg';
import { createPlayer } from './entities/player.js';
import { createPartyPeople } from './party-people.js';
import background_image from './assets/BasicBackground.png';

export default class GameScene extends Scene {
	constructor() {
		super({ key: GameScene.KEY });
		this.keys = undefined;
		this.player = createPlayer();
		this._count = 0;
		this.partyPeople = createPartyPeople();
	}
	
	static get KEY() {
		return 'game-scene'
	}

	preload() {
		this.load.image('background', background_image);
		preloadAllSprites({ scene: this });
		this.load.audio('beerbearerbob', beerbearerbob);
		BeerBar.assets(this.load);
	}

	create() {
		this.add.image(0, 0, 'background').setOrigin(0, 0);
		createAnimationsForAllSprites({ scene: this });
		this.keys = this.input.keyboard.addKeys("W,A,S,D,LEFT,UP,RIGHT,DOWN,SPACE,ENTER");
		const { width, height } = this.sys.game.canvas;

		this.player.createSprite({ scene: this, x: 300, y: 100 });
		this.partyPeople.initialize({ scene: this });

		this._exampleDrops = this.physics.add.group();
		this._examplePlayer = this.physics.add.image(500, 600);
		this._examplePlayer.setInteractive();
		
		const bartend = bartender.create({ scene: this, x: 200, y: 150 });
		bartend.anims.play('bartender-tab', true);
		const gal1 = gal.create({ scene: this, x: 150, y: 200 });
		gal1.anims.play('1-gal-drink', true);
		const gal2 = gal.create({ scene: this, x: 200, y: 200, number: 2 });
		gal2.anims.play('2-gal-hair', true);

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

		this.beer = new BeerBar(this, width - 64, 96);		// position on top right corner.
	}
	
	update(time, delta) {
		this._count += delta;
		if (this._count > 800) {
			this._exampleDrops.create(Math.floor(Math.random() * 800) + 100, 50).setVelocityY(300);
			this.beer.decrease(1);
			this._count -= 800;
		}

		this.player.updateMovement({ keys: this.keys });
		this.partyPeople.update();
	}
}