import "./LoadNextLevel.scss";

function LoadNextLevel({
  response,
  currentOpponent,
  papyrusMad,
  edwardMad,
  theRockMad,
  goToNextLevel,
}) {
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
        <p className="level__message">Your next opponent awaits!</p>
        <button className="level__button" onClick={goToNextLevel}>
          GO TO NEXT LEVEL
        </button>
      </main>
    </>
  );
}

export default LoadNextLevel;
