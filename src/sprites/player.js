import no_beer_player from './../assets/sprites/NoBeer.png';
import left_beer_player from './../assets/sprites/LeftBeer.png';
import right_beer_player from './../assets/sprites/RightBeer.png';
import two_beers_player from './../assets/sprites/TwoBeers.png';
import { createSpriteObject, SPRITE_SCALE_FACTOR } from './sprite-creator-factory';

const frames = {
    'player-talking': { start: 0, end: 3 },
    'player-drop': { start: 3, end: 7 },
    'player-idle': { start: 7, end: 10 },
    'player-walking': { start: 10, end: 14 }
}

const spriteSheets = {
    'player-no-beer-spritesheet': { img: no_beer_player, prefix: 'no_beer' },
    'player-left-beer-spritesheet': { img: left_beer_player, prefix: 'left_beer' },
    'player-right-beer-spritesheet': { img: right_beer_player, prefix: 'right_beer' },
    'player-two-beers-spritesheet': { img: two_beers_player, prefix: 'two_beers' }
}

export const player = {
 
    ...createSpriteObject({
        spriteSheets,
        frames
    }), 
    create: ({ scene, x, y, sheet }) => {
        return scene.physics.add.sprite(x, y, sheet).setScale(SPRITE_SCALE_FACTOR);
    }
}    
    
