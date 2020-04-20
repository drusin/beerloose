import dj_png from './../assets/sprites/DJ.png';
import { createSpriteObject, SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

const frames = {
    'dj-play': { start: 0, end: 12 },
    'dj-drink': { start: 13, end: 20 }
}

const spriteSheets = {
    'dj-spritesheet': { img: dj_png }
}

export const dj = {
 
    ...createSpriteObject({
        spriteSheets,
        frames,
        frameDimensions: {
            frameWidth: 32,
            frameHeight: 32,
        }
    }), 
    create: ({ scene, x, y }) => {
        const sprite = scene.physics.add.sprite(x, y, 'dj-spritesheet').setOrigin(0, 0).setScale(SPRITE_SCALE_FACTOR);
        sprite.setDepth(100 + sprite.y + 15); //manual correction
        return sprite;
    }
}    
    
