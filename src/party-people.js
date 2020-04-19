import { createDiscoDancer } from './entities/disco-dancer.js';
import { createMetalDancer } from './entities/metal-dancer.js';
import { createSquaredanceDancer } from './entities/squaredance-dancer.js';

export function createPartyPeople() {
    const partyPeople = [];
    return {
        partyPeople,
        initialize: function ({ scene, dancerCount = 20 }) {
            for (let i = 0; i < dancerCount; i++) {
                const dancer = generateRandomDancer();
                dancer.createSprite({
                    scene,
                    ...generateRandomPositionOnDanceFloor({ scene }),
                });
                partyPeople.push(dancer);
            }
        }
    };
}

function generateRandomDancer() {
    const rand = Math.random();
    if (rand < 0.33) {
        return createMetalDancer();
    }
    if (rand < 0.66) {
        return createSquaredanceDancer();
    }
    if (rand < 1) {
        return createDiscoDancer();
    }
}

function generateRandomPositionOnDanceFloor({ scene }) {
    const { width, height } = scene.sys.game.canvas;
    const PADDING = 20;
    return {
        x: generateRandomInteger({ minInclusive: PADDING, maxExclusive: width - PADDING }),
        y: generateRandomInteger({ minInclusive: PADDING, maxExclusive: height - PADDING }),
    };
}

function generateRandomInteger({
    minInclusive = 0,
    maxExclusive
}) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
}
