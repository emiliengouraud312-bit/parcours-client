'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PAGES } from '@/content/pages';
import PageBody from '@/components/content/PageBody';

/**
 * Deux temps : on choisit d'abord la page, puis on la lit. Le contenu
 * s'affiche sur place plutôt que de charger une autre page — le site tient
 * en un seul lien, et certains hébergeurs d'aperçu bloquent la navigation
 * entre fichiers. Les routes /faq, /contact et /a-propos existent toujours,
 * pour le référencement et les liens directs.
 */
export default function Menu() {
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const page = PAGES.find((p) => p.slug === slug);

  const openAt = useCallback((s: string | null) => {
    setSlug(s);
    setOpen(true);
  }, []);

  // Le pied de page s'en sert pour ouvrir directement la bonne page.
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Échap revient d'abord au choix, puis ferme.
      if (slug) setSlug(null);
      else setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, slug]);

  // Chaque page ouverte repart du haut.
  useEffect(() => {
    if (slug) panelRef.current?.scrollTo({ top: 0 });
  }, [slug]);

  const close = () => {
    setOpen(false);
    setSlug(null);
  };

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="menu-overlay"
        onClick={() => openAt(null)}
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
          {slug ? (
            <button type="button" className="menu__back u-eyebrow" tabIndex={open ? 0 : -1} onClick={() => setSlug(null)}>
              <span aria-hidden="true">←</span> Menu
            </button>
          ) : (
            <span />
          )}

          <button ref={closeRef} type="button" className="menu__close u-eyebrow" tabIndex={open ? 0 : -1} onClick={close}>
            Fermer
          </button>
        </div>

        {page ? (
          <div className="menu__panel" ref={panelRef}>
            <div className="menu__content">
              <h2 className="page__title">{page.title}</h2>
              <p className="page__intro">{page.intro}</p>
              <PageBody page={page} />
            </div>
          </div>
        ) : (
          <nav className="menu__nav" aria-label="Pages secondaires">
            <ul>
              {PAGES.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    className="u-display"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setSlug(p.slug)}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
