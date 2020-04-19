import { 
    createDiscoDancer, 
    createMetalDancer, 
    createSquaredanceDancer
} from './entities';
import { generateRandomPositionOnDanceFloor } from './util.js';

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
