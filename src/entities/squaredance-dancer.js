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

const wayIn = walkstep(210, 320);

function walkstep( destX, destY) {
    return { destX, destY};
}

const baseSpeed = 30;

export function createSquaredanceDancer() {
    return {
        createSprite: function({ scene, x, y, destination = undefined }) {
            this.sprite = squaredancer.create({ scene, x, y });
            this.sprite.setSize(6, 12, false);
            this.sprite.setOffset(4, 16);
            this.danceStep = 0;
            this.delta_counter = 0;
            if (destination) {
                this.walkPath = [ wayIn, walkstep(destination.x, destination.y) ];
            }
        },
        updateMovement({ physics }) {
            if (this.nextStep || this.walkPath && this.walkPath.length) {
                this.nextStep = this.nextStep ? this.nextStep : this.walkPath.shift();
                if (Math.abs(this.nextStep.destX - this.sprite.body.x) < 16 && Math.abs(this.nextStep.destY - this.sprite.body.y) < 32) {
                    this.sprite.setVelocityX(0);
                    this.sprite.setVelocityY(0);
                    this.nextStep = undefined;
                }
                else {
                    this.sprite.anims.play('squaredancer-left-right', true);
                    this.sprite.flipX = this.sprite.body.velocity.x < 0;
                    physics.moveTo(this.sprite, this.nextStep.destX, this.nextStep.destY, baseSpeed);
                }
                return;
            }
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
