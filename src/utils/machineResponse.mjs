// Gives machine response for rock || paper || scissors
function machineResponse() {
  // const [machineChoice, setMachineChoice] = useState("");
  let choice = "";
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      choice = "rock";
      break;
    case 1:
      choice = "paper";
      break;
    case 2:
      choice = "scissors";
      break;
  } // Set the machine's choice
  return choice;
}

export { machineResponse };
