// Lights from the Unreal level (lights.json) + a dusk atmosphere close to the pack's SampleMap.
import * as THREE from 'three';
import { ueTransform } from './ue.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
export async function addLights(scene, renderer) {
  const hdr = await new RGBELoader().loadAsync('models/street/sky.hdr').catch(() => null);
  if (hdr) { hdr.mapping = THREE.EquirectangularReflectionMapping; const env = new THREE.PMREMGenerator(renderer).fromEquirectangular(hdr).texture; scene.environment = env; scene.environmentIntensity = 0.7; scene.background = hdr; scene.backgroundIntensity = 1.0; }
  const r = await fetch('models/street/lights.json'); const L = r.ok ? await r.json() : [];
  const tmp = new THREE.Object3D(); let sun = null; let n = 0;
  for (const l of L) {
    ueTransform(tmp, { p: l.p, q: l.q, s: [1, 1, 1] }); const col = new THREE.Color(...l.color);
    if (l.type === 'DirectionalLight') {
      const dir = new THREE.Vector3(1, 0, 0).applyQuaternion(new THREE.Quaternion(-l.q[0], -l.q[2], -l.q[1], l.q[3]));
      sun = new THREE.DirectionalLight(col, 2.6); sun.position.copy(dir.clone().multiplyScalar(-40)); sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -28, right: 28, top: 28, bottom: -28, near: 1, far: 100 });
      sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.03; scene.add(sun, sun.target);
    } else if (l.type !== 'SkyLight' && n < 12) {
      const pl = new THREE.PointLight(col, Math.min(60, l.intensity * 3), Math.min(12, (l.radius || 1000) / 100), 2);
      pl.position.copy(tmp.position); scene.add(pl); n++;
    }
  }
  
  if (!hdr) scene.background = new THREE.Color(0x8f7468);
  scene.fog = new THREE.FogExp2(0x9a8590, 0.02);
  return sun;
}
