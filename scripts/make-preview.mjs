/**
 * Transforme l'export statique (`PREVIEW_EXPORT=1 next build`) en un site à
 * chemins relatifs, capable de tourner depuis n'importe quel sous-dossier.
 *
 * Sert à donner un aperçu cliquable avant tout déploiement. N'a aucun effet
 * sur le build de production, qui garde ses chemins absolus.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, renameSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');

/** Next range ses bundles dans `_next/`, mais certains hébergeurs réservent
 *  les chemins commençant par « _ ». On renomme le dossier et on réécrit
 *  toutes les références. */
const ASSETS = 'assets';

/** Les pages, exportées à plat : /faq -> faq.html */
const PAGES = ['faq', 'contact', 'a-propos'];
/** Les fichiers posés à la racine de l'export par Next (icônes, image de partage). */
const ROOT_FILES = readdirSync(OUT).filter((f) => statSync(path.join(OUT, f)).isFile() && !f.endsWith('.html'));

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const replaceAll = (s, pairs) => pairs.reduce((acc, [from, to]) => acc.split(from).join(to), s);
const save = (file, before, after) => {
  if (before === after) return 0;
  writeFileSync(file, after);
  return 1;
};

let pages = 0;
let assets = 0;

for (const file of walk(OUT)) {
  const ext = path.extname(file);
  const raw = readFileSync(file, ext === '.woff2' || ext === '.png' ? null : 'utf8');
  if (typeof raw !== 'string') continue;

  if (ext === '.html') {
    // Toutes les pages sont à la racine de l'export : un simple retrait du
    // slash initial suffit. Les chemins de médias sont visés explicitement —
    // un remplacement de « /media/ » écraserait aussi « _next/static/media/ ».
    let s = replaceAll(raw, [
      ['/_next/', `${ASSETS}/`],
      ['/media/img/', 'media/img/'],
      ['/media/video/', 'media/video/'],
      ['href="/"', 'href="index.html"'],
    ]);
    for (const f of ROOT_FILES) s = replaceAll(s, [[`"/${f}`, `"${f}`], [`\\"/${f}`, `\\"${f}`]]);
    for (const p of PAGES) s = replaceAll(s, [[`"/${p}"`, `"${p}.html"`], [`\\"/${p}\\"`, `\\"${p}.html\\"`]]);

    // Le bundle `polyfills` n'est chargé que par les navigateurs sans modules
    // ES, que ce site ne vise pas, et il contient des octets non-UTF8 que
    // certains hébergeurs refusent. On retire la balise avec le fichier.
    s = s.replace(/<script src="[^"]*polyfills[^"]*"[^>]*><\/script>/g, '');
    pages += save(file, raw, s);
    continue;
  }

  if (ext === '.css') {
    // Une CSS est chargée depuis sa propre URL : ses url() se résolvent par
    // rapport à elle, pas par rapport à la page. D'où le chemin remontant.
    const up = path.relative(path.dirname(file), OUT).split(path.sep).join('/');
    assets += save(file, raw, replaceAll(raw, [['/_next/', `${up}/${ASSETS}/`]]));
    continue;
  }

  if (ext === '.js') {
    // Le publicPath de webpack est résolu par rapport au document, et toutes
    // les pages sont à la racine : « _next/ » est correct pour toutes.
    //
    // Les chemins de médias construits à l'exécution (le panneau du menu est
    // rendu côté client) n'apparaissent nulle part dans le HTML : ils vivent
    // dans les bundles et doivent être rendus relatifs ici aussi.
    assets += save(file, raw, replaceAll(raw, [
      ['"/_next/"', `"${ASSETS}/"`],
      ['/media/img/', 'media/img/'],
      ['/media/video/', 'media/video/'],
    ]));
  }
}

for (const f of walk(OUT)) if (path.basename(f).startsWith('polyfills-')) rmSync(f);

const from = path.join(OUT, '_next');
if (existsSync(from)) renameSync(from, path.join(OUT, ASSETS));

console.log(`${pages} page(s) et ${assets} fichier(s) rendus relatifs, _next -> ${ASSETS}`);
