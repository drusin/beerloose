import { Scene } from 'phaser';
import partyPlaceholder from './assets/party.png';
import DiscoBallShader from './shaders/DiscoBallShader';
import discoBallShaderManager from './shaders/discoBallShaderManager';

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
    }

    update(time, delta) {
        this.discoShaderOffset = this.discoShaderOffset >= 360 ? 0 : this.discoShaderOffset + delta / 100;
        this.discoBallShader.setFloat1v(DiscoBallShader.INPUTS.OFFSET, [this.discoShaderOffset]);
    }
}