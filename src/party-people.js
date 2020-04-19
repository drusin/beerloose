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
                    ...generateRandomPositionOnDanceFloor(),
                });
                partyPeople.push(dancer);
            }
        },
        update: function () {
            partyPeople.forEach(person => person.updateMovement());
        },
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

function generateRandomPositionOnDanceFloor() {
    const { x1, x2, y1, y2 } = { x1: 100, x2: 615, y1: 45, y2: 360 };
    return {
        x: generateRandomInteger({ minInclusive: x1, maxExclusive: x2 }),
        y: generateRandomInteger({ minInclusive: y1, maxExclusive: y2 }),
    };
}

function generateRandomInteger({
    minInclusive = 0,
    maxExclusive
}) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
}
