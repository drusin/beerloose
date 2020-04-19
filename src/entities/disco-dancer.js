import { discoDancer } from '../sprites';

const danceRoutine = {
    0: step(2000, -1, 1, 'disco-dancer-up-down'),
    1: step(1000, 0, 0, 'disco-dancer-turn'),
    2: step(2000, 1, -1, 'disco-dancer-up-down'),
    3: step(1000, 0, 0, 'disco-dancer-turn'),
    4: step(2000, -1, -1, 'disco-dancer-up-down'),
    5: step(1000, 0, 0, 'disco-dancer-turn'),
    6: step(2000, 1, 1, 'disco-dancer-up-down'),
    7: step(1000, 0, 0, 'disco-dancer-turn'),
}

function step(millis, dirX, dirY, name) {
    return { millis, dirX, dirY, name };
}

const baseSpeed = 30;

export function createDiscoDancer() {
    return {
        createSprite: function({ scene, x, y }) {
            this.sprite = discoDancer.create({ scene, x, y });
            this.sprite.setSize(8, 16, false);
            this.sprite.setOffset(4, 16);
            this.danceStep = Math.round(Math.random() * Object.keys(danceRoutine).length);
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
            this.sprite.setDepth(this.sprite.y);
        }
    };
}