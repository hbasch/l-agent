# « L'Agent » : brief de départ (16 octobre 2026)

Note du 17 octobre : le déroulé et les personnages ont évolué, CONCEPTION.md fait foi. Ce brief garde le contexte, les ressources et les outils.

Deuxième projet de **Hadrien Basch**, après « Rien de grave » (récit web three.js, dépôt github.com/hbasch/rien-de-grave). Même angle : à quoi ressemblerait la France sous un gouvernement RN, avec des rappels du passé et des faits sourcés. Mais cette fois c'est une expérience jouable en **Unreal Engine 5**, plus prenante, avec peu de texte, de la violence et des conséquences visibles. Elle sera téléchargeable sur itch.io, et on en tirera des vidéos pour les réseaux sociaux.

## Comment travailler (demande de l'auteur)

- **Être autonome au maximum** sur Unreal et Blender (pilotage par MCP et Python), et montrer des **points d'étape** : captures du viewport, courtes vidéos, liste de ce qui est fait et de ce qui reste. Ne pas attendre une validation pour chaque détail.
- **Diffamation** : personnages, commerces et entreprises fictifs. Ne jamais prêter de paroles ou d'actes inventés à une personne réelle. Tout fait réel est sourcé. Une personne mise en examen n'est pas « condamnée ».
- Préférer les exemples des **dictatures d'extrême droite** (Vichy, Franco, Pinochet, Argentine) et de l'**actualité américaine** (ICE, CECOT) à la Russie.
- Pas de musique pour l'instant. Pour les sons : Soundly (installé sur le PC : `Soundly Audio`, `Soundly Data`) ou ElevenLabs (connecteur disponible).
- Crédit « Hadrien Basch » au début et à la fin.
- **Blender** : ne jamais lancer `bpy.ops.wm.read_factory_settings`, ça coupe le serveur MCP.

## Le concept retenu

Tu es **agent technique de la Préfecture de police de Paris**, quartier Saint-Michel. Rappel utile : à Paris, la police dépend directement de l'État, donc un gouvernement RN la contrôle sans passer par une mairie. Ton travail : poser des panneaux et des barrières, changer des plaques, installer des caméras, vider des locaux. C'est un travail du quotidien : « je fais juste mon travail ».

Chaque journée jouée correspond à une année, de 2027 à 2034. Le travail devient de plus en plus horrible. **À la fin, on te demande de conduire un bus pour une opération de « reconduite » à l'aube.**

Rappel historique central : en juillet 1942, pendant la rafle du Vél' d'Hiv, une partie des personnes arrêtées est emmenée à Drancy par les autobus de la STCRP, l'ancêtre des transports parisiens, avec leurs chauffeurs (source : https://fr.wikipedia.org/wiki/Rafle_du_V%C3%A9lodrome_d%27Hiver). Certains ont échappé à la rafle grâce à la Résistance ou au « manque de zèle de certains policiers ».

## Game design d'origine (remplacé par CONCEPTION.md)

**Boucle quotidienne.** Pointer au dépôt, recevoir le bon de travaux sur une tablette, prendre la camionnette, intervenir sur 3 ou 4 sites autour de la place Saint-Michel, puis rentrer. Les gestes se font à la première personne, avec les mains : dévisser, coller, porter, poser, peindre.

**Pression.** Un taux de réalisation affiché et une prime ; le loyer ; une fille, Inès, 9 ans ; un chef d'abord sympathique, puis menaçant ; un collègue, Didier, de plus en plus zélé.

**Marges de manœuvre.** Mal faire le travail, traîner, « perdre » une plaque, prévenir quelqu'un par SMS, laisser une porte ouverte. Chaque geste a un risque. **Retournement central : les caméras que tu as installées les premières années servent ensuite à te surveiller.** Si tu refuses : avertissement, baisse de salaire, Didier fait le travail à ta place, convocation.

**Conséquences visibles.** Les arrestations ont lieu sur les sites où tu viens de travailler. La violence est montrée, mais jamais gratuite.

