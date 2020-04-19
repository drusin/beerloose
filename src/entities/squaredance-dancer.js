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
            const baseSpeed = 40;

            const velocity = sprite.body.velocity;

            const rand = Math.random();
            if (rand < 0.05) {
                // change direction
                const direction = generateRandomDirection();
                sprite.setVelocityX(baseSpeed * direction.x);
                sprite.setVelocityY(baseSpeed * direction.y);
            }
            else if (0.05 < rand && rand < 0.9) {
                // continue moving in current direction
            }
            else {
                // stop
                sprite.setVelocityX(0);
                sprite.setVelocityY(0);
            }
        }
    };
}

function generateRandomDirection() {
    const goingLeft = Math.random() < 0.5;
    const goingUp = Math.random() < 0.5;
    return {
        x: goingLeft ? -1 : 1,
        y: goingUp ? -1 : 1,
    }
}