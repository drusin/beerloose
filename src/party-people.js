import { 
    createDiscoDancer, 
    createMetalDancer, 
    createSquaredanceDancer
} from './entities';

const spots = [];
const MILLIS_TILL_SPAWN = 20000;

function initSpots(rows, cols, xOffset = 150, yOffset = 80, xDist = 60, yDist = 40) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            spots.push({
                x: xOffset + c * xDist,
                y: yOffset + r * yDist,
            })
        }
    }
}

function getRandomSpot() {
    const index = Math.floor(Math.random() * spots.length);
    return spots.splice(index, 1)[0];
}

export function createPartyPeople() {
    return {
        partyPeople: [],
        initialize: function ({ scene, dancerCount = 4 }) {
            initSpots(5, 6);
            this.current_delta = 0;
            this.scene = scene;
            for (let i = 0; i < dancerCount; i++) {
                this.spawnDancer();
            }
        },
        spawnDancer() {
            const dancer = generateRandomDancer();
            const spot = getRandomSpot();
            dancer.createSprite({
                scene: this.scene,
                x: spot.x,
                y: spot.y 
            });
            this.partyPeople.push(dancer);
        },
        update: function (delta) {
            this.current_delta += delta;
            if (spots.length && this.current_delta > MILLIS_TILL_SPAWN) {
                this.current_delta = 0;
                this.spawnDancer();
            }
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
