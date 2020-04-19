import { GameObjects, Geom } from 'phaser';

import BeerBarSprite from './assets/sprites/BeerBar.png';
import MoodProgressSprite from './assets/sprites/MoodProgressBackground.png';
import MoodPositiveSprite from './assets/sprites/MoodPositive.png';
import MoodNegativeSprite from './assets/sprites/MoodNegative.png';
import MoodSmileysSprite from './assets/sprites/MoodSmileys.png';

export default class MoodSlider {

    static assets(loader) {
        loader.spritesheet('beer_bar', BeerBarSprite, { frameWidth: 80, frameHeight: 96 });
        
        loader.spritesheet('mood_positive', MoodPositiveSprite, { frameWidth: 186, frameHeight: 92 });
        loader.spritesheet('mood_negative', MoodNegativeSprite, { frameWidth: 186, frameHeight: 92 });
        loader.spritesheet('mood_smileys', MoodSmileysSprite, { frameWidth: 56, frameHeight: 52 });

        loader.image('mood_progress_background', MoodProgressSprite);
    }

    constructor(scene, x, y) {
        this.graphics = new GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        
        scene.add.existing(this.graphics);

        // this.barSprite = this.graphics.scene.add.sprite(this.x, this.y, 'beer_bar');
        // this.beerAmountText = this.bar.scene.add.text(this.x - this.barSprite.width / 2, this.y + this.barSprite.height / 2, 'Beer: %100');
        this.moodBackgroundSprite = this.graphics.scene.add.image(this.x + 82, this.y + 27, 'mood_progress_background');
        this.moodBackgroundSprite.setScale(0.5);

        this.goodSmiley = this.graphics.scene.add.sprite(this.x + this.moodBackgroundSprite.displayWidth + 10, this.y + 27, 'mood_smileys');
        this.goodSmiley.setScale(0.6);
        this.goodSmiley.setFrame(1);

        this.badSmiley = this.graphics.scene.add.sprite(this.x - 35, this.y + 27, 'mood_smileys');
        this.badSmiley.setScale(0.6);

    }
}
