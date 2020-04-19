import { metalDancer } from '../sprites';

export function createMetalDancer() {
    let sprite;
    let timeSinceLastAnimationChange = 0;
    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = metalDancer.create({ scene, x, y });
        },
        updateMovement() {
            // ...
        },
        updateAnimation(delta) {
            if (timeSinceLastAnimationChange > 2000) {
                if (Math.random() < 0.5) {
                    sprite.anims.play('metal-dancer-headbang', true);
                }
                else {
                    sprite.anims.play('metal-dancer-jump', true);
                }
                timeSinceLastAnimationChange = 0;
            }
            timeSinceLastAnimationChange += delta;
        }
    };
}