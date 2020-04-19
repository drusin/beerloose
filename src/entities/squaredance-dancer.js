import { squaredancer } from '../sprites';

export function createSquaredanceDancer() {
    return {
        sprite: {},
        createSprite: function({ scene, x, y }) {
            this.sprite = squaredancer.create({ scene, x, y });
            this.sprite.setSize(8, 16, false);
            this.sprite.setOffset(4, 16);
        },
        updateMovement() {
            //moves just in 90° angles (not diagonal)
            const baseSpeed = 30;

            const rand = Math.random();
            if (rand < 0.03) {
                // change direction
                const rand = Math.random();
                if (rand < 0.25) {
                    this.sprite.setVelocityX(-baseSpeed);
                    this.sprite.setVelocityY(0);
                }
                else if (0.25 <= rand && rand < 0.5) {
                    this.sprite.setVelocityX(baseSpeed);
                    this.sprite.setVelocityY(0);
                }
                else if (0.5 <= rand && rand < 0.75) {
                    this.sprite.setVelocityX(0);
                    this.sprite.setVelocityY(-baseSpeed);
                }
                else if (0.75 <= rand && rand < 1) {
                    this.sprite.setVelocityX(0);
                    this.sprite.setVelocityY(baseSpeed);
                }
            }
            else if (0.03 < rand && rand < 0.95) {
                // continue moving in current direction
            }
            else {
                // stop
                this.sprite.setVelocityX(0);
                this.sprite.setVelocityY(0);
            }
            this.sprite.setDepth(this.sprite.y);
        },
        updateAnimation() {
            const velocity = this.sprite.body.velocity;
            if (velocity.x === 0 && velocity.y === 0) {
                this.sprite.anims.play('squaredancer-clap', true);
            }
            else {
                this.sprite.anims.play('squaredancer-left-right', true);
            }
        },
    };
}
