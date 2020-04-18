precision mediump float;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

//external input
uniform vec2 resolution;
uniform vec2 position[100];
uniform float r[100];
uniform float amount[100];
uniform float length[100];
uniform float width[100];
uniform float offset[100];
uniform float stretchX[100];
uniform float stretchY[100];

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

vec3 runAll() {
    float resolutionRatio = resolution.x / resolution.y;
    vec3 sum = vec3(0);

    for (int i = 0; i < 100; i++) {
        vec2 st = vec2(gl_FragCoord.x / (resolution.x * (1.0 + stretchX[i])), gl_FragCoord.y / (resolution.y * resolutionRatio * (1.0 + stretchY[i])));
        vec2 normPosition = vec2(position[i].x / (resolution.x * (1.0 + stretchX[i])), position[i].y / (resolution.y * resolutionRatio * (1.0 + stretchY[i])));
        float normR = r[i] / resolution.x;
        float normWitdth = width[i] / resolution.x;

        float spaceBetween = (360.0 - amount[i] * length[i]) / amount[i];
        sum += doStuff(st, normPosition, normR, normWitdth, length[i], spaceBetween, amount[i], offset[i]);
    }

    return sum;
}

void main(void) {
    float resolutionRatio = resolution.x / resolution.y;
    // vec2 st = vec2(gl_FragCoord.x / (resolution.x * (1.0 + stretchX)), gl_FragCoord.y / (resolution.y * resolutionRatio * (1.0 + stretchY)));
    // vec2 normPosition = vec2(position.x / (resolution.x * (1.0 + stretchX)), position.y / (resolution.y * resolutionRatio * (1.0 + stretchY)));
    // float normR = r / resolution.x;
    // float normWitdth = width / resolution.x;

    // float spaceBetween = (360.0 - amount * length) / amount;

    vec4 color = texture2D(uMainSampler, outTexCoord);
    // gl_FragColor = color + vec4(doStuff(st, normPosition, normR, normWitdth, length, spaceBetween, amount, offset), 1.0);
    gl_FragColor = color + vec4(runAll(), 1.0);
}