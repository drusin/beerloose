import gal_1_png from './../assets/sprites/Gal-1.png';
import gal_2_png from './../assets/sprites/Gal-2.png';
import { createSpriteObject } from './sprite-creator-factory';

const frames = {
    'gal-drink': { start: 0, end: 15 },
    'gal-hair': { start: 15, end: 21 }
}

const spriteSheets = {
    'gal1-spritesheet': { img: gal_1_png, prefix: '1' },
    'gal2-spritesheet': { img: gal_2_png, prefix: '2' }
}

export const gal = {
 
    ...createSpriteObject({
        spriteSheets,
        frames
    }), 
    create: ({ scene, x, y, number = 1 }) => {
        return scene.physics.add.sprite(x, y, `gal${number}-spritesheet`);
    }
}    
    
