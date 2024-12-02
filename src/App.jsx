import { useState, useRef, useEffect } from "react";
import "./App.scss";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import rockImg from "./assets/rock.png";
import paperImg from "./assets/paper.png";
import scissorsImg from "./assets/scissors.png";
import { machineResponse } from "./utils/machineResponse.mjs";
import { determineWinner } from "./utils/determineWinner.mjs";
import { runHandpose } from "./utils/HandDetection.mjs";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [userChoice, setUserChoice] = useState("");
  const [machineChoice, setMachineChoice] = useState("");
  const [result, setResult] = useState("");
  const [emoji, setEmoji] = useState(null);

  const images = {
    rock: rockImg,
    paper: paperImg,
    scissors: scissorsImg,
  };

  const initialiseBackend = async () => {
    await tf.setBackend("webgl");
  };

  initialiseBackend();

  const stopHandpose = () => {
    isRunning = false;
  };

  const handleMachineResponse = () => {
    const choice = machineResponse();
    setMachineChoice(choice);
  };

  const handleDetermineWinner = () => {
    const outcome = determineWinner(userChoice, machineChoice);
    setResult(outcome);
  };

  const playGame = async () => {
    runHandpose(webcamRef, canvasRef, setUserChoice, setEmoji);
    handleMachineResponse();
  };

  useEffect(() => {
    playGame();
  }, []);

  // Only running on mount
  useEffect(() => {
    // Logic: Run playGame only if X or Y is defined
    if (userChoice && machineChoice) {
      handleDetermineWinner();
    }
  }, [userChoice, machineChoice]); // Run on mount AND when state variable X or Y changes

  return (
    <>
      <div className="App">
        <header className="App__header">
          <Webcam className="cam" ref={webcamRef} />
          <canvas className="cam" ref={canvasRef} />
          {emoji !== null && (
            <img className="emoji__player" src={images[emoji]} />
          )}
        </header>
      </div>
      {emoji !== null && (
        <img className="emoji__machine" src={images[machineChoice]} />
      )}
      <div className="result">{result && <p>{result}</p>}</div>
    </>
  );
}

export default App;
