import { gal } from '../sprites';

export function createGal() {
    let sprite;
    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = gal.create({ scene, x, y, number: 2 });
        },
        updateMovement() {
            // ...
        },
        updateAnimation(delta) {
            sprite.anims.play('2-gal-hair', true);
        }
    };
}