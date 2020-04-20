precision mediump float;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

const vec2 RESOLUTION = vec2(640, 480);

vec3 dark() {
    return vec3(gl_FragCoord.y > 95.0 ? 0.7 : 1.0);
}

//#######################################################################################################################################
//########## dance area #################################################################################################################
//#######################################################################################################################################
const vec4 DANCE_COORDS = vec4(136.0, 153.0, 496.0, 404.0);
const float DANCE_GLOW = 1.6;
const float DANCE_GLOW_SMOOTH = 15.0;

vec3 danceArea() {
    bool matches = gl_FragCoord.x > DANCE_COORDS.x - DANCE_GLOW_SMOOTH && gl_FragCoord.y > DANCE_COORDS.y - DANCE_GLOW_SMOOTH 
            && gl_FragCoord.x < DANCE_COORDS.z + DANCE_GLOW_SMOOTH && gl_FragCoord.y < DANCE_COORDS.w + DANCE_GLOW_SMOOTH;
    return vec3(matches ?
        1.0 + (DANCE_GLOW -1.0) 
            * smoothstep(DANCE_COORDS.x - DANCE_GLOW_SMOOTH, DANCE_COORDS.x, gl_FragCoord.x)
            * smoothstep(DANCE_COORDS.y - DANCE_GLOW_SMOOTH, DANCE_COORDS.y, gl_FragCoord.y)
            * smoothstep(DANCE_COORDS.z + DANCE_GLOW_SMOOTH, DANCE_COORDS.z, gl_FragCoord.x)
            * smoothstep(DANCE_COORDS.w + DANCE_GLOW_SMOOTH, DANCE_COORDS.w, gl_FragCoord.y)
        :1.0);
}
//#######################################################################################################################################

//#######################################################################################################################################
//########## light beams ################################################################################################################
//#######################################################################################################################################
const int MAX_BEAM_AMOUNT = 10;
const float BEAM_R = 20.0;
const float STRETCH_X = 1.0;
//inputs
uniform vec2 beamStart[MAX_BEAM_AMOUNT];
uniform vec2 beamEnd[MAX_BEAM_AMOUNT];
uniform vec3 beamColor[MAX_BEAM_AMOUNT];

//copied from https://stackoverflow.com/a/9755252 , no fucking clue how it works
bool insideTriangle(vec2 st, vec2 a, vec2 b, vec2 c) {
    float as_x = st.x-a.x;
    float as_y = st.y-a.y;

    bool s_ab = (b.x-a.x)*as_y-(b.y-a.y)*as_x > 0.0;

    if((c.x-a.x)*as_y-(c.y-a.y)*as_x > 0.0 == s_ab) return false;

    if((c.x-b.x)*(st.y-b.y)-(c.y-b.y)*(st.x-b.x) > 0.0 != s_ab) return false;

    return true;
}

vec2 position(vec2 position) {
    return vec2(position.x / (RESOLUTION.x * (1.0 + STRETCH_X)), position.y / (RESOLUTION.y * RESOLUTION.x / RESOLUTION.y));
}

vec3 beam() {
    vec3 sum = vec3(1.0);

    float resolutionRatio = RESOLUTION.x / RESOLUTION.y;
    vec2 st = vec2(gl_FragCoord.x / (RESOLUTION.x * (1.0 + STRETCH_X)), gl_FragCoord.y / (RESOLUTION.y * resolutionRatio));
    for (int i = 0; i < MAX_BEAM_AMOUNT; i++) {
        vec2 circleCoords = position(beamEnd[i]);
        if (distance(circleCoords, st) < BEAM_R / RESOLUTION.x) {
            sum *= vec3(1.0) + beamColor[i];
            continue;
        }
        vec2 left = vec2(circleCoords.x - BEAM_R / RESOLUTION.x, circleCoords.y);
        vec2 right = vec2(circleCoords.x + BEAM_R / RESOLUTION.x, circleCoords.y);

        if (insideTriangle(st, position(beamStart[i]), left, right)) {
            sum *= vec3(1) + beamColor[i] / 2.0;
        }
    }

    return sum;
}
//#######################################################################################################################################

void main(void) {
    vec4 color = texture2D(uMainSampler, outTexCoord);
    gl_FragColor = color 
        * vec4(dark(), 1.0) 
        * vec4(danceArea(), 1.0)
        * vec4(beam(), 1.0)
        ;
}