import dancefloor_png from './../assets/sprites/Dancefloor.png';
import { createSpriteObject } from './sprite-creator-factory';

const frames = {
    'dancefloor': { start: 0, end: 10 }
}

const spriteSheets = {
    'dancefloor-spritesheet': { img: dancefloor_png }
}

export const dancefloor = {
 
    ...createSpriteObject({
        spriteSheets,
        frames,
        frameDimensions: {
            frameWidth: 128,
            frameHeight: 128
        }
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'dancefloor-spritesheet');
    }
}    
    
