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
                this.spawnDancer({ start: getRandomSpot()});
            }
        },
        spawnDancer({ start, destination = undefined}) {
            const dancer = generateRandomDancer();
            dancer.createSprite({
                scene: this.scene,
                x: start.x,
                y: start.y,
                destination 
            });
            this.partyPeople.push(dancer);
        },
        update: function ({ delta, physics }) {
            this.current_delta += delta;
            if (spots.length && this.current_delta > MILLIS_TILL_SPAWN) {
                this.current_delta = 0;
                this.spawnDancer({ 
                    start: {
                        x: Math.floor(Math.random() * 640),
                        y: 600
                    },
                    destination: getRandomSpot()
                });
            }
            this.partyPeople.forEach(person => person.updateMovement({ physics }));
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
