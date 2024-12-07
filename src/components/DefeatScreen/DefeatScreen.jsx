import "./DefeatScreen.scss";
import papyrusHappy from "../../assets/PapyrusHappy.png";
import edwardHappy from "../../assets/EdwardHappy.png";
import theRockHappy from "../../assets/TheRockWin.png";

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
        <h1 className="defeat__response">{response}</h1>
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
        <button className="defeat__button">RETURN HOME</button>
      </main>
    </>
  );
}

export default DefeatScreen;
