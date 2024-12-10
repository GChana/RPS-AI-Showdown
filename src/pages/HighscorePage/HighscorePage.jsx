import "./HighscorePage.scss";
import NavBar from "../../components/NavBar/NavBar";
import championship from "../../assets/championshipTitle.png";
import { Link } from "react-router-dom";

function HighscorePage() {
  const userName = localStorage.getItem("name");
  const userScore = localStorage.getItem("score");

  return (
    <>
      <header className="header__title">
        <h1>Highscore Page</h1>
      </header>
      <NavBar />
      <main className="highscore">
        <img
          className="highscore__championship"
          src={championship}
          alt="img of championship belt"
        />
        <div className="highscore__result">
          <h2 className="highscore__result-username">{userName}</h2>
          <h2 className="highscore__result-score">{userScore}</h2>
        </div>
        <Link to="/">
          <button className="highscore__button">RETURN HOME</button>
        </Link>
      </main>
    </>
  );
}

export default HighscorePage;
