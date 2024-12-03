import { useState, useRef, useEffect } from "react";
import "./GamePage.scss";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import rockImg from "../../assets/rock.png";
import paperImg from "../../assets/paper.png";
import scissorsImg from "../../assets/scissors.png";
import { machineResponse } from "../../utils/machineResponse.mjs";
import { determineWinner } from "../../utils/determineWinner.mjs";
import { runHandpose } from "../../utils/HandDetection.mjs";
import theRock from "../../assets/TheRockReady.png";

import React from "react";

function GamePage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [userChoice, setUserChoice] = useState("");
  const [machineChoice, setMachineChoice] = useState("");
  const [result, setResult] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [machineScore, setMachineScore] = useState(0);

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
    const outcome = determineWinner(
      userChoice,
      machineChoice,
      setUserScore,
      setMachineScore
    );
    setResult(outcome);
  };

  const playGame = async () => {
    setResult("");
    setMachineChoice("");
    setUserChoice("");
    runHandpose(webcamRef, canvasRef, setUserChoice, setEmoji);
    setTimeout(() => {
      handleMachineResponse();
    }, 3000);
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
      <div className="game">
        <div className="game__cams">
          <header className="user">
            <Webcam className="user__cam" ref={webcamRef} />
            <canvas className="user__cam" ref={canvasRef} />
            {emoji !== null && (
              <img className="user__emoji" src={images[emoji]} />
            )}
          </header>
          <div className="machine">
            <div className="machine__cam">
              <img className="machine__img" src={theRock} alt="The Rock" />
            </div>
            {emoji !== null && (
              <img className="machine__emoji" src={images[machineChoice]} />
            )}
          </div>
        </div>
        <div className="game__outcome">
          <p>You chose: {userChoice}</p>
          <p>Machine chose: {machineChoice}</p>
          <div className="result">{result && <p>{result}</p>}</div>
          <div className="score">
            <p className="score__user">Your Score: {userScore}</p>
            <p className="score__machine">Machine Score: {machineScore}</p>
            <button onClick={playGame} className="game__button">
              START
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;
