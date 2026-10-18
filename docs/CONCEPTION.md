# L'Agent : conception (v3, 17 octobre 2026)

## L'histoire en 5 phrases
Nathalie vote RN en 2027 par ras-le-bol. Elle est agente technique à la Préfecture de police : elle pose dans sa rue ce qu'on lui dit de poser. Au début, rien de grave : une caméra devant le collège de sa fille, une plaque changée, un panneau « priorité nationale » dans le hall d'un immeuble. Mais chaque objet qu'elle installe se retourne ensuite contre ses voisins : le panneau chasse Malik de son logement, la caméra identifie Sofia, sa propre belle-sœur, les numéros qu'elle peint désignent les portes de la rafle. Pendant ce temps, son loyer monte et sa prime reste gelée. À la fin, on lui donne les clés du bus qui emmène ses voisins et son neveu, en lui montrant l'image de la caméra où elle apparaît avec sa fille, comme les chauffeurs de bus parisiens qui ont conduit les familles du Vel d'Hiv en 1942.

## Le jeu en bref
- **~14 min**, première personne, UE 5.8, hébergé dans Sabotage_V2 (dossier /Game/LAgent), systèmes écrits à neuf, sans Story Framework ni GASP.
- Tu joues **Nathalie**, 41 ans, agente technique de la Préfecture de police de Paris, mère séparée d'Inès (13 ans en 2027, en 5e ; 20 ans en 2034). Elle a voté RN « parce qu'elle en avait marre » (loyer, prime gelée, sentiment d'être oubliée). On ne voit que ses mains.
- Public : les gens qui pensent voter RN. Pas de jugement : l'héroïne leur ressemble.
- Lieu (choisi par l'auteur le 17/10) : la placette du lampadaire M_StreetLamp_04_Dec93 (x≈2350, y≈12500) et le bout nord de la rue de L_Rue. Tout existe déjà dans le pack, on ne modifie pas les boutiques pour l'instant : librairie d'Aubry = « Livres – Journaux – Magazines » ; fleuriste à côté ; terrasse de café sur la placette et café dans la rue ; collège = grand portail (3945, 11650) ; plaque « Rue Lucie-Aubrac » au coin, à sa vraie hauteur (on la change avec une échelle). Cartes : L_Juin2027, L_Rue (copies du pack, déjà sur ce lieu).
- Les mains font vraiment chaque geste (≈8 animations + IK). **Chaque geste dure 20 s maximum** : à chronométrer dès le premier prototype.
- Violence de près, brutale et injuste, toujours conséquence d'un objet que Nathalie vient d'installer.
- Très peu de texte : bon de travaux sur tablette, 1 SMS de Didier par matin, tampon « Déjà arrivé » + source.

## Trois règles de progression
1. **Pas de geste de travers avant 2031.** Avant, Nathalie fait son travail sans y penser, et le jeu ne propose rien d'autre. Le joueur découvre qu'il pouvait faire autrement au moment où elle le découvre.
2. **Nathalie n'est jamais contente du sale boulot.** Elle est contente de ce qui l'arrange (la caméra devant le collège d'Inès), indifférente au reste. Elle ne sait pas qui est le colonel de la nouvelle plaque.
3. **Personne n'est frappé sans avoir été vu au moins deux fois.**

## Personnages (fictifs : 5 visages, 1 voix)
| Personnage | Geste | Objet | Phrase |
|---|---|---|---|
| Sofia, serveuse au Chat Rouquin, compagne de Kevin (frère de Nathalie), belle-sœur de Nathalie | Sert Nathalie sans qu'elle demande | La tasse | « Comme d'hab. » |
| Yanis, 13 ans en 2027, fils de Sofia et Kevin, cousin et meilleur ami d'Inès, même classe | Devoirs au comptoir | Une photo de photomaton avec Inès, aimantée sur le frigo | (aucune) |
| Malik, kiosquier, voisin d'Aubry | Tend le journal | Le journal | « Alors, ça va changer ? » |
| M. Aubry, libraire | Met un livre de côté pour Inès | Le livre, sur la table d'Inès | « Pour Inès. » |
| Inès, 13 ans en 2027 (adolescente : pas d'enfants dans le jeu), fille de Nathalie | Le soir, à table | Le frigo, la table | Une phrase par soir maximum |
| Didier, collègue, a voté comme elle, de plus en plus zélé | SMS seulement | | |
| Kevin, frère de Nathalie, a voté comme elle | Photo sur le frigo + 1 SMS en 2031 | | « Ils ont pris Sofia. Tu bosses avec eux, fais quelque chose. » |

**Règle d'identification :** les victimes doivent toucher la famille de Nathalie (Sofia, Yanis), un Français ordinaire puni pour avoir aidé (Aubry), et Nathalie elle-même (loyer, prime, caméra). Pas seulement des étrangers.

## Comment on comprend sans texte
- **Le café du matin, 15 s.** Même plan fixe chaque journée : Sofia sert, Yanis au comptoir, Malik au kiosque en face, la vitrine d'Aubry à côté. Ensuite on lit ce qui manque : kiosque fermé, vitrine vide, inconnu derrière le comptoir, tabouret vide.
- **La maison, le soir.** Même mise en scène que l'urne : un îlot éclairé dans le noir (table, frigo, Inès). Le frigo et la table changent : photo de Kevin, Sofia et Yanis, photomaton d'Inès et Yanis, livre d'Aubry, puis leur absence. Sur le frigo aussi, chaque soir : la quittance de loyer qui monte et la fiche de paie, prime toujours gelée. Le vote n'a rien changé pour elle.
- **Les objets de travail portent les noms.** Le bon de travaux donne l'adresse (« 12 rue de la Huchette ») : on reconnaît l'immeuble de Malik. Le scellé porte « Librairie Aubry ».
- **L'histoire derrière : seulement le tampon et la fin.** Chaque bon porte « Déjà arrivé » + une ligne de source. Les archives finales donnent le sens d'un coup.

## Déroulé
| Journée | Les mains | Travers | Le soir | Durée |
|---|---|---|---|---|
| Mai 2027, le vote | Bulletin, isoloir, urne. « A voté. » | non | Malik : « Alors, ça va changer ? » | 1 min |
| Juin 2027 | Poser une caméra devant le collège d'Inès (tuto : dévisser, fixer, brancher) | non | Maison : les parents l'ont remerciée, Inès contente. | 2,5 min |
| Mai 2029 | Plaque de l'allée : la résistante remplacée par un colonel (carton fourni, elle visse sans lire). Visser dans le hall de l'immeuble de Malik le panneau du bailleur : « Attributions et renouvellements : priorité nationale » | non | Malik, 30 ans en France, carte de résident, reçoit la lettre : bail non renouvelé. Il descend ses cartons devant le kiosque. Inès : « Malik déménage ? Il est là depuis toujours. » Aubry l'héberge. | 3 min |
| Mars 2031 | Scellés sur la librairie d'Aubry (il héberge Malik et a affiché une pétition en vitrine), cartons de livres au camion | **Premier travers :** SMS à Sofia (titre de séjour non renouvelé) | Avis de recherche avec l'image de SA caméra. Sans SMS : Sofia arrêtée devant Yanis. Avec SMS : Sofia fuit, Yanis, qui rentre du lycée, est intercepté et recueilli par Malik. SMS de Kevin. Maison : le photomaton d'Inès et Yanis sur le frigo. | 3 min |
| Nov. 2033 | Peindre des numéros sur les portes « à libérer » de l'immeuble d'Aubry, où vivent Malik et Yanis | Laisser la porte de service ouverte | La rafle sur les portes numérotées, Nathalie tient la porte cochère. Aubry traîné. Malik et Yanis emmenés, ou Yanis s'échappe par la porte de service. Inès : « Yanis devait passer. Il est pas venu. » | 2,5 min |
| Aube 2034 | Si travers faits : Didier montre sur la tablette l'image de la caméra du collège (2027), Nathalie avec Inès, sans un mot. Puis clés du bus n° 3 ; Malik, Aubry (et Yanis, son neveu) dedans | Conduire / refuser / crever le pneu | Les autres bus partent dans tous les cas. | 1,5 min |
| Archives | Vel d'Hiv, bus STCRP, « manque de zèle de certains policiers », plaque du 17 octobre 1961. Crédit Hadrien Basch. | | | 1 min |
| | | | **Total** | **≈ 14 min** |

Gestes de travers : à faire hors de la vue de Didier et des caméras. Ratés : avertissement, prime supprimée, Didier fait ta tâche, convocation.

## Tampons « Déjà arrivé » (sources)
- **2027, caméra.** Vidéosurveillance algorithmique (un logiciel analyse les images en direct) : expérimentation des JO 2024 prolongée jusqu'à fin 2027, puis votée au Sénat en mai 2026 jusqu'en 2030 et étendue aux voies publiques. https://next.ink/239545/videosurveillance-algorithmique-la-loi-ripost-etend-encore-la-prolongation-jusquen-2030/
- **2029, plaque.** Perpignan (mairie RN) : esplanade au nom de Pierre Sergent, ancien chef de l'OAS, présenté comme « résistant ». Délibération annulée par le TA de Montpellier en mars 2025, la mairie fait appel et garde la plaque. https://www.lemondedudroit.fr/public/282-droit-public-general/97174-denomination-des-lieux-publics-pas-de-place-pierre-sergent-a-perpignan.html
- **2029, panneau.** Proposition de loi RN du 5 mars 2024 « visant à instaurer la priorité nationale dans l'attribution des logements sociaux ». https://www.assemblee-nationale.fr/dyn/16/textes/l16b2277_proposition-loi.pdf
- **Fil rouge : la priorité nationale** (logement, emploi, prestations) est LE marqueur RN du jeu. Ne pas utiliser de mesures déjà votées par d'autres (ex. présomption de légitime défense, adoptée à l'Assemblée le 7 juillet 2026 sur un texte LR) : elles ne disent rien de spécifique au RN.
- **2031, librairie.** Orange, 1996 : le maire FN fait retirer des ouvrages de la bibliothèque municipale (« atteinte aux bonnes mœurs », « mondialisme »), relevé par un rapport de l'Inspection générale des bibliothèques. https://www.livreshebdo.fr/article/aurelie-filippetti-lance-un-appel-la-vigilance-republicaine (rapport : https://www.vie-publique.fr/files/rapport/pdf/974039200.pdf)
- **2033, numéros.** Paris, 1940-1942 : la Préfecture de police tient le fichier des Juifs recensés (noms, adresses) ; il est mobilisé pour la rafle du Vel d'Hiv. https://www.universalis.fr/encyclopedie/rafle-du-vel-d-hiv/ (fiches remises aux équipes d'arrestation : https://www.defense.gouv.fr/chemins-memoire/histoire-memoires/ressources-historiques/seconde-guerre-mondiale/sort-juifs-tsiganes-0)
- **2034, bus.** Vel d'Hiv, juillet 1942 : les personnes arrêtées emmenées par les autobus de la STCRP et leurs chauffeurs. https://fr.wikipedia.org/wiki/Rafle_du_V%C3%A9lodrome_d%27Hiver
- **Archives.** Plaque du 17 octobre 1961 posée le 17 octobre 2001 par Bertrand Delanoë. https://www.politis.fr/articles/2015/10/jean-luc-einaudi-pionnier-en-histoire-32688/

## Production
- Pack Paris : carte L_Paris_01_01_P (+ éclairages Day/Overcast/Sunset/Night), dans Content/Paris/Demo/Maps.
- Danger Pack, MC Sample, City Sample Vehicles, Posed Humans : cache Fab (C:\ProgramData\Epic\EpicGamesLauncher\VaultCache).
- Décors à ajouter : comptoir du Chat Rouquin visible depuis la rue, kiosque, vitrine de librairie, hall d'immeuble avec panneau, portes d'immeuble, îlot maison (table, frigo), isoloir.
- Manque : bus, camionnette, animations des mains, animations d'interpellation, personnages (MetaHumans : Sofia, Yanis, Malik, Aubry, Inès).
- Étapes : 1) rue + première personne + geste « poser la caméra », chronométré ; 2) journée 2027 complète avec café et maison ; 3) 2029, 2031, 2033 ; 4) aube, fins, archives ; 5) sons, post-process, build itch, vidéos.

## Questions ouvertes
- MetaHumans déjà prêts (projet Metahuman58) ?
- Animations des mains : Control Rig/IK dans Unreal, ou source mocap ?
- Le prénom « Nathalie » convient-il ?
