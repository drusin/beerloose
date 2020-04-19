import { Scene } from 'phaser';
import preferences from './preferences';
import GameScene from './GameScene';

export default class MenuScene extends Scene {
    static get KEY() {
        return 'menu-scene';
    }

    constructor() {
        super({ key: MenuScene.KEY });
    }

    create() {
        preferences.load();
        this.startButton = this.add.text(300, 200, 'Start')
            .setInteractive()
            .on('pointerdown', () => this.scene.start(GameScene.KEY));
        this.effectsButton = this.add.text(300, 250, this.effectsText)
            .setInteractive()
            .on('pointerdown', () => this.toggleEffects());
    }

    get effectsText() {
        return preferences.effects ? 'Toggle effects (ON)' : 'Toggle effects (OFF)';
    }

    toggleEffects() {
        preferences.effects = !preferences.effects;
        this.effectsButton.setText(this.effectsText);
    }
}