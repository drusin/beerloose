import bump_into_persons_1b from './assets/sfx/bump-into-persons-1b.ogg';
import pouring_1 from './assets/sfx/pouring-1.ogg';
import satisfied_customer_1 from './assets/sfx/satisfied-customer-1.ogg';
import beer_opening_1 from './assets/sfx/beer-opening.ogg';
import beer_opening_2 from './assets/sfx/beer-opening-2.ogg';
import { randomItemFromArray } from './util.js';

export function Sound({ scene }) {
    const sounds = {};
    return {
        preload: function () {
            scene.load.audio('bump-into-person-1', bump_into_persons_1b);
            scene.load.audio('pouring-1', pouring_1);
            scene.load.audio('satisfied-customer-1', satisfied_customer_1);
            scene.load.audio('beer-opening-1', beer_opening_1);
            scene.load.audio('beer-opening-2', beer_opening_2);
        },
        create: function () {
            sounds.bumpIntoPerson1 = scene.sound.add('bump-into-person-1');
            sounds.pouring1 = scene.sound.add('pouring-1');
            sounds.satisfied1 = scene.sound.add('satisfied-customer-1');
            sounds.beerOpening1 = scene.sound.add('beer-opening-1');
            sounds.beerOpening2 = scene.sound.add('beer-opening-2');
        },
        bumpIntoPerson: function () {
            const choices = [sounds.bumpIntoPerson1];
            return playRandomSound({ choices });
        },
        pouringBeer: function() {
            const choices = [sounds.pouring1];
            return playRandomSound({ choices });
        },
        satisfiedCustomer: function() {
            const choices = [sounds.satisfied1];
            return playRandomSound({ choices });
        },
        beerOpening: function() {
            const choices = [sounds.beerOpening1, sounds.beerOpening2];
            return playRandomSound({ choices });
        },
    };
}

function playRandomSound({ choices }) {
    if (choices.some(s => s.isPlaying)) return;
    const chosen = randomItemFromArray(choices)
    chosen.play();
    return chosen;
}