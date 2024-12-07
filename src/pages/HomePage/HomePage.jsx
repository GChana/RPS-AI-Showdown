import { useEffect } from "react";
import "./HomePage.scss";
import { Link } from "react-router";

function HomePage({ userName, handleUserNameSubmit }) {
  useEffect(() => {
    localStorage.setItem("name", userName);
  }, [userName]);

  return (
    <>
      <h1 className="title">Rock Paper Scissors AI Showdown</h1>
      <div className="main">
        <form name="name" className="form">
          <label className="form__label">Please enter a username</label>
          <input
            className="form__input"
            name="name"
            type="text"
            onChange={handleUserNameSubmit}
            value={userName}
            placeholder="username..."
          />
          <Link to="/game">
            <button className="form__button" type="submit">
              PLAY!
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default HomePage;
