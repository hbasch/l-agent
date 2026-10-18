// The days. Each day is an async script using the game API (g). Text stays minimal (CONCEPTION.md).
import * as THREE from 'three';
import { ui, sleep } from './ui.js';

const CAM = [2.2, 2.4, -12.55], CAM_AIM = [2.2, 2.1, -12.4], CAM_STAND = [2.2, -11.1];  // facade next to the arch (collège)
const BOX = [6.25, 1.1, -7.8], BOX_STAND = [7.3, -7.8];

export async function juin2027(g) {
  await ui.card('Mai 2027', 'Nathalie a voté. « Il faut que ça change. »', 3200);
  await ui.card('Juin 2027', '', 2000);
  // morning coffee: fixed shot, 15 s, click to skip
  g.cast.sofia.place(0.3, 2.2, Math.PI * 1.15, 'idle_breathe_01');
  g.cast.yanis.place(1.5, 2.0, Math.PI * 1.05, 'gestic_talk_relaxed_01');
  g.cast.ines.place(0.9, 1.4, Math.PI * 0.25, 'gestic_talk_neutral_01');
  g.cast.malik.place(4.4, -9.0, Math.PI * 0.9, 'idle_look_around_01');
  await g.shot([-2.6, 1.6, -2.4], [0.9, 1.4, 2.0]); await ui.uncard();
  await Promise.race([ui.say('Sofia : « Comme d’hab. »', 3500).then(() => sleep(9000)), ui.waitKey()]);
  g.cast.ines.place(0.6, -12.5, 0, 'idle_neutral_01'); g.cast.yanis.place(1.3, -12.9, 0.2, 'idle_look_around_01');
  await g.play([-2.6, -2.4], -2.4);
  await ui.tablet({ num: '27-0614', title: 'Pose d’une caméra de vidéoprotection',
    rows: [['Lieu', 'Entrée du collège, passage de l’Arche'], ['Tâche', 'Support mural, caméra à analyse d’images, raccordement'], ['Demande', 'Cabinet du préfet'], ['Délai', 'Aujourd’hui']],
    stamp: 'Vidéosurveillance algorithmique : testée aux JO de 2024, prolongée jusqu’en 2030 et étendue à la voie publique par le Sénat en mai 2026. (next.ink)' });
  g.player.relock();
  await g.act.goto([CAM_STAND[0], 0, CAM_STAND[1]], 'Aller à l’entrée du collège', 2.0);
  await g.act.hold(CAM_AIM, 'fixer la caméra', 3, 2.4, CAM_STAND);
  g.prop('camera', CAM);
  await g.act.goto([BOX_STAND[0], 0, BOX_STAND[1]], 'Raccorder au coffret électrique', 1.6);
  await g.act.hold(BOX, 'brancher la caméra', 2.5, 2.2, BOX_STAND);
  await ui.sms('Didier', 'Vu sur le planning. Enfin du concret ! 👍');
  g.cast.sofia.place(1.8, -11.6, Math.PI * 0.85, 'gestic_talk_relaxed_01');
  await g.act.goto([1.6, 0, -10.6], 'Rejoindre la sortie du collège', 2.2);
  await ui.say('Sofia : « Merci. Avec ça, je suis plus tranquille pour Yanis. »', 4200);
  await g.evening({ line: 'Inès : « Les parents disent que c’est grâce à toi, la caméra. »', rent: '820 €', bonus: 'gelée' });
  await ui.card('Mai 2029', 'À suivre : la plaque, le hall de Malik.', 5000);
}
