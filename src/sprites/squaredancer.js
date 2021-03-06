import squaredancer_png from './../assets/sprites/Squaredance.png';
import { createSpriteObject, SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

const frames = {
    'squaredancer-clap': { start: 0, end: 6 },
    'squaredancer-left-right': { start: 6, end: 14 },
    'squaredancer-walking': { start: 15, end: 19 },
}

const spriteSheets = {
    'squaredancer-spritesheet': { img: squaredancer_png }
}

export const squaredancer = {
 
    ...createSpriteObject({
        spriteSheets,
        frames,
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'squaredancer-spritesheet').setOrigin(0, 0).setScale(SPRITE_SCALE_FACTOR);
    }
}    
    
