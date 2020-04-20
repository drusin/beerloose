import preferences from '../preferences';

export function projectY(y) {
    return 480 - y;
}

export function centerOnSprite(spriteX, spriteY) {
    return [spriteX + 4, projectY(spriteY) - 16];
}

const INPUTS = {
    START: 'beamStart',
    END: 'beamEnd',
    COLOR: 'beamColor'
};
Object.freeze(INPUTS);

const DEFAULTS = {
    [INPUTS.START]: [320, projectY(-50)],
    [INPUTS.END]: [320, projectY(200)],
    [INPUTS.COLOR]: [0.6, 0.6, 0.6]
};
Object.freeze(DEFAULTS);
export { INPUTS as BEAM_INPUTS, DEFAULTS as BEAM_DEFAULTS };

const INPUT_METHODS = {
    [INPUTS.START]: (shader, val) => shader.setFloat2v(INPUTS.START, val),
    [INPUTS.END]: (shader, val) => shader.setFloat2v(INPUTS.END, val),
    [INPUTS.COLOR]: (shader, val) => shader.setFloat3v(INPUTS.COLOR, val)
}
Object.freeze(INPUT_METHODS);

class BeamHelper {
    constructor() {
        this.beams = [];
    }

    addBeam(shader, inputs) {
        inputs = Object.assign({}, DEFAULTS, inputs);
        const index = this.beams.push(inputs) -1;
        this._sendInputs(shader);
        return index;
    }

    changeBeam(shader, inputs, index) {
        Object.assign(this.beams[index], inputs);
        this._sendInputs(shader);
    }

    changeAllBeams(shader, inputs) {
        this.beams.map(beam => Object.assign(beam, inputs));
        this._sendInputs(shader);
    }

    _sendInputs(shader) {
        if (!preferences.effects) { return; }
        const prepwork = {
            [INPUTS.START]: [],
            [INPUTS.END]: [],
            [INPUTS.COLOR]: []
        }

        this.beams.forEach(beam => Object.keys(beam).forEach(key => prepwork[key].push(...beam[key])));

        // Object.keys(prepwork).forEach(key => apply(key, prepwork[key]));
        Object.keys(prepwork).forEach(key => INPUT_METHODS[key](shader, prepwork[key]));
    }
}

const SINGLETON = new BeamHelper();

export default SINGLETON;