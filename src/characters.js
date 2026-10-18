// Rocketbox characters (MIT) converted by tools/characters/build.sh: one GLB with skin + clips.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder); const mixers = [];
const SCALE = { ines: 0.93, yanis: 0.95 };  // ados de 13 ans en 2027 (avatars adultes réduits)
export async function spawn(scene, name, pos, rotY = 0, clip = 'idle_neutral_01') {
  const g = await loader.loadAsync(`models/characters/${name}.glb`);
  const o = g.scene; o.position.copy(pos); o.rotation.y = rotY; if (SCALE[name]) o.scale.setScalar(SCALE[name]); scene.add(o);
  o.traverse((m) => { if (m.isMesh) { m.castShadow = m.receiveShadow = true; m.frustumCulled = false;
    if (m.material.name === 'opacity') { m.material.alphaTest = 0.5; m.material.transparent = false; m.material.side = THREE.DoubleSide; } } });
  const mixer = new THREE.AnimationMixer(o); mixers.push(mixer);
  let cur = null;
  const play = (name, fade = 0.4) => { const a = g.animations.find((c) => c.name === name) || g.animations[0]; if (!a) return; const n = mixer.clipAction(a);
    if (cur === n) return; n.reset().fadeIn(fade).play(); if (cur) cur.fadeOut(fade); cur = n; };
  play(clip, 0);
  return { object: o, mixer, clips: g.animations, play };
}
export function updateCharacters(dt) { for (const m of mixers) m.update(dt); }
