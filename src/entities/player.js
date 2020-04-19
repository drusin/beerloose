import { player as playerSprite, indicator, SPRITE_SCALE_FACTOR } from '../sprites';
import { Beer } from '../beer_bar.js';

const PLAYER_SPEED = 100;
const INDICATOR_OFFSET = 18 * SPRITE_SCALE_FACTOR;

export function createPlayer() {
    return {
        sprite: {},
        beer: new Beer(),
        createSprite: function({ scene, x, y }) {
            this.indicatorSprite = indicator.create({ scene, x, y: (y - INDICATOR_OFFSET), sheet: 'indicator-spritesheet' });
            this.indicatorSprite.anims.play('indicator-player', true);
            this.indicatorSprite.setDepth(1000);
            this.sprite = playerSprite.create({ scene, x, y, sheet: 'player-two-beers-spritesheet' });
            this.sprite.anims.play('two_beers-player-drop', true);
            this.sprite.setInteractive();
        },
        update: function({ keys, partyPeople, physics, sfx, bartender }) {
            this.updateMovement({ keys });
            this.handleCollisions({ partyPeople, physics, sfx, bartender });
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
            this.sprite.setVelocityX(PLAYER_SPEED * normalizedDirection.x);
            this.sprite.setVelocityY(PLAYER_SPEED * normalizedDirection.y);
            this.indicatorSprite.x = this.sprite.x;
            this.indicatorSprite.y = this.sprite.y - INDICATOR_OFFSET;
            this.sprite.setDepth(100 + this.sprite.y);
        },
        handleCollisions({ partyPeople, physics, sfx, bartender }) {
            physics.overlap(
                this.sprite,
                partyPeople.partyPeople.map(p => p.sprite),
                (left, right) => {
                    const partyPerson = left === this.sprite ? right : left;
                    sfx.bumpIntoPerson();
                }
            );
            physics.overlap(
                this.sprite,
                bartender,
                () => {
                    this.beer.fill();
                }
            );
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