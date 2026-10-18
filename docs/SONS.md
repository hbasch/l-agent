# L'Agent : liste des sons

**Comment faire** : enregistrer chaque son sous le **nom de fichier** indiqué (wav ou mp3, n'importe quelle durée), le déposer dans `Sabotage_V2/Sons/`, puis lancer `Tools/LAgent/sons.py` (ou me le demander). Le script convertit, importe, met en boucle ce qui doit boucler et branche tout dans les cartes. Un son absent est simplement ignoré.
Source conseillée : **S** = Soundly (bruitages réels), **E** = ElevenLabs (voix, ou bruitage introuvable). Pas de musique.

## Ambiances (en boucle, 1 à 2 min, sans événement marquant)
| Fichier | Où | Ce qu'on entend | Src |
|---|---|---|---|
| amb_rue_matin | Juin 2027, Mai 2029, Mars 2031, Nov 2033 | Petite rue de Paris le matin : pas lointains, vaisselle de café, pigeons, un scooter au loin | S |
| amb_rue_soir | Mars 2031, le soir | Même rue au crépuscule, plus vide, circulation lointaine | S |
| amb_aube | Rafle (5 h) et aube 2034 | Ville avant l'aube : presque silence, un moteur diesel au ralenti, oiseaux rares | S |
| amb_maison | Les soirs à la maison | Cuisine la nuit : frigo qui ronronne, horloge discrète, rue très lointaine | S |
| amb_vote | Vote | Bureau de vote : murmures, pas sur parquet, chaises | S |

## Interface et pas
| Fichier | Quand | Ce qu'on entend | Src |
|---|---|---|---|
| sms | Chaque SMS reçu | Vibreur court d'un téléphone professionnel | S |
| pas_paves | Rue, placette | Pas de chaussures de travail sur pavés (un seul pas par fichier) | S |
| pas_parquet | Maison, vote | Un pas sur parquet | S |

## Gestes de Nathalie
| Fichier | Geste | Ce qu'on entend | Src |
|---|---|---|---|
| portes_camion | Ouvrir les portes arrière | Deux portes battantes de fourgon | S |
| caisse_outils | Prendre dans la caisse | Caisse à outils métallique qu'on ouvre | S |
| visseuse | Dévisser / visser (boucle tant qu'on tient) | Visseuse sans fil en marche | S |
| camera_fixer | Fixer la caméra | Clic plastique, vis serrée | S |
| cable_brancher | Brancher le câble | Connecteur qui s'enclenche | S |
| echelle_poser | Poser l'échelle contre le mur | Échelle en alu contre la pierre | S |
| echelle_monter | Monter / descendre | Barreaux d'échelle sous les pas | S |
| plaque_decrocher | Décrocher la plaque | Plaque émaillée qu'on décolle du mur | S |
| coffre_ranger | Ranger dans le camion | Objet posé dans un fourgon vide | S |
| carton_prendre | Prendre un carton de livres | Carton lourd soulevé | S |
| carton_charger | Charger le carton | Carton posé dans le fourgon | S |
| papier_arracher | Retirer la pétition | Papier scotché qu'on arrache | S |
| ruban_scelles | Poser les scellés (boucle) | Ruban adhésif qu'on déroule | S |
| bombe_peinture | Peindre les numéros (boucle) | Bombe de peinture qu'on secoue puis pulvérise | S |
| serrure_cle | Fermer la porte de service | Clé dans une vieille serrure | S |
| porte_grince | Laisser la porte de service ouverte | Porte qui grince et reste entrouverte | S |
| porte_lourde | Tenir la porte de l'immeuble | Lourde porte cochère qu'on retient | S |
| cles | Prendre les clés du bus | Trousseau de clés | S |
| pneu_air | Crever le pneu (boucle) | Air qui s'échappe d'un pneu | S |
| portiere_camion | Remonter dans le camion / rentrer | Portière de fourgon qui claque | S |
| urne | Glisser l'enveloppe | Enveloppe dans l'urne + clac du couvercle | S |
| interrupteur | Éteindre la lumière | Interrupteur ancien | S |

## Voix (ElevenLabs ; jouées avec le sous-titre)
| Fichier | Réplique | Voix |
|---|---|---|
| voix_sofia_commedhab | « Comme d'hab. » | Sofia, 34 ans, serveuse, chaleureuse, accent de Paris |
| voix_serveur | « Ce sera quoi ? » | Homme, 40 ans, neutre, pressé |
| voix_ines_2027 | « Le principal a dit que la caméra, c'est grâce à toi. » | Inès, 13 ans, fière mais l'air de rien |
| voix_ines_2029 | « Malik déménage ? Il est là depuis toujours. » | Inès, 15 ans, inquiète |
| voix_ines_2031 | « Yanis répond plus à mes messages. » | Inès, 17 ans, inquiète, fermée |
| voix_ines_2033 | « Yanis devait passer. Il est pas venu. » | Inès, 19 ans, voix blanche |
| voix_sofia_yanis | « Yanis ! Va chez Malik ! » | Sofia, cri, panique |
| voix_aubry_lachez | « Lâchez-moi ! Laissez au moins le gamin ! » | M. Aubry, 70 ans, libraire, cri |

## Violence et foule
| Fichier | Moment | Ce qu'on entend | Src |
|---|---|---|---|
| radio_police | Arrivée des policiers (2031, 2033) | Grésillement de radio de police, voix inintelligible | S |
| menottes | Sofia (2031), Malik (2033) | Menottes qui claquent | S |
| pleurs_enfant | Yanis (17 ans) voit sa mère arrêtée | Adolescent qui pleure, étouffé | E ou S |
| corps_traine | Aubry traîné | Corps traîné sur les pavés, souffle | S |
| course_enfant | Yanis (19 ans) s'enfuit (porte de service) | Pas d'un jeune qui court et s'éloigne | S |
| bus_depart | Départ des bus 1 et 2 (aube 2034) | Vieux bus diesel qui démarre et s'éloigne | S |

## Pas encore prévus dans le jeu (à décider)
- Tablette (ouvrir / ranger), notification « Dans le champ » de la caméra, téléphone quand on écrit à Sofia.
- Voix de Malik au soir du vote (« Alors, ça va changer ? ») : la scène n'existe pas encore.
- Sirènes lointaines pendant la rafle.
