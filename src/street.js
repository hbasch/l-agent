// Street: layout.json (exported from Unreal by Tools/LAgent/web_export.py) + one GLB per mesh, drawn as instances.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ueTransform } from './ue.js';
import { loadMaterials, material } from './materials.js';
const BASE = 'models/street/';
const isJson = (r) => r.ok && (r.headers.get('content-type') || '').includes('json');
export async function loadStreet(scene) {
  const [lr, vr] = await Promise.all([fetch(BASE + 'layout.json'), fetch(BASE + 'variants.json')]);
  if (!isJson(lr)) { console.warn('pas de layout.json : rue absente'); return null; }
  const layout = await lr.json(), variants = await vr.json(); await loadMaterials();
  const groups = new Map();
  for (const it of layout.items) { if (!groups.has(it.m)) groups.set(it.m, []); groups.get(it.m).push(it); }
  const loader = new GLTFLoader(); const tmp = new THREE.Object3D(); const root = new THREE.Group(); const cache = new Map();
  await Promise.all([...groups].map(async ([key, items]) => {
    const v = variants[key]; if (!v || /SkySphere/.test(v.mesh)) return;
    const file = v.mesh.split('.').pop();
    if (!cache.has(file)) cache.set(file, loader.loadAsync(BASE + 'meshes/' + file + '.glb').catch(() => null));
    const gltf = await cache.get(file); if (!gltf) return;
    gltf.scene.updateMatrixWorld(true); const prims = []; gltf.scene.traverse((m) => m.isMesh && prims.push(m));
    prims.forEach((m, si) => {
      const mp = v.mats[si] || m.material.name; const geo = m.geometry;
      if (geo.attributes.uv1 && !geo.attributes.uv2) geo.setAttribute('uv2', geo.attributes.uv1);
      const inst = new THREE.InstancedMesh(geo, material(mp), items.length);
      inst.castShadow = !/Glass/.test(mp); inst.receiveShadow = true;
      items.forEach((it, i) => { ueTransform(tmp, it); tmp.updateMatrix(); inst.setMatrixAt(i, tmp.matrix.clone().multiply(m.matrixWorld)); });
      inst.computeBoundingSphere(); root.add(inst);
    });
  }));
  const land = await loader.loadAsync(BASE + 'meshes/Landscape.glb').catch(() => null);  // already in world space
  if (land) land.scene.traverse((m) => { if (m.isMesh) { m.material = new THREE.MeshStandardMaterial({ color: 0x3b3632, roughness: 0.55 }); m.receiveShadow = true; } }), root.add(land.scene);
  scene.add(root); return root;
}
