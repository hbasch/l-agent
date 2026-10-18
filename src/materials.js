// Rebuilds the Unreal material instances (materials.json, exported by web_export.py) as three.js PBR materials.
// One shared look for the whole game: every material goes through stylize() so street, props and characters match.
import * as THREE from 'three';
const BASE = 'models/street/'; const tl = new THREE.TextureLoader(); const texCache = new Map(); let MATS = {}; let PNG = new Set();
const short = (p) => (p || '').split('.').pop();
function tex(path, srgb, rep) {
  const n = short(path); if (!n) return null; const k = n + (rep ? rep.join(',') : '');
  if (texCache.has(k)) return texCache.get(k);
  const t = tl.load(BASE + 'tex1k/' + n + (PNG.has(n) ? '.png' : '.jpg'));
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
  if (rep) t.repeat.set(rep[0], rep[1]); texCache.set(k, t); return t;
}
const pick = (o, keys) => { for (const k of keys) if (o && o[k]) return o[k]; return null; };
const built = new Map();
export async function loadMaterials() { const [r, p] = await Promise.all([fetch(BASE + 'materials.json'), fetch(BASE + 'tex1k/png.json')]); MATS = r.ok ? await r.json() : {}; PNG = new Set(p.ok ? await p.json() : []); }
export function material(path) {
  const key = short(path); if (built.has(key)) return built.get(key);
  const e = Object.entries(MATS).find(([p]) => short(p) === key); const d = e ? e[1] : {}; const T = d.tex || {}, S = d.scalar || {}, Vc = d.vec || {};
  const parent = short(d.parent);
  const tileU = S['Texture1_Tiling'] || S['L1-TileU'] || 1, tileV = S['Texture1_Tiling'] || S['L1-TileV'] || 1; const rep = tileU !== 1 || tileV !== 1 ? [tileU, tileV] : null;
  let m;
  if (/Glass/.test(parent)) {
    const c = Vc.Glass_Color || Vc.ColorOverlay || [0.4, 0.45, 0.5];
    m = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(...c), roughness: 0.05, metalness: 0, transparent: true, opacity: 0.35, envMapIntensity: 1.5, depthWrite: false });
  } else if (/Fogging/.test(parent)) {
    m = new THREE.MeshBasicMaterial({ color: new THREE.Color(...(Vc.Color || [0.27, 0.18, 0.16])), transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    m.name = key; built.set(key, m); return m;
  } else if (/Bush/.test(parent)) {
    m = new THREE.MeshStandardMaterial({ color: new THREE.Color(...(Vc.Color || [0.2, 0.3, 0.05])).multiplyScalar(1.6), roughness: 0.9 });
  } else {
    const alb = pick(T, ['albedo', 'Albedo', 'Albedo1', 'Albedo_1', 'BaseColor']);
    const nor = pick(T, ['normal', 'Normal', 'Normal1', 'Normal_1']);
    const arm = pick(T, ['MRA', 'ARMH', 'AmbientOcclusion1', 'AO_1', 'Roughness_1']);
    m = new THREE.MeshStandardMaterial({ map: tex(alb, true, rep), normalMap: tex(nor, false, rep), roughnessMap: tex(arm, false, rep), aoMap: tex(arm, false, rep), roughness: 1, metalness: 0 });
    if (T.Emissive) { m.emissiveMap = tex(T.Emissive, true); m.emissive = new THREE.Color(...(Vc.ColorEmissive || [1, 0.8, 0.6])); m.emissiveIntensity = 1.5; }
    if (T.OpacityMask || T.Mask) { m.alphaTest = 0.5; m.side = THREE.DoubleSide; }
    if (/Ground|DefaultStreet/.test(parent) && !alb) m.color.set(0x6d655c);
    const ov = Vc.Albedo_1_ColorOverlay, br = S.Albedo_Brightness;  // Unreal: albedo * overlay * brightness
    if (ov && br && /Ground/.test(parent)) m.color.setRGB(...ov.map((c) => Math.min(1.2, c * br)));
    if (/DefaultStreet/.test(parent)) m.color.setScalar(0.6);
  }
  m.name = key; stylize(m); built.set(key, m); return m;
}
// Shared look: slightly desaturated, warm-cold split, soft contrast. Applied to every material (street, props, characters).
export function stylize(m) {
  m.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
      { float l = dot(gl_FragColor.rgb, vec3(0.299,0.587,0.114));
        gl_FragColor.rgb = mix(vec3(l), gl_FragColor.rgb, 0.78);
        gl_FragColor.rgb *= mix(vec3(0.92,0.97,1.05), vec3(1.04,1.0,0.94), smoothstep(0.1,0.6,l)); }`);
  };
  m.customProgramCacheKey = () => 'lagent-style';
}
