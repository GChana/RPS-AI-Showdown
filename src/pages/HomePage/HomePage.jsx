import "./HomePage.scss";
import { Link } from "react-router";

function HomePage({ userName, handleUserNameSubmit }) {
  return (
    <>
      <h1 className="title">Rock Paper Scissors AI Showdown</h1>
      <form name="name" className="form">
        <label>Name</label>
        <input
          name="name"
          type="text"
          onChange={handleUserNameSubmit}
          value={userName}
        />
        <Link to="/game">
          <button type="submit">Enter!</button>
        </Link>
      </form>
    </>
  );
}

export default HomePage;
