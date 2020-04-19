import { squaredancer } from '../sprites';

export function createSquaredanceDancer() {
    let sprite;

    function updateAnimation() {
        const velocity = sprite.body.velocity;
        if (velocity.x === 0 && velocity.y === 0) {
            sprite.anims.play('squaredancer-clap', true);
        }
        else {
            sprite.anims.play('squaredancer-left-right', true);
        }
    }

    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = squaredancer.create({ scene, x, y });
            sprite.anims.play('squaredancer-left-right', true);
        },
        updateMovement() {
            const baseSpeed = 30;

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

            updateAnimation();
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