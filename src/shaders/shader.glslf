precision mediump float;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

//external input
vec2 resolution = vec2(640, 480);

//disco ball
uniform vec2 d_position[100];
uniform float d_r[100];
uniform float d_amount[100];
uniform float d_length[100];
uniform float d_width[100];
uniform float d_offset[100];
uniform float d_stretchX[100];
uniform float d_stretchY[100];

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
    return vec3(isCircle && shouldDraw(st, normPosition, length, spaceBetween, amount, offset) ? 0.5 : 0.0);
}

vec3 discoBalls() {
    float resolutionRatio = resolution.x / resolution.y;
    vec3 sum = vec3(0);

    for (int i = 0; i < 100; i++) {
        vec2 st = vec2(gl_FragCoord.x / (resolution.x * (1.0 + d_stretchX[i])), gl_FragCoord.y / (resolution.y * resolutionRatio * (1.0 + d_stretchY[i])));
        vec2 normPosition = vec2(d_position[i].x / (resolution.x * (1.0 + d_stretchX[i])), d_position[i].y / (resolution.y * resolutionRatio * (1.0 + d_stretchY[i])));
        float normR = d_r[i] / resolution.x;
        float normWitdth = d_width[i] / resolution.x;

        float spaceBetween = (360.0 - d_amount[i] * d_length[i]) / d_amount[i];
        sum += doStuff(st, normPosition, normR, normWitdth, d_length[i], spaceBetween, d_amount[i], d_offset[i]);
    }

    return sum;
}

void main(void) {
    vec4 color = texture2D(uMainSampler, outTexCoord);
    gl_FragColor = color + vec4(discoBalls(), 1.0);
}