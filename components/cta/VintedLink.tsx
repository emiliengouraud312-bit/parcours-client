'use client';

import { useEffect, useRef } from 'react';

/**
 * Lien vers un compte Vinted.
 *
 * Vinted déclare des liens universels : l'URL https ouvre l'application si
 * elle est installée. Mais sur iOS, un lien qui s'ouvre dans un nouvel onglet
 * court-circuite ce mécanisme — la page part dans le navigateur, où la
 * personne n'est pas connectée. On retire donc la cible sur les écrans
 * tactiles, pour que la navigation soit une vraie navigation que le système
 * peut confier à l'application.
 *
 * Sur desktop, l'onglet séparé reste le bon comportement : le site demeure
 * ouvert derrière. L'attribut est rendu par défaut puis retiré au montage,
 * pour qu'il n'y ait pas d'écart entre le HTML envoyé et la page hydratée —
 * et pour que le lien reste utilisable si le JavaScript ne tourne pas.
 */
export default function VintedLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) ref.current?.removeAttribute('target');
  }, []);

  return (
    <a ref={ref} className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
