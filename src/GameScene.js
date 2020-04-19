import { Scene } from 'phaser';
import BeerBar from './beer_bar';
import { gal, bartender, discoDancer, squaredancer, metalDancer, preloadAllSprites, createAnimationsForAllSprites } from './sprites';
import beerbearerbob from './assets/music/beerbearerbop.ogg';
import { createPlayer } from './entities/player.js';
import { createPartyPeople } from './party-people.js';
import background_image from './assets/BasicBackground.png';
import ShaderWrapper from './shaders/ShaderWrapper';
import discoBallHelper, { BALL_INPUTS, BALL_DEFAULTS } from './shaders/discoBallHelper';
import prefrences from './preferences';

export const DANCEFLOOR_BOUNDING_BOX = { left: 100, right: 615, top: 45, bottom: 370 }

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

	createDiscoBall() {
		for (let i = 0; i < 10; i++) {
			discoBallHelper.addDiscoBall(this.shader, {
				[BALL_INPUTS.R]: BALL_DEFAULTS[BALL_INPUTS.R] + 20 * i,
				[BALL_INPUTS.AMOUNT]: BALL_DEFAULTS[BALL_INPUTS.AMOUNT] + i
			});
		}
	}

	create() {
		prefrences.persist();

		this.shader = this.game.renderer.addPipeline('shader', new ShaderWrapper(this.game));
		ShaderWrapper.addToCamera(this.shader, this.cameras.main);
		this.createDiscoBall();
		this.discoShaderOffset = 0;

		this.add.image(0, 0, 'background').setOrigin(0, 0);
		createAnimationsForAllSprites({ scene: this });
		this.keys = this.input.keyboard.addKeys("W,A,S,D,LEFT,UP,RIGHT,DOWN,SPACE,ENTER");
		const { width, height } = this.sys.game.canvas;

		this.player.createSprite({ scene: this, x: 300, y: 100 });
		this.partyPeople.initialize({ scene: this });
		
		const bartend = bartender.create({ scene: this, x: 200, y: 150 });
		bartend.anims.play('bartender-tab', true);
		const gal1 = gal.create({ scene: this, x: 150, y: 200 });
		gal1.anims.play('1-gal-drink', true);
		const gal2 = gal.create({ scene: this, x: 200, y: 200, number: 2 });
		gal2.anims.play('2-gal-hair', true);

		const music = this.sound.add('beerbearerbob');
		music.play();

		this.beer = new BeerBar(this, width - 64, height - 64);
	}
	
	update(time, delta) {
		this._count += delta;
		if (this._count > 800) {
			this.beer.decrease(1);
			this._count -= 800;
		}

		this.player.updateMovement({ keys: this.keys });
		this.partyPeople.update(delta);

		this.discoShaderOffset = this.discoShaderOffset >= 360 ? 0 : this.discoShaderOffset + delta / 100;
		discoBallHelper.changeAllDiscoBalls(this.shader, { [BALL_INPUTS.OFFSET]: this.discoShaderOffset });
	}
}