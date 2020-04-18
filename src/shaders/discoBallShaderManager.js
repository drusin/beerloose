import DiscoBallShader from './DiscoBallShader';


class DiscoBallShaderManager {
    constructor() {
        this.balls = [];
    }

    addDiscoBall(shader, inputs) {
        Object.assign(inputs, DiscoBallShader.DEFAULTS);
        const index = this.balls.push(inputs);
        this._sendInputs(shader);
        return index;
    }

    _sendInputs(shader) {
        const prepwork = {
            [DiscoBallShader.INPUTS.RESOLUTION]: [],
            [DiscoBallShader.INPUTS.POSITION]: [],
            [DiscoBallShader.INPUTS.R]: [],
            [DiscoBallShader.INPUTS.AMOUNT]: [],
            [DiscoBallShader.INPUTS.LENGTH]: [],
            [DiscoBallShader.INPUTS.WIDTH]: [],
            [DiscoBallShader.INPUTS.OFFSET]: [],
            [DiscoBallShader.INPUTS.STRETCH_X]: [],
            [DiscoBallShader.INPUTS.STRETCH_Y]: []
        }

        this.balls.forEach(ball => Object.keys(ball).forEach(key => prepwork[key].push(ball[key])));

        const apply = (key, val) => key === DiscoBallShader.INPUTS.POSITION ?
            shader.setFloat2v(key, val.flatMap(v => v[0]), val.flatMap(v => v[1])) :
            shader.setFloat1v(key, val);

        delete prepwork[DiscoBallShader.INPUTS.RESOLUTION];
        delete prepwork[DiscoBallShader.INPUTS.POSITION];

        console.log(prepwork);

        Object.keys(prepwork).forEach(key => apply(key, prepwork[key]));
        shader.setFloat2(DiscoBallShader.INPUTS.POSITION, 320, 200);
    }
}

const SINGLETON = new DiscoBallShaderManager();

export default SINGLETON;