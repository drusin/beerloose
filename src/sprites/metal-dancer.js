import metal_dancer_png from './../assets/Metal.png';
import { createSpriteObject } from './sprite-creator-factory';

const frames = {
    'metal-dancer-headbang': { start: 0, end: 7 },
    'metal-dancer-jump': { start: 8, end: 12 },
}

export const metalDancer = {
 
    ...createSpriteObject({
        spriteSheet: metal_dancer_png,
        frames,
        spriteSheetKey: 'metal-dancer-spritesheet'
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'metal-dancer-spritesheet');
    }
}    
    
