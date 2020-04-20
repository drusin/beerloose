import disco_dancer_png from './../assets/sprites/Disco.png';
import { createSpriteObject, SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

const frames = {
    'disco-dancer-turn': { start: 0, end: 10 },
    'disco-dancer-up': { start: 10, end: 18 },
    'disco-dancer-up-down': { start: 18, end: 23 },
    'disco-dancer-walking': { start: 24, end: 27 }
}

const spriteSheets = {
    'disco-dancer-spritesheet': { img: disco_dancer_png }
}

export const discoDancer = {
 
    ...createSpriteObject({
        spriteSheets,
        frames
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'disco-dancer-spritesheet').setOrigin(0, 0).setScale(SPRITE_SCALE_FACTOR);
    }
}    
    
