import { 
    createGal,
} from './entities';
import { generateRandomPositionOnDanceFloor } from './utils.js';

export function createWomen() {
    const women = [];
    return {
        women,
        initialize: function ({ scene, womenCount = 20 }) {
            for (let i = 0; i < womenCount; i++) {
                const gal = createGal();
                gal.createSprite({
                    scene,
                    ...generateRandomPositionOnDanceFloor(),
                });
                women.push(dancer);
            }
        },
        update: function (delta) {
            women.forEach(person => person.updateAnimation(delta));
        },
    };
}
