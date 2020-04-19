import { gal } from '../sprites';

export function createGal({ type }) {
    let sprite;
    let happiness = 100;

    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = gal.create({ scene, x, y, number: type });
        },
        updateMovement() {
            // ...
        },
        updateAnimation(delta) {
            sprite.anims.play(`${type}-gal-hair`, true).setOrigin(0, 0);
        }
    };
}
