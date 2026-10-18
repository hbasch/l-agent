import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { loadStreet } from './street.js';
import { spawn, updateCharacters } from './characters.js';
import { makePlayer } from './player.js';
import { addLights } from './lighting.js';
import { makePost } from './post.js';
import { buildCollider } from './collision.js';
import { makeInteract } from './interact.js';
import { ui, sleep, snap as snapIf } from './ui.js';
import { juin2027 } from './days.js';
import { loadProp } from './street.js';
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);
const q0 = new URLSearchParams(location.search);
const scene = new THREE.Scene();
renderer.toneMappingExposure = +(q0.get('exp') ?? 0.85);
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.05, 300);
const q = new URLSearchParams(location.search);
camera.position.set(+(q.get('x') ?? 0), +(q.get('y') ?? 1.65), +(q.get('z') ?? 4)); camera.rotation.order = 'YXZ'; camera.rotation.y = +(q.get('yaw') ?? 0); camera.rotation.x = +(q.get('pitch') ?? 0);
const street = await loadStreet(scene); await addLights(scene, renderer);
if (!street) { const g = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0x777066, roughness: 0.95 }));
  g.rotation.x = -Math.PI / 2; g.receiveShadow = true; scene.add(g); }
const collider = street ? buildCollider(street) : null;
const player = makePlayer(camera, renderer.domElement, collider);
const act = makeInteract(camera, player);
const ray = new THREE.Raycaster(); ray.firstHitOnly = true;
const groundY = (x, z) => { if (!collider) return 0; ray.set(new THREE.Vector3(x, 6, z), new THREE.Vector3(0, -1, 0)); const h = collider.boundsTree.raycastFirst(ray.ray, THREE.DoubleSide); return h ? h.point.y : 0; };
const cast = {};
await Promise.all(['ines', 'yanis', 'sofia', 'malik', 'aubry'].map(async (n) => {
  const c = await spawn(scene, n, new THREE.Vector3(0, -50, 0), 0).catch(() => null); if (!c) return;
  c.place = (x, z, yaw, clip) => { c.object.position.set(x, groundY(x, z), z); c.object.rotation.y = yaw; c.object.visible = true; if (clip) c.play(clip); };
  c.hide = () => (c.object.visible = false); c.object.visible = false; cast[n] = c; }));

if (q.has('grid')) { const g = new THREE.GridHelper(80, 16, 0xff0000, 0xffff00); g.position.y = 0.4; scene.add(g, new THREE.AxesHelper(10)); scene.fog = null; }
const post = makePost(renderer, scene, camera, q);
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); post.setSize(innerWidth, innerHeight); });
const clock = new THREE.Timer();
// --- home: a lit island in the dark (same staging as the vote), far from the street
const home = new THREE.Group(); home.position.set(300, 0, 0); home.visible = false; scene.add(home);
const lamp = new THREE.SpotLight(0xffd9a8, 30, 8, 0.7, 0.6, 2); lamp.position.set(0, 2.6, 0); lamp.target.position.set(0, 0, 0); lamp.castShadow = true; home.add(lamp, lamp.target);
for (const [f, x, z, r] of [['SM_CoffeTable', 0, 0, 0], ['SM_Chair', 0, -0.75, 0], ['SM_Chair', 0, 0.75, Math.PI], ['SM_Cup', 0.15, -0.1, 0], ['Foglietto', -0.2, 0.15, 0.3]]) {
  const o = await loadProp(f); if (o) { o.position.set(x, 0, z); o.rotation.y = r; home.add(o); if (f === 'Foglietto' || f === 'SM_Cup') o.position.y = 0.74; } }
const props = {};
{ const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js'); const { stylize } = await import('./materials.js');
  for (const n of ['camera']) { const gl = await new GLTFLoader().loadAsync(`models/props/${n}.glb`).catch(() => null); if (!gl) continue;
    gl.scene.traverse((m) => { if (m.isMesh) { m.castShadow = true; stylize(m.material); } }); gl.scene.visible = false; scene.add(gl.scene); props[n] = gl.scene; } }
const g = {
  ui, cast, player, act,
  async shot(pos, look) { player.frozen = true; player.controls.unlock(); camera.position.set(...pos); camera.lookAt(...look); setTimeout(() => snapIf('cafe'), 1500); },
  async play(xz, yaw) { player.teleport(xz[0], groundY(xz[0], xz[1]), xz[1], yaw); player.frozen = false; },
  prop(name, p, yaw = Math.PI) { if (props[name]) { props[name].position.set(...p); props[name].rotation.y = yaw; props[name].visible = true; } },
  async evening({ line, rent, bonus }) {
    await ui.card('', '', 1200); act.clear();
    const fog = scene.fog; street.visible = false; for (const c of Object.values(cast)) c.hide(); scene.fog = null; const bg = scene.background; scene.background = new THREE.Color(0); const ei = scene.environmentIntensity; scene.environmentIntensity = 0.05;
    cast.ines.object.position.set(300, 0, 0.62); cast.ines.object.rotation.y = Math.PI; cast.ines.object.visible = true; cast.ines.play('sit_chair_idle_neutral_01');
    player.frozen = true; player.controls.unlock(); camera.position.set(300, 1.25, -0.95); camera.lookAt(300, 0.85, 0.4);
    home.visible = true; await ui.uncard(); await snapIf('soir');
    await ui.say(line, 4200); await ui.say(`Sur la table : loyer ${rent} · prime ${bonus}.`, 3600);
    await ui.card('', '', 1500); home.visible = false; street.visible = true; scene.background = bg; scene.environmentIntensity = ei; scene.fog = fog;
  },
};
player.relock = () => ui.say('Clic pour reprendre la main', 1600);
window.__g = g; window.__ray = (o, d) => { ray.set(new THREE.Vector3(...o), new THREE.Vector3(...d).normalize()); const h = collider?.boundsTree.raycastFirst(ray.ray, THREE.DoubleSide); return h ? [h.point.x, h.point.y, h.point.z, h.distance] : null; }; window.__ready = true;
if (!q.has('y') && !q.has('free')) juin2027(g).then(() => { window.__dayDone = true; console.log('DONE'); }).catch((e) => { console.error(e); window.__dayDone = true; });
else player.teleport(camera.position.x, camera.position.y - 1.62, camera.position.z, camera.rotation.y);
window.__pick = (x, y) => { const r = new THREE.Raycaster(); r.setFromCamera(new THREE.Vector2(x, y), camera); const h = r.intersectObjects(scene.children, true)[0];
  return h ? { mat: h.object.material.name, d: h.distance.toFixed(1), geo: h.object.geometry.name || h.object.name, map: h.object.material.map?.image?.src?.split('/').pop(), rep: h.object.material.map?.repeat?.toArray() } : null; };
renderer.setAnimationLoop(() => { clock.update(); const dt = Math.min(clock.getDelta(), 0.05); player.update(dt); act.update(dt); updateCharacters(dt); if (q.has('noPost')) renderer.render(scene, camera); else post.render(clock.getElapsed()); });
