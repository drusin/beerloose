import bump_into_persons_1b from './assets/sfx/bump-into-persons-1b.ogg';
import pouring_1 from './assets/sfx/pouring-1.ogg';
import satisfied_customer_1 from './assets/sfx/satisfied-customer-1.ogg';
import satisfied_customer_2 from './assets/sfx/satisfied-customer-2-merci.ogg';
import satisfied_customer_3 from './assets/sfx/satisfied-customer-3-idtakeanotherone.ogg';
import satisfied_customer_4 from './assets/sfx/satisfied-customer-4-somehowAlreadyEmpty.ogg';
import satisfied_customer_5 from './assets/sfx/satisfied-customer-5-merci.ogg';
import satisfied_customer_6 from './assets/sfx/satisfied-customer-6-gracias.ogg';
import satisfied_customer_7 from './assets/sfx/satisfied-customer-7-unAutre.ogg';
import satisfied_customer_8 from './assets/sfx/satisfied-customer-8-unAutre2.ogg';
import satisfied_customer_9 from './assets/sfx/satisfied-customer-9-dankeschae.ogg';
import satisfied_customer_10 from './assets/sfx/satisfied-customer-10-itsEmpty.ogg';
import satisfied_customer_11 from './assets/sfx/satisfied-customer-11-thanks.ogg';
import satisfied_customer_12 from './assets/sfx/satisfied-customer-12-thanks.ogg';
import satisfied_customer_13 from './assets/sfx/satisfied-customer-13-bringmeAnotherOne.ogg';
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
            scene.load.audio('satisfied-customer-2', satisfied_customer_2);
            scene.load.audio('satisfied-customer-3', satisfied_customer_3);
            scene.load.audio('satisfied-customer-4', satisfied_customer_4);
            scene.load.audio('satisfied-customer-5', satisfied_customer_5);
            scene.load.audio('satisfied-customer-6', satisfied_customer_6);
            scene.load.audio('satisfied-customer-7', satisfied_customer_7);
            scene.load.audio('satisfied-customer-8', satisfied_customer_8);
            scene.load.audio('satisfied-customer-9', satisfied_customer_9);
            scene.load.audio('satisfied-customer-10', satisfied_customer_10, { volume: 1.5 });
            scene.load.audio('satisfied-customer-11', satisfied_customer_11, { volume: 1.5 });
            scene.load.audio('satisfied-customer-12', satisfied_customer_12, { volume: 1.5 });
            scene.load.audio('satisfied-customer-13', satisfied_customer_13, { volume: 1.5 });
            scene.load.audio('beer-opening-1', beer_opening_1);
            scene.load.audio('beer-opening-2', beer_opening_2);
        },
        create: function () {
            sounds.bumpIntoPerson1 = scene.sound.add('bump-into-person-1');
            sounds.pouring1 = scene.sound.add('pouring-1');
            sounds.satisfied1 = scene.sound.add('satisfied-customer-1');
            sounds.satisfied2 = scene.sound.add('satisfied-customer-2');
            sounds.satisfied3 = scene.sound.add('satisfied-customer-3');
            sounds.satisfied4 = scene.sound.add('satisfied-customer-4');
            sounds.satisfied5 = scene.sound.add('satisfied-customer-5');
            sounds.satisfied6 = scene.sound.add('satisfied-customer-6');
            sounds.satisfied7 = scene.sound.add('satisfied-customer-7');
            sounds.satisfied8 = scene.sound.add('satisfied-customer-8');
            sounds.satisfied9 = scene.sound.add('satisfied-customer-9');
            sounds.satisfied10 = scene.sound.add('satisfied-customer-10');
            sounds.satisfied11 = scene.sound.add('satisfied-customer-11');
            sounds.satisfied12 = scene.sound.add('satisfied-customer-12');
            sounds.satisfied13 = scene.sound.add('satisfied-customer-13');
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
            const choices = [
                sounds.satisfied1,
                sounds.satisfied3,
                sounds.satisfied4,
                sounds.satisfied5,
                sounds.satisfied6,
                sounds.satisfied9,
                sounds.satisfied10,
                sounds.satisfied11,
                sounds.satisfied12,
                sounds.satisfied13,
                sounds.satisfied11,
            ];
            return playRandomSound({ choices });
        },
        satisfiedCustomerFrench: function() {
            const choices = [sounds.satisfied2, sounds.satisfied5, sounds.satisfied7, sounds.satisfied8];
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