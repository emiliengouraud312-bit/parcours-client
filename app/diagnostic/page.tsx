'use client';

import { useEffect, useState } from 'react';
import '@/app/experience.css';
import '@/app/pages.css';

/** Repère de version : permet de confirmer qu'on regarde bien le dernier déploiement. */
const BUILD = 'video-autoplay-natif';

type Line = { k: string; v: string; ok?: boolean };

/**
 * Page de contrôle, à ouvrir sur le téléphone qui pose problème.
 * Elle ne sert qu'au débogage : elle interroge le navigateur sur ce qu'il
 * sait lire et tente réellement une lecture, puis affiche le verdict.
 */
export default function Diagnostic() {
  const [lines, setLines] = useState<Line[]>([]);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const out: Line[] = [];
    const push = (k: string, v: string, ok?: boolean) => out.push({ k, v, ok });

    push('Version en ligne', BUILD, true);
    push('Navigateur', navigator.userAgent.slice(0, 90));

    const probe = document.createElement('video');
    const webm = probe.canPlayType('video/webm; codecs="vp9"');
    const mp4 = probe.canPlayType('video/mp4');
    push('Peut lire WebM/VP9', webm || 'non', !!webm);
    push('Peut lire MP4/H.264', mp4 || 'non', !!mp4);

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    push('Économiseur de données', conn?.saveData ? 'ACTIVÉ' : 'non', !conn?.saveData);
    push('Réseau', conn?.effectiveType ?? 'inconnu');
    push('Animations réduites', window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'OUI' : 'non');

    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.autoplay = true;
    v.preload = 'auto';
    v.setAttribute('style', 'position:fixed;left:8px;bottom:8px;width:72px;height:128px;object-fit:cover;z-index:9;border-radius:3px');
    const s1 = document.createElement('source');
    s1.src = '/media/video/ch01-reception.webm';
    s1.type = 'video/webm; codecs="vp9"';
    const s2 = document.createElement('source');
    s2.src = '/media/video/ch01-reception.mp4';
    s2.type = 'video/mp4';
    v.append(s1, s2);
    document.body.appendChild(v);

    const finish = () => {
      push('Fichier retenu', v.currentSrc ? v.currentSrc.split('/').pop()! : 'AUCUN', !!v.currentSrc);
      push('État de chargement', String(v.readyState) + ' / 4', v.readyState >= 2);
      push('Erreur du média', v.error ? `code ${v.error.code} — ${v.error.message || 'sans détail'}` : 'aucune', !v.error);
      push('LECTURE EN COURS', v.paused ? 'NON' : 'OUI', !v.paused);
      setLines([...out]);
    };

    v.play().then(
      () => setTimeout(finish, 1200),
      (e: DOMException) => {
        push('Refus de lecture', `${e.name} — ${e.message}`.slice(0, 90), false);
        setTimeout(finish, 1200);
      },
    );

    return () => v.remove();
  }, [retry]);

  return (
    <div className="page">
      <div className="page__body">
        <a className="page__back" href="/">
          <span aria-hidden="true">←</span> Retour au site
        </a>
        <h1 className="page__title">Diagnostic</h1>
        <p className="page__intro">
          Page de contrôle. Faites une capture d&apos;écran de ce tableau et envoyez-la.
        </p>

        <section className="page__section">
          <ul className="qa">
            {lines.length === 0 && <li><p>Mesure en cours…</p></li>}
            {lines.map((l) => (
              <li key={l.k}>
                <h3>{l.k}</h3>
                <p style={{ opacity: 1, color: l.ok === false ? '#ff9d9d' : l.ok ? '#9dd6a8' : undefined }}>
                  {l.v}
                </p>
              </li>
            ))}
          </ul>

          <div className="page__cta" style={{ gridTemplateColumns: '1fr' }}>
            <button type="button" className="size-btn" onClick={() => { setLines([]); setRetry((r) => r + 1); }}>
              <span className="size-btn__size u-display">Refaire le test</span>
              <span className="size-btn__handle u-eyebrow">après avoir touché l&apos;écran</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
