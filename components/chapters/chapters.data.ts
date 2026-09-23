export type Chapter = {
  n: string;
  id: string;
  title: string;
  /** Une ligne, au constat. Pas d'argumentaire. */
  line: string;
  /** Arc de luminosité : le site s'éclaircit jusqu'au studio, puis redescend. */
  tone: string;
  fg: string;
  /** Média disponible. Chaque chapitre dégrade proprement s'il manque. */
  hasVideo: boolean;
  hasStill: boolean;
};

export const CHAPTERS: Chapter[] = [
  {
    n: '01',
    id: 'ch01-reception',
    title: 'Réception',
    line: 'Un ballot : 25 kg, environ 200 pièces.',
    tone: '#1a1a1a',
    fg: '#f1efe7',
    hasVideo: false,
    hasStill: true,
  },
  {
    n: '02',
    id: 'ch02-lavage',
    title: 'Lavage',
    line: 'Tout passe en machine. Pièce à part, dans la grange.',
    tone: '#222222',
    fg: '#f1efe7',
    hasVideo: false,
    hasStill: false,
  },
  {
    n: '03',
    id: 'ch03-repassage',
    title: 'Repassage',
    line: 'Défroissé à la vapeur, une pièce à la fois.',
    tone: '#2e2e2c',
    fg: '#f1efe7',
    hasVideo: false,
    hasStill: true,
  },
  {
    n: '04',
    id: 'ch04-prise-de-vue',
    title: 'Prise de vue',
    line: 'Fond blanc, mannequin, lumière continue.',
    tone: '#f1efe7',
    fg: '#2b2b2b',
    hasVideo: false,
    hasStill: true,
  },
  {
    n: '05',
    id: 'ch05-mise-en-ligne',
    title: 'Mise en ligne',
    line: 'Mesures, description, prix.',
    tone: '#e3e0d6',
    fg: '#2b2b2b',
    hasVideo: false,
    hasStill: true,
  },
  {
    n: '06',
    id: 'ch06-expedition',
    title: 'Expédition',
    line: 'Pesé, emballé, déposé au point relais.',
    tone: '#2b2b2b',
    fg: '#f1efe7',
    hasVideo: false,
    hasStill: true,
  },
];
