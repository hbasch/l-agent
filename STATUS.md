# STATUS : L'Agent web (18/10/2026)

## Fait
- Squelette three.js 0.186 + Vite : première personne (ZQSD/WASD, souris), chargement de la rue, personnages animés, lumières du niveau, post-traitement (GTAO, bloom, grain, vignette ; HDR si le GPU le permet, sinon LDR).
- **Rue** : SampleMap du pack Stylized Paris Street exportée d'Unreal par `tools/unreal/web_export.py` (166 meshes glTF sans matériaux, 447 textures réduites en 1024, layout.json = 1 790 placements, variants.json = surcharges de matériaux, materials.json = paramètres des Material Instances, lights.json). three.js recrée les matériaux (src/materials.js) et dessine en instances (src/street.js). Conversion d'axes vérifiée contre un export Unreal (src/ue.js).
- **Personnages** : Rocketbox (MIT) convertis par `tools/characters/build.sh` (pip bpy 5.2 + ImageMagick), pipeline repris de Tidewater ; squelettes enfants (Bip02) corrigés. Distribution : ines, yanis, sofia, malik, aubry, didier, kevin, policier, policiere (choix provisoires, à valider : variable CAST de build.sh).
- Docs de la version Unreal copiées dans docs/.

## Problèmes ouverts
- Rendu encore plat comparé à l'Unreal (pas de Lumen) : pavés mouillés, flaques (decals), peinture de sommets des façades non exportés ; brouillard et lumières à régler.
- Le sol du pack est un Landscape sans textures (couleur unie) ; les pavés visibles viennent de meshes.
- Inès et Yanis ont 13 ans dans la conception ; les enfants Rocketbox font plus jeunes.
- Les captures en Chromium sans écran (SwiftShader) n'ont pas les cibles flottantes : bloom et AO y sont faux ; vérifier sur un vrai GPU.

## Prochaine action
1. Rendu : decals (flaques), vertex colors, fog et lumières proches de la SampleMap.
2. Collisions (sol, murs) et départ du joueur.
3. Porter la journée « Juin 2027 » (poser la caméra devant le collège) avec ses gestes.
