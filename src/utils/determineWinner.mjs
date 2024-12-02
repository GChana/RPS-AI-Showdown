function determineWinner(userChoice, machineChoice) {
  let outcome = "";
  if (userChoice === machineChoice) {
    outcome = "It's a tie game";
  } else if (userChoice === "rock" && machineChoice === "paper") {
    outcome = "Computer wins";
  } else if (userChoice === "paper" && machineChoice === "scissors") {
    outcome = "Computer wins";
  } else if (userChoice === "scissors" && machineChoice === "rock") {
    outcome = "Computer wins";
  } else {
    outcome = "You win!";
  }
  return outcome;
}

export { determineWinner };