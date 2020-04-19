const BALL_INPUTS = {
    POSITION: 'd_position',
    R: 'd_r',
    AMOUNT: 'd_amount',
    LENGTH: 'd_length',
    WIDTH: 'd_width',
    OFFSET: 'd_offset',
    STRETCH_X: 'd_stretchX',
    STRETCH_Y: 'd_stretchY'
};

Object.freeze(BALL_INPUTS);
export { BALL_INPUTS };

const DEFAULTS = {
    [BALL_INPUTS.POSITION]: [300, 200],
    [BALL_INPUTS.R]: 50,
    [BALL_INPUTS.AMOUNT]: 10,
    [BALL_INPUTS.LENGTH]: 15,
    [BALL_INPUTS.WIDTH]: 3,
    [BALL_INPUTS.OFFSET]: 0,
    [BALL_INPUTS.STRETCH_X]: 2,
    [BALL_INPUTS.STRETCH_Y]: 0,
};
Object.freeze(DEFAULTS);

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
        const prepwork = {
            [BALL_INPUTS.POSITION]: [],
            [BALL_INPUTS.R]: [],
            [BALL_INPUTS.AMOUNT]: [],
            [BALL_INPUTS.LENGTH]: [],
            [BALL_INPUTS.WIDTH]: [],
            [BALL_INPUTS.OFFSET]: [],
            [BALL_INPUTS.STRETCH_X]: [],
            [BALL_INPUTS.STRETCH_Y]: []
        }

        this.balls.forEach(ball => Object.keys(ball).forEach(key => prepwork[key].push(ball[key])));

        const apply = (key, val) => key === BALL_INPUTS.POSITION ?
            shader.setFloat2v(key, [].concat(...val)) :
            shader.setFloat1v(key, val);

        Object.keys(prepwork).forEach(key => apply(key, prepwork[key]));
    }
}

const SINGLETON = new DiscoBallHelper();

export default SINGLETON;