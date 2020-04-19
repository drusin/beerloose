import { squaredancer } from '../sprites';

export function createSquaredanceDancer() {
    let sprite;
    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = squaredancer.create({ scene, x, y });
            sprite.anims.play('squaredancer-left-right', true);
        },
        updateMovement() {
            // ...
        },
    };
}