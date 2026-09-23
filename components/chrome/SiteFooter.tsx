'use client';

import { PAGES } from '@/content/pages';

/**
 * Sur la page d'accueil, le menu est monté : les liens ouvrent le panneau au
 * lieu de recharger. Ailleurs, ils restent de vrais liens vers les routes.
 */
export default function SiteFooter() {
  return (
    <footer className="foot">
      <span className="foot__mark">EM</span>
      <nav aria-label="Pages secondaires">
        {PAGES.map((p) => (
          <a
            key={p.slug}
            href={`/${p.slug}`}
            onClick={(e) => {
              if (!document.documentElement.hasAttribute('data-menu-available')) return;
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('em:open-page', { detail: p.slug }));
            }}
          >
            {p.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
