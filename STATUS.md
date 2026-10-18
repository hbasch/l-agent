# STATUS : L'Agent web (18/10/2026)

## Fait
- Squelette three.js 0.186 + Vite : première personne (ZQSD/WASD, souris), chargement de la rue, personnages animés, lumières du niveau, post-traitement (GTAO, bloom, grain, vignette ; HDR si le GPU le permet, sinon LDR).
- **Rue** : SampleMap du pack Stylized Paris Street exportée d'Unreal par `tools/unreal/web_export.py` (166 meshes glTF sans matériaux, 447 textures réduites en 1024, layout.json = 1 790 placements, variants.json = surcharges de matériaux, materials.json = paramètres des Material Instances, lights.json). three.js recrée les matériaux (src/materials.js) et dessine en instances (src/street.js). Conversion d'axes vérifiée contre un export Unreal (src/ue.js).
- **Personnages** : Rocketbox (MIT) convertis par `tools/characters/build.sh` (pip bpy 5.2 + ImageMagick), pipeline repris de Tidewater ; squelettes enfants (Bip02) corrigés. Distribution : ines, yanis, sofia, malik, aubry, didier, kevin, policier, policiere (choix provisoires, à valider : variable CAST de build.sh).
- Docs de la version Unreal copiées dans docs/.

## 18/10, rendu
- Matériaux refaits par matériau maître du pack (src/materials.js) : normales DirectX (vert inversé), ARM (AO, rugosité, métal), néons (MM_Tegole04 + intensityemissive), route en UV monde (MM_DefaultStreet avec TexCoord > 0, couche 2 = pavés sombres), buissons peints (MM_Bush, shader sans texture), vitres, brouillard en cartes additives.
- Éclairage : HDRI du pack (sky.hdr, exporté de /Game/ParisStreet/HDRI/HDRI1) pour l'environnement et le fond, soleil de la carte, tonalité ACES, exposition 0,85 (?exp=).
- Inès et Yanis : ados (Female_Adult_05 et Male_Adult_17 réduits à 0,93 / 0,95), plus d'enfants.
- Build web : `npm run build` → dist/ (base relative, prêt pour itch.io en HTML5).

## 18/10, suite
- Histoire : incohérences réglées dans docs/CONCEPTION.md v4 (Yanis non français par suppression du droit du sol, Sofia régularisée puis non renouvelée, Malik sur le contingent préfectoral, Aubry poursuivi pour aide, arrêté préfectoral au lieu du panneau de bailleur, caméra 2027 = outil hérité). Nouvelles sources : programme RN 2024 (LCP), projet référendaire 2021 (Public Sénat), affaire Herrou.
- Lumières : 16 lumières du niveau converties (intensités plafonnées), ombre du soleil 4096 recentrée, bloom réduit sans HDR.
- Poids : 107 Mo -> 30 Mo (meshopt sur les GLB, WebP pour les textures : tools/optimize.sh, public/models/street/texweb). Les textures sources (tex1k) restent hors du build.
- Build itch : `npm run build`, zipper le contenu de dist/, itch.io > HTML > « played in the browser ».

## 18/10, journée jouable (en cours)
- Collisions : capsule contre un BVH de toute la rue (src/collision.js, three-mesh-bvh, 413 000 triangles), le joueur marche et monte les trottoirs.
- Système de journée : src/days.js (juin2027), src/interact.js (aller à / maintenir E, losange guide), src/ui.js (cartons, tablette avec tampon « Déjà arrivé », SMS, répliques). Soir à la maison : îlot éclairé avec les meubles du pack (table, chaises, tasse, feuille), Inès assise.
- Juin 2027 : carton Mai 2027 > café du matin (plan fixe, clic pour passer) > tablette > fixer la caméra sur la façade près de l'arche (collège) > brancher au coffret électrique > SMS de Didier > Sofia remercie > soir > carton Mai 2029. 2 gestes seulement (règle de simplicité).
- Caméra de vidéosurveillance modélisée en Blender headless (tools/props/camera.py, ~9 500 triangles, support, pare-soleil, LED, câble).
- Personnages reconvertis avec assis / salut / travail à table, puis compressés (tools/optimize.sh).
- Matériaux : plus de métal (canal bleu peu fiable, noir sans Lumen), AO à 60 %.
- Robot de test : `node tools/robot.mjs` (?auto : la journée se joue seule, captures dans robot/). Sondes de collision : `node tools/probe.mjs`.

## Bug ouvert (prioritaire)
- Le robot bloque sur le geste « fixer la caméra » : la barre démarre puis ne termine pas. Vérifier sur un vrai GPU (le Chromium du cloud fait ~1 image/s) : condition de visée (`aim` dans interact.js), position du joueur après téléportation (src/player.js), cumul de cur.t. Le jeu à la main n'a pas encore été testé.

## Prochaine action précise
1. Lancer `npm run dev`, jouer juin 2027 à la main, corriger le geste et les positions (CAM, BOX dans src/days.js) si besoin.
2. `npm run build`, zipper dist/, remplacer le fichier sur itch.io (projet en HTML, joué dans le navigateur).
3. Avec Blender ouvert (MCP) : récupérer ou modéliser proprement urne, isoloir, frigo, échelle, visseuse, camionnette, bus. Règles dans docs/ASSETS.md.
4. Journée mai 2029 (plaque + arrêté dans le hall de Malik), même structure que juin 2027.

## Problèmes ouverts
- Rendu encore plat comparé à l'Unreal (pas de Lumen) : pavés mouillés, flaques (decals), peinture de sommets des façades non exportés ; brouillard et lumières à régler.
- Le sol du pack est un Landscape sans textures (couleur unie) ; les pavés visibles viennent de meshes.
- Inès et Yanis ont 13 ans dans la conception ; les enfants Rocketbox font plus jeunes.
- Les captures en Chromium sans écran (SwiftShader) n'ont pas les cibles flottantes : bloom et AO y sont faux ; vérifier sur un vrai GPU.

## Prochaine action
1. Rendu : decals (flaques), vertex colors, fog et lumières proches de la SampleMap.
2. Collisions (sol, murs) et départ du joueur.
3. Porter la journée « Juin 2027 » (poser la caméra devant le collège) avec ses gestes.
