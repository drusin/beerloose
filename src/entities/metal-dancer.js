import { metalDancer } from '../sprites';

export function createMetalDancer() {
    let sprite;
    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = metalDancer.create({ scene, x, y });
            sprite.anims.play('metal-dancer-headbang', true);
        },
        updateMovement() {
            // ...
        },
        updateAnimation() {
            
        }
    };
}