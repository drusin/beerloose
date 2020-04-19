import { metalDancer } from '../sprites';

export function createMetalDancer() {
    let timeSinceLastAnimationChange = 0;
    return {
        sprite: {},
        createSprite: function({ scene, x, y }) {
            this.sprite = metalDancer.create({ scene, x, y });
            this.sprite.setSize(8, 16, false);
            this.sprite.setOffset(4, 16);
        },
        updateMovement() {
            // ...
        },
        updateAnimation(delta) {
            if (timeSinceLastAnimationChange > 2000) {
                if (Math.random() < 0.5) {
                    this.sprite.anims.play('metal-dancer-headbang', true);
                }
                else {
                    this.sprite.anims.play('metal-dancer-jump', true);
                }
                timeSinceLastAnimationChange = 0;
            }
            timeSinceLastAnimationChange += delta;
        }
    };
}