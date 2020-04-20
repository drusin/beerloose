import { Scene } from 'phaser';
import background from './assets/BasicBackground.png';
import mobile from './assets/mobile.png';
import GameScene from './GameScene';
import TutorialScene from './TutorialScene';

export default class IntroScene extends Scene {
    static get KEY() {
        return 'intro-scene';
    }

    constructor() {
        super({ key: IntroScene.KEY });
        this.messages = [
`hi Bob! there\'s
a crazy party
going on at the 
club! Do you
wanna join?
- Alice`,
`Bob! I'm going
to the disco,
will you be
there?
- Barbara`,
`Je ruiqire
mon favourite
Beer Bearer at
the club! Please
be there tonight
- Chloè`,
`This is the
night for 
dancing and 
drinking, Bob.
- Diane`
        ];
    }

    preload() {
        this.load.image('background', background);
        this.load.image('mobile', mobile);
    }

    create() {
        this.add.image(320, 240, 'background');
        this.add.image(320, 240, 'mobile').setInteractive().on('pointerdown', () => this.continue())
        this.text = this.add.text(235, 110, '      (4)\nUNREAD MESSAGES', { color: '0', fontStyle: 'bold', fontSize: '20px'});
        // this.text.text = this.messages[3];
    }

    continue() {
        if (this.messages.length > 0) {
            this.text.text = this.messages.shift();
        }
        else {
            this.scene.start(TutorialScene.KEY);
        }
    }
}