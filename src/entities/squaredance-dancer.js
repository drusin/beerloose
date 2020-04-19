import { squaredancer } from '../sprites';
import { correctMovement, generateRandomDirection } from './utils.js';

export function createSquaredanceDancer() {
    let sprite;

    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = squaredancer.create({ scene, x, y });
        },
        updateMovement() {
            //moves just in 90° angles (not diagonal)
            const baseSpeed = 30;

            const rand = Math.random();
            if (rand < 0.03) {
                // change direction
                const rand = Math.random();
                if (rand < 0.25) {
                    sprite.setVelocityX(-baseSpeed);
                    sprite.setVelocityY(0);
                }
                else if (0.25 <= rand && rand < 0.5) {
                    sprite.setVelocityX(baseSpeed);
                    sprite.setVelocityY(0);
                }
                else if (0.5 <= rand && rand < 0.75) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(-baseSpeed);
                }
                else if (0.75 <= rand && rand < 1) {
                    sprite.setVelocityX(0);
                    sprite.setVelocityY(baseSpeed);
                }
            }
            else if (0.03 < rand && rand < 0.95) {
                // continue moving in current direction
            }
            else {
                // stop
                sprite.setVelocityX(0);
                sprite.setVelocityY(0);
            }

            correctMovement({ sprite });
        },
        updateAnimation() {
            const velocity = sprite.body.velocity;
            if (velocity.x === 0 && velocity.y === 0) {
                sprite.anims.play('squaredancer-clap', true);
            }
            else {
                sprite.anims.play('squaredancer-left-right', true);
            }
        },
    };
}
