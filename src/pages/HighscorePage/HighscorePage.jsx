import React from "react";

function HighscorePage() {
  const userName = localStorage.getItem("name");
  const userScore = localStorage.getItem("score");

  return (
    <>
      <h1>Highscore Page</h1>
      <p>{userName}</p>
      <p>{userScore}</p>
    </>
  );
}

export default HighscorePage;
