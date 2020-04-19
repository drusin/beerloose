import { Scene } from 'phaser';
import partyPlaceholder from './assets/party.png';
import DiscoBallShader from './shaders/DiscoBallShader';
import discoBallShaderManager from './shaders/discoBallShaderManager';
import { discoDancer, squaredancer, metalDancer, preloadAllSprites, createAnimationsForAllSprites } from './sprites';

export default class PartyShaderTestScene extends Scene {
    static get KEY() {
        return 'party-shader-test-scene';
    }

    constructor() {
        super({ key: PartyShaderTestScene.KEY });
    }

    preload() {
        this.load.image('party-placeholder', partyPlaceholder);
        // this.load.glsl('disco-shader', glslf);

        preloadAllSprites({ scene: this });
    }

    create() {
        this.add.image(515, 300, 'party-placeholder');
        this.discoBallShader = this.game.renderer.addPipeline('DiscoBall', new DiscoBallShader(this.game));
        DiscoBallShader.applyDefaults(this.discoBallShader);
        console.log(this.discoBallShader);
        this.camTexture = this.cameras.main.setRenderToTexture(this.discoBallShader);
        // discoBallShaderManager.addDiscoBall(this.discoBallShader, DiscoBallShader.DEFAULTS);

        // shaderToString();
        this.discoShaderOffset = 0;

        createAnimationsForAllSprites({ scene: this });
        this.addDancers();
    }

    update(time, delta) {
        this.discoShaderOffset = this.discoShaderOffset >= 360 ? 0 : this.discoShaderOffset + delta / 100;
        this.discoBallShader.setFloat1v(DiscoBallShader.INPUTS.OFFSET, [this.discoShaderOffset]);
    }

    addDancers() {
		const discoDude = discoDancer.create({ scene: this, x: 300, y: 300 });
		discoDude.anims.play('disco-dancer-up-down', true);
		const squareGal = squaredancer.create({ scene: this, x: 350, y: 270 });
		squareGal.anims.play('squaredancer-left-right', true);
		const metaller = metalDancer.create({ scene: this, x: 250, y: 285 });
		metaller.anims.play('metal-dancer-headbang', true);
    }
}