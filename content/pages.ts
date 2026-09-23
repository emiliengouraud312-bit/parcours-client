import { BRANDS, LOCAL } from './site';

export type Section = {
  h?: string;
  p: string[];
  /** Illustration servie depuis public/media/img, en AVIF puis WebP. */
  img?: { id: string; alt: string; w: number; h: number };
};
export type QA = { q: string; a: string };

export type PageContent = {
  slug: string;
  /** Libellé dans le menu et le pied de page. */
  label: string;
  title: string;
  intro: string;
  sections?: Section[];
  qa?: QA[];
  /** Insère les deux comptes Vinted après la section de cet index. */
  accountsAfter?: number;
};

export const ABOUT: PageContent = {
  slug: 'a-propos',
  label: 'À propos',
  title: 'À propos',
  intro: 'Tout a commencé dans nos chambres.',
  sections: [
    {
      p: [
        `Il y a 4 ans, on vendait quelques pièces à l’unité, photographiées sur un coin de lit. Aujourd’hui, c’est un local de ${LOCAL.surface} en ${LOCAL.area}, des cartons qui arrivent chaque semaine et une petite équipe qui nous accompagne au quotidien. Le principe, lui, n’a pas changé : trouver de belles pièces et les remettre en circulation.`,
      ],
    },
    {
      h: 'Notre local, notre terrain de jeu',
      p: [
        'C’est ici que tout se passe. Les ballots sont ouverts, les pièces triées une par une, lavées, repassées, photographiées, puis emballées avant de partir chez vous. Rien n’est sous-traité : chaque article passe entre nos mains avant d’arriver dans les vôtres.',
      ],
      img: {
        id: 'local-atelier',
        alt: `Le local d’E&M Vintage : portants, étagères de pièces pliées, fond blanc et mannequins pour la prise de vue.`,
        w: 1280,
        h: 960,
      },
    },
    {
      h: 'Des marques qu’on connaît par cœur',
      p: [
        `${BRANDS.join(', ')}… On sélectionne des marques qui durent, et on vérifie chaque pièce avant sa mise en vente. Nos articles sont 100 % authentiques. Pas d’exception.`,
      ],
    },
    {
      h: '40 000 articles vendus. 20 000 clients.',
      p: [
        'En 4 ans, nous avons reconditionné et vendu plus de 40 000 articles à plus de 20 000 clients. Avec une note de 4,9/5, ce sont eux qui en parlent le mieux. Chaque avis compte, et c’est ce qui nous pousse à soigner chaque envoi comme le premier.',
      ],
    },
    {
      h: 'La seconde main, simplement',
      p: ['Des vêtements de qualité, déjà portés, à un prix juste. Pour nous, c’est surtout du bon sens.'],
    },
  ],
};

export const FAQ: PageContent = {
  slug: 'faq',
  label: 'FAQ',
  title: 'FAQ',
  intro: 'Les questions qui reviennent le plus souvent.',
  qa: [
    {
      q: 'Les vêtements sont-ils lavés avant la vente ?',
      a: 'Oui. Tout passe en machine avant d’être défroissé et photographié. Rien n’est mis en ligne sans être passé par là.',
    },
    {
      q: 'Vos articles sont-ils authentiques ?',
      a: 'Oui, 100 %, sans exception. Chaque pièce est vérifiée avant sa mise en vente. Ce qui ne nous convainc pas ne part pas.',
    },
    {
      q: 'D’où viennent les pièces ?',
      a: 'De ballots de seconde main achetés au poids, ouverts et triés à la main, une par une.',
    },
    {
      q: 'Et les défauts ?',
      a: 'Quand une pièce a un défaut — un accroc, une tache, un col marqué — il est photographié et signalé dans l’annonce. Une pièce trop abîmée ne part pas en vente.',
    },
    {
      q: 'Peut-on venir acheter sur place ?',
      a: `Oui. Notre local est à ${LOCAL.city}, en ${LOCAL.area}. Demandez-nous et on organise une vente directe : vous fouillez dans les portants sans passer par une annonce.`,
    },
    {
      q: 'Pourquoi deux comptes Vinted ?',
      a: 'Pour séparer les tailles. XS à L sur mathisguerin, XL et plus sur vintage-imparfait. C’est le seul critère : même tri, même lavage, mêmes photos des deux côtés.',
    },
    {
      q: 'Comment se passe une commande ?',
      a: 'Tout se fait sur Vinted : l’achat, le paiement et le suivi. Les colis partent sous 48 h, déposés en point relais.',
    },
    {
      q: 'Y a-t-il des pièces femme ?',
      a: 'Quelques-unes, sur vintage-imparfait. C’est une petite partie de l’activité : l’essentiel est en homme.',
    },
  ],
};

export const CONTACT: PageContent = {
  slug: 'contact',
  label: 'Contact',
  title: 'Contact',
  intro: 'Le plus simple reste la messagerie Vinted : on répond en moins de 2 h.',
  accountsAfter: 0,
  sections: [
    {
      h: 'Une question sur une pièce',
      p: [
        'Écrivez directement depuis l’annonce concernée, ou depuis le profil du compte. Pour une demande de mesures supplémentaires ou la photo d’un détail, c’est la voie la plus directe — et la plus rapide.',
      ],
    },
    {
      h: 'Venir sur place',
      p: [
        `Notre local est à ${LOCAL.city}, en ${LOCAL.area}. On peut vous y recevoir pour choisir directement dans les portants. Écrivez-nous sur l’un des deux comptes et on cale un créneau.`,
      ],
    },
    {
      h: 'Commande en cours',
      p: [
        'Le suivi, le paiement et les retours passent par Vinted. Pour un colis déjà parti, le suivi est disponible dans votre commande.',
      ],
    },
  ],
};

export const PAGES: PageContent[] = [ABOUT, FAQ, CONTACT];
