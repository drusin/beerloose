import Phaser from 'phaser';
import fragShader from './shader.glslf'

export default class ShaderWrapper extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game) {
        super({
            game,
            renderer: game.renderer,
            fragShader
        });
    }
}