import { squaredancer } from '../sprites';
import { DANCEFLOOR_BOUNDING_BOX } from '../GameScene.js';

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

    function correctMovement() {
        // dancers should not dance through walls!
        const { left, right, bottom } = sprite.body;
        if (bottom < DANCEFLOOR_BOUNDING_BOX.top) {
            if (sprite.body.velocity.y < 0) {
                sprite.setVelocityY(0);
            } 
        } 
        else if (bottom > DANCEFLOOR_BOUNDING_BOX.bottom) {
            if (sprite.body.velocity.y > 0) {
                sprite.setVelocityY(0);
            } 
        }
        if (left < DANCEFLOOR_BOUNDING_BOX.left) {
            if (sprite.body.velocity.x < 0 ) {
                sprite.setVelocityX(0);
            }
        }
        if (right > DANCEFLOOR_BOUNDING_BOX.right) {
            if (sprite.body.velocity.x > 0 ) {
                sprite.setVelocityX(0);
            }
        }
    }

    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = squaredancer.create({ scene, x, y });
        },
        updateMovement() {
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

            correctMovement();

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