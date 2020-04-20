import { dj, SPRITE_SCALE_FACTOR } from '../sprites'
export function createDj() {
    return {
        createSprite: function({ scene, x, y }) {
            this.sprite = dj.create({ scene, x, y });
        },
        update: function({ physics, player }) {
            this.handleCollisions({ physics, player })
        },
        handleCollisions: function({ physics, player }) {
            physics.overlap( 
                player.sprite, 
                this.sprite,
                () => {
                    if (!player.beer.amount) {
                        return;
                    }
                    this.sprite.anims.play('dj-drink', true);
                    const ref = this;
                    player.beer.chug();
                    this.sprite.on('animationcomplete', function () {
                        ref.sprite.anims.play('dj-play', true);
                    }, this.sprite);
                    console.log('little easter egg')
                });
        },
        play: function() {
            this.sprite.anims.play('dj-play', true)
        }
    };
}