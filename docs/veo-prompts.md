# Kit de génération vidéo — EM Vintage

Six plans, un par chapitre. À générer dans **Google Flow (Veo 3.1)**.

## Réglages communs

| Réglage | Valeur | Pourquoi |
|---|---|---|
| Format | **9:16 vertical natif** | Le site est mobile-first. Veo 3.1 compose nativement en 9:16 — ne générez pas en 16:9 pour recadrer ensuite, la composition serait ratée. |
| Durée | 8 s (le max) | On coupera des boucles de 3–5 s au montage. |
| Son | ignoré | Les vidéos du site sont muettes (`muted`), obligatoire pour l'autoplay mobile. |
| Prises | **2 à 3 par plan** | Veo est irrégulier. Envoyez-moi toutes les prises, je choisis. |

## Les deux règles qui changent tout

**1. Utilisez VOS photos comme point de départ.** C'est le point le plus important.
Flow propose « Frames to Video » (image de départ) et « Ingredients to Video » (images
de référence). Partir de votre vraie photo = votre vrai local à l'écran, pas une
buanderie générique inventée. Les images sont dans `assets/source/`.

**2. Mains uniquement, jamais de visage.** Deux raisons : les visages générés tombent
systématiquement dans l'uncanny valley, et un visage inventé sur un site qui parle de
votre activité, c'est le seul truc qui sonnerait faux. Les mains suffisent, et c'est
même mieux — on regarde le geste, pas la personne.

---

## 01 · Réception

> **Image de départ : `assets/source/grange-ballots.jpg`**

```
A dim stone-walled storage room in an old barn. Compressed bales of second-hand
clothing wrapped in clear plastic and bound with green plastic strapping, stacked on
wooden pallets against a rough dry-stone wall. Cardboard boxes to the right. A pair of
hands enters the frame and cuts the green strapping with a box cutter; the plastic
film relaxes and the bale visibly expands. Cool daylight from a doorway on the left,
deep shadows, dust particles floating in the light. Slow steady camera push-in.
Documentary realism, muted desaturated colours, natural grain. Vertical 9:16.
Hands only, no faces, no people visible. No on-screen text, no logos, no music.
```

## 02 · Lavage

> Pas de photo source — texte seul. *(Ou 30 s de tournage au téléphone, voir plus bas.)*

```
A small utility room inside a stone barn. Two white front-loading washing machines
side by side, slightly worn. A pair of hands loads folded second-hand knitwear and
polo shirts into the open drum, closes the door, and the drum begins to turn.
Condensation forming on the glass porthole. A single warm overhead bulb plus cool
daylight from a small high window. Static locked-off camera, then a slow push toward
the porthole. Documentary realism, shallow depth of field. Vertical 9:16.
Hands only, no faces, no people visible. No on-screen text, no logos, no music.
```

## 03 · Repassage

> Référence utile : `assets/source/atelier.jpg` (le portant blanc, le sol gris)

```
Close-up of a handheld garment steamer passing slowly over a navy and white striped
piqué polo shirt hanging on a white rolling clothes rail. Visible steam drifting
through a shaft of light. The fabric wrinkles relax and flatten as the steam head
passes over them. Bright white room, grey tiled floor blurred in the background.
Slow horizontal camera drift following the steamer head. Documentary realism, high
detail on fabric texture. Vertical 9:16.
Hands only, no faces, no people visible. No on-screen text, no logos, no music.
```

## 04 · Prise de vue

> **Image de départ : `assets/source/atelier.jpg`** — ou `polo-raye.jpg` pour un plan serré

```
A small photography setup in a bright white room: a white mannequin bust on a glass
plate against a plain white wall, wearing a navy and white striped piqué polo shirt.
A large softbox on a tripod to the left. A pair of hands enters frame, smooths the
collar and the shoulder seam of the polo, then withdraws. Grey tiled floor. Clean,
even, continuous studio light. Slow camera arc from left to right around the bust.
Photorealistic, commercial product-photography look, crisp fabric detail.
Vertical 9:16. Hands only, no faces, no people visible.
No on-screen text, no logos, no music.
```

## 05 · Mise en ligne

> Texte seul. **Attention** : on ne veut surtout pas d'interface reconnaissable à l'écran.

```
Over-the-shoulder close-up of two hands holding a smartphone in a bright white room,
clothing rails softly blurred in the background. A thumb scrolls slowly on the screen.
A yellow measuring tape and a folded navy striped polo shirt lie on a white table
beside the hands. Screen glow reflecting faintly on the fingers. Very shallow depth of
field — the phone screen content is soft and completely unreadable. Slow camera drift.
Documentary realism. Vertical 9:16. Hands only, no faces, no people visible.
No readable text on the screen, no recognisable app interface, no logos, no music.
```

## 06 · Emballage et expédition

> **Image de départ : `assets/source/colis-expedition.jpg`**

```
A bright white room with a grey tiled floor. A pair of hands folds a navy striped polo
shirt, slides it into a grey plastic mailing bag, peels the adhesive strip and seals
it, then places it onto a growing pile of identical sealed grey parcels on the floor.
A blue reusable shopping bag and a clothing rail in the background. Even overhead
light from recessed ceiling spots. Camera slowly tilts down to reveal the pile of
parcels. Documentary realism. Vertical 9:16. Hands only, no faces, no people visible.
No readable text on the labels, no logos, no music.
```

---

## Si Veo déçoit sur 02, 03 et 05

Ce sont les trois plans sans photo de départ, donc les trois plus risqués. Filmés au
téléphone, ils prennent **20 minutes** et seront meilleurs :

| Plan | Cadrage | Durée | Consigne |
|---|---|---|---|
| 02 Lavage | Téléphone **vertical**, posé ou appuyé, fixe. Hublot au centre. | 8 s | Chargez, fermez, lancez. Ne bougez pas le téléphone. |
| 03 Repassage | Vertical, serré sur le vêtement. | 8 s | Un seul passage de défroisseur, lent, de haut en bas. |
| 05 Mise en ligne | Vertical, par-dessus l'épaule. | 8 s | Filmez les mains, pas l'écran. L'écran doit être flou ou hors champ. |

Règles : lumière existante (pas de flash), jamais de zoom, mouvement lent ou aucun,
et on ne voit pas de visage.

---

## Comment me les envoyer

**Le plus simple — Google Drive.** Créez un dossier `EM-Vintage-Videos`, déposez-y les
fichiers, dites-le moi : j'y accède directement et je récupère tout.

Nommage : `ch01-reception-a.mp4`, `ch01-reception-b.mp4`, `ch02-lavage-a.mp4`… La
lettre distingue les prises. Envoyez les fichiers **bruts**, pleine qualité — ne
compressez rien, ne recadrez rien, je m'en charge.

*(Alternative : glisser-déposer dans le dossier `assets/video-raw/` du repo GitHub,
sur la branche `claude/em-vintage-showcase-site-lv8og6`.)*

## Ce que j'en fais ensuite

ffmpeg et sharp tournent dans mon environnement, donc le pipeline complet se fait ici :

1. Choix de la meilleure prise, coupe d'une boucle de 3–5 s bouclable proprement
2. Encodage **WebM/VP9** + **MP4/H.264** (fallback iOS), 720×1280, ~24 fps
3. Extraction d'un **poster AVIF** sur la première image
4. Cible : **moins de 400 Ko par chapitre**, chargement différé à l'entrée dans le viewport

Si un plan ne rend rien de bon, son chapitre retombe automatiquement sur la photo
animée — le site est construit pour que les deux soient interchangeables.
