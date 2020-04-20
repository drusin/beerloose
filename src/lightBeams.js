import beamHelper, { BEAM_INPUTS, centerOnSprite, BEAM_DEFAULTS, projectY } from './shaders/beamHelper';

const LEFT_START = [200, BEAM_DEFAULTS[BEAM_INPUTS.START][1]];
const LEFT_CENTER = { x: LEFT_START[0], y: 200};
const RIGHT_START = [440, BEAM_DEFAULTS[BEAM_INPUTS.START][1]];
const RIGHT_CENTER = { x: RIGHT_START[0], y: 200};
const RADIUS = 100;

export default function () {
    return {
        init(shader) {
            this.shader = shader;
            this.playerSpotlight = beamHelper.addBeam(shader);
            this.leftRed = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: LEFT_START, [BEAM_INPUTS.COLOR]: [2, 0, 0] });
            this.leftGreen = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: LEFT_START, [BEAM_INPUTS.COLOR]: [0, 2, 0] });
            this.leftBlue = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: LEFT_START, [BEAM_INPUTS.COLOR]: [0, 0, 4] });
            this.rightRed = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: RIGHT_START, [BEAM_INPUTS.COLOR]: [2, 0, 0] });
            this.rightGreen = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: RIGHT_START, [BEAM_INPUTS.COLOR]: [0, 2, 0] });
            this.rightBlue = beamHelper.addBeam(shader, { [BEAM_INPUTS.START]: RIGHT_START, [BEAM_INPUTS.COLOR]: [0, 0, 4] });
            this.currentAngle = 0;
        },

        update(delta, playerBody) {
            beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: centerOnSprite(playerBody.x, playerBody.y) }, this.playerSpotlight);
            
            this.currentAngle += delta / 10;
            if (this.currentAngle > 360) {
                this.currentAngle -= 360;
            }
            beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: this._coordsForAngle(LEFT_CENTER, this.currentAngle, 0) }, this.leftRed);
            beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: this._coordsForAngle(LEFT_CENTER, this.currentAngle, 120) }, this.leftGreen);
            beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: this._coordsForAngle(LEFT_CENTER, this.currentAngle, 240) }, this.leftBlue);

            beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: this._coordsForAngle(RIGHT_CENTER, this.currentAngle, 0) }, this.rightRed);
            beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: this._coordsForAngle(RIGHT_CENTER, this.currentAngle, 120) }, this.rightGreen);
            beamHelper.changeBeam(this.shader, { [BEAM_INPUTS.END]: this._coordsForAngle(RIGHT_CENTER, this.currentAngle, 240) }, this.rightBlue);
        },

        _coordsForAngle(center, angle, offset) {
            angle = angle + offset;
            angle -= angle > 360 ? 360 : 0;
            return [
                center.x + RADIUS * Math.cos(angle * Math.PI / 180),
                projectY(center.y + RADIUS * Math.sin(angle * Math.PI / 180))
            ]
        }
    }
}