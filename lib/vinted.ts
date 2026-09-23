/** Les deux comptes réels. 95 % de l'activité est en articles homme. */
export const VINTED = {
  menSmall: {
    handle: 'mathisguerin',
    url: 'https://www.vinted.fr/member/15706408',
    sizes: 'XS – L',
  },
  menLarge: {
    handle: 'vintage-imparfait',
    url: 'https://www.vinted.fr/member/153662076',
    sizes: 'XL et +',
  },
} as const;

/** La partie femme vit sur le second compte, en lien secondaire uniquement. */
export const WOMEN_URL = VINTED.menLarge.url;
