export type Chapter = {
  n: string;
  id: string;
  /** Un nom, pas un participe : le titre nomme l'étape, la ligne dit ce que
   *  ça change pour l'acheteur. */
  title: string;
  line: string;
  /** Arc de luminosité : le site s'éclaircit jusqu'au studio, puis redescend. */
  tone: string;
  fg: string;
  /** Média disponible. Chaque chapitre dégrade proprement s'il manque :
   *  vidéo -> photo -> panneau de matière. Passer `hasVideo` à false
   *  suffit à repasser un chapitre sur sa photo. */
  hasVideo: boolean;
  hasStill: boolean;
};

export const CHAPTERS: Chapter[] = [
  {
    n: '01',
    id: 'ch01-reception',
    title: 'Réception',
    line: 'Chaque pièce est triée à la main, une par une. Ce qui ne passe pas le tri ne part pas en vente.',
    tone: '#1a1a1a',
    fg: '#f1efe7',
    hasVideo: true,
    hasStill: true,
  },
  {
    n: '02',
    id: 'ch02-lavage',
    title: 'Lavage',
    line: 'Toutes les pièces passent en machine. Vous recevez un vêtement propre, prêt à porter.',
    tone: '#222222',
    fg: '#f1efe7',
    hasVideo: true,
    hasStill: false,
  },
  {
    n: '03',
    id: 'ch03-repassage',
    title: 'Défroissage',
    line: 'La vapeur détend les fibres et assainit le tissu. Rien ne part d’ici froissé.',
    tone: '#2e2e2c',
    fg: '#f1efe7',
    hasVideo: true,
    hasStill: true,
  },
  {
    n: '04',
    id: 'ch04-prise-de-vue',
    title: 'Prise de vue',
    line: 'Sur mannequin, en lumière continue, sans retouche. Vous voyez la pièce telle qu’elle est.',
    tone: '#f1efe7',
    fg: '#2b2b2b',
    hasVideo: true,
    hasStill: true,
  },
  {
    n: '05',
    id: 'ch05-mise-en-ligne',
    title: 'Mise en ligne',
    line: 'Taille, matière, état. Quand il y a un défaut, il est photographié et signalé.',
    tone: '#e3e0d6',
    fg: '#2b2b2b',
    hasVideo: true,
    hasStill: true,
  },
  {
    n: '06',
    id: 'ch06-expedition',
    title: 'Expédition',
    line: 'Emballée et déposée en point relais sous 48 h, avec le suivi dès le départ.',
    tone: '#2b2b2b',
    fg: '#f1efe7',
    hasVideo: true,
    hasStill: true,
  },
];
