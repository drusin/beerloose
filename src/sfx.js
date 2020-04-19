import bump_into_persons_1b from './assets/sfx/bump-into-persons-1b.ogg';
import { randomItemFromArray } from './util.js';

export function Sound({ scene }) {
    const sounds = {};
    return {
        preload: function () {
            scene.load.audio('bump-into-person-1', bump_into_persons_1b);
        },
        create: function () {
            sounds.bumpIntoPerson1 = scene.sound.add('bump-into-person-1');
        },
        bumpIntoPerson: function () {
            const choices = [sounds.bumpIntoPerson1];
            if (choices.some(s => s.isPlaying)) return;
            randomItemFromArray(choices).play();
        }
    };
}