**Fin.** Trois issues : conduire, refuser, ou saboter (pneu crevé). Dans tous les cas, les autres bus partent. Puis les archives de 1942 et la plaque du pont Saint-Michel sur le 17 octobre 1961, posée en 2001 (https://www.publicsenat.fr/article/politique/paris-une-stele-en-hommage-aux-victimes-algeriennes-du-17-octobre-1961-146409).

**Sur chaque bon de travaux.** Le tampon « Déjà arrivé », avec la source du précédent réel, comme dans « Rien de grave ».

## Précédents notés dans le brief d'origine (à vérifier avant usage)
- Elne, cinéma René-Vautier rebaptisé en 2026.
- Castres, mairie RN, 2026 : pièce de théâtre annulée.
- Hayange, mairie FN, 2016 : Secours populaire sommé de partir, gaz et électricité coupés ; la justice ordonne de les rétablir en 2017 (https://www.demotivateur.fr/article/hayange-victoire-pour-le-secours-populaire-qui-s-etait-vu-prive-de-gaz-et-d-electricite-pendant-un-an-12145).
- Hongrie, 2025 : caméras à reconnaissance faciale.
- Orange, mairie FN, 1996 : « ouvrages idéologiques ».
- Möbel-Aktion : pillage des appartements juifs à Paris sous l'Occupation (chiffres à vérifier).

Faits déjà vérifiés et sourcés dans « Rien de grave », à réutiliser : voir la fin de `rien-de-grave.html` (écran de fin) sur GitHub. Par exemple : le Vél' d'Hiv ; les naturalisations révisées sous Vichy ; l'Argentine ; CECOT et ICE ; Minneapolis, janvier 2026 ; les contrôles au faciès (Défenseur des droits, 2017 : 20 fois plus de risques pour les jeunes hommes « perçus comme noirs ou arabes ») ; la « priorité nationale » et la « présomption de légitime défense » (programme RN).

## Ressources

**Décor.** Scans **Paris Saint-Michel** de Scans Factory : la fontaine Saint-Michel et les rues autour, en photogrammétrie, plus de 1 000 éléments (https://80.lv/articles/stunning-fontaine-saint-michel-paris-streets-recreated-with-photogrammetry/). Complément possible : City Core – Paris (Fab).

**Animations.**
- **Danger Pack** de MoCap Central (plus de 250 animations : mains en l'air, recroquevillé, captif ligoté, chutes, deuil ; squelette UE5 Mannequin, compatible MetaHuman).
- **MC Sample** : `C:\Users\hadri\Music\rien-de-grave\anims\MC_Sample_SourceFiles` (UE5_Skel).
- **Il manque** des animations d'interpellation (menottage, plaquage au sol, escorte). À chercher sur Fab ou Mixamo, ou à composer.

**Personnages.** MetaHumans (gratuits) et City Sample Crowd (Fab, gratuit). Uniformes de police française : rien de tout fait. Retexturer un pack générique ou garder la police à distance.

**Véhicules.** City Sample Vehicles (gratuit). Il faut un bus et une camionnette d'entretien.

**Style.** Réaliste grâce aux scans. Personnages = point faible, donc post-process légèrement stylisé (grain, couleurs désaturées) à tester.

**Outils sur le PC (Windows, utilisateur `hadri`) :**
- Blender, avec le MCP « blender » ; il fonctionne via `execute_blender_code`.
- Projet Unreal « Sabotage_V2 » avec son MCP « sabotage-unreal » (`run_python`, `viewport_screenshot`, `build`, `launch_editor`). L'Agent est hébergé dans `/Game/LAgent` ; ne rien modifier ailleurs.
- Le MCP « unreal » générique était en erreur le 16 octobre.

## Premières étapes
1. État des lieux sur le PC : version d'Unreal, emplacement des scans Saint-Michel, du Danger Pack et de Sabotage_V2, MCP disponibles.
2. Rue + première personne + premier geste jouable, chronométré. Point d'étape en vidéo.
3. Une première journée complète, puis les suivantes selon CONCEPTION.md.
