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
import theRockReady from "../../assets/TheRockReady.png";
import theRockMad from "../../assets/TheRockMad.png";
import theRockHappy from "../../assets/TheRockWin.png";

import React from "react";
import Player from "../../utils/player.mjs";

function GamePage({ userName }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [userChoice, setUserChoice] = useState("");
  const [machineChoice, setMachineChoice] = useState("");
  const [result, setResult] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [machineScore, setMachineScore] = useState(0);
  const [playerOne, setPlayerOne] = useState(new Player("Gurpreet", 2));
  const [papyrus, setPapyrus] = useState(new Player("Papyrus", 2));
  const [edward, setEdward] = useState(new Player("Edward Scissorhands", 2));
  const [rocky, setRocky] = useState(new Player("The Rock", 2));
  const [currentOpponent, setCurrentOpponent] = useState("placeholder", 2);

  const images = {
    rock: rockImg,
    paper: paperImg,
    scissors: scissorsImg,
  };

  const opponents = [
    new Player("Papyrus", 2),
    new Player("Edward Scissorhands", 2),
    new Player("The Rock", 2),
  ];

  let opponent = opponents[2];

  console.log(opponent);

  const initialiseBackend = async () => {
    await tf.setBackend("webgl");
  };

  initialiseBackend();

  const handleMachineResponse = () => {
    const choice = machineResponse();
    setMachineChoice(choice);
  };

  const handleDetermineWinner = () => {
    const outcome = determineWinner(
      userChoice,
      machineChoice,
      setUserScore,
      setMachineScore,
      setRocky,
      setPlayerOne
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
    }, 2000);
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

  if (result === "You win!") {
    opponent.health -= 1;
  }

  if (result === "Computer wins") {
    playerOne.health -= 1;
  }

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
              <img
                className="machine__img"
                src={
                  playerOne.health === 0
                    ? theRockHappy
                    : rocky.health === 0
                    ? theRockMad
                    : theRockReady
                }
                alt="The Rock"
              />
            </div>
            {emoji !== null && (
              <img className="machine__emoji" src={images[machineChoice]} />
            )}
          </div>
        </div>
        <div className="game__outcome">
          <p>You chose: {userChoice}</p>
          <p>
            {opponent.name} chose: {machineChoice}
          </p>
          <div className="result">{result && <p>{result}</p>}</div>
          <div className="score">
            <p className="score__user">
              {userName}'s Score: {userScore}
            </p>
            <p className="score__machine">
              {opponent.name} Health: {opponent.health}
            </p>
            <p className="score__machine">
              {userName}'s Health: {playerOne.health}
            </p>
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
