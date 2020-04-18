import disco_dancer_png from './../assets/Disco.png';
import { createSpriteObject } from './sprite-creator-factory';

const frames = {
    'disco-dancer-turn': { start: 0, end: 9 },
    'disco-dancer-up': { start: 10, end: 17 },
    'disco-dancer-up-down': { start: 18, end: 22 }
}

export const discoDancer = {
 
    ...createSpriteObject({
        spriteSheet: disco_dancer_png,
        frames,
        spriteSheetKey: 'disco-dancer-spritesheet'
    }), 
    create: ({ scene, x, y }) => {
        return scene.physics.add.sprite(x, y, 'disco-dancer-spritesheet');
    }
}    
    
