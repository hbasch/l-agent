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
  const tileU = S['Texture1_Tiling'] || S['L1-TileU'] || 1, tileV = S['Texture1_Tiling'] || S['L1-TileV'] || 1; let rep = tileU !== 1 || tileV !== 1 ? [tileU, tileV] : null;
  let m;
  if (/Glass/.test(parent)) {
    const c = Vc.Glass_Color || Vc.ColorOverlay || [0.4, 0.45, 0.5];
    m = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(...c), roughness: 0.05, metalness: 0, transparent: true, opacity: 0.35, envMapIntensity: 1.5, depthWrite: false });
  } else if (/Fogging/.test(parent)) {
    m = new THREE.MeshBasicMaterial({ color: new THREE.Color(...(Vc.Color || [0.27, 0.18, 0.16])), transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    m.name = key; built.set(key, m); return m;
  } else if (/Bush/.test(parent)) {
    m = new THREE.MeshStandardMaterial({ roughness: 0.9 });
    m.userData.bush = { top: Vc.Color || [0.18, 0.25, 0.04], under: (Vc.PaintedColor || [0.005, 0.05, 0]).map((c) => c * 2.5), hi: Vc.higlight || [0.18, 0.25, 0.16] };
  } else {
    // MM_DefaultStreet with TexCoord > 0 = road: world-aligned UVs (UV_Position cm per tile), second layer (dark cobbles).
    const road = /DefaultStreet/.test(parent) && S.TexCoord > 0;
    const L2 = road && T.Albedo2 ? '2' : '';
    const alb = L2 ? T.Albedo2 : pick(T, ['albedo', 'Albedo', 'Albedo1', 'Albedo_1', 'BaseColor']);
    const nor = L2 ? (T.Normal2 || T.Normal) : pick(T, ['normal', 'Normal', 'Normal1', 'Normal_1']);
    const arm = L2 ? (T.ARMH2 || T.ARMH) : pick(T, ['MRA', 'ARMH', 'AmbientOcclusion1', 'AO_1', 'Roughness_1']);
    const worldUV = road ? (S['L2-TileU'] || S['L1-TileU'] || 4) / ((S.UV_Position || 500) / 100) : 0;
    if (road) { rep = null; }
    const emissiveOnly = S.intensityemissive !== undefined;  // MM_Tegole04 used for neon letters: albedo = emissive mask
    m = new THREE.MeshStandardMaterial({ map: tex(alb, true, rep), normalMap: tex(nor, false, rep), roughnessMap: tex(arm, false, rep), aoMap: tex(arm, false, rep), metalnessMap: tex(arm, false, rep), roughness: 1, metalness: 1 });
    if (!arm) m.metalness = 0;
    const ni = S.normalintensity ?? S.IntensityNormal2 ?? 1;
    m.normalScale.set(ni, -ni);  // Unreal normal maps are DirectX (green down)
    if (S.roughness !== undefined && S.roughness < 1) m.roughness = Math.max(0.05, S.roughness);
    if (T.Emissive || emissiveOnly) {
      m.emissiveMap = tex(T.Emissive || alb, true); m.emissive = new THREE.Color(...(Vc.ColorEmissive || [1, 0.8, 0.6]));
      m.emissiveIntensity = Math.min(8, (S.intensityemissive || S.EmissiveIntensity || 4) / 6);
      if (emissiveOnly) { m.map = null; m.color.set(0x111111); }
    }
    if (T.OpacityMask || T.Mask) { m.alphaTest = 0.5; m.side = THREE.DoubleSide; }
    if (Vc.Color1 && /HouseVertex/.test(parent)) m.color.setRGB(...Vc.Color1);
    if (/Ground|DefaultStreet/.test(parent)) { m.roughness = 0.6; m.envMapIntensity = 1.2; }  // damp stone
    if (road) { m.roughness = 0.42; m.color.setRGB(...(Vc.Albedo_2_ColorOverlay || [1, 1, 1]).map((c) => c * 0.55)); m.userData.worldUV = worldUV; }
    const ov = Vc.Albedo_1_ColorOverlay, br = S.Albedo_Brightness;  // Unreal: albedo * overlay * brightness
    if (ov && br && /Ground/.test(parent)) m.color.setRGB(...ov.map((c) => Math.min(1.2, c * br)));
  }
  m.name = key; stylize(m); built.set(key, m); return m;
}
// Shared look: slightly desaturated, warm-cold split, soft contrast. Applied to every material (street, props, characters).
export function stylize(m) {
  const wuv = m.userData.worldUV || 0, bush = m.userData.bush;
  m.onBeforeCompile = (sh) => {
    if (bush) {  // painted foliage like the pack's MM_Bush: dark underside, lit top, blotchy noise, soft rim
      const v3 = (c) => `vec3(${c.map((x) => x.toFixed(4)).join(',')})`;
      sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        { vec3 nW = normalize((vec4(normal, 0.0) * viewMatrix).xyz); vec3 pW = (inverse(viewMatrix) * vec4(-vViewPosition, 1.0)).xyz;
          float n = sin(pW.x * 3.1 + sin(pW.z * 2.3)) * sin(pW.z * 2.7 + pW.y * 1.9) * 0.5 + 0.5;
          vec3 c = mix(${v3(bush.under)}, ${v3(bush.top)}, smoothstep(-0.4, 0.9, nW.y));
          c = mix(c, ${v3(bush.hi)}, smoothstep(0.55, 1.0, n) * 0.35 * smoothstep(0.0, 1.0, nW.y));
          c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.6); diffuseColor.rgb = c * (0.75 + 0.45 * n); }`);
    }
    if (wuv) {  // world-aligned UVs on the ground plane (x, z), like Unreal's WorldAlignedTexture
      sh.vertexShader = sh.vertexShader.replace('#include <fog_vertex>', `#include <fog_vertex>
        { vec4 wpUV = vec4(position, 1.0);
          #ifdef USE_INSTANCING
          wpUV = instanceMatrix * wpUV;
          #endif
          wpUV = modelMatrix * wpUV; vec2 wuv = wpUV.xz * ${wuv.toFixed(4)};
          #ifdef USE_MAP
          vMapUv = wuv;
          #endif
          #ifdef USE_NORMALMAP
          vNormalMapUv = wuv;
          #endif
          #ifdef USE_ROUGHNESSMAP
          vRoughnessMapUv = wuv;
          #endif
          #ifdef USE_AOMAP
          vAoMapUv = wuv;
          #endif
          #ifdef USE_METALNESSMAP
          vMetalnessMapUv = wuv;
          #endif
        }`);
    }
    sh.fragmentShader = sh.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
      { float l = dot(gl_FragColor.rgb, vec3(0.299,0.587,0.114));
        gl_FragColor.rgb = mix(vec3(l), gl_FragColor.rgb, 1.05);
        gl_FragColor.rgb *= mix(vec3(1.0,0.97,0.9), vec3(1.0), smoothstep(0.05,0.4,l)); }`);
  };
  m.customProgramCacheKey = () => 'lagent-style' + wuv + (bush ? JSON.stringify(bush) : '');
}
