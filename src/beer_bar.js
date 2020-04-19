import { GameObjects, Geom } from 'phaser'
import BeerBarSprite from './assets/sprites/BeerBar.png'

// Displays the amount of remaining beer at hand.
export default class BeerBar {

    constructor(scene, x, y) {
        this.bar = new GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        
        this.amount = 100;
        
        scene.add.existing(this.bar);
        this.barSprite = this.bar.scene.add.sprite(this.x, this.y, 'beer_bar');
        this.beerAmountText = this.bar.scene.add.text(this.x - this.barSprite.width / 2, this.y + this.barSprite.height / 2, 'Beer: %100');
    }

    fill() {
        this.amount = 100;
        this.draw();
    }

    decrease(amount) {
        this.amount = Math.max(0, this.amount - amount);

        this.draw();
    }

    static assets(loader) {
        loader.spritesheet('beer_bar', BeerBarSprite, { frameWidth: 80, frameHeight: 96 });
    }

    draw() {
        this.bar.clear();

        // we have 34 sprites in 'beer_bar', 0 is full and 35 is empty. mapping amount (0 .. 100) to sprite frame (33 .. 0)
        const frame = Math.floor((1 - this.amount / 100) * 33);
        this.barSprite.setFrame(frame);
        this.beerAmountText.setText('Beer: %' + this.amount);
    }
}
