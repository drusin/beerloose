import { 
    createGal,
} from './entities';
import { generateRandomPositionWithinRect } from './util.js';

export function createWomen() {
    const women = [];
    return {
        women,
        initialize: function ({ scene }) {
            women.push(createWoman({
                scene,
                type: 1,
                ...generateRandomPositionWithinRect({ left: 70, right: 140, top: 365, bottom: 380 })
            }));
            women.push(createWoman({
                scene,
                type: 2,
                ...generateRandomPositionWithinRect({ left: 70, right: 140, top: 350, bottom: 365 })
            }));
            women.push(createWoman({
                scene,
                type: 3,
                ...generateRandomPositionWithinRect({ left: 70, right: 140, top: 335, bottom: 350 })
            }));
            women.push(createWoman({
                scene,
                type: 3,
                ...generateRandomPositionWithinRect({ left: 70, right: 140, top: 320, bottom: 335 })
            }));
        },
        update: function (delta) {
            women.forEach(person => person.updateAnimation(delta));
        },
    };
}

function createWoman({ scene, type, x, y }) {
    const woman = createGal({ type });
    woman.createSprite({ scene, x, y });
    return woman;
}
