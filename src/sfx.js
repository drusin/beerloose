import bump_into_persons_1 from './assets/sfx/bump-into-persons-1-eyy-harsh.ogg';
import bump_into_persons_2 from './assets/sfx/aiii my foot.ogg';
import bump_into_persons_3 from './assets/sfx/hmm.ogg';
import bump_into_persons_4 from './assets/sfx/ouch.ogg';
import bump_into_persons_5 from './assets/sfx/scusi.ogg';
import bump_into_persons_6 from './assets/sfx/watch out partner.ogg';
import bump_into_persons_7 from './assets/sfx/yo man.ogg';
import bump_into_persons_8 from './assets/sfx/bump-into-persons-8-eyy.ogg';
import bump_into_persons_9 from './assets/sfx/bump-into-persons-9-notCoolMan.ogg';
import bump_into_persons_10 from './assets/sfx/bump-into-persons-10-heyBoyWatchOut.ogg';
import bump_into_persons_11 from './assets/sfx/bump-into-persons-11-heey.ogg';
import bump_into_persons_12 from './assets/sfx/bump-into-persons-12-whatAreYouDoingMan.ogg';
import pouring_1 from './assets/sfx/pouring-1.ogg';
import chatting_1 from './assets/sfx/chatting persons.ogg';
import bartender_2 from './assets/sfx/bartender-2-easyBoy.ogg';
import bartender_3 from './assets/sfx/bartender-3-thisOneIsForYouPal.ogg';
import bartender_4 from './assets/sfx/bartender-4-thisOneIsForYouMate.ogg';
import bartender_5 from './assets/sfx/bartender-5-youAreThirsty.ogg';
import bartender_6 from './assets/sfx/bartender-6-wowYouAreThirsty.ogg';
import bartender_7 from './assets/sfx/bartender-7-niceToSeeYouAgain.ogg';
import bartender_8 from './assets/sfx/bartender-8-oneTheHouse.ogg';
import bartender_9 from './assets/sfx/bartender-9-heyBob.ogg';
import bartender_10 from './assets/sfx/bartender-10-howisItGoingbob.ogg';
import bartender_11 from './assets/sfx/bartender-11-hangInTherePally.ogg';
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
import preferences from './preferences';

