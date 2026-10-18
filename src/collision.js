// Static collider for the street: every solid instance baked into one world-space geometry + BVH (three-mesh-bvh).
import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';
const SKIP = /Glass|Vetro|Fogging|Bush|Cespuglio|Tendina|opacity|Decal/i;
export function buildCollider(root) {
  const parts = []; const m = new THREE.Matrix4(); const v = new THREE.Vector3();
  root.updateMatrixWorld(true);
  root.traverse((o) => {
    if (!o.isMesh || SKIP.test(o.material?.name || '')) return;
    const pos = o.geometry.attributes.position, idx = o.geometry.index; const n = o.isInstancedMesh ? o.count : 1;
    const tris = idx ? idx.count : pos.count;
    for (let k = 0; k < n; k++) {
      if (o.isInstancedMesh) { o.getMatrixAt(k, m); m.premultiply(o.matrixWorld); } else m.copy(o.matrixWorld);
      const out = new Float32Array(tris * 3);
      for (let t = 0; t < tris; t++) { v.fromBufferAttribute(pos, idx ? idx.getX(t) : t).applyMatrix4(m); out[t * 3] = v.x; out[t * 3 + 1] = v.y; out[t * 3 + 2] = v.z; }
      parts.push(out);
    }
  });
  const total = parts.reduce((a, p) => a + p.length, 0); const all = new Float32Array(total); let off = 0;
  for (const p of parts) { all.set(p, off); off += p.length; }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(all, 3));
  geo.boundsTree = new MeshBVH(geo);
  console.log('collider', (total / 9) | 0, 'triangles');
  return geo;
}
