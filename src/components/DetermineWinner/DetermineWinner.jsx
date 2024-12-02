import React from "react";

function DetermineWinner() {
  if (userChoice === machineChoice) {
    return "It's a tie game";
  }
  if (userChoice === "rock") {
    if (machineChoice === "paper") {
      return "Computer wins";
    } else {
      return "You win!";
    }
  }

  if (userChoice === "paper") {
    if (machineChoice === "scissors") {
      return "Computer wins";
    } else {
      return "You win!";
    }
  }

  if (userChoice === "scissors") {
    if (machineChoice === "rock") {
      return "Computer wins";
    } else {
      return "You win!";
    }
  }

  return <div>DetermineWinner</div>;
}

export default DetermineWinner;
