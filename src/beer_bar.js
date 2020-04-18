import { GameObjects } from 'phaser'

// Displays the amount of remaining beer at hand.
export default class BeerBar {

    constructor(scene, x, y) {
        this.bar = new GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;

        this.width = 32;
        this.height = 256;
        this.border = 2;

        this.amount = 100;
        
        this.draw();
        scene.add.existing(this.bar);
    }

    fill() {
        this.amount = 100;
        this.draw();
    }

    decrease(amount) {
        this.amount = Math.max(0, this.amount - amount);

        this.draw();
    }

    draw() {
        this.bar.clear();

        // Background
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, this.width, this.height);

        // Empty Beer
        const inset = this.border * 2;
        this.bar.fillStyle(0x5f5f5f);
        this.bar.fillRect(this.x + this.border, this.y + this.border, this.width - inset, this.height - inset);

        // Existing beer
        const filledHeight = Math.floor((this.height - inset) * this.amount / 100);
        this.bar.fillStyle(0xffe80f);
        this.bar.fillRect(this.x + this.border, this.y - filledHeight + this.height - this.border, this.width - inset, filledHeight);
    }
}
