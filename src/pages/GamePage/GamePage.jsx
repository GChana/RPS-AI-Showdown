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
      <div className="score">
        <p className="score__user">Your Score: {userScore}</p>
        <p className="score__machine">Machine Score: {machineScore}</p>
      </div>
    </>
  );
}

export default GamePage;
