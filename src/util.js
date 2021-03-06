import { DANCEFLOOR_BOUNDING_BOX } from './GameScene.js';
import { DEFAULT_SPRITE_DIMENSIONS } from './sprites/sprite-creator-factory.js';


export function generateRandomPositionOnDanceFloor() {
    return generateRandomPositionWithinRect(DANCEFLOOR_BOUNDING_BOX);
}

export function generateRandomPositionWithinRect({ left, right, top, bottom }) {
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

export function randomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomInteger({
    minInclusive = 0,
    maxExclusive
}) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
}