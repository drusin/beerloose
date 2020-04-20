import { Scene } from 'phaser';
import { dj, bartender, preloadAllSprites, createAnimationsForAllSprites, dancefloor } from './sprites';
import { createPlayer } from './entities/player.js';
import background_image from './assets/BasicBackground.png';
import ShaderWrapper from './shaders/ShaderWrapper';
import { createWomen } from './women.js';
import beamHelper, { BEAM_INPUTS, centerOnSprite, projectY } from './shaders/beamHelper';
import GameScene from './GameScene';

export default class TuorialScene extends Scene {
	constructor() {
		super({ key: TuorialScene.KEY });
		this.player = createPlayer();
		this.women = createWomen();
		this.bartender = {};
	}
	
	static get KEY() {
		return 'tutorial-scene'
	}

	preload() {
		this.load.image('background', background_image);
		preloadAllSprites({ scene: this });
	}

	addBeam(x, y) {
		beamHelper.addBeam(this.shader, { 
			[BEAM_INPUTS.START]: [x, projectY(y - 200)],
			[BEAM_INPUTS.END]: [x, projectY(y)],
			[BEAM_INPUTS.COLOR]: [1.5, 1.5, 1.5]
		})
	}

	hideBeams() {
		beamHelper.changeAllBeams(this.shader, {
			[BEAM_INPUTS.START]: [-1000, 0],
			[BEAM_INPUTS.END]: [-1000, 0]
		});
	}

	create() {
		this.messages = [
			() => {
				this.text.text = 
`This is Beer Bearer Bob - your avatar.
You can use WASD or the arrow keys to control him.`;
				this.addBeam(210, 370);
			},
			() => {
				this.text.text = 
`These are your lovely and very thirsty dates. Keep them 
happy by delivering beer. Watch out! They will leave if 
they become too unhappy. `;
				this.hideBeams();
				this.addBeam(125, 320);
				this.addBeam(210, 80);
				this.addBeam(115, 120);
				this.addBeam(30, 180);
			},
			() => {
				this.text.text = 
`If all four of them leave the club,
the game will be over.`;
			},
			() => {
				this.text.text = 
`This is the bar. Here you can pick up a fresh beer.`;
				this.hideBeams();
				this.addBeam(610, 190);
			},
			() => {
				this.text.text = 
`One more thing - try to not bump into dancing guests,
this will make you spill the beer you are carrying.
Have fun with the game!`;
				this.hideBeams();
				beamHelper.reset();
			},
			() => this.scene.start(GameScene.KEY)
		];

		this.shader = this.game.renderer.addPipeline('shader-tut', new ShaderWrapper(this.game));
		ShaderWrapper.addToCamera(this.shader, this.cameras.main);

		this.add.image(0, 0, 'background').setOrigin(0, 0)
			.setInteractive()
			.on('pointerdown', () => this.messages.shift()());
		createAnimationsForAllSprites({ scene: this });	
		dancefloor.create({ scene: this, x: 200, y: 140 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 200, y: 265 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 320, y: 140 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 320, y: 265 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 440, y: 140 }).play('dancefloor', true);
		dancefloor.create({ scene: this, x: 440, y: 265 }).play('dancefloor', true);

		this.player.createSprite({ scene: this, x: 200, y: 320 });
		this.women.initialize({ scene: this });

		dj.create({ scene: this, x: 5, y: 70 }).anims.play('dj-play', true);
		
		this.bartender = bartender.create({ scene: this, x: 570, y: 150 });
		this.bartender.anims.play('bartender-tab', true);

		this.text = this.add.text(10, 410,
			'Hello, player. Welcome in our club!\nDon\'t worry, it will get more crowded soon.',
			{ strokeThickness: 3, stroke: '#0', fontSize: '18px' });
	}
}