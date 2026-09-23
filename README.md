# E&M Vintage

Site vitrine en scroll narratif : hero, six chapitres (réception, lavage,
repassage, prise de vue, mise en ligne, expédition), puis le choix de taille
vers les deux comptes Vinted.

## Développement

```bash
npm install
npm run dev
```

## Médias

Les dérivés servis par le site (`public/media/`) sont **générés puis commités** :
le build Vercel ne fait que les servir, aucune optimisation à la volée, aucun
quota d'images consommé.

```bash
npm run media    # assets/source/*.jpg + assets/video-raw/*.mp4 -> public/media/
npm run icons    # favicon, icône d'app et image de partage, depuis le logo
```

`npm run media -- video` ne refait que les vidéos, `-- img` que les images.

Pour remplacer un plan : déposer le rush dans `assets/video-raw/` en gardant un
nom qui commence par le numéro du chapitre (`03_…mp4`), puis relancer
`npm run media -- video`. Pour repasser un chapitre sur sa photo, il suffit de
mettre `hasVideo: false` dans `components/chapters/chapters.data.ts`.

### Traitement des vidéos

Les rushes arrivent en 1080×1920 / 24 fps et durent de 1,8 s à 8 s. Le script
les ramène à 640×1138, ce qui est amplement suffisant pour de l'ambiance de
fond sous un voile et un grain, et divise le poids par deux.

Aucun rush ne boucle proprement, donc chaque clip est rendu bouclable :

- **`xfade`** fond la fin du clip sur son début. Le geste garde son sens — on
  ne voit jamais un colis se dés-emballer.
- **`pingpong`** rejoue le clip à l'envers. Réservé au va-et-vient (le pouce
  qui fait défiler) et aux rushes trop courts pour un fondu.

Les durées demandées sont toujours ramenées à ce que le rush contient : deux
des six font moins de 4 s.

## Parti pris techniques

- **Mobile d'abord.** Unités `svh` (jamais `vh`), Lenis désactivé au toucher
  pour garder l'inertie native, `position: sticky` plutôt que le `pin` GSAP
  (un pin se décale quand la barre d'adresse mobile se rétracte).
- **Le CTA ne dépend d'aucune librairie.** Il s'anime en CSS via un
  IntersectionObserver, et son état par défaut est « visible » : sans
  JavaScript, les deux boutons restent affichés et cliquables.
- **`prefers-reduced-motion`** rend un parcours alternatif complet (sections
  empilées, scroll natif), pas une version dégradée.

## Aperçu avant déploiement

```bash
npm run preview   # -> out/, à chemins relatifs
```

`scripts/make-preview.mjs` reprend l'export statique et le rend autonome :
chemins relatifs (les url() des CSS remontent depuis leur propre dossier),
`_next/` renommé en `assets/` — certains hébergeurs réservent les chemins
commençant par `_` — et le bundle `polyfills` retiré, inutile ici et
non-UTF8. Le dossier `out/` obtenu tourne depuis n'importe quel
sous-dossier, sans serveur.

Le build de production, lui, n'est pas concerné : il garde ses chemins absolus.

## Déploiement

Vercel, plan gratuit. Toutes les routes sont pré-rendues en statique.
