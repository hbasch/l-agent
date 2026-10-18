# L'Agent : ce qui reste à faire (17/10/2026)

## Toi (objets, décor, rendu)
1. **Placer les objets** de chaque journée sur mes repères (menu « L'Agent » > Lister les repères) : camionnette, kiosque, bus 1, 2, 3 et bus de police, échelle, cartons, pétition, scellés, numéros peints, porte de service (hors du champ de la caméra de l'école).
2. **Les sons** : la liste est dans `LAgent/SONS.md` (44 fichiers, noms imposés). Tu les déposes dans `Sabotage_V2/Sons/`, je lance le branchement.
3. **Les personnages** : remplacer les corps City Sample par les MetaHumans (Sofia, Yanis, Malik, Aubry, Inès) ; uniformes de police.
4. **La lumière** de chaque journée (matin, soir, nuit 5 h, aube) et le post-process.
5. **Un vrai test complet** en jouant, puis me donner `Saved/LAgent/chronos.csv` (temps réels par geste).

## Moi (systèmes, histoire, vérifications)
1. **Rythme** : ajuster les journées d'après tes chronos (20 s max par geste, ~3 min par journée, ~14 min en tout).
2. **Image de 2027 à l'aube 2034** : aujourd'hui c'est un SMS texte. Faire une vraie image sur la tablette (capture de la caméra de l'école en 2027, Nathalie avec Inès) : il faut qu'Inès soit avec Nathalie dans la scène de Juin 2027.
3. ~~Scène du soir du vote~~ : faite (L_SoirVote), journal à remplacer par un vrai modèle.
4. **Échelle** : vérifier la portée réelle en haut (le robot ne la teste pas) ; animation des mains sur les barreaux.
5. **Animations des mains** pour chaque geste (visseuse, carton, ruban, bombe) : aujourd'hui une pose générique.
6. **Policiers** : arrivée, interpellation, escorte à affiner (anims Danger Pack + déplacements).
7. **Sons non prévus** à brancher si tu les veux : tablette, téléphone, alerte caméra, sirènes.
8. **Build packagé** itch.io (cartes déjà listées), puis menu des chapitres pour les vidéos.
9. Nettoyage : supprimer L_Mai2029Soir et les scripts de l'ancienne conception (build_soir.py, build_plaque.py, build_juin2027.py…).

## Ce que je peux vérifier seul (déjà en place)
- **Robot de test** (`autotest.py`, touche 5) : chaque journée de bout en bout, avec ou sans les choix. Détecte une étape impossible.
- **Planches de vérification** (`verif.py`) : une photo de chaque objet, personnage et repère de L'Agent dans une carte, assemblées en une seule image. Je vois si un objet manque, flotte, est caché ou mal orienté.
- **Chronos** (`Saved/LAgent/chronos.csv`).
- **Journal d'Unreal** : erreurs pendant une partie.

## Outils qui m'aideraient (à ta décision)
- **OBS avec son « WebSocket » activé** (Outils > Paramètres du serveur WebSocket, sans mot de passe ou en me le donnant) : je pourrais lancer et arrêter des enregistrements vidéo d'une partie jouée par le robot ou par toi, puis en extraire des images avec ffmpeg. OBS et ffmpeg sont déjà installés.
- **Une manette ou une partie enregistrée** ne sont pas nécessaires : le robot suffit pour la logique ; le ressenti (rythme, lisibilité) reste ton test.
- **ElevenLabs** : si tu veux que je génère les voix moi-même, il faut un connecteur ElevenLabs actif dans cette session (je ne l'ai pas ici). Sinon tu les génères avec les textes de SONS.md.
