'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PAGES } from '@/content/pages';
import PageBody from '@/components/content/PageBody';

/**
 * Le menu n'envoie pas vers une autre page : il ouvre le contenu sur place.
 * Le site tient en un seul lien à partager, donc quitter la page pour lire
 * la FAQ n'a pas de sens — et certains hébergeurs d'aperçu bloquent la
 * navigation entre fichiers. Les routes /faq, /contact et /a-propos existent
 * toujours, pour le référencement et les liens directs.
 */
export default function Menu() {
  const [slug, setSlug] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const open = slug !== null;
  const page = PAGES.find((p) => p.slug === slug) ?? PAGES[0];

  const openAt = useCallback((s: string) => setSlug(s), []);

  // Le pied de page s'en sert pour ouvrir le panneau au lieu de naviguer.
  useEffect(() => {
    document.documentElement.setAttribute('data-menu-available', '');
    const onAsk = (e: Event) => openAt((e as CustomEvent<string>).detail);
    window.addEventListener('em:open-page', onAsk as EventListener);
    return () => {
      document.documentElement.removeAttribute('data-menu-available');
      window.removeEventListener('em:open-page', onAsk as EventListener);
    };
  }, [openAt]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSlug(null);
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Chaque changement d'onglet repart du haut du panneau.
  useEffect(() => {
    if (open) panelRef.current?.scrollTo({ top: 0 });
  }, [slug, open]);

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="menu-overlay"
        onClick={() => openAt(PAGES[0].slug)}
      >
        <span className="menu-btn__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="menu-btn__label u-eyebrow">Menu</span>
      </button>

      <div id="menu-overlay" className="menu" data-open={open || undefined} aria-hidden={!open}>
        <div className="menu__bar">
          <div className="menu__tabs" role="tablist" aria-label="Pages">
            {PAGES.map((p) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                className="menu__tab u-eyebrow"
                aria-selected={p.slug === slug}
                data-active={p.slug === slug || undefined}
                tabIndex={open ? 0 : -1}
                onClick={() => openAt(p.slug)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            ref={closeRef}
            type="button"
            className="menu__close u-eyebrow"
            tabIndex={open ? 0 : -1}
            onClick={() => setSlug(null)}
          >
            Fermer
          </button>
        </div>

        <div className="menu__panel" ref={panelRef} role="tabpanel" aria-label={page.label}>
          <div className="menu__content">
            <h2 className="page__title">{page.title}</h2>
            <p className="page__intro">{page.intro}</p>
            <PageBody page={page} />
          </div>
        </div>
      </div>
    </>
  );
}
