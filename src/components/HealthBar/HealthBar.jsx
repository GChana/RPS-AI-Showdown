import "./HealthBar.scss";

export function PlayerHealthBar({ userName, playerOne }) {
  return (
    <>
      <div className="health__player">
        <p className="health__name">{userName}</p>
        <div className="health__max">
          <div
            className={`health__full ${
              playerOne.health === 2
                ? "health__full"
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
    </>
  );
}

export function OpponentHealthBar({ currentOpponent }) {
  return (
    <>
      <div className="health__opponent">
        <p className="health__name health__name-opponent">
          {currentOpponent.name}
        </p>
        <div className="health__max">
          <div
            className={`health__full ${
              currentOpponent.health === 2
                ? "health__full"
                : currentOpponent.health === 1
                ? "health__half"
                : "health__empty"
            }`}
          >
            <p className="health__value health__value-opponent">
              {currentOpponent.health} Lives
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
