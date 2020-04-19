import { DANCEFLOOR_BOUNDING_BOX } from '../GameScene.js';
import { randomItemFromArray } from '../util.js';

export function generateRandomDirection() {
    const directionValuesOnOneAxis = [-1, 0, 1];
    return {
        x: randomItemFromArray(directionValuesOnOneAxis),
        y: randomItemFromArray(directionValuesOnOneAxis),
    };
}
