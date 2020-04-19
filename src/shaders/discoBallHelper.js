import preferences from '../preferences';

const INPUTS = {
    POSITION: 'd_position',
    R: 'd_r',
    AMOUNT: 'd_amount',
    LENGTH: 'd_length',
    WIDTH: 'd_width',
    OFFSET: 'd_offset',
    STRETCH_X: 'd_stretchX',
    STRETCH_Y: 'd_stretchY'
};

Object.freeze(INPUTS);

const DEFAULTS = {
    [INPUTS.POSITION]: [320, 300],
    [INPUTS.R]: 20,
    [INPUTS.AMOUNT]: 8,
    [INPUTS.LENGTH]: 3,
    [INPUTS.WIDTH]: 5,
    [INPUTS.OFFSET]: 0,
    [INPUTS.STRETCH_X]: 0.5,
    [INPUTS.STRETCH_Y]: 0,
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
            [INPUTS.POSITION]: [],
            [INPUTS.R]: [],
            [INPUTS.AMOUNT]: [],
            [INPUTS.LENGTH]: [],
            [INPUTS.WIDTH]: [],
            [INPUTS.OFFSET]: [],
            [INPUTS.STRETCH_X]: [],
            [INPUTS.STRETCH_Y]: []
        }

        this.balls.forEach(ball => Object.keys(ball).forEach(key => prepwork[key].push(ball[key])));

        const apply = (key, val) => key === INPUTS.POSITION ?
            shader.setFloat2v(key, [].concat(...val)) :
            shader.setFloat1v(key, val);

        Object.keys(prepwork).forEach(key => apply(key, prepwork[key]));
    }
}

const SINGLETON = new DiscoBallHelper();

export default SINGLETON;