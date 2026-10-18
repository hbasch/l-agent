// Interaction targets: go-to zones and hold-E gestures, with an on-screen guide (white diamond) toward the next one.
import * as THREE from 'three';
import { ui, AUTO, snap } from './ui.js';
const v = new THREE.Vector3(), d = new THREE.Vector3();
export function makeInteract(camera, player) {
  let cur = null;
  const api = {
    // walk within r metres of p
    goto(p, text, r = 1.6) { return new Promise((res) => { cur = { kind: 'goto', p: new THREE.Vector3(...p), r, text, res }; ui.objective(text); }); },
    // look at p from within reach, hold E for sec seconds
    hold(p, text, sec = 3, reach = 2.2, stand = null) { return new Promise((res) => { cur = { kind: 'hold', p: new THREE.Vector3(...p), reach, text, sec, t: 0, res, stand }; ui.objective(text); }); },
    clear() { cur = null; ui.prompt(null); ui.guide(null); ui.objective(''); },
    update(dt) {
      if (!cur) return;
      if (AUTO && !cur.auto) {  // robot: walk there instantly, aim, hold
        cur.auto = true; const c = cur; const dir = new THREE.Vector3(camera.position.x - c.p.x, 0, camera.position.z - c.p.z).normalize();
        const stand = c.kind === 'goto' ? c.p.clone() : c.stand ? new THREE.Vector3(c.stand[0], 0, c.stand[1]) : c.p.clone().addScaledVector(dir, 1.3); player.teleport(stand.x, player.feet.y + 0.3, stand.z);
        player.aim = c.p.clone(); if (c.kind === 'hold') { player.keys.KeyE = true; setTimeout(() => snap('geste-' + c.text.split(' ')[0]), 300); }
      }
      // guide marker
      v.copy(cur.p).project(camera);
      if (v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1) ui.guide((v.x * 0.5 + 0.5) * innerWidth, (-v.y * 0.5 + 0.5) * innerHeight); else ui.guide(null);
      const dist = Math.hypot(camera.position.x - cur.p.x, camera.position.z - cur.p.z);
      if (cur.kind === 'goto') { if (dist < cur.r) { const r = cur.res; api.clear(); r(); } return; }
      camera.getWorldDirection(d); v.copy(cur.p).sub(camera.position).normalize();
      const aim = d.dot(v) > 0.86 && camera.position.distanceTo(cur.p) < cur.reach;
      if (!aim) { cur.t = Math.max(0, cur.t - dt); ui.prompt(null); return; }
      if (player.keys.KeyE) cur.t += AUTO ? 0.5 : dt; else cur.t = Math.max(0, cur.t - dt * 0.5);
      ui.prompt(`Maintenir E : ${cur.text}`, cur.t / cur.sec);
      if (cur.t >= cur.sec) { const r = cur.res; if (AUTO) player.keys.KeyE = false; api.clear(); r(); }
    },
  };
  return api;
}
