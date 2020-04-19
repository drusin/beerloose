precision mediump float;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

const vec2 RESOLUTION = vec2(640, 480);

//#######################################################################################################################################
//########## disco ball #################################################################################################################
//#######################################################################################################################################
const int MAX_DISCO_BALLS = 10;
const float DISCO_BRIGHTNESS = 3.0;
const float DISCO_GLOW = 5.0;
const vec2 DISCO_POSITION = vec2(320, 300);
const float DISCO_LENGTH = 3.0;
const float DISCO_WIDTH = 5.0;
const float DISCO_STRETCH_X = 0.5;
const float DISCO_STRETCH_Y = 0.0;
//disco ball external inputs
uniform float d_r[MAX_DISCO_BALLS];
uniform float d_amount[MAX_DISCO_BALLS];
uniform float d_offset[MAX_DISCO_BALLS];

bool shouldDraw(vec2 st, vec2 normPosition, float spaceBetween, float amount, float offset) {
    float steps = floor(float(360) / amount);
    for (float i = 0.0; i < 360.0; i ++) {
        if (floor(i / steps) * steps != i) { continue; }
        float currentVal = 1.0;//atan(st.y - normPosition.y, st.x - normPosition.x) + radians(180.0);
        float lowerBound = i + offset;
        float upperBound = i + DISCO_LENGTH + offset;
        if ((currentVal >= radians(lowerBound) && currentVal <= radians(upperBound)) || (currentVal >= radians(lowerBound -360.0) && currentVal <= radians(upperBound -360.0))) {
            return true;
        }
    }
    return false;
}

vec3 doStuff(vec2 st, vec2 normPosition, float normR, float normWitdth, float spaceBetween, float amount, float offset) {
    float dist = distance(st, normPosition);
    bool isCircle = dist < normR + normWitdth && dist > normR - normWitdth;
    bool shouldDraw = shouldDraw(st, normPosition, spaceBetween, amount, offset);
    return vec3(isCircle && shouldDraw ?
        DISCO_BRIGHTNESS 
            * smoothstep(normR - normWitdth, normR - normWitdth + DISCO_GLOW / RESOLUTION.x, dist) 
            * smoothstep(normR + normWitdth, normR + normWitdth - DISCO_GLOW / RESOLUTION.x, dist)
       : 0.0);
}

vec3 discoBalls() {
    float resolutionRatio = RESOLUTION.x / RESOLUTION.y;
    vec3 sum = vec3(1.0);
    float normWitdth = DISCO_WIDTH / RESOLUTION.x;
    vec2 st = vec2(gl_FragCoord.x / (RESOLUTION.x * (1.0 + DISCO_STRETCH_X)), gl_FragCoord.y / (RESOLUTION.y * resolutionRatio * (1.0 + DISCO_STRETCH_Y)));
    vec2 normPosition = vec2(DISCO_POSITION.x / (RESOLUTION.x * (1.0 + DISCO_STRETCH_X)), DISCO_POSITION.y / (RESOLUTION.y * resolutionRatio * (1.0 + DISCO_STRETCH_Y)));

    for (int i = 0; i < MAX_DISCO_BALLS; i++) {
        float normR = d_r[i] / RESOLUTION.x;
        float normWitdth = DISCO_WIDTH / RESOLUTION.x;

        float spaceBetween = (360.0 - d_amount[i] * DISCO_LENGTH) / d_amount[i];
        sum += doStuff(st, normPosition, normR, normWitdth, spaceBetween, d_amount[i], d_offset[i]);
    }

    return sum;
}
//#######################################################################################################################################

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

vec3 dark() {
    return vec3(gl_FragCoord.y > 95.0 ? 0.7 : 1.0);
}

const vec2 BEAM_START = vec2(320.0, 480.0);
const float BEAM_R = 30.0;
const vec2 BEAM_END = vec2(320, 280);

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
    return vec2(position.x / (RESOLUTION.x * (1.0 + DISCO_STRETCH_X)), position.y / (RESOLUTION.y * RESOLUTION.x / RESOLUTION.y * (1.0 + DISCO_STRETCH_Y)));
}

vec3 beam() {
    vec2 circleCoords = position(BEAM_END);
    float resolutionRatio = RESOLUTION.x / RESOLUTION.y;
    vec2 st = vec2(gl_FragCoord.x / (RESOLUTION.x * (1.0 + DISCO_STRETCH_X)), gl_FragCoord.y / (RESOLUTION.y * resolutionRatio * (1.0 + DISCO_STRETCH_Y)));
    if (distance(circleCoords, st) < BEAM_R / RESOLUTION.x) {
        return vec3(1.0, 2.0, 1.0);
    }
    vec2 left = vec2(circleCoords.x - BEAM_R / RESOLUTION.x, circleCoords.y);
    vec2 right = vec2(circleCoords.x + BEAM_R / RESOLUTION.x, circleCoords.y);

    if (insideTriangle(st, position(BEAM_START), left, right)) {
        return vec3(1.0, 1.5, 1.0);
    }
    return vec3(1.0);
}

void main(void) {
    vec4 color = texture2D(uMainSampler, outTexCoord);
    gl_FragColor = color 
        * vec4(dark(), 1.0) 
        * vec4(danceArea(), 1.0)
        // * vec4(discoBalls(), 1.0)
        * vec4(beam(), 1.0)
        ;
}