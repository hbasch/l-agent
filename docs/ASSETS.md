# Assets

## Rue (Stylized Paris Street, Fab)
Licence achetée par l'auteur, **jamais dans un dépôt public**. Pour reconstruire `public/models/street/` :
1. Copier `Content/ParisStreet` du projet StylizedParisStreet dans Sabotage_V2 (même version UE 5.8) ; plugin GLTFExporter activé.
2. Dans l'éditeur Sabotage_V2, ouvrir `/Game/ParisStreet/Levels/SampleMap`, écrire layout.json / variants.json / materials.json / lights.json, puis `web_export.meshes()` et `web_export.textures()` (voir tools/unreal/web_export.py ; budget de temps par appel, relancer jusqu'à 0 restant).
3. Réduire les textures en 1024 (tex1k, PNG si alpha) et lister les PNG dans tex1k/png.json.
Ne pas activer le « material baking » de l'exportateur glTF : il fait planter l'éditeur (MaterialBaking, SharedPointer IsValid).

## Objets à ajouter (frigo, urne, isoloir, camionnette, visseuse, caméra, scellés, bus...)
Règle de cohérence avec le pack (style peint, formes un peu épaissies, couleurs chaudes) :
- Source : modèle détaillé (Poly Haven CC0, Sketchfab licence vérifiée, ou Blender) ; jamais de cube provisoire.
- Dans Blender : biseauter les arêtes vives, simplifier les détails trop fins, textures 1024 max.
- Dans le jeu : matériau passé par `stylize()` ; teinte rapprochée de la palette du pack (albedo un peu désaturé, rugosité haute).
- Exporter en GLB (mètres, Y en haut), le poser par un fichier de placement comme layout.json.

## Modélisation dans Blender (demande de l'auteur)
- Des modèles corrects, jamais « moches » : prendre le temps qu'il faut. Proportions réelles, biseaux, détails secondaires (vis, joints, câbles, étiquettes), matériaux séparés (métal peint, plastique, caoutchouc, verre).
- Vérifier chaque modèle avec `look` (plusieurs angles) avant export, puis dans le jeu à côté des objets du pack.
- Préférer un modèle Poly Haven / Sketchfab de qualité (licence vérifiée) à un modèle fait vite.
- Exemple : tools/props/camera.py (caméra de vidéosurveillance, ~9 500 triangles).
