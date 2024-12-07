import "./HealthBar.scss";

function HealthBar({ userName, playerOne, currentOpponent }) {
  return (
    <>
      <div className="health">
        <div className="health__player">
          <p className="health__name">{userName}</p>
          <div className="health__max">
            <div
              className={`health__max ${
                playerOne.health === 2
                  ? "health__max"
                  : playerOne.health === 1
                  ? "health__half"
                  : "health__empty"
              }`}
            >
              <p className="health__value">
                {playerOne.health} Lives {playerOne.name}
              </p>
            </div>
          </div>
        </div>
        <div className="gap">VS</div>
        <div className="health__opponent">
          <p className="health__name health__name-opponent">
            {currentOpponent.name}
          </p>
          <div className="health__max">
            <div
              className={`health__max ${
                currentOpponent.health === 2
                  ? "health__max"
                  : currentOpponent.health === 1
                  ? "health__half"
                  : "health__empty"
              }`}
            >
              <p className="health__value">{currentOpponent.health} Lives</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthBar;
