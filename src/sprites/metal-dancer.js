import metal_dancer_png from './../assets/sprites/Metal.png';
import { createSpriteObject, SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

const frames = {
    'metal-dancer-headbang': { start: 0, end: 8 },
    'metal-dancer-jump': { start: 8, end: 13 },
}

const spriteSheets = {
    'metal-dancer-spritesheet': { img: metal_dancer_png }
}

export const metalDancer = {
 
    ...createSpriteObject({
        spriteSheets,
        frames
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'metal-dancer-spritesheet').setOrigin(0, 0).setScale(SPRITE_SCALE_FACTOR);
    }
}    
    
