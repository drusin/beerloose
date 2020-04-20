import { GameObjects, Geom } from 'phaser';

import BeerBarSprite from './assets/sprites/BeerBar.png';
import MoodProgressSprite from './assets/sprites/MoodProgressBackground.png';
import MoodPositiveSprite from './assets/sprites/MoodPositive.png';
import MoodNegativeSprite from './assets/sprites/MoodNegative.png';
import MoodSmileysSprite from './assets/sprites/MoodSmileys.png';

export default class MoodSlider {

    static assets(loader) {
        loader.spritesheet('beer_bar', BeerBarSprite, { frameWidth: 80, frameHeight: 96 });
        
        loader.image('mood_positive', MoodPositiveSprite); //, { frameWidth: 186, frameHeight: 92 });
        loader.image('mood_negative', MoodNegativeSprite); // { frameWidth: 186, frameHeight: 92 });
        loader.spritesheet('mood_smileys', MoodSmileysSprite, { frameWidth: 56, frameHeight: 52 });

        loader.image('mood_progress_background', MoodProgressSprite);
    }

    constructor(scene, x, y, women) {
        this.graphics = new GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.women = women;
        
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

        this.moodPositiveSprite = this.graphics.scene.add.image(this.x + 126, this.y + 27, 'mood_positive');
        this.moodPositiveSprite.setScale(0.5);

        this.moodNegativeSprite = this.graphics.scene.add.image(this.x + 36, this.y + 27, 'mood_negative');
        this.moodNegativeSprite.setScale(0.5);
    }

    draw() {
        this.graphics.clear();

        const value = this.women.getTotalHappiness(); 

        // 100 -> 0.0, 50 -> 1.0
        const xOffs = this.moodPositiveSprite.width *  Math.max(0, (100 - value)/50); // Math.max(0, (value - 50)/50);
        const posCrop = new Geom.Rectangle(xOffs, 0, this.moodPositiveSprite.width, this.moodPositiveSprite.height);
        this.moodPositiveSprite.setCrop(posCrop).flipX = true;

        const negCrop = new Geom.Rectangle(0, 0, this.moodNegativeSprite.width * Math.min(1, (50 - value)/50), this.moodNegativeSprite.height);
        this.moodNegativeSprite.setCrop(negCrop).flipX = true;
    }

}
