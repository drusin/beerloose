import { DANCEFLOOR_BOUNDING_BOX } from './GameScene.js';
import { DEFAULT_SPRITE_DIMENSIONS } from './sprites/sprite-creator-factory.js';


export function generateRandomPositionOnDanceFloor() {
    const { left, right, top, bottom } = DANCEFLOOR_BOUNDING_BOX;
    return {
        x: generateRandomInteger({ 
            minInclusive: left, 
            maxExclusive: right - DEFAULT_SPRITE_DIMENSIONS.width, 
        }),
        y: generateRandomInteger({ 
            minInclusive: top - DEFAULT_SPRITE_DIMENSIONS.height, 
            maxExclusive: bottom - DEFAULT_SPRITE_DIMENSIONS.height,
        }),
    };
}

export function generateRandomInteger({
    minInclusive = 0,
    maxExclusive
}) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
}