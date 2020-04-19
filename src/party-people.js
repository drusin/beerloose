import { 
    createDiscoDancer, 
    createMetalDancer, 
    createSquaredanceDancer
} from './entities';
import { DANCEFLOOR_BOUNDING_BOX } from './GameScene.js';
import { DEFAULT_SPRITE_DIMENSIONS } from './sprites/sprite-creator-factory.js';

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
        update: function (delta) {
            partyPeople.forEach(person => person.updateMovement());
            partyPeople.forEach(person => person.updateAnimation(delta));
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

function generateRandomInteger({
    minInclusive = 0,
    maxExclusive
}) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
}
