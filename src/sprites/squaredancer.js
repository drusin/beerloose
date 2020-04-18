import squaredancer_png from './../assets/Squaredance.png';
import { createSpriteObject } from './sprite-creator-factory';

const frames = {
    'squaredancer-clap': { start: 0, end: 5 },
    'squaredancer-left-right': { start: 6, end: 13 },
}

export const squaredancer = {
 
    ...createSpriteObject({
        spriteSheet: squaredancer_png,
        frames,
        spriteSheetKey: 'squaredancer-spritesheet'
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'squaredancer-spritesheet');
    }
}    
    
