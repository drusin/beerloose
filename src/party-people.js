import { 
    createDiscoDancer, 
    createMetalDancer, 
    createSquaredanceDancer
} from './entities';
import { generateRandomPositionOnDanceFloor } from './util.js';

export function createPartyPeople() {
    return {
        partyPeople: [],
        initialize: function ({ scene, dancerCount = 20 }) {
            for (let i = 0; i < dancerCount; i++) {
                const dancer = generateRandomDancer();
                dancer.createSprite({
                    scene,
                    x: (150 + (i%5) * 70),
                    y: (100 + Math.floor(i/5) * 50) 
                });
                this.partyPeople.push(dancer);
            }
        },
        update: function (delta) {
            this.partyPeople.forEach(person => person.updateMovement());
            this.partyPeople.forEach(person => person.updateAnimation({ delta }));
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
