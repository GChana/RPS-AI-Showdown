import "./LoadNextLevel.scss";
import papyrusMad from "../../assets/PapyrusMad.png";
import edwardMad from "../../assets/EdwardSad.png";
import theRockMad from "../../assets/TheRockMad.png";
import { Link } from "react-router-dom";

function LoadNextLevel({
  setUserChoice,
  setMachineChoice,
  response,
  currentOpponent,
  goToNextLevel,
}) {
  setUserChoice("");
  setMachineChoice("");
  return (
    <>
      <main className="level">
        <h1 className="level__response">{response}</h1>
        {currentOpponent.name === "Papyrus" ? (
          <img className="level__img" src={papyrusMad} alt="Image of Papyrus" />
        ) : currentOpponent.name === "Edward Scissorhands" ? (
          <img
            className="level__img"
            src={edwardMad}
            alt="Image of Edward Scissorhands"
          />
        ) : (
          <img
            className="level__img"
            src={theRockMad}
            alt="Image of The Rock"
          />
        )}
        {currentOpponent.name === "The Rock" ? (
          <p className="level__message">
            Congratulations, you have beaten the best of the best! check out
            your score on the High Scores page!
          </p>
        ) : (
          <p className="level__message">Your next opponent awaits...</p>
        )}

        {currentOpponent.name === "The Rock" ? (
          <Link to="/highscore">
            <button className="level__button level__button--highscore">
              High Scores
            </button>
          </Link>
        ) : (
          <button className="level__button" onClick={goToNextLevel}>
            GO TO NEXT LEVEL
          </button>
        )}
      </main>
    </>
  );
}

export default LoadNextLevel;
