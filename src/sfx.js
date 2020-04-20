import bump_into_persons_1b from './assets/sfx/bump-into-persons-1b.ogg';
import pouring_1 from './assets/sfx/pouring-1.ogg';
import satisfied_customer_1 from './assets/sfx/satisfied-customer-1.ogg';
import { randomItemFromArray } from './util.js';

export function Sound({ scene }) {
    const sounds = {};
    return {
        preload: function () {
            scene.load.audio('bump-into-person-1', bump_into_persons_1b);
            scene.load.audio('pouring-1', pouring_1);
            scene.load.audio('satisfied-customer-1', satisfied_customer_1);
        },
        create: function () {
            sounds.bumpIntoPerson1 = scene.sound.add('bump-into-person-1');
            sounds.pouring1 = scene.sound.add('pouring-1');
            sounds.satisfied1 = scene.sound.add('satisfied-customer-1');
        },
        bumpIntoPerson: function () {
            const choices = [sounds.bumpIntoPerson1];
            if (choices.some(s => s.isPlaying)) return;
            randomItemFromArray(choices).play();
        },
        pouringBeer: function() {
            const choices = [sounds.pouring1];
            if (choices.some(s => s.isPlaying)) return;
            randomItemFromArray(choices).play();
        },
        satisfiedCustomer: function() {
            const choices = [sounds.satisfied1];
            if (choices.some(s => s.isPlaying)) return;
            randomItemFromArray(choices).play();
        },
    };
}