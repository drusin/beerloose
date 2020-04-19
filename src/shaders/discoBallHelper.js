import preferences from '../preferences';

const INPUTS = {
    R: 'd_r',
    AMOUNT: 'd_amount',
    OFFSET: 'd_offset'
};

Object.freeze(INPUTS);

const DEFAULTS = {
    [INPUTS.R]: 20,
    [INPUTS.AMOUNT]: 8,
    [INPUTS.OFFSET]: 0
};
Object.freeze(DEFAULTS);
export { INPUTS as BALL_INPUTS, DEFAULTS as BALL_DEFAULTS };

class DiscoBallHelper {
    constructor() {
        this.balls = [];
    }

    addDiscoBall(shader, inputs) {
        inputs = Object.assign({}, DEFAULTS, inputs);
        const index = this.balls.push(inputs);
        this._sendInputs(shader);
        return index;
    }

    changeDiscoBall(shader, inputs, index) {
        Object.assign(this.balls[index], inputs);
        this._sendInputs(shader);
    }

    changeAllDiscoBalls(shader, inputs) {
        this.balls.map(ball => Object.assign(ball, inputs));
        this._sendInputs(shader);
    }

    _sendInputs(shader) {
        if (!preferences.effects) { return; }
        const prepwork = {
            [INPUTS.R]: [],
            [INPUTS.AMOUNT]: [],
            [INPUTS.OFFSET]: []
        }

        this.balls.forEach(ball => Object.keys(ball).forEach(key => prepwork[key].push(ball[key])));

        const apply = (key, val) => shader.setFloat1v(key, val);

        Object.keys(prepwork).forEach(key => apply(key, prepwork[key]));
    }
}

const SINGLETON = new DiscoBallHelper();

export default SINGLETON;