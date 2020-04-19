import { DANCEFLOOR_BOUNDING_BOX } from '../GameScene.js';

export function generateRandomDirection() {
    const directionValuesOnOneAxis = [-1, 0, 1];
    return {
        x: directionValuesOnOneAxis[Math.floor(Math.random() * directionValuesOnOneAxis.length)],
        y: directionValuesOnOneAxis[Math.floor(Math.random() * directionValuesOnOneAxis.length)],
    };
}

export function correctMovement({ sprite }) {
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
