import Player from "./player.mjs";

function determineWinner(
  userChoice,
  machineChoice,
  setUserScore,
  setMachineScore
) {
  let outcome = "";
  if (userChoice === machineChoice) {
    outcome = "It's a tie game";
  } else if (userChoice === "rock" && machineChoice === "paper") {
    outcome = "Computer wins";
    setMachineScore((prevScore) => prevScore + 1);
  } else if (userChoice === "paper" && machineChoice === "scissors") {
    outcome = "Computer wins";
    setMachineScore((prevScore) => prevScore + 1);
  } else if (userChoice === "scissors" && machineChoice === "rock") {
    outcome = "Computer wins";
    setMachineScore((prevScore) => prevScore + 1);
  } else {
    outcome = "You win!";
    setUserScore((prevScore) => prevScore + 100);
  }
  return outcome;
}

export { determineWinner };
