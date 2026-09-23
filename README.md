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

Pour ajouter les vidéos : déposer les rushes dans `assets/video-raw/` en les
nommant par numéro de chapitre (`01-*.mp4` … `06-*.mp4`), lancer `npm run media`,
puis passer `hasVideo: true` sur le chapitre concerné dans
`components/chapters/chapters.data.ts`.

## Parti pris techniques

- **Mobile d'abord.** Unités `svh` (jamais `vh`), Lenis désactivé au toucher
  pour garder l'inertie native, `position: sticky` plutôt que le `pin` GSAP
  (un pin se décale quand la barre d'adresse mobile se rétracte).
- **Le CTA ne dépend d'aucune librairie.** Il s'anime en CSS via un
  IntersectionObserver, et son état par défaut est « visible » : sans
  JavaScript, les deux boutons restent affichés et cliquables.
- **`prefers-reduced-motion`** rend un parcours alternatif complet (sections
  empilées, scroll natif), pas une version dégradée.

## Déploiement

Vercel, plan gratuit. Toutes les routes sont pré-rendues en statique.
