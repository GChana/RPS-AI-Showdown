import "./DefeatScreen.scss";
import papyrusHappy from "../../assets/PapyrusHappy.png";
import edwardHappy from "../../assets/EdwardHappy.png";
import theRockHappy from "../../assets/TheRockWin.png";
import { Link } from "react-router-dom";

function DefeatScreen({
  setUserChoice,
  setMachineChoice,
  response,
  currentOpponent,
}) {
  setUserChoice("");
  setMachineChoice("");
  return (
    <>
      <main className="defeat">
        {response ? (
          <h1 className="defeat__response">{response}</h1>
        ) : (
          <div className="defeat__loader"></div>
        )}
        {currentOpponent.name === "Papyrus" ? (
          <img
            className="defeat__img"
            src={papyrusHappy}
            alt="Image of Papyrus"
          />
        ) : currentOpponent.name === "Edward Scissorhands" ? (
          <img
            className="defeat__img"
            src={edwardHappy}
            alt="Image of Edward Scissorhands"
          />
        ) : (
          <img
            className="defeat__img"
            src={theRockHappy}
            alt="Image of The Rock"
          />
        )}
        <p className="defeat__message">
          You have been defeated... Gather your rocks, papers and scissors and
          try again!
        </p>
        <Link to="/">
          <button className="defeat__button">RETURN HOME</button>
        </Link>
      </main>
    </>
  );
}

export default DefeatScreen;
