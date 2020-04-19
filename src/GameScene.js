import { Scene } from 'phaser';
import { dj, bartender, preloadAllSprites, createAnimationsForAllSprites, dancefloor } from './sprites';
import BeerBar, { Beer } from './beer_bar';
import beerbearerbob from './assets/music/beerbearerbob.ogg';
import { createPlayer } from './entities/player.js';
import { createPartyPeople } from './party-people.js';
import background_image from './assets/BasicBackground.png';
import ShaderWrapper from './shaders/ShaderWrapper';
import beamHelper, { BEAM_INPUTS, BEAM_DEFAULTS } from './shaders/beamHelper';
import prefrences from './preferences';
import { createWomen } from './women.js';
import MoodSlider from './mood_slider';
import { Sound } from './sfx.js';

export const DANCEFLOOR_BOUNDING_BOX = { left: 150, right: 615, top: 45, bottom: 333 }

const level1_non_traversable_objects = [
	{ left: 0, right: 640, top: -20, bottom: 22 }, // top wall
	{ left: 0, right: 180, top: 385, bottom: 400 }, // bottom left 
	{ left: 180, right: 270, top: 365, bottom: 400 }, // bottom mid
	{ left: 270, right: 640, top: 380, bottom: 400 }, // bottom right
	{ left: 0, right: 5, top: 0, bottom: 480 }, // left
	{ left: 635, right: 640, top: 0, bottom: 480 }, // right
	{ left: 60, right: 75, top: 90, bottom: 295 }, // dj right
	{ left: 0, right: 75, top: 90, bottom: 95 }, // dj top
];

export default class GameScene extends Scene {
	constructor() {
		super({ key: GameScene.KEY });
		this.keys = undefined;
		this.player = createPlayer();
		this._count = 0;
		this.partyPeople = createPartyPeople();
		this.women = createWomen();
		this.nonTraversable = [];
		this.sfx = Sound({ scene: this });
		this.bartender = {};
	}
	
	static get KEY() {
		return 'game-scene'
	}

	preload() {
		this.load.image('background', background_image);
		preloadAllSprites({ scene: this });
		this.load.audio('beerbearerbob', beerbearerbob);
		BeerBar.assets(this.load);
		MoodSlider.assets(this.load);
		this.sfx.preload();
	}

	createNonTraversableObjects() {
		this.nonTraversable = level1_non_traversable_objects.map(
			({ left, right, top, bottom }) => createStaticInvisibleBox({ physics: this.physics, left, right, top, bottom }));
	}

	create() {
		this.sfx.create();
		prefrences.persist();

		this.createNonTraversableObjects();

		this.shader = this.game.renderer.addPipeline('shader', new ShaderWrapper(this.game));
		ShaderWrapper.addToCamera(this.shader, this.cameras.main);
		beamHelper.addBeam(this.shader);
		this.beamDirection = 1;
		this.beamX = 100;
		this.beamY = BEAM_DEFAULTS[BEAM_INPUTS.END][1];

		this.add.image(0, 0, 'background').setOrigin(0, 0);
		createAnimationsForAllSprites({ scene: this });	
		dancefloor.create({ scene: this, x: 200, y: 140 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 200, y: 265 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 320, y: 140 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 320, y: 265 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 440, y: 140 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 440, y: 265 }).play('dancefloor', true);

		this.keys = this.input.keyboard.addKeys("W,A,S,D,LEFT,UP,RIGHT,DOWN,SPACE,ENTER");
		const { width, height } = this.sys.game.canvas;

		this.player.createSprite({ scene: this, x: 300, y: 100 });
		this.women.initialize({ scene: this });
		this.partyPeople.initialize({ scene: this });

		this.physics.add.collider(this.player.sprite, this.nonTraversable);
		this.physics.add.collider(this.partyPeople.partyPeople.map(p => p.sprite), this.nonTraversable);

		dj.create({ scene: this, x: 5, y: 70 }).anims.play('dj-play', true);
		
		this.bartender = bartender.create({ scene: this, x: 570, y: 150 });
		this.bartender.anims.play('bartender-tab', true);

		const music = this.sound.add('beerbearerbob');
		music.play();

		this.beerBar = new BeerBar(this, width - 64, height - 68, this.player.beer);
		this.moodSlider = new MoodSlider(this, width * 0.5, height - 64);
	}
	
	update(time, delta) {
		this._count += delta;
		if (this._count > 800) {
			this.player.beer.decrease(1);
			this._count -= 800;
		}

		this.beerBar.draw();

		this.player.update({ 
			delta,
			keys: this.keys, 
			physics: this.physics, 
			partyPeople: this.partyPeople, 
			sfx: this.sfx,
			bartender: this.bartender,
		});
		this.partyPeople.update(delta);
		this.women.update({ delta, player: this.player, physics: this.physics });

		this.beamX += delta * this.beamDirection / 10;
		if (this.beamX < 100 || this.beamX > 540) {
			this.beamDirection = this.beamDirection * -1;
		}
		beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: [this.beamX, this.beamY] }, 0);
	}
}

function createStaticInvisibleBox({ physics, left, right, top, bottom }) {
	const obj = physics.add.sprite(left, top, 'invisible');
	obj.setOrigin(0);
	obj.body.width = right - left;
	obj.body.height = bottom - top;
	obj.setImmovable(true);
	return obj;
}