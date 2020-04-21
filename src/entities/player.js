import { player as playerSprite, indicator, SPRITE_SCALE_FACTOR } from '../sprites';
import { Beer } from '../beer_bar.js';

const PLAYER_SPEED = 100;
const INDICATOR_OFFSET = 18 * SPRITE_SCALE_FACTOR;

export function createPlayer() {
    let timeSinceLastCollisionWithDancer = 0;
    let timeSinceLastRefill = 0;
    let currentlyRefilling = 0;
    return {
        sprite: {},
        isDropping: false,
        beer: new Beer(),
        createSprite: function({ scene, x, y }) {
            this.indicatorSprite = indicator.create({ scene, x, y: (y - INDICATOR_OFFSET), sheet: 'indicator-spritesheet' });
            this.indicatorSprite.anims.play('indicator-player', true);
            this.indicatorSprite.setDepth(1000);
            this.sprite = playerSprite.create({ scene, x, y, sheet: 'player-spritesheet' });
            this.sprite.anims.play('beer-player-idle', true);
            this.sprite.setInteractive();
            this.sprite.setSize(6, 12, false);
            this.sprite.setOffset(4, 16);
        },
        update: function({ delta, keys, partyPeople, physics, sfx, bartender }) {
            this.updateMovement({ keys });
            this.handleCollisions({ delta, partyPeople, physics, sfx, bartender });
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
            const prefix = this.beer.amount > 0 ? 'beer' : 'no-beer';
            if (!this.isDropping) {
                if ( !this.sprite.body.velocity.x && !this.sprite.body.velocity.y ) {
                    this.sprite.anims.play(prefix + '-player-idle', true);
                } else {
                    this.sprite.anims.play(prefix + '-player-walking', true);
                }
            }
            this.sprite.flipX = this.sprite.body.velocity.x < 0;
        },
        handleCollisions({ delta, partyPeople, physics, sfx, bartender }) {
            physics.overlap(
                this.sprite,
                partyPeople.partyPeople.map(p => p.sprite),
                (left, right) => {
                    if (timeSinceLastCollisionWithDancer > 500) {
                        if ((this.beer.amount > 0) && (this.beer.amount - 10 <= 0)) {
                            this.isDropping = true;
                            this.sprite.anims.play('beer-player-drop', true);
                            const ref = this;
                            this.sprite.on('animationcomplete', function (animation) {
                                if (animation.key === 'beer-player-drop') {
                                    ref.isDropping = false;
                                }
                            }, this.sprite);
                        }
                        const dir = this.sprite.body.velocity.x > 0 ? -1 : 1;
                        this.sprite.setVelocityX(dir * 1500);
                        sfx.bumpIntoPerson();
                        this.beer.decrease(15);
                        timeSinceLastCollisionWithDancer = 0;
                    }
                }
            );
            physics.overlap(
                this.sprite,
                bartender,
                () => {
                    if (timeSinceLastRefill < 2000 || currentlyRefilling) return;
                    currentlyRefilling = true;
                    this.beer.fill();
                    const playedSound = sfx.beerOpening();
                    playedSound.once('complete', function(){
                        sfx.pouringBeer();
                        timeSinceLastRefill = 0;
                        currentlyRefilling = false;
                    });
                }
            );
            timeSinceLastCollisionWithDancer += delta;
            timeSinceLastRefill += delta;
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