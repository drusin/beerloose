import Phaser from 'phaser';
import fragShader from './shader.glslf';
import preferences from '../preferences';

export default class ShaderWrapper extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game) {
        super({
            game,
            renderer: game.renderer,
            fragShader
        });
    }

    static addToCamera(shader, camera) {
        if (!preferences.effects) { return; }
        camera.setRenderToTexture(shader);
    }
}