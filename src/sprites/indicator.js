import indicator_png from './../assets/sprites/Indicator.png';
import { createSpriteObject } from './sprite-creator-factory';

const frames = {
    'indicator-player': { start: 0, end: 1 },
    'indicator-good': { start: 2, end: 3 },
    'indicator-medium': { start: 4, end: 5 },
    'indicator-bad': { start: 6, end: 7 },
    'indicator-leaving': { start: 8, end: 9 }
}

const spriteSheets = {
    'indicator-spritesheet': { img: indicator_png }
}

export const indicator = {
 
    ...createSpriteObject({
        spriteSheets,
        frames,
        frameDimensions: {
            frameWidth: 16,
            frameHeight: 16,
        }
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'indicator-spritesheet');
    }
}    
    
