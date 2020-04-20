import gal_1_png from './../assets/sprites/Gal-1.png';
import gal_2_png from './../assets/sprites/Gal-2.png';
import gal_3_png from './../assets/sprites/Gal-3.png';
import gal_4_png from './../assets/sprites/Gal-4.png';
import { createSpriteObject, SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

const frames = {
    'gal-drink': { start: 0, end: 16 },
    'gal-hair': { start: 16, end: 21 },
    'gal-leave': { start: 4, end: 7 }
}

const spriteSheets = {
    'gal1-spritesheet': { img: gal_1_png, prefix: '1' },
    'gal2-spritesheet': { img: gal_2_png, prefix: '2' },
    'gal3-spritesheet': { img: gal_3_png, prefix: '3' },
    'gal4-spritesheet': { img: gal_4_png, prefix: '4' }
}

export const gal = {
 
    ...createSpriteObject({
        spriteSheets,
        frames
    }), 
    create: ({ scene, x, y, number = 1 }) => {
        return scene.physics.add.sprite(x, y, `gal${number}-spritesheet`).setOrigin(0, 0).setScale(SPRITE_SCALE_FACTOR);
    }
}    
    
