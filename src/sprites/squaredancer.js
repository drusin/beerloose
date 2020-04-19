import squaredancer_png from './../assets/sprites/Squaredance.png';
import { createSpriteObject } from './sprite-creator-factory';

const frames = {
    'squaredancer-clap': { start: 0, end: 6 },
    'squaredancer-left-right': { start: 6, end: 14 },
}

const spriteSheets = {
    'squaredancer-spritesheet': { img: squaredancer_png }
}

export const squaredancer = {
 
    ...createSpriteObject({
        spriteSheets,
        frames
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'squaredancer-spritesheet');
    }
}    
    
