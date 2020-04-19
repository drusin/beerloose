import bartender_png from './../assets/sprites/Bartender.png';
import { createSpriteObject } from './sprite-creator-factory';

const frames = {
    'bartender-tab': { start: 0, end: 15 },
    'bartender-talking': { start: 15, end: 19 }
}

const spriteSheets = {
    'bartender-spritesheet': { img: bartender_png }
}

export const bartender = {
 
    ...createSpriteObject({
        spriteSheets,
        frames
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'bartender-spritesheet');
    }
}    
    
