import { gal, indicator, SPRITE_SCALE_FACTOR } from '../sprites';

const INDICATOR_OFFSET = 18 * SPRITE_SCALE_FACTOR;

const baseSpeed = 60;

export function createGal({ type, escapeRoute = {} }) {
    let happiness = 100;

    const indicators = {
        'indicator-good': [10000, 80],
        'indicator-medium': [79, 30],
        'indicator-bad': [29, 1],
        'indicator-leaving': [0, -10000]
    };

    return {
        createSprite: function({ scene, x, y }) {
            this.indicatorSprite = indicator.create({ scene, x, y: (y - INDICATOR_OFFSET), sheet: 'indicator-spritesheet' });
            this.indicatorSprite.anims.play('indicator-good', true);
            this.indicatorSprite.setDepth(1000 + y);
            this.sprite = gal.create({ scene, x, y, number: type });
            this.delta_counter = 0;
            this.escapeStep = 0;
            this.sprite.anims.play(`${type}-gal-hair`, true).setOrigin(0, 0);
            this.sprite.setSize(6, 12, false);
            this.sprite.setOffset(4, 16);
            happiness += Math.floor(20 * Math.random());
            this.totalAmount = 0;
        },
        updateMovement({ physics }) {
            if (happiness > 0 || !Object.keys(escapeRoute).length) {
                return;
            }            
            if (escapeRoute[this.escapeStep]) {
                this.delta_counter = 0;
                if (Math.abs(escapeRoute[this.escapeStep].destX - this.sprite.body.x) < 16 && Math.abs(escapeRoute[this.escapeStep].destY - this.sprite.body.y) < 48) {
                    this.sprite.setVelocityX(0);
                    this.sprite.setVelocityY(0);
                    this.indicatorSprite.setVelocityX(0);
                    this.indicatorSprite.setVelocityY(0);
                    this.escapeStep++;
                }
                else {
                    this.sprite.anims.play(escapeRoute[this.escapeStep].name, true);
                    this.sprite.flipX = this.sprite.body.velocity.x < 0;
                    physics.moveTo(this.sprite, escapeRoute[this.escapeStep].destX, escapeRoute[this.escapeStep].destY, baseSpeed);
                    physics.moveTo(this.indicatorSprite, escapeRoute[this.escapeStep].destX, escapeRoute[this.escapeStep].destY- INDICATOR_OFFSET, baseSpeed);
                }
            }
        },
        handleCollisions({ physics, player, sfx }) {
            physics.overlap(
                player.sprite,
                this.sprite,
                () => {
                    const amount = player.beer.amount;
                    if (!amount || happiness < 0) {
                        return;
                    }
                    happiness += amount * 0.3;
                    this.totalAmount += amount;
                    player.beer.chug();
                    this.sprite.anims.play(`${type}-gal-drink`, true);

                    const that = this;
                    this.sprite.on('animationcomplete', function (animation) {
                        if (animation.key === `${type}-gal-drink`) {
                            if (type === 3) {
                                sfx.satisfiedCustomerFrench();
                            }
                            else {
                                sfx.satisfiedCustomer();
                            }
                            that.sprite.anims.play(`${type}-gal-hair`, true);
                        }
                    }, this.sprite);
                }
            );
        },
        updateAnimation({ delta, women }) {
            this.delta_counter += delta;
            if (this.delta_counter > 1000 && happiness >= 0) {
                this.delta_counter = 0;

                const th = women.getTotalHappiness();
                if (th < 25) happiness -= 2;
                if (25 <= th && th < 50) happiness -= 1.66;
                if (50 <= th && th < 75) happiness -= 1.33;
                if (75 <= th) happiness -= 1;
            }
            this.indicatorSprite.anims.play(getMoodIndicator(), true);
            this.sprite.setDepth(100 + this.sprite.y);
        },
        getHappiness() {
            return Math.min(Math.max(happiness, 0), 100);
        },
        getTotalAmount() {
            return this.totalAmount;
        }
   };

   function getMoodIndicator() {
        let indicator = '';
        Object.entries(indicators).forEach(([name, boundaries]) => {
            if (boundaries[0] >= Math.floor(happiness) && boundaries[1] <= Math.floor(happiness)) {
                indicator = name;
            }
        });
        return indicator;
   }
}
