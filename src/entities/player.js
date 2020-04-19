import { player as playerSprite } from '../sprites';

const PLAYER_SPEED = 100;

export function createPlayer() {
    let sprite;
    return {
        sprite,
        createSprite: function({ scene, x, y }) {
            sprite = playerSprite.create({ scene, x, y, sheet: 'player-two-beers-spritesheet' });
		    sprite.anims.play('two_beers-player-drop', true);
            sprite.setInteractive();
        },
        updateMovement: function({ keys }) {
            const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = keys;
        
            const leftPressed = (LEFT.isDown || A.isDown);
            const rightPressed = (RIGHT.isDown || D.isDown);
            const upPressed = (UP.isDown || W.isDown);
            const downPressed = (DOWN.isDown || S.isDown);
        
            const direction = { x: 0, y: 0 };
            if (leftPressed) { direction.x = -1; }
            else if (rightPressed) { direction.x = 1; }
            if (upPressed) { direction.y = -1; }
            else if (downPressed) { direction.y = 1; }

            const normalizedDirection = normalize2dVector(direction);
            sprite.setVelocityX(PLAYER_SPEED * normalizedDirection.x);
            sprite.setVelocityY(PLAYER_SPEED * normalizedDirection.y);
        },
    };
}

function normalize2dVector(vector) {
    if (vector.x === 0 && vector.y === 0) return vector;
    const norm = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    return {
        x: vector.x / norm,
        y: vector.y / norm,
    };
}