import bartender_png from './../assets/sprites/Bartender.png';
import { createSpriteObject, SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

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
        frames,
        frameDimensions: {
            frameWidth: 32,
            frameHeight: 32,
        }
    }), 
    create: ({ scene, x, y }) => {
        let sprite = scene.physics.add.sprite(x, y, 'bartender-spritesheet').setOrigin(0, 0).setScale(SPRITE_SCALE_FACTOR);
        sprite.flipX = true;
        return sprite;
    }
}    
    
