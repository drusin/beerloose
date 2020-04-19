import { gal, indicator, SPRITE_SCALE_FACTOR } from '../sprites';

const INDICATOR_OFFSET = 18 * SPRITE_SCALE_FACTOR;

export function createGal({ type }) {
    let happiness = 100;

    const indicators = {
        'indicator-good': [100, 80],
        'indicator-medium': [79, 30],
        'indicator-bad': [29, 1],
        'indicator-leaving': [0, 0]
    };

    return {
        sprite: {},
        createSprite: function({ scene, x, y }) {
            this.indicatorSprite = indicator.create({ scene, x, y: (y - INDICATOR_OFFSET), sheet: 'indicator-spritesheet' });
            this.indicatorSprite.anims.play('indicator-good', true);
            this.indicatorSprite.setDepth(1000 + y);
            this.sprite = gal.create({ scene, x, y, number: type });
            this.delta_counter = 0;
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
        updateAnimation({ delta }) {
            this.delta_counter += delta;
            if (this.delta_counter > 1000 && happiness) {
                this.delta_counter = 0;
                happiness--;
                this.indicatorSprite.anims.play(getMoodIndicator(), true);
            }
            this.sprite.anims.play(`${type}-gal-hair`, true).setOrigin(0, 0);
            this.sprite.setDepth(this.sprite.y);
        }
   };

   function getMoodIndicator() {
        let indicator = '';
        Object.entries(indicators).forEach(([name, boundaries]) => {   
            if (boundaries[0] >= happiness && boundaries[1] <= happiness) {
                indicator = name;
            }
        });
        return indicator;
   }
}
