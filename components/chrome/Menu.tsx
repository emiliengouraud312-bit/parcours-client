'use client';

import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

/** Menu discret : hors du scroll principal, il ne doit jamais concurrencer le CTA. */
export default function Menu() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-btn u-eyebrow"
        aria-expanded={open}
        aria-controls="menu-overlay"
        onClick={() => setOpen(true)}
      >
        Menu
      </button>

      <div id="menu-overlay" className="menu" data-open={open || undefined} aria-hidden={!open}>
        <button ref={closeRef} type="button" className="menu__close u-eyebrow" onClick={() => setOpen(false)}>
          Fermer
        </button>
        <nav className="menu__nav" aria-label="Pages secondaires">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
