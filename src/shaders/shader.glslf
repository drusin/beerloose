precision mediump float;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

const int MAX_DISCO_BALLS = 10;
const float DISCO_BRIGHTNESS = 0.6;
const float glow = 5.0;

const vec4 DANCE_COORDS = vec4(136.0, 153.0, 496.0, 404.0);
const float DANCE_GLOW = 1.6;
const float DANCE_GLOW_SMOOTH = 15.0;

//external input
vec2 resolution = vec2(640, 480);

//disco ball input
uniform vec2 d_position[MAX_DISCO_BALLS];
uniform float d_r[MAX_DISCO_BALLS];
uniform float d_amount[MAX_DISCO_BALLS];
uniform float d_length[MAX_DISCO_BALLS];
uniform float d_width[MAX_DISCO_BALLS];
uniform float d_offset[MAX_DISCO_BALLS];
uniform float d_stretchX[MAX_DISCO_BALLS];
uniform float d_stretchY[MAX_DISCO_BALLS];

bool shouldDraw(vec2 st, vec2 normPosition, float length, float spaceBetween, float amount, float offset) {
    float steps = floor(float(360) / amount);
    for (float i = 0.0; i < 360.0; i++) {
        if (floor(i / steps) * steps != i) { continue; }
        float currentVal = atan(st.y - normPosition.y, st.x - normPosition.x) + radians(180.0);
        float lowerBound = i + offset;
        float upperBound = i + length + offset;
        if ((currentVal >= radians(lowerBound) && currentVal <= radians(upperBound)) || (currentVal >= radians(lowerBound -360.0) && currentVal <= radians(upperBound -360.0))) {
            return true;
        }
    }
    return false;
}

vec3 doStuff(vec2 st, vec2 normPosition, float normR, float normWitdth, float length, float spaceBetween, float amount, float offset) {
    float dist = distance(st, normPosition);
    bool isCircle = dist < normR + normWitdth && dist > normR - normWitdth;
    bool shouldDraw = shouldDraw(st, normPosition, length, spaceBetween, amount, offset);
    return vec3(isCircle && shouldDraw ?
        DISCO_BRIGHTNESS 
            * smoothstep(normR - normWitdth, normR - normWitdth + glow / resolution.x, dist) 
            * smoothstep(normR + normWitdth, normR + normWitdth - glow / resolution.x, dist)
       : 0.0);
}

vec3 discoBalls() {
    float resolutionRatio = resolution.x / resolution.y;
    vec3 sum = vec3(0);

    for (int i = 0; i < MAX_DISCO_BALLS; i++) {
        vec2 st = vec2(gl_FragCoord.x / (resolution.x * (1.0 + d_stretchX[i])), gl_FragCoord.y / (resolution.y * resolutionRatio * (1.0 + d_stretchY[i])));
        vec2 normPosition = vec2(d_position[i].x / (resolution.x * (1.0 + d_stretchX[i])), d_position[i].y / (resolution.y * resolutionRatio * (1.0 + d_stretchY[i])));
        float normR = d_r[i] / resolution.x;
        float normWitdth = d_width[i] / resolution.x;

        float spaceBetween = (360.0 - d_amount[i] * d_length[i]) / d_amount[i];
        sum += doStuff(st, normPosition, normR, normWitdth, d_length[i], spaceBetween, d_amount[i], d_offset[i]);
    }

    return sum;
}

vec3 dark() {
    return vec3(gl_FragCoord.y > 95.0 ? 0.7 : 1.0);
}

vec3 danceMat() {
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

void main(void) {
    vec4 color = texture2D(uMainSampler, outTexCoord);
    gl_FragColor = color 
        * vec4(dark(), 1.0) 
        * vec4(danceMat(), 1.0)
        + vec4(discoBalls(), 1.0);
}