import { discoDancer } from '../sprites';
import { correctMovement, generateRandomDirection } from './utils.js';

export function createDiscoDancer() {
    let sprite;

    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = discoDancer.create({ scene, x, y });
        },
        updateMovement() {
            // moves in all directions (also funky diagonals)
            const baseSpeed = 30;

            const rand = Math.random();
            if (rand < 0.03) {
                // change direction
                const direction = generateRandomDirection();
                sprite.setVelocityX(baseSpeed * direction.x);
                sprite.setVelocityY(baseSpeed * direction.y);
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
                sprite.anims.play('disco-dancer-turn', true);
            }
            else {
                sprite.anims.play('disco-dancer-up-down', true);
            }

            sprite.flipX = velocity.x < 0;
        },
    };
}