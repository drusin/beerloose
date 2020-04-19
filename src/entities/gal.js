import { gal, indicator } from '../sprites';

export function createGal({ type }) {
    let happiness = 100;

    return {
        sprite: {},
        createSprite: function({ scene, x, y }) {
            this.indicatorSprite = indicator.create({ scene, x, y: (y - 18), sheet: 'indicator-spritesheet' });
            this.indicatorSprite.anims.play('indicator-player', true);
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
