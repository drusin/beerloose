import { Scene } from 'phaser';
import preferences from './preferences';
import GameScene from './GameScene';
import { getStatistics } from './statistics.js';

const NUMBER_OF_HIGHSCORE_LINES = 10;

export default class HighscoreScene extends Scene {
    static get KEY() {
        return 'highscore-scene';
    }

    constructor() {
        super({ key: HighscoreScene.KEY });
    }

    async create() {
        const statistics = await getStatistics();
        if (!statistics.entries) return;
        // just in case people find out how to push stuff to the server…
        const filtered = statistics.entries.filter(entry =>
            !!entry.timestamp &&
            typeof entry.timestamp === 'string' &&
            !!entry.submittedData &&
            !!entry.submittedData.score &&
            typeof entry.submittedData.score === 'string' &&
            !!entry.submittedData.name &&
            typeof entry.submittedData.name === 'string'
        );

        const sorted = filtered.sort((l, r) => l.submittedData.score.localeCompare(r.submittedData.score));

        this.add.text(140, 50, 'The Best Beer Bearer Bobs', { fontSize: '25px' });
        this.add.text(200, 150, 'Name');
        this.add.text(430, 150, '#Beers');
        for (let i = 0; i < Math.min(NUMBER_OF_HIGHSCORE_LINES, sorted.length); i++) {
            this.renderHighscoreLine({ entry: sorted[i], index: i });
        }
    }

    renderHighscoreLine({ entry, index }) {
        this.add.text(200, index * 50 + 200, entry.submittedData.name);
        this.add.text(450, index * 50 + 200, entry.submittedData.score);
    }
}
