import { useEffect } from "react";
import "./HomePage.scss";
import { Link } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function HomePage({
  userName,
  handleUserNameSubmit,
  handleUserNameChange,
  message,
}) {
  const navigate = useNavigate();

  const navigateGamePage = (event) => {
    event.preventDefault();
    console.log("hello");
    if (handleUserNameSubmit) {
      navigate("/game");
    }
  };

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
        <form name="name" className="form" onSubmit={navigateGamePage}>
          <input
            className="form__input"
            name="name"
            type="text"
            onChange={handleUserNameChange}
            value={userName}
            placeholder="Enter username..."
          />
          <button
            className="form__button"
            type="submit"
            disabled={!userName.trim()}
          >
            PLAY!
          </button>
        </form>
        {message && <p className="form__error">{message}</p>}
      </div>
    </>
  );
}

export default HomePage;
