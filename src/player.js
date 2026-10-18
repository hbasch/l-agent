// First-person walker: capsule against the street BVH (method of three-mesh-bvh's characterMovement example).
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
const q = new URLSearchParams(location.search);
const R = 0.3, H = 1.7, EYE = 1.62, GRAV = -20;
export function makePlayer(camera, dom, collider) {
  const controls = new PointerLockControls(camera, dom); const keys = {};
  const feet = camera.position.clone().setY(camera.position.y - EYE); const vel = new THREE.Vector3();
  let onGround = false, locked = false; const player = { controls, feet, frozen: false, onLock: null };
  dom.addEventListener('click', () => { if (!player.frozen) controls.lock(); });
  controls.addEventListener('lock', () => { locked = true; player.onLock?.(); }); controls.addEventListener('unlock', () => (locked = false));
  addEventListener('keydown', (e) => (keys[e.code] = true)); addEventListener('keyup', (e) => (keys[e.code] = false));
  const seg = new THREE.Line3(), box = new THREE.Box3(), triP = new THREE.Vector3(), capP = new THREE.Vector3(), fwd = new THREE.Vector3(), right = new THREE.Vector3();
  player.keys = keys;
  player.update = (dt) => {
    if (q.has('y')) return;  // fixed debug camera
    const move = new THREE.Vector3();
    if (locked && !player.frozen) {
      camera.getWorldDirection(fwd); fwd.y = 0; fwd.normalize(); right.crossVectors(fwd, camera.up);
      const f = (keys.KeyW || keys.KeyZ ? 1 : 0) - (keys.KeyS ? 1 : 0), s = (keys.KeyD ? 1 : 0) - (keys.KeyA || keys.KeyQ ? 1 : 0);
      move.addScaledVector(fwd, f).addScaledVector(right, s); if (move.lengthSq() > 1) move.normalize();
      move.multiplyScalar((keys.ShiftLeft ? 3.0 : 1.5) * dt);
    }
    vel.y = onGround ? -1 : vel.y + GRAV * dt;
    const start = feet.clone().add(move).addScaledVector(vel, dt);
    if (collider) {
      seg.start.copy(start).y += R; seg.end.copy(start).y += H - R;
      for (let it = 0; it < 3; it++) {
        box.makeEmpty().expandByPoint(seg.start).expandByPoint(seg.end).expandByScalar(R);
        collider.boundsTree.shapecast({ intersectsBounds: (b) => b.intersectsBox(box), intersectsTriangle: (tri) => {
          const d = tri.closestPointToSegment(seg, triP, capP);
          if (d < R) { const dir = capP.sub(triP).normalize(); const depth = R - d; seg.start.addScaledVector(dir, depth); seg.end.addScaledVector(dir, depth); } } });
      }
      const res = seg.start.clone(); res.y -= R; const delta = res.clone().sub(feet);
      onGround = delta.y > Math.abs(dt * vel.y * 0.25); if (onGround) vel.y = 0;
      feet.copy(res);
      if (feet.y < -10) feet.set(0, 2, 0);
    } else { feet.add(move); feet.y = 0; }
    camera.position.set(feet.x, feet.y + EYE, feet.z);
    if (player.aim) camera.lookAt(player.aim);  // robot test only
  };
  player.teleport = (x, y, z, yaw = 0) => { feet.set(x, y, z); vel.set(0, 0, 0); camera.position.set(x, y + EYE, z); camera.rotation.set(0, yaw, 0, 'YXZ'); };
  return player;
}
