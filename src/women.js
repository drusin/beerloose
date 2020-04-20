import { 
    createGal,
} from './entities';

function step( destX, destY, name) {
    return { destX, destY, name };
}

export function createWomen() {
    const women = [];
    return {
        women,
        initialize: function ({ scene }) {
            women.push(createWoman({
                scene,
                type: 1,
                x: 20,
                y: 130,
                escapeRoute: {
                    0: step(10, 380, '1-gal-leave'),
                    1: step(210, 320, '1-gal-leave'),
                    2: step(210, 600, '1-gal-leave')
                }
            }));
            women.push(createWoman({
                scene,
                type: 2,
                x: 100,
                y: 70,
                escapeRoute: {
                    0: step(100, 310, '2-gal-leave'),
                    1: step(210, 310, '2-gal-leave'),
                    2: step(210, 600, '2-gal-leave')
                }
            }));
            women.push(createWoman({
                scene,
                type: 3,
                x: 200,
                y: 30,
                escapeRoute: {
                    0: step(90, 30, '3-gal-leave'),
                    1: step(90, 310, '3-gal-leave'),
                    2: step(210, 310, '3-gal-leave'),
                    3: step(210, 600, '3-gal-leave')
                }
            }));
            women.push(createWoman({
                scene,
                type: 4,
                x: 110,
                y: 270,
                escapeRoute: {
                    0: step(210, 270, '4-gal-leave'),
                    1: step(210, 310, '4-gal-leave'),
                    2: step(210, 600, '4-gal-leave')
                }
            }));
        },
        update({ delta, player, physics, sfx }) {
            women.forEach(person => person.updateMovement({ physics }));
            women.forEach(person => person.updateAnimation({ delta }));
            women.forEach(person => person.handleCollisions({ physics, player, sfx }));
        },
        getTotalHappiness() {
            return women.reduce((acc, woman) => acc += woman.getHappiness(), 0) / women.length;
        }
    };
}

function createWoman({ scene, type, x, y, escapeRoute }) {
    const woman = createGal({ type, escapeRoute });
    woman.createSprite({ scene, x, y });
    return woman;
}
