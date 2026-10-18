// Post-processing shared by every scene: ambient occlusion, bloom (neons, lamps), film grain + vignette.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
const Grade = { uniforms: { tDiffuse: { value: null }, time: { value: 0 } }, vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)) + time) * 43758.5453); }
    void main(){ vec4 c = texture2D(tDiffuse, vUv); vec2 d = vUv - .5; c.rgb *= 1. - dot(d, d) * .9; c.rgb += (h(vUv * 999.) - .5) * .035; gl_FragColor = c; }` };
export function makePost(renderer, scene, camera, q) {
  const gl = renderer.getContext(); const half = !!gl.getExtension('EXT_color_buffer_float') && !q.has('ldr');
  const c = new EffectComposer(renderer, half ? undefined : new THREE.WebGLRenderTarget(innerWidth * renderer.getPixelRatio(), innerHeight * renderer.getPixelRatio(), { type: THREE.UnsignedByteType })); c.addPass(new RenderPass(scene, camera));
  if (!q.has('noAO')) { const ao = new GTAOPass(scene, camera, innerWidth, innerHeight); ao.blendIntensity = 0.8; c.addPass(ao); }
  c.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), half ? 0.45 : 0.15, 0.5, half ? 0.9 : 0.97));  // LDR fallback: bloom only on near-white
  c.addPass(new OutputPass()); const g = new ShaderPass(Grade); c.addPass(g);
  return { render(t) { g.uniforms.time.value = t % 100; c.render(); }, setSize(w, h) { c.setSize(w, h); } };
}
