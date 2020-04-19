import { discoDancer } from '../sprites';
import { correctMovement, generateRandomDirection } from './utils.js';

export function createDiscoDancer() {
    return {
        sprite: {},
        createSprite: function({ scene, x, y }) {
            this.sprite = discoDancer.create({ scene, x, y });
            this.sprite.setSize(8, 16, false);
            this.sprite.setOffset(4, 16);
        },
        updateMovement() {
            // moves in all directions (also funky diagonals)
            const baseSpeed = 30;

            const rand = Math.random();
            if (rand < 0.03) {
                // change direction
                const direction = generateRandomDirection();
                this.sprite.setVelocityX(baseSpeed * direction.x);
                this.sprite.setVelocityY(baseSpeed * direction.y);
            }
            else if (0.03 < rand && rand < 0.95) {
                // continue moving in current direction
            }
            else {
                // stop
                this.sprite.setVelocityX(0);
                this.sprite.setVelocityY(0);
            }

            correctMovement({ sprite: this.sprite });
        },
        updateAnimation() {
            const velocity = this.sprite.body.velocity;
            if (velocity.x === 0 && velocity.y === 0) {
                this.sprite.anims.play('disco-dancer-turn', true);
            }
            else {
                this.sprite.anims.play('disco-dancer-up-down', true);
            }

            this.sprite.flipX = velocity.x < 0;
        },
    };
}