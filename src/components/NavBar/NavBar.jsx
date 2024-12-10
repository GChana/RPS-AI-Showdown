import "./NavBar.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav">
      <ul className="nav__list">
        <Link to="/">
          <li className="nav__item">Home</li>
        </Link>
        <Link className="nav__link" to="/highscore">
          <li className="nav__item">High Scores</li>
        </Link>
        <Link className="nav__link" to="/about">
          <li className="nav__item">About Creator</li>
        </Link>
      </ul>
    </div>
  );
}

export default NavBar;
