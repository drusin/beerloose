import { gal, indicator, SPRITE_SCALE_FACTOR } from '../sprites';

const INDICATOR_OFFSET = 18 * SPRITE_SCALE_FACTOR;

export function createGal({ type }) {
    let happiness = 100;

    return {
        sprite: {},
        createSprite: function({ scene, x, y }) {
            this.indicatorSprite = indicator.create({ scene, x, y: (y - INDICATOR_OFFSET), sheet: 'indicator-spritesheet' });
            this.indicatorSprite.anims.play('indicator-good', true);
            this.indicatorSprite.setDepth(1000 + y);
            this.sprite = gal.create({ scene, x, y, number: type });
        },
        updateMovement() {
            // no movement
        },
        handleCollisions({ physics, player }) {
            physics.overlap(
                player.sprite,
                this.sprite,
                (left, right) => {
                    console.log('detected collsision with woman: ' + type);
                }
            );
        },
        updateAnimation(delta) {
            this.sprite.anims.play(`${type}-gal-hair`, true).setOrigin(0, 0);
            this.sprite.setDepth(this.sprite.y);
        }
   };
}
