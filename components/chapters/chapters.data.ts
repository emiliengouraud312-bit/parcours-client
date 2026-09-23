export type Chapter = {
  n: string;
  id: string;
  /** Participe passé : les six titres se lisent à la suite, comme une seule
   *  phrase sur une seule pièce. C'est ce qui fait le lien entre les étapes. */
  title: string;
  /** Le bénéfice concret pour la personne qui achète, pas la description du geste. */
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

/** Se lit comme la suite de « Chaque pièce est… ». */
export const CHAPTERS: Chapter[] = [
  {
    n: '01',
    id: 'ch01-reception',
    title: 'Triée à la main',
    line: 'Une par une, à l’ouverture des cartons. Ce qui ne passe pas le tri ne part pas en vente.',
    tone: '#1a1a1a',
    fg: '#f1efe7',
    hasVideo: true,
    hasStill: true,
  },
  {
    n: '02',
    id: 'ch02-lavage',
    title: 'Lavée',
    line: 'Toutes les pièces passent en machine. Vous recevez un vêtement propre, prêt à porter.',
    tone: '#222222',
    fg: '#f1efe7',
    hasVideo: true,
    hasStill: false,
  },
  {
    n: '03',
    id: 'ch03-repassage',
    title: 'Défroissée à la vapeur',
    line: 'La vapeur détend les fibres et assainit le tissu. Rien ne sort d’ici mal repassé.',
    tone: '#2e2e2c',
    fg: '#f1efe7',
    hasVideo: true,
    hasStill: true,
  },
  {
    n: '04',
    id: 'ch04-prise-de-vue',
    title: 'Photographiée',
    line: 'Sur mannequin, en lumière continue, sans retouche. Vous voyez la pièce telle qu’elle est.',
    tone: '#f1efe7',
    fg: '#2b2b2b',
    hasVideo: true,
    hasStill: true,
  },
  {
    n: '05',
    id: 'ch05-mise-en-ligne',
    title: 'Décrite sans filtre',
    line: 'Taille, matière, état. Quand il y a un défaut, il est photographié et signalé.',
    tone: '#e3e0d6',
    fg: '#2b2b2b',
    hasVideo: true,
    hasStill: true,
  },
  {
    n: '06',
    id: 'ch06-expedition',
    title: 'Expédiée sous 48 h',
    line: 'Emballée et déposée en point relais, avec le suivi dès le départ.',
    tone: '#2b2b2b',
    fg: '#f1efe7',
    hasVideo: true,
    hasStill: true,
  },
];
