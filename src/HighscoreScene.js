import { Scene } from 'phaser';
import { getStatistics, sendStatistics } from './statistics.js';

const NUMBER_OF_HIGHSCORE_LINES = 10;

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
            playerName = playerName.substring(0, 20);
            playerName = playerName.replace(/(\r\n|\n|\r)/gm, '');
            const statistics = await sendStatistics({ username: playerName, score: 6667 });

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
            !!entry.submittedData.score
        );
        const sorted = filtered.sort((l, r) => parseInt(r.submittedData.score) - parseInt(l.submittedData.score));

        const graphics = this.add.graphics();
        graphics.fillStyle("#000");
        graphics.fillRect(0, 0, 640, 480);

        this.add.text(140, 50, 'The Best Beer Bearer Bobs', { fontSize: '25px' });
        this.add.text(200, 150, 'Name');
        this.add.text(430, 150, '#Beers');
        for (let i = 0; i < Math.min(NUMBER_OF_HIGHSCORE_LINES, sorted.length); i++) {
            this.renderHighscoreLine({ entry: sorted[i], index: i });
        }
    }

    renderHighscoreLine({ entry, index }) {
        this.add.text(200, index * 30 + 200, entry.submittedData.username ? entry.submittedData.username : 'Bob');
        this.add.text(450, index * 30 + 200, entry.submittedData.score);
    }
}
