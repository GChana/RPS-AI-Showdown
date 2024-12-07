import React from "react";
import NavBar from "../../components/NavBar/NavBar";

function HighscorePage() {
  const userName = localStorage.getItem("name");
  const userScore = localStorage.getItem("score");

  return (
    <>
      <h1>Highscore Page</h1>
      <NavBar />
      <p>{userName}</p>
      <p>{userScore}</p>
    </>
  );
}

export default HighscorePage;