export function Sound({ scene }) {
    const sounds = {};
    return {
        preload: function () {
            scene.load.audio('bump-into-person-1', bump_into_persons_1);
            scene.load.audio('bump-into-person-2', bump_into_persons_2);
            scene.load.audio('bump-into-person-3', bump_into_persons_3);
            scene.load.audio('bump-into-person-4', bump_into_persons_4);
            scene.load.audio('bump-into-person-5', bump_into_persons_5);
            scene.load.audio('bump-into-person-6', bump_into_persons_6);
            scene.load.audio('bump-into-person-7', bump_into_persons_7);
            scene.load.audio('bump-into-person-8', bump_into_persons_8);
            scene.load.audio('bump-into-person-9', bump_into_persons_9);
            scene.load.audio('bump-into-person-10', bump_into_persons_10);
            scene.load.audio('bump-into-person-11', bump_into_persons_11);
            scene.load.audio('bump-into-person-12', bump_into_persons_12);
            scene.load.audio('pouring-1', pouring_1);
            scene.load.audio('chatting-1', chatting_1);
            scene.load.audio('bartender-2', bartender_2);
            scene.load.audio('bartender-3', bartender_3);
            scene.load.audio('bartender-4', bartender_4);
            scene.load.audio('bartender-5', bartender_5);
            scene.load.audio('bartender-6', bartender_6);
            scene.load.audio('bartender-7', bartender_7);
            scene.load.audio('bartender-8', bartender_8);
            scene.load.audio('bartender-9', bartender_9);
            scene.load.audio('bartender-10', bartender_10);
            scene.load.audio('bartender-11', bartender_11);
            scene.load.audio('satisfied-customer-1', satisfied_customer_1);
            scene.load.audio('satisfied-customer-2', satisfied_customer_2);
            scene.load.audio('satisfied-customer-3', satisfied_customer_3);
            scene.load.audio('satisfied-customer-4', satisfied_customer_4);
            scene.load.audio('satisfied-customer-5', satisfied_customer_5);
            scene.load.audio('satisfied-customer-6', satisfied_customer_6);
            scene.load.audio('satisfied-customer-7', satisfied_customer_7);
            scene.load.audio('satisfied-customer-8', satisfied_customer_8);
            scene.load.audio('satisfied-customer-9', satisfied_customer_9);
            scene.load.audio('satisfied-customer-10', satisfied_customer_10);
            scene.load.audio('satisfied-customer-11', satisfied_customer_11);
            scene.load.audio('satisfied-customer-12', satisfied_customer_12);
            scene.load.audio('satisfied-customer-13', satisfied_customer_13);
            scene.load.audio('beer-opening-1', beer_opening_1);
            scene.load.audio('beer-opening-2', beer_opening_2);
        },
        create: function () {
            const badMicAdjustmentConfig = (volume = 3) =>  ({ volume });
            sounds.bumpIntoPerson1 = scene.sound.add('bump-into-person-1', badMicAdjustmentConfig(1));
            sounds.bumpIntoPerson2 = scene.sound.add('bump-into-person-2');
            sounds.bumpIntoPerson3 = scene.sound.add('bump-into-person-3');
            sounds.bumpIntoPerson4 = scene.sound.add('bump-into-person-4');
            sounds.bumpIntoPerson5 = scene.sound.add('bump-into-person-5');
            sounds.bumpIntoPerson6 = scene.sound.add('bump-into-person-6');
            sounds.bumpIntoPerson7 = scene.sound.add('bump-into-person-7');
            sounds.bumpIntoPerson8 = scene.sound.add('bump-into-person-8', badMicAdjustmentConfig());
            sounds.bumpIntoPerson9 = scene.sound.add('bump-into-person-9', badMicAdjustmentConfig());
            sounds.bumpIntoPerson10 = scene.sound.add('bump-into-person-10', badMicAdjustmentConfig());
            sounds.bumpIntoPerson11 = scene.sound.add('bump-into-person-11', badMicAdjustmentConfig());
            sounds.bumpIntoPerson12 = scene.sound.add('bump-into-person-12', badMicAdjustmentConfig());
            sounds.pouring1 = scene.sound.add('pouring-1');
            sounds.chatting1 = scene.sound.add('chatting-1', { loop: true });
            sounds.bartender2 = scene.sound.add('bartender-2', badMicAdjustmentConfig(5));
            sounds.bartender3 = scene.sound.add('bartender-3', badMicAdjustmentConfig(5));
            sounds.bartender4 = scene.sound.add('bartender-4', badMicAdjustmentConfig(5));
            sounds.bartender5 = scene.sound.add('bartender-5', badMicAdjustmentConfig(5));
            sounds.bartender6 = scene.sound.add('bartender-6', badMicAdjustmentConfig(5));
            sounds.bartender7 = scene.sound.add('bartender-7', badMicAdjustmentConfig(5));
            sounds.bartender8 = scene.sound.add('bartender-8', badMicAdjustmentConfig(5));
            sounds.bartender9 = scene.sound.add('bartender-9', badMicAdjustmentConfig(5));
            sounds.bartender10 = scene.sound.add('bartender-10', badMicAdjustmentConfig(5));
            sounds.bartender11 = scene.sound.add('bartender-11', badMicAdjustmentConfig(5));
            sounds.satisfied1 = scene.sound.add('satisfied-customer-1', badMicAdjustmentConfig(5));
            sounds.satisfied2 = scene.sound.add('satisfied-customer-2', badMicAdjustmentConfig(5));
            sounds.satisfied3 = scene.sound.add('satisfied-customer-3', badMicAdjustmentConfig(5));
            sounds.satisfied4 = scene.sound.add('satisfied-customer-4', badMicAdjustmentConfig(5));
            sounds.satisfied5 = scene.sound.add('satisfied-customer-5', badMicAdjustmentConfig(5));
            sounds.satisfied6 = scene.sound.add('satisfied-customer-6', badMicAdjustmentConfig(5));
            sounds.satisfied7 = scene.sound.add('satisfied-customer-7', badMicAdjustmentConfig(5));
            sounds.satisfied8 = scene.sound.add('satisfied-customer-8', badMicAdjustmentConfig(5));
            sounds.satisfied9 = scene.sound.add('satisfied-customer-9', badMicAdjustmentConfig(5));
            sounds.satisfied10 = scene.sound.add('satisfied-customer-10', badMicAdjustmentConfig(5));
            sounds.satisfied11 = scene.sound.add('satisfied-customer-11', badMicAdjustmentConfig(5));
            sounds.satisfied12 = scene.sound.add('satisfied-customer-12', badMicAdjustmentConfig(5));
            sounds.satisfied13 = scene.sound.add('satisfied-customer-13', badMicAdjustmentConfig(5));
            sounds.beerOpening1 = scene.sound.add('beer-opening-1');
            sounds.beerOpening2 = scene.sound.add('beer-opening-2');
            this.adjustVolumeToPrefs();
        },
        adjustVolumeToPrefs() {
            Object.values(sounds).forEach(sound => sound.volume *= preferences.sfxVolume / 100);
        },
        bumpIntoPerson: function () {
            const choices = [
                sounds.bumpIntoPerson1,
                sounds.bumpIntoPerson2,
                sounds.bumpIntoPerson3,
                sounds.bumpIntoPerson4,
                sounds.bumpIntoPerson5,
                sounds.bumpIntoPerson6,
                sounds.bumpIntoPerson7,
                sounds.bumpIntoPerson8,
                sounds.bumpIntoPerson9,
                sounds.bumpIntoPerson10,
                sounds.bumpIntoPerson11,
                sounds.bumpIntoPerson12,
            ];
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
        indistinctChattingLoop: function() {
            const choices = [sounds.chatting1];
            return playRandomSound({ choices });
        },
        beerOpening: function() {
            const choices = [
                sounds.beerOpening1, 
                sounds.beerOpening2,
                sounds.bartender2,
                sounds.bartender3,
                sounds.bartender4,
                sounds.bartender5,
                sounds.bartender6,
                sounds.bartender7,
                sounds.bartender8,
                sounds.bartender9,
                sounds.bartender10,
                sounds.bartender11,
            ];
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