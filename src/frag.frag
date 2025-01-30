#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uWebcamTexture;
uniform int uSteps;
uniform vec3 uColor;
uniform bool uRainbow;
out vec4 fragColor;

vec3 hsv2rgb(vec3 c){
    vec4 K=vec4(1.,2./3.,1./3.,3.);
    vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);
    return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);
}

void main(){
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec4 webcamColor = texture(uWebcamTexture, uv);
    float brightness = (webcamColor.r + webcamColor.g + webcamColor.b) / 3.0;
    vec4 color;
    if (uRainbow) {
        color = vec4(hsv2rgb(vec3(brightness, 1., mod(brightness, 1. / float(uSteps))*float(uSteps))), 1.);
    } else {
        color = vec4(hsv2rgb(vec3(uColor.x, 1., mod(brightness, 1. / float(uSteps))*float(uSteps))), 1.);
    }
    fragColor=color*min(uTime,1.);
}