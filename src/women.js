import { 
    createGal,
} from './entities';

export function createWomen() {
    const women = [];
    return {
        women,
        initialize: function ({ scene }) {
            women.push(createWoman({
                scene,
                type: 1,
                x: 20,
                y: 130
            }));
            women.push(createWoman({
                scene,
                type: 2,
                x: 100,
                y: 70
            }));
            women.push(createWoman({
                scene,
                type: 3,
                x: 200,
                y: 30
            }));
            women.push(createWoman({
                scene,
                type: 4,
                x: 110,
                y: 270
            }));
        },
        update: function ({ delta, player, physics, sfx }) {
            women.forEach(person => person.updateAnimation({ delta }));
            women.forEach(person => person.handleCollisions({ physics, player, sfx }));
        },
    };
}

function createWoman({ scene, type, x, y }) {
    const woman = createGal({ type });
    woman.createSprite({ scene, x, y });
    return woman;
}
