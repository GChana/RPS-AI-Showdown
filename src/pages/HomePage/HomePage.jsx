import { useEffect } from "react";
import "./HomePage.scss";
import { Link } from "react-router";
import NavBar from "../../components/NavBar/NavBar";

function HomePage({ userName, handleUserNameSubmit }) {
  useEffect(() => {
    localStorage.setItem("name", userName);
  }, [userName]);

  return (
    <>
      <header className="header">
        <h1 className="header__title">
          Rock Paper Scissors{" "}
          <span className="header__title--fontstyle">AI Showdown</span>
        </h1>
      </header>
      <NavBar />
      <div className="main">
        <form name="name" className="form">
          <input
            className="form__input"
            name="name"
            type="text"
            onChange={handleUserNameSubmit}
            value={userName}
            placeholder="Enter username"
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
