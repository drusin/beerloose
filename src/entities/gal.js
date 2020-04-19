import { gal } from '../sprites';

export function createGal({ type }) {
    let happiness = 100;

    return {
        sprite: {},
        createSprite: function({ scene, x, y }) {
            this.sprite = gal.create({ scene, x, y, number: type });
        },
        updateMovement() {
            // no movement
        },
        updateAnimation(delta) {
            this.sprite.anims.play(`${type}-gal-hair`, true).setOrigin(0, 0);
        }
   };
}
