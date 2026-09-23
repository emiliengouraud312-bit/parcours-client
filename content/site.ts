/** Source unique du contenu éditorial. Les pages et la page d'accueil y puisent. */

export const BRANDS = [
  'Ralph Lauren',
  'Tommy Hilfiger',
  'Lacoste',
  'Patagonia',
  'The North Face',
  'Nike',
  'Adidas',
];

export const STATS = [
  // « articles » seul laissait croire à un stock en ligne : ce sont des ventes.
  { value: '40 000', label: 'articles vendus' },
  { value: '20 000', label: 'clients' },
  { value: '4,9/5', label: 'note moyenne' },
];

export const LOCAL = {
  city: 'Saint-Georges-de-Montaigu',
  area: 'Vendée',
  surface: '100 m²',
};

/**
 * Avis clients, transcrits mot pour mot depuis les captures Vinted fournies
 * par EM — fautes et emoji compris. On ne réécrit pas un avis : c'est ce
 * qui le rend crédible.
 */
export const REVIEWS = [
  {
    author: 'romaric240477',
    when: 'il y a 1 mois',
    text: "Tout les polos ainsi que le cardigan correspondent à la description, l'envoi rapide... super vendeur 👍",
  },
  {
    author: 'fefe2005',
    when: 'il y a 1 mois',
    text: 'Très bon contact. Personne adorable et commande parfaite. Merci ☺️',
  },
  {
    author: 'cathleen91280',
    when: 'il y a 3 semaines',
    text: 'Parfait 👍 je vous recommande chaleureusement 🙏',
  },
  {
    author: 'kayan_duc',
    when: 'il y a 1 mois',
    text: 'Très aimable, excellente et expédition rapide, merci beaucoup 🙌 !',
  },
  {
    author: 'sk23106',
    when: 'il y a 1 mois',
    text: 'La chemise est arrivée conforme à la description !',
  },
  {
    author: 'lieke1975',
    when: 'il y a 1 mois',
    text: 'Perfect...! 👌 ....10 ⭐..!!!!',
  },
];
