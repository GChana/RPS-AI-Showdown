import "./History.scss";

function History({ gameHistory, images, emoji }) {
  return (
    <div className="history">
      <h3 className="history__title">Game History</h3>
      <ul className="history__list">
        {gameHistory.map((game, index) => (
          <li className="history__item" key={index}>
            Round {index + 1}: {game.userChoice}{" "}
            {emoji !== null && (
              <img className="history__emoji" src={images[game.userChoice]} />
            )}{" "}
            vs {game.machineChoice}{" "}
            {emoji !== null && (
              <img
                className="history__emoji"
                src={images[game.machineChoice]}
              />
            )}{" "}
            - {game.outcome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
