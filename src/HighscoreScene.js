import { Scene } from 'phaser';
import { getStatistics, sendStatistics } from './statistics.js';

import background from './assets/waiter_pad.png';

const NUMBER_OF_HIGHSCORE_LINES = 10;

const Y_POSITIONS = [
    175,
    200,
    225,
    249,
    274,
    302,
    332,
    360,
    388,
    418,
]

export default class HighscoreScene extends Scene {
    static get KEY() {
        return 'highscore-scene';
    }

    constructor() {
        super({ key: HighscoreScene.KEY });

        // ugly hacky solution to get the order as i want…
        this.timeSinceSceneCreated = 0;
        this.playerHighscoreWasAdded = false;
        this.highscoreInitiallyFetchedAndRendered = false;
    }

    init(data) {
        this.score = data.score;
    }

    preload() {
        this.load.image('background', background);
    }

    async create() {
        let statistics = await getStatistics();
        this.drawHighscore({ statistics });
        this.highscoreInitiallyFetchedAndRendered = true;
    }
    
    async update(delta) {
        if (this.playerHighscoreWasAdded) return;
        if (!this.highscoreInitiallyFetchedAndRendered) return;
        if (this.timeSinceSceneCreated > 1000) {
            this.playerHighscoreWasAdded = true;
            let playerName = window.prompt("What's your name, Bob?", '');
            playerName = playerName !== null ? playerName : '';
            playerName = playerName.substring(0, 21);
            playerName = playerName.replace(/(\r\n|\n|\r)/gm, '');
            const statistics = await sendStatistics({ username: playerName, score: 55556 });
            this.drawHighscore({ statistics});
            
        }
        this.timeSinceSceneCreated += delta;
    }

    drawHighscore({ statistics }) {
        if (!statistics.entries) return;
        // just in case people find out how to push fishy stuff to the server…
        const filtered = statistics.entries.filter(entry =>
            !!entry.timestamp &&
            typeof entry.timestamp === 'string' &&
            !!entry.submittedData &&
            typeof entry.submittedData.score !== 'undefined' &&
            typeof entry.submittedData.username !== 'undefined'
        );
        const sorted = filtered.sort((l, r) => parseInt(r.submittedData.score) - parseInt(l.submittedData.score));

        const graphics = this.add.graphics();
        graphics.fillStyle(0x663931, 1.0);
        graphics.fillRect(110, 0, 415, 480);
        this.add.image(320, 240, 'background');

        for (let i = 0; i < Math.min(NUMBER_OF_HIGHSCORE_LINES, sorted.length); i++) {
            this.renderHighscoreLine({ entry: sorted[i], index: i });
        }
        this.renderCredits();
    }

    renderHighscoreLine({ entry, index }) {
        this.add.text(150, Y_POSITIONS[index], `#${index + 1}`, { fontSize: '18px', color: '#000' });
        this.add.text(185, Y_POSITIONS[index], entry.submittedData.username ? entry.submittedData.username : 'Bob', { fontSize: '18px', color: '#000' });
        this.add.text(425, Y_POSITIONS[index], entry.submittedData.score, { fontSize: '18px', color: '#000' });
    }

    renderCredits() {
        const CREDITS = [
            'Alex',
            'Dawid',
            'Murat',
            'Sascha',
            'Simon',
            'Sven',
            'Ricarda',
            'Tom',
        ]
        for (let i = 0; i < CREDITS.length; i++) {
            this.add.text(550, 325 + 17 * i, CREDITS[i], { fontSize: '18px', color: '#FDBB11' });
        }
    }
}
