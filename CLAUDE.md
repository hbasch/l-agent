# CLAUDE.md : « L'Agent », version navigateur (three.js)

Jeu court (~14 min) à la première personne de Hadrien Basch, jouable dans le navigateur. Port web de la version Unreal (Sabotage_V2/LAgent sur le PC de l'auteur). Lire **docs/CONCEPTION.md** (histoire, journées, sources) et **STATUS.md** (état, prochaine action) avant toute tâche. Référence technique et visuelle : Tidewater (github.com/dgreenheck/tidewater, MIT).

## Langue et ton
Français, tutoiement, court et direct. Pas de tiret cadratin. Expliquer les termes techniques.

## Façon de travailler
- Autonomie maximale, points d'étape avec captures (`npm run dev` puis `node tools/shot.mjs "<query>" out.jpg`, 960x540, Chromium sans écran).
- Économiser les tokens : captures seulement aux points d'étape, logs filtrés, scripts réutilisables.
- Tenir **STATUS.md** à jour à la fin de chaque étape (il sert au transfert vers un autre compte).

## Règles absolues
- **Pas de placeholders** : des objets vraiment détaillés (pack Paris, Poly Haven, Sketchfab avec licence vérifiée, Blender) ou rien.
- **Style unique** : tout matériau passe par `stylize()` (src/materials.js) et le post-traitement commun (src/post.js). Un objet ajouté (frigo, urne, camionnette, visseuse...) doit être réglé pour coller au pack Stylized Paris Street : voir docs/ASSETS.md.
- **Licences** : le pack Stylized Paris Street (Fab) ne va jamais dans un dépôt public (`public/models/street/` est ignoré par git). Rocketbox (MIT), Poly Haven (CC0), Tidewater (MIT) : citer dans CREDITS.md.
- **Blender** sur le PC de l'auteur (MCP) : ne jamais lancer `bpy.ops.wm.read_factory_settings`. (Le `convert.py` des personnages tourne avec le module pip `bpy`, hors MCP : là, c'est permis.)
- **Diffamation** : personnages, commerces et entreprises fictifs. Faits réels toujours sourcés dans docs/CONCEPTION.md ; « À SOURCER » = absent du jeu.
- Exemples historiques : Vichy, Franco, Pinochet, Argentine, actualité américaine (ICE, CECOT) plutôt que la Russie.
- Crédit « Hadrien Basch » au début et à la fin. Pas de musique pour l'instant.
