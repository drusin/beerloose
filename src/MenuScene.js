import { Scene } from 'phaser';
import preferences from './preferences';
import GameScene from './GameScene';
import logo from './assets/logo_stroke_2-11.png';
import IntroScene from './IntroScene';

export default class MenuScene extends Scene {
    static get KEY() {
        return 'menu-scene';
    }

    constructor() {
        super({ key: MenuScene.KEY });
    }

    preload() {
        this.load.image('logo', logo);
    }

    create() {
        this.add.image(320, 130, 'logo');

        preferences.load();
        this.startButton = this.add.text(300, 200, 'Start')
            .setInteractive()
            .on('pointerdown', () => this.scene.start(preferences.skipTutorial ? GameScene.KEY : IntroScene.KEY));

        this.tutorialButton = this.add.text(250, 250, this.tutorialText)
            .setInteractive()
            .on('pointerdown', () => this.toggleTutorial());

        this.effectsButton = this.add.text(250, 280, this.effectsText)
            .setInteractive()
            .on('pointerdown', () => this.toggleVisualEffects());

        this.musicMinusButton = this.add.text(230, 310, '-')
            .setInteractive()
            .on('pointerdown', () => this.setMusic(-10));
        this.musicLabel = this.add.text(250, 310, this.musicText);
        this.musicPlusButton = this.add.text(430, 310, '+')
            .setInteractive()
            .on('pointerdown', () => this.setMusic(10));

        this.sfxMinusButton = this.add.text(230, 340, '-')
            .setInteractive()
            .on('pointerdown', () => this.setSfx(-10));
        this.sfxLabel = this.add.text(250, 340, this.sfxText);
        this.sfxPlusButton = this.add.text(430, 340, '+')
            .setInteractive()
            .on('pointerdown', () => this.setSfx(10));
    }

    get tutorialText() {
        return preferences.skipTutorial ? 'Skip tutorial (ON)' : 'Skip tutorial (OFF)'
    }

    toggleTutorial() {
        preferences.skipTutorial = !preferences.skipTutorial;
        this.tutorialButton.text = this.tutorialText;
    }

    get effectsText() {
        return preferences.effects ? 'Visual effects (ON)' : 'Visual effects (OFF)';
    }
    
    toggleVisualEffects() {
        preferences.effects = !preferences.effects;
        this.effectsButton.setText(this.effectsText);
    }

    setMusic(amount) {
        preferences.musicVolume += amount;
        preferences.musicVolume = Math.min(100, Math.max(0, preferences.musicVolume));
        this.musicLabel.setText(this.musicText);
    }

    get musicText() {
        return `Music volume (${preferences.musicVolume})`
    }

    get sfxText() {
        return `Sound volume (${preferences.sfxVolume})`
    }

    setSfx(amount) {
        preferences.sfxVolume += amount;
        preferences.sfxVolume = Math.min(100, Math.max(0, preferences.sfxVolume));
        this.sfxLabel.setText(this.sfxText);
    }
}