/** Le mot-symbole reprend sa place en haut à gauche une fois le hero passé. */
export default function Masthead() {
  return (
    <header className="masthead" data-masthead>
      <a className="masthead__mark" href="#top" aria-label="EM — retour en haut">
        <span className="masthead__em">EM</span>
      </a>
    </header>
  );
}
