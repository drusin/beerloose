import beamHelper, { BEAM_INPUTS, centerOnSprite, BEAM_DEFAULTS } from './shaders/beamHelper';

const LEFT_START = [200, BEAM_DEFAULTS[BEAM_INPUTS.START][1]];
const RIGHT_START = [440, BEAM_DEFAULTS[BEAM_INPUTS.START][1]];

export default function () {
    return {
        init(shader) {
            this.shader = shader;
            this.leftRed = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: LEFT_START, [BEAM_INPUTS.COLOR]: [1, 0, 0] });
            this.playerSpotlight = beamHelper.addBeam(shader);
            this.leftBlue = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: LEFT_START, [BEAM_INPUTS.COLOR]: [0, 1, 0] });
            this.rightRed = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: RIGHT_START, [BEAM_INPUTS.COLOR]: [1, 0, 0] });
            this.rightBlue = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: RIGHT_START, [BEAM_INPUTS.COLOR]: [0, 1, 0] });
        },

        update(delta, playerBody) {
            beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: centerOnSprite(playerBody.x, playerBody.y) }, this.playerSpotlight);
        }
    }
}