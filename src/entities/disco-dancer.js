import { discoDancer } from '../sprites';

export function createDiscoDancer() {
    let sprite;
    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = discoDancer.create({ scene, x, y });
            sprite.anims.play('disco-dancer-up-down', true);
        },
        updateMovement() {
            // ...
        },
    };
}