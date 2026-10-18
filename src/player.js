// First-person: pointer lock, ZQSD/WASD, eye height 1.65 m.
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
const q = new URLSearchParams(location.search);
export function makePlayer(camera, dom) {
  const controls = new PointerLockControls(camera, dom); const keys = {};
  dom.addEventListener('click', () => controls.lock());
  addEventListener('keydown', (e) => (keys[e.code] = true)); addEventListener('keyup', (e) => (keys[e.code] = false));
  const v = new THREE.Vector3();
  return { controls, update(dt) {
    const f = (keys.KeyW || keys.KeyZ ? 1 : 0) - (keys.KeyS ? 1 : 0), s = (keys.KeyD ? 1 : 0) - (keys.KeyA || keys.KeyQ ? 1 : 0);
    const speed = keys.ShiftLeft ? 3.2 : 1.6; controls.moveForward(f * speed * dt); controls.moveRight(s * speed * dt);
    if (!q.has('y')) camera.position.y = 1.65; } };
}
