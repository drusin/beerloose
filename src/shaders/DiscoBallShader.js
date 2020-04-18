import Phaser from 'phaser';
import shaderFile from './disco_ball_shader.glslf'

export default class DiscoBallShader extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game) {
        super({
            game,
            renderer: game.renderer,
            fragShader: shaderFile
        });
    }

    static applyDefaults(shader) {
        shader.setFloat2(DiscoBallShader.INPUTS.RESOLUTION, 640, 480);
        shader.setFloat2(DiscoBallShader.INPUTS.POSITION, 300, 200);
        shader.setFloat1(DiscoBallShader.INPUTS.R, 50);
        shader.setFloat1(DiscoBallShader.INPUTS.AMOUNT, 10);
        shader.setFloat1(DiscoBallShader.INPUTS.LENGTH, 15);
        shader.setFloat1(DiscoBallShader.INPUTS.WIDTH, 3);
        shader.setFloat1(DiscoBallShader.INPUTS.OFFSET, 0);
        shader.setFloat1(DiscoBallShader.INPUTS.STRETCH_X, 2);
        shader.setFloat1(DiscoBallShader.INPUTS.STRETCH_Y, 0);
    }

    static get INPUTS() {
        return {
            RESOLUTION: 'resolution',
            POSITION: 'position',
            R: 'r',
            AMOUNT: 'amount',
            LENGTH: 'length',
            WIDTH: 'width',
            OFFSET: 'offset',
            STRETCH_X: 'stretchX',
            STRETCH_Y: 'stretchY'
        }
    }

    static get DEFAULTS() {
        return {
            [DiscoBallShader.INPUTS.RESOLUTION]: [640, 480],
            [DiscoBallShader.INPUTS.POSITION]: [300, 200],
            [DiscoBallShader.INPUTS.R]: 50,
            [DiscoBallShader.INPUTS.AMOUNT]: 10,
            [DiscoBallShader.INPUTS.LENGTH]: 15,
            [DiscoBallShader.INPUTS.WIDTH]: 3,
            [DiscoBallShader.INPUTS.OFFSET]: 0,
            [DiscoBallShader.INPUTS.STRETCH_X]: 2,
            [DiscoBallShader.INPUTS.STRETCH_Y]: 0,
        }
    }
}