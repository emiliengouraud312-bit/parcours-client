/** Le mot-symbole reprend sa place en haut à gauche une fois le hero passé. */
export default function Masthead() {
  return (
    <header className="masthead" data-masthead>
      <a className="masthead__mark" href="#top" aria-label="E&amp;M Vintage — retour en haut">
        <span className="masthead__em">E&amp;M</span>
        <span className="masthead__vintage">Vintage</span>
      </a>
    </header>
  );
}
