import { Scene } from 'phaser';
import partyPlaceholder from './assets/party.png';
import ShaderWrapper from './shaders/ShaderWrapper';
import discoBallHelper from './shaders/discoBallHelper';
import { discoDancer, squaredancer, metalDancer, preloadAllSprites, createAnimationsForAllSprites } from './sprites';
import { BALL_INPUTS } from './shaders/discoBallHelper'

export default class PartyShaderTestScene extends Scene {
    static get KEY() {
        return 'party-shader-test-scene';
    }

    constructor() {
        super({ key: PartyShaderTestScene.KEY });
    }

    preload() {
        this.load.image('party-placeholder', partyPlaceholder);
        preloadAllSprites({ scene: this });
    }

    create() {
        this.discoBallShader = this.game.renderer.addPipeline('shader', new ShaderWrapper(this.game));
        this.camTexture = this.cameras.main.setRenderToTexture(this.discoBallShader);
        discoBallHelper.addDiscoBall(this.discoBallShader);
        discoBallHelper.addDiscoBall(this.discoBallShader, {[BALL_INPUTS.POSITION]: [100, 100]});
        this.discoShaderOffset = 0;
        
        createAnimationsForAllSprites({ scene: this });
        this.add.image(515, 300, 'party-placeholder');
        this.addDancers();
    }

    update(time, delta) {
        this.discoShaderOffset = this.discoShaderOffset >= 360 ? 0 : this.discoShaderOffset + delta / 100;
        discoBallHelper.changeAllDiscoBalls(this.discoBallShader, {[BALL_INPUTS.OFFSET]: this.discoShaderOffset}, 0);
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