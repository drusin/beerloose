import { squaredancer } from '../sprites';

const danceRoutine = {
    0: step(2000, 0, -1, 'squaredancer-left-right'),
    1: step(1000, 0, 0, 'squaredancer-clap'),
    2: step(2000, 0, 1, 'squaredancer-left-right'),
    3: step(1000, 0, 0, 'squaredancer-clap'),
    4: step(2000, 1, 0, 'squaredancer-left-right'),
    5: step(1000, 0, 0, 'squaredancer-clap'),
    6: step(2000, -1, 0, 'squaredancer-left-right'),
    7: step(1000, 0, 0, 'squaredancer-clap')
}

function step(millis, dirX, dirY, name) {
    return { millis, dirX, dirY, name };
}

const baseSpeed = 30;

export function createSquaredanceDancer() {
    return {
        createSprite: function({ scene, x, y }) {
            this.sprite = squaredancer.create({ scene, x, y });
            this.sprite.setSize(6, 12, false);
            this.sprite.setOffset(4, 16);
            this.danceStep = 0;
            this.delta_counter = 0;
        },
        updateMovement() {
            if (danceRoutine[this.danceStep].millis < this.delta_counter) {
                this.delta_counter = 0;
                this.danceStep = (this.danceStep + 1) % Object.keys(danceRoutine).length;
                this.sprite.setVelocityX(baseSpeed * danceRoutine[this.danceStep].dirX);
                this.sprite.setVelocityY(baseSpeed * danceRoutine[this.danceStep].dirY);
                this.sprite.anims.play(danceRoutine[this.danceStep].name);
            }
        },
        updateAnimation({ delta }) {
            this.delta_counter += delta;

            const velocity = this.sprite.body.velocity;

            this.sprite.flipX = velocity.x < 0;
            this.sprite.setDepth(100 + this.sprite.y);
        }
    };
}
