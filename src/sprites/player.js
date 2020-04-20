import player_png from './../assets/sprites/Guy.png';
import { createSpriteObject, SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

const frames = {
    'no-beer-player-talking': { start: 0, end: 2 },
    'no-beer-player-drop': { start: 3, end: 6 },
    'no-beer-player-idle': { start: 7, end: 9 },
    'no-beer-player-walking': { start: 10, end: 14 },
    'beer-player-talking': { start: 14, end: 17 },
    'beer-player-drop': { start: 17, end: 23 },
    'beer-player-idle': { start: 23, end: 25 },
    'beer-player-walking': { start: 25, end: -1 }
}

const spriteSheets = {
    'player-spritesheet': { img: player_png }
}

export const player = {
 
    ...createSpriteObject({
        spriteSheets,
        frames
    }), 
    create: ({ scene, x, y, sheet }) => {
        return scene.physics.add.sprite(x, y, sheet).setOrigin(0, 0).setScale(SPRITE_SCALE_FACTOR);
    }
}    
    